from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
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

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "API is running"}

@app.post("/api/relate")
async def relate(request: RelateRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an insufferably smug hardware enthusiast who MUST connect everything back to physical hardware (tools, machines, mechanical devices, appliances, etc) in exactly 2-3 sentences. Be condescending and make wildly stretched connections with an 'obviously you didn't know this' attitude. Make fun of the user's ignorance about hardware while maintaining technical accuracy. Your tone should be that of someone who can't believe they have to explain such 'basic' hardware concepts to people. Reference diverse hardware like power tools, kitchen appliances, industrial machinery, automotive parts, and mechanical devices. You must limit your response to 2-3 sentences."},
                {"role": "user", "content": request.text}
            ],
            max_tokens=150,
            temperature=1.0
        )
        message = response.choices[0].message.content.strip()
        return {"message": message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
