import argparse
from PIL import Image
from torchvision import transforms as T
import torch
from torch.utils.data import DataLoader
import os
import numpy as np
from dataset import CustomInferenceDataset
from tqdm import tqdm
import random

torch.cuda.empty_cache()
# device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
device = torch.device("mps")
print(f"{device} is using")
checkpoints_folder = "checkpoints"
log_file_path = os.path.join(checkpoints_folder, "log_weighted.txt")

def get_args():
    parser = argparse.ArgumentParser(description='Cloud detection Interface')
    parser.add_argument('--img_path',
                        help='Image path to cloud detection!')
    parser.add_argument('--model_path', 
                        default="checkpoints/cloud_detection_model.pth",
                        help='Image path to cloud detection!')

    args = parser.parse_args()
    return args

def transform(img):
    inference_transform = T.Compose([T.Resize((64,64)), 
                                T.ToTensor(),
                                T.Normalize(mean=[0.485, 0.456, 0.406],
                                            std=[0.229, 0.224, 0.225])])
    return inference_transform(img)

def single_img_inference():
    args = get_args()
    image = Image.open(args.img_path).convert("RGB")
    image = transform(image)
    model = torch.load(args.model_path)
    model.to(device)
    model.eval()
    with torch.no_grad():
        image = image.to(device)
        preds = model.forward(torch.unsqueeze(image, 0))
    preds = preds.cpu().numpy()
    result = ["non-human", "human"][np.argmax(preds, axis=-1)[0]]
    print(result)

def batch_inference(model_path, img_paths, thres=0.9):
    dataset = CustomInferenceDataset(img_paths, transform=transform)
    loader = DataLoader(dataset=dataset,
                            batch_size=256,
                            num_workers=2)
    model = torch.load(model_path)
    model.to(device)
    model.eval()
    results = []
    with torch.no_grad():
        for batch in tqdm(loader, total=len(loader)):
            images = batch.to(device)
            preds = model.forward(images)
            probs = torch.nn.Softmax(dim=1)(preds)
            preds = preds.cpu().numpy()
            probs = probs.cpu().numpy()
            batch_result = [1 if l == 1 and probs[i][l] > thres else 0  for i, l in enumerate(np.argmax(probs, axis = -1))]
            results.extend(batch_result)
    return results
if __name__ == "__main__":
    root_path = "../RS-dataset-creation/data/author_imgs"
    img_paths = [os.path.join(root_path, p) for p in os.listdir(root_path)]
    random.shuffle(img_paths)
    results = batch_inference("checkpoints/49.pth", img_paths, thres= 0.8)
    lines = [f"{img_p};{r}" for img_p, r in zip(img_paths, results)]
    with open("inference.txt", "w") as fp:
        fp.write("\n".join(lines))
    