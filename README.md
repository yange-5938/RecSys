# RS System Project Repo - Team 1

Recommender System for Travel POIs.
## Project Detail

### What it is?
This program is a recommender system designed for travelers in major european cities. The user has to select a city and provide some sestences describing his/her preferences to a get a list of recommended POIs. E.g. the user wants to go to Paris and provides information like "I want to see some cultural places.", the programm will then output a list of recommended cultural places located in Paris.

### Architecture
The System has one frontend directory bootstrapped on create-react-app. The backend direcotry is created from FastAPI. The Database is MongoDB. The Web server is Nginx.

### Containerization
Both the frondend and backend are published on Dockerhub, which can be eaily downloaded and use. The Nginx container is also prepared to use when the frontend is built. 

## Deployment using Kubernetes

### 1. Install Docker Engine
+ Follow the installation steps: https://docs.docker.com/engine/install/ubuntu/
+ Do the postinstall steps (set non-root user in docker group): https://docs.docker.com/engine/install/linux-postinstall/

### 2. Install Kubernetes
+ Install kubeadm, kubelet and kubectl and kubernetes-cni: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/ 
```bash
$ sudo apt-get install -y kubelet kubeadm kubectl kubernetes-cni
```

### 3. Run Kubernetes
+ Init Kubernetes control-plane node: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/
```bash
# setup CIDR for Flannel 
$ sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```
+ If error _[ERROR CRI]: container runtime is not running_ with init, follow this guide: https://k21academy.com/docker-kubernetes/container-runtime-is-not-running/
```bash
$ sudo rm /etc/containerd/config.toml
$ sudo systemctl restart containerd
```
+ Configure the regular user
```bash
$ mkdir -p $HOME/.kube
$ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
$ sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

+ Install the Pod network with `kubectl apply`
```bash
$ kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

# after the created to check is pods are created with
$ kubectl get pods -A
```
+ Enable pod Scheduling on Control-Plane (because we only have one node)
```bash
$ kubectl taint nodes --all node-role.kubernetes.io/control-plane-
```
### 4. Join a worker node
+ Create the worker node from Step 1-3, before `kubeadm init`
+ Control-plane create a token and worker performs `kubeadm join`
```bash
# In control-plane node
control-plane $ kubeadm token create --print-join-command

# Output e.g. kubeadm join 10.186.0.4:6443 --token djril3.vqhwgrpig5y01eb5 --discovery-token-ca-cert-hash sha256:79289bfc3b6a1de8702f6a41c9415740f8686356c4e016e76b13ff5780c1456c

# change to worker node
worker $ sudo kubeadm join 10.186.0.4:6443 --token djril3.vqhwgrpig5y01eb5 --discovery-token-ca-cert-hash sha256:79289bfc3b6a1de8702f6a41c9415740f8686356c4e016e76b13ff5780c1456c

# check the nodes
control-plane $ kubectl get nodes
```

+ Reset form Init or Join
```bash
# drain the node
control-plane $ kubectl drain <node-name> --ignore-daemonsets
# delte the node
control-plane $ kubectl delete node <node-name>

# worker reset
worker $ sudo kubeadm reset

## After reset, join to a cluster again or kubeadm init WILL NOT change .kube/config automatically, if kubectl still use old config could leads to problem.
## My solution is the copy the config file from /etc/kubernetes/kubelet.conf to $Home/.kube/config, and chown it and all its dependencies.

```

### 5. Start it Deployed
+ apply for the resources
```bash
$ kubectl apply -f backend-deployment.yaml
$ kubectl apply -f backend-service.yaml
$ kubectl apply -f frontend-deployment.yaml
$ kubectl apply -f frontend-service.yaml
$ kubectl apply -f nginx-deployment.yaml

# check deployment status
$ kubectl get deployments
$ kubectl get pods
$ kubectl get services
```

## Start the local Devoplment


+ You need to prepare your own connects to MongoDB, copy it to backend/credentials.yaml
### Start the Backend Server 
```bash
# go to backend directory
$ cd backend

# install backend dependecies
$ pip install -r requirements.txt

# start the backend server with uvicorn
$ uvicorn main:app --reload
```

### Start the Frontend Server
```bash
# go to frontend directory
$ cd frontend

# install frondend depencies
$ npm install

# start the frontend server with webpack-dev-server
$ npm start
```
