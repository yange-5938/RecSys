import time
import platform
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

js_scroll = "arguments[0].scrollIntoView(true);"
if platform.system() == "Linux":
    driverPath = '/usr/bin/chromedriver'
    driver = webdriver.Chrome(driverPath)
else:
    driver = webdriver.Chrome()

def generate_random_sleep(min, max):
    return random.uniform(min,max)

def click_more_buttons(driver):
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[@class='w8nwRe kyuRq']")))
        more_buttons = driver.find_elements(By.XPATH, f"//button[@class='w8nwRe kyuRq']")
        
        for b in more_buttons:
            time.sleep(generate_random_sleep(0,0.5))
            b.click()
    except:
        pass
    
def initialize_scraper():
    # Start the Selenium webdriver and navigate to the Google Maps page
    driver.get("https://www.google.com/maps")
    
    time.sleep(generate_random_sleep(0,2))
    
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[@jscontroller='soHxf']")))
    result = driver.find_element(By.XPATH, "//button[@jscontroller='soHxf']")
    result.click()

    time.sleep(generate_random_sleep(0,2))
    print(f"[INFO] : Scraper is initialized!")
    return driver

# Define function to scrape Google reviews
def scrape_google_reviews(driver, place_name, output_path, num_scroll=10):
    print(f"[INFO] : Scraping starting for {place_name}")
    
    # Enter the place name into the search box and submit the search
    search_box = driver.find_element(By.XPATH, "//input[@name='q']")
    search_box.send_keys(Keys.SHIFT, Keys.ARROW_UP)
    search_box.send_keys(Keys.DELETE)
    search_box.send_keys(place_name)
    search_box.send_keys(Keys.RETURN)
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@class='hfpxzc']")))
        result = driver.find_element(By.XPATH, "//a[@class='hfpxzc']")
        result.click()
    except:
        pass
    
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//h1[@class='DUwDvf fontHeadlineLarge']")))
    place_text = driver.find_element(By.XPATH, "//h1[@class='DUwDvf fontHeadlineLarge']").text
    
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, f"//button[@aria-label='Rezensionen zu „{place_text}“']")))
    result = driver.find_element(By.XPATH, f"//button[@aria-label='Rezensionen zu „{place_text}“']")
    result.click()
    
    time.sleep(generate_random_sleep(0,2))
    
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//div[@class='m6QErb DxyBCb kA9KIf dS8AEf ']")))
    result = driver.find_element(By.XPATH, f"//div[@class='m6QErb DxyBCb kA9KIf dS8AEf ']")
    
    driver.execute_script("arguments[0].scroll(0, arguments[0].scrollHeight);", result)
    
    cur_scroll = 0
    while True:
        driver.execute_script("arguments[0].scroll(0, arguments[0].scrollHeight);", result)
        click_more_buttons(driver)
        time.sleep(generate_random_sleep(0,2))
        if cur_scroll == num_scroll:
            break
        cur_scroll += 1
    
    page_content = driver.page_source
    with open(output_path, "w") as fp:
        fp.write(page_content)

    print(f"[INFO] : Scraping is completed {place_name}!")