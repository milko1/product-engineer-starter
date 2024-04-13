from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datasource import DataAccessLayer

dal = DataAccessLayer()
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/cases/")
async def cases():
    return {"message": dal.get_cases()}

@app.get("/cases/{case_id}")
async def cases_get_one(case_id):
    return {"message": dal.get_case(case_id)}

@app.post("/cases/")
async def cases_create():
    return {"message": dal.create_case()}
