# RS System Project Repo - Team 1

Recommender System for Travel POIs.


## How to run


### 1. Start the Backend 

You need to prepare your own connects to MongoDB, copy it to backend/credentials.yaml

```bash
$ cd backend
$ pip install -r requirements.txt
$ uvicorn main:app --reload
```

### 2. Start the Frontend 
```bash
$ cd frontend
$ npm install
$ npm start
```