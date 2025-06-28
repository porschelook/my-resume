from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from cv_data import cv

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",  "https://my-resume-tau-rose.vercel.app", ],  # 👈 Frontend address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 

class Person(BaseModel):
    id: int
    name: str
    age: int

DB: List[Person] = [
    Person(id=1, name="Alice", age=30),
    Person(id=2, name="Bob", age=25),
    Person(id=3, name="Charlie", age=35)    
]
@app.get("/cv")
def read_root():
    return cv

@app.get("/api")
def read_root():
    return DB

@app.get("/get_people", response_model=List[Person])
def get_people():
    """Retrieve all people from the database."""
    return DB

 