from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class RelateRequest(BaseModel):
    # Add your expected request fields here
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
        # Your relation logic here
        return {"message": request.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
