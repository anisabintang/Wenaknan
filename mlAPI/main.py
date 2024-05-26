from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer

app = FastAPI()

# Define the data models
class Restaurant(BaseModel):
    restaurant_id: int
    restaurant_name: str
    category: str

class DataInput(BaseModel):
    restaurants: List[Restaurant]
    liked_restaurant_ids: List[int]

# Helper functions for the ML model
def one_hot_encode_categories(restaurants_df):
    mlb = MultiLabelBinarizer()
    category_encoded = mlb.fit_transform(restaurants_df['category'].apply(lambda x: [x]))
    category_df = pd.DataFrame(category_encoded, columns=mlb.classes_)
    restaurants_df = pd.concat([restaurants_df, category_df], axis=1)
    return restaurants_df

# Step 4: Generate user profile
def get_user_profile(liked_restaurant_ids, restaurants_df):
    liked_restaurants = restaurants_df[restaurants_df['restaurant_id'].isin(liked_restaurant_ids)]
    liked_categories = liked_restaurants.drop(['restaurant_id', 'restaurant_name', 'category'], axis=1)
    user_profile = liked_categories.mean()
    return user_profile

# Step 5: Recommend restaurants
def recommend_restaurants(liked_restaurant_ids, restaurants_df, top_n=50):
    user_profile = get_user_profile(liked_restaurant_ids, restaurants_df)
    restaurants_df['similarity'] = restaurants_df.drop(['restaurant_id', 'restaurant_name', 'category'], axis=1).dot(user_profile)
    recommendations = restaurants_df[~restaurants_df['restaurant_id'].isin(liked_restaurant_ids)].sort_values('similarity', ascending=False)
    return recommendations.head(top_n)

@app.post("/process_data")
def process_data(data: DataInput):
    try:
        # Convert input data to DataFrame
        restaurant_data = [r.model_dump() for r in data.restaurants]
        restaurant_df = pd.DataFrame(restaurant_data)

        # One-hot encode the restaurant categories
        restaurants_df = one_hot_encode_categories(restaurant_df)

        liked_restaurant_ids = data.liked_restaurant_ids

        # Get recommendations
        recommendations = recommend_restaurants(liked_restaurant_ids, restaurants_df)
        print(recommendations[['restaurant_id', 'restaurant_name', 'category', 'similarity']])

        return recommendations[['restaurant_id', 'restaurant_name', 'category', 'similarity']].to_dict(orient='records')

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"Hello": "World"}