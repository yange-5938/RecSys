from bs4 import BeautifulSoup
import json

def extract_reviews_from_html(input_path):
    with open(input_path, "r") as fp:
        html = fp.read()
    soup = BeautifulSoup(html, 'html.parser')

    review_cards = soup.find_all("div", class_="jftiEf fontBodyMedium")

    rows = []
    for c in review_cards:
        author_id = c["data-review-id"]
        author_img_url = c.find("img", class_="NBa7we")["src"]
        try:
            author_name = c.find("div", class_="d4r55").text
        except:
            author_name = None
        # rating = c.find("span", class_="kvMYJc")["aria-label"]
        stars = c.find_all("img", class_="hCCjke vzX5Ic")
        rating = len(stars)
        try:
            time = c.find("span", class_="rsqaWe").text
        except:
            time = None
        try:
            review_text = c.find("span", class_="wiI7pd").text
        except:
            review_text = None
        try:
            review_likes = c.find("span", class_="pkWtMe").text
        except:
            review_likes = None
        
        rows.append({'author_id' : author_id,
                    'author_img_url' : author_img_url,
                    'author_name' : author_name,
                    "rating" : rating,
                    "time" : time,
                    "review_text" : review_text,
                    "review_likes" : review_likes})
    return rows        
    # dct_str = json.dumps(rows, indent=4)
    # with open(output_path, "w") as fp:
    #     fp.write(dct_str)
        
def get_poi_list(html_path):
    with open(html_path) as fp:
        soup = BeautifulSoup(fp, "html.parser")
    cards = [el for el in soup.find_all(class_="f4hh3d")]
    return cards
    # place_description_list = []
    # for card in cards:
    #     place_name = card.find(class_="skFvHc YmWhbc").text
    #     # place_name = [el.get_text() for el in soup2.find_all(class_="skFvHc YmWhbc")]
    #     try:
    #         rating = float(card.find("span", class_="KFi5wf lA0BZ").text)
    #     except:
    #         rating = 0
    #     try:
    #         review_count = int(card.find("span", class_="jdzyld XLC8M").text.split("(")[-1].split(")")[0].replace(",",""))
    #     except:
    #         review_count = 0
    #     try:
    #         description = card.find("div", class_="nFoFM").text   
    #     except:
    #         description = ""
    #     place_description_list.append({
    #         "name" : place_name,
    #         "rating": rating,
    #         "total_reviews" : review_count,
    #         "small_description" : description
    #     })
    # return place_description_list

def get_poi_details(html_card):
    place_name = html_card.find(class_="skFvHc YmWhbc").text
    # place_name = [el.get_text() for el in soup2.find_all(class_="skFvHc YmWhbc")]
    try:
        rating = float(html_card.find("span", class_="KFi5wf lA0BZ").text)
    except:
        rating = 0
    try:
        review_count = int(html_card.find("span", class_="jdzyld XLC8M").text.split("(")[-1].split(")")[0].replace(",",""))
    except:
        review_count = 0
    try:
        description = html_card.find("div", class_="nFoFM").text   
    except:
        description = ""
    return {
        "name" : place_name,
        "rating": rating,
        "total_reviews" : review_count,
        "small_description" : description
    }   