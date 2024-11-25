from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

class RelateRequest(BaseModel):
    text: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "API is running"}

@app.post("/api/relate")
async def relate(request: RelateRequest):
    try:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that relates everything to hardware."},
                {"role": "user", "content": f"{request.text}"}
            ],
            max_tokens=150,
            temperature=1.0
        )
        message = response["choices"][0]["message"]["content"].strip()
        return {"message": message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
