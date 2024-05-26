import pandas as pd
import requests
import time
import os

# Load data from CSV
csv_file_path = 'path/to/your/restaurants.csv'
df = pd.read_csv(csv_file_path)

# Create a temporary directory to store downloaded images
temp_dir = 'temp_images'
os.makedirs(temp_dir, exist_ok=True)

# URL of the endpoint
url = 'http://localhost:8080/restaurant/add'

# Interval between requests in seconds
interval = 1

def download_image(image_url, image_path):
    try:
        response = requests.get(image_url, stream=True)
        response.raise_for_status()
        with open(image_path, 'wb') as file:
            for chunk in response.iter_content(1024):
                file.write(chunk)
        return image_path
    except requests.exceptions.RequestException as e:
        print(f"Failed to download image from {image_url}, Error: {e}")
        return None

for index, row in df.iterrows():
    # Download the image
    image_path = os.path.join(temp_dir, f"{index}.jpg")
    downloaded_image_path = download_image(row['cover_image_link'], image_path)
    
    if downloaded_image_path is None:
        print(f"Skipping restaurant {row['title']} due to image download failure")
        continue
    
    # Prepare the data and files for the POST request
    data = {
        'restaurant_name': row['title'],
        'restaurant_location': row['address'],  # Assuming 'address' is equivalent to 'restaurant_location'
        'restaurant_rating': row['rating'],
        'category_id': row['category_index'],
        'restaurant_address': row['address']
    }
    files = {
        'file': open(downloaded_image_path, 'rb')
    }
    
    try:
        response = requests.post(url, data=data, files=files)
        response.raise_for_status()  # Check if the request was successful
        print(f"Successfully added: {row['title']}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to add: {row['title']}, Error: {e}")
    finally:
        # Close the file after the request is done
        files['file'].close()
    
    # Wait for the specified interval before sending the next request
    time.sleep(interval)

# Cleanup: Remove the temporary directory and its contents
for file in os.listdir(temp_dir):
    file_path = os.path.join(temp_dir, file)
    try:
        if os.path.isfile(file_path):
            os.unlink(file_path)
    except Exception as e:
        print(f"Error deleting file {file_path}, Error: {e}")
os.rmdir(temp_dir)
