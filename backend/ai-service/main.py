<<<<<<< HEAD
"""
PulseX AI Service - FastAPI Application
========================================
Main entry point for the PulseX AI Service providing:
- X-Ray analysis (binary classification)
- Heart health chatbot
- Smart health recommendations (Framingham-based CHD risk prediction)
- ECG file storage
"""

import logging
import os
import shutil
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="PulseX AI Service",
    description="AI-powered health analysis service with X-Ray, Chatbot, and Smart Recommendations",
    version="3.1.0"
)

# CORS configuration
=======
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
import shutil
import uuid
from datetime import datetime
import os
import sys
from pydantic import BaseModel
from typing import Optional, Dict, Any

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = FastAPI(
    title="PulseX AI Service",
    description="Medical AI Service: X-ray Binary Classifier + Heart Health Chatbot",
    version="3.0.0"
)

>>>>>>> origin/master
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
# Upload directory
UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


# ============================================================================
# Pydantic Models
# ============================================================================

class ChatMessage(BaseModel):
    """Chat message request model."""
    message: str
    user_id: Optional[str] = None
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    """Chat response model."""
    response: str
    intent: Optional[str] = None
    confidence: Optional[float] = None
    session_id: str


class FraminghamRequest(BaseModel):
    """Request model for Framingham-based recommendation."""
    male: int = Field(..., ge=0, le=1, description="Gender (1=male, 0=female)")
    age: int = Field(..., ge=20, le=100, description="Age in years")
    education: int = Field(..., ge=1, le=4, description="Education level (1-4)")
    currentSmoker: int = Field(..., ge=0, le=1, description="Current smoker (1=yes, 0=no)")
    cigsPerDay: float = Field(..., ge=0, description="Cigarettes per day")
    BPMeds: int = Field(..., ge=0, le=1, description="On BP medication (1=yes, 0=no)")
    prevalentStroke: int = Field(..., ge=0, le=1, description="History of stroke (1=yes, 0=no)")
    prevalentHyp: int = Field(..., ge=0, le=1, description="History of hypertension (1=yes, 0=no)")
    diabetes: int = Field(..., ge=0, le=1, description="Diabetes (1=yes, 0=no)")
    totChol: float = Field(..., ge=100, le=600, description="Total cholesterol (mg/dL)")
    sysBP: float = Field(..., ge=80, le=300, description="Systolic blood pressure (mmHg)")
    diaBP: float = Field(..., ge=40, le=200, description="Diastolic blood pressure (mmHg)")
    BMI: float = Field(..., ge=10, le=60, description="Body Mass Index")
    heartRate: float = Field(..., ge=30, le=200, description="Heart rate (bpm)")
    glucose: float = Field(..., ge=30, le=500, description="Fasting blood glucose (mg/dL)")


class RecommendationResponse(BaseModel):
    """Response model for recommendation endpoint."""
    success: bool
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    timestamp: str


class XRayResponse(BaseModel):
    """Response model for X-Ray analysis."""
    success: bool
    prediction: Optional[str] = None
    confidence: Optional[float] = None
    error: Optional[str] = None


class ECGUploadResponse(BaseModel):
    """Response model for ECG upload."""
    success: bool
    file_id: Optional[str] = None
    message: Optional[str] = None
    error: Optional[str] = None


# ============================================================================
# Service Initialization
# ============================================================================

# Lazy loading of services
_chatbot_service = None
_recommendation_service = None
_xray_service = None


def get_chatbot_service():
    """Get or initialize chatbot service."""
    global _chatbot_service
    if _chatbot_service is None:
        try:
            from services.chatbot_service import ChatbotService
            _chatbot_service = ChatbotService()
            logger.info("ChatbotService initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize ChatbotService: {e}")
            raise
    return _chatbot_service


def get_recommendation_service():
    """Get or initialize recommendation service."""
    global _recommendation_service
    if _recommendation_service is None:
        try:
            from services.recommendation_service import RecommendationService
            _recommendation_service = RecommendationService()
            logger.info("RecommendationService initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize RecommendationService: {e}")
            raise
    return _recommendation_service


def get_xray_service():
    """Get or initialize X-Ray service."""
    global _xray_service
    if _xray_service is None:
        try:
            from services.xray_service import XRayService
            _xray_service = XRayService()
            logger.info("XRayService initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize XRayService: {e}")
            raise
    return _xray_service


# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint with service information."""
    return {
        "service": "PulseX AI Service",
        "status": "operational",
        "version": "3.1.0",
        "features": {
            "xray_binary_classifier": "92.6% accuracy (Normal vs Abnormal)",
            "heart_health_chatbot": "Medical intent validation + Risk assessment",
            "smart_recommendation": "ML-based heart disease risk prediction + personalized recommendations",
=======
# Setup directories
BASE_DIR = Path(__file__).parent
UPLOAD_DIR = BASE_DIR / "uploads"
ECG_DIR = UPLOAD_DIR / "ecg"
XRAY_TEMP_DIR = UPLOAD_DIR / "xray_temp"

for folder in [ECG_DIR, XRAY_TEMP_DIR]:
    folder.mkdir(parents=True, exist_ok=True)

# Initialize services
try:
    from services.xray_service import XRayService
    xray_service = XRayService()
    print("✅ X-ray Binary Classifier loaded (92.6% accuracy)")
except Exception as e:
    print(f"❌ X-ray Service Error: {e}")
    xray_service = None

try:
    from services.chatbot_service import ChatbotService
    chatbot_service = ChatbotService()
    print("✅ Heart Health Chatbot loaded")
except Exception as e:
    print(f"❌ Chatbot Service Error: {e}")
    chatbot_service = None

# Pydantic models for chatbot
class ChatbotRequest(BaseModel):
    message: str
    user_data: Optional[Dict[str, Any]] = None


# ENDPOINTS
@app.get("/", tags=["System"])
async def root():
    return {
        "service": "PulseX AI Service",
        "status": "operational",
        "version": "3.0.0",
        "features": {
            "xray_binary_classifier": "92.6% accuracy (Normal vs Abnormal)",
            "heart_health_chatbot": "Medical intent validation + Risk assessment",
>>>>>>> origin/master
            "ecg_storage": "Secure file upload"
        }
    }

<<<<<<< HEAD

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    """
    Chat endpoint for heart health questions.
    
    Validates medical intent and provides risk assessment.
    """
    try:
        service = get_chatbot_service()
        response = service.process_message(
            message=message.message,
            user_id=message.user_id,
            session_id=message.session_id
        )
        return ChatResponse(
            response=response.get('response', ''),
            intent=response.get('intent'),
            confidence=response.get('confidence'),
            session_id=response.get('session_id', str(uuid.uuid4()))
        )
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/recommendation", response_model=RecommendationResponse)
async def get_recommendation(request: FraminghamRequest):
    """
    Smart health recommendation endpoint.
    
    Uses Framingham Heart Study model to predict 10-year CHD risk
    and generate personalized recommendations.
    
    Input: Framingham features (15 variables)
    Output: Risk level, score, confidence, recommendations, risk factors
    """
    try:
        service = get_recommendation_service()
        
        # Convert Pydantic model to dict
        patient_data = request.model_dump()
        
        # Get prediction and recommendations
        result = service.predict(patient_data)
        
        return RecommendationResponse(
            success=True,
            result=result,
            timestamp=datetime.now().isoformat()
        )
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        return RecommendationResponse(
            success=False,
            error=str(e),
            timestamp=datetime.now().isoformat()
        )
    except Exception as e:
        logger.error(f"Recommendation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/recommendation/model-info")
async def get_model_info():
    """Get information about the loaded recommendation model."""
    try:
        service = get_recommendation_service()
        return {
            "success": True,
            "model_info": service.get_model_info(),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Model info error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/xray/analyze", response_model=XRayResponse)
async def analyze_xray(file: UploadFile = File(...)):
    """
    X-Ray analysis endpoint.
    
    Analyzes chest X-Ray images for abnormalities.
    Returns: Normal or Abnormal with confidence score.
    """
    try:
        # Validate file type
        if not file.content_type or not file.content_type.startswith('image/'):
            return XRayResponse(
                success=False,
                error="Invalid file type. Please upload an image file."
            )
        
        service = get_xray_service()
        
        # Read file contents
        contents = await file.read()
        
        # Analyze
        result = service.analyze(contents)
        
        return XRayResponse(
            success=True,
            prediction=result.get('prediction'),
            confidence=result.get('confidence')
        )
    except Exception as e:
        logger.error(f"X-Ray analysis error: {e}")
        return XRayResponse(
            success=False,
            error=str(e)
        )


@app.post("/api/ecg/upload", response_model=ECGUploadResponse)
async def upload_ecg(
    file: UploadFile = File(...),
    patient_id: str = Form(...)
):
    """
    ECG file upload endpoint.
    
    Stores ECG files securely for later analysis.
    """
    try:
        # Validate file
        if not file.filename:
            return ECGUploadResponse(
                success=False,
                error="No filename provided"
            )
        
        # Generate unique file ID
        file_id = str(uuid.uuid4())
        
        # Create patient directory
        patient_dir = UPLOAD_DIR / patient_id
        patient_dir.mkdir(exist_ok=True)
        
        # Save file
        file_path = patient_dir / f"{file_id}_{file.filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        logger.info(f"ECG file uploaded: {file_path}")
        
        return ECGUploadResponse(
            success=True,
            file_id=file_id,
            message=f"ECG file uploaded successfully"
        )
    except Exception as e:
        logger.error(f"ECG upload error: {e}")
        return ECGUploadResponse(
            success=False,
            error=str(e)
        )


# ============================================================================
# Error Handlers
# ============================================================================

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler."""
    logger.error(f"Unhandled exception: {exc}")
    return {
        "success": False,
        "error": "Internal server error",
        "detail": str(exc) if os.getenv("DEBUG") else None
    }


# ============================================================================
# Main Entry Point
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
=======
@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "xray_binary": "active" if xray_service else "inactive",
            "chatbot": "active" if chatbot_service else "inactive",
            "ecg_storage": "active"
        }
    }


@app.post("/api/xray/analyze", tags=["X-ray Analysis"])
async def analyze_xray(file: UploadFile = File(...)):
    """
    Binary X-ray Classification: Normal vs Abnormal (92.6% accuracy)
    Replaces old DenseNet121 multi-class classifier
    """
    if not xray_service:
        raise HTTPException(status_code=503, detail="X-ray service not initialized")
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Invalid file type")

    file_id = str(uuid.uuid4())
    file_ext = Path(file.filename).suffix.lower()
    temp_path = XRAY_TEMP_DIR / f"{file_id}{file_ext}"

    try:
        await file.seek(0)
        image_bytes = await file.read()
        
        with open(temp_path, "wb") as buffer:
            buffer.write(image_bytes)
        
        # Run synchronous ML inference in thread pool to avoid blocking event loop
        import asyncio
        result = await asyncio.to_thread(xray_service.analyze_xray, image_bytes, file.filename)
        
        if temp_path.exists():
            temp_path.unlink()

        return {
            "success": True,
            "result": result,
            "timestamp": datetime.now().isoformat()
        }
    
    except Exception as e:
        if temp_path.exists(): 
            temp_path.unlink()
        raise HTTPException(status_code=500, detail=f"Analysis Error: {str(e)}")


@app.post("/api/ecg/upload", tags=["ECG Storage"])
async def upload_ecg(file: UploadFile = File(...)):
    """Upload ECG file for secure storage"""
    allowed_extensions = {'.png', '.jpg', '.jpeg', '.pdf'}
    file_ext = Path(file.filename).suffix.lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Only PNG, JPG, JPEG, PDF allowed")

    file_id = str(uuid.uuid4())
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_filename = f"ecg_{timestamp}_{file_id}{file_ext}"
    save_path = ECG_DIR / unique_filename

    try:
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return {
            "success": True,
            "message": "ECG uploaded successfully",
            "file_info": {
                "filename": unique_filename,
                "path": f"uploads/ecg/{unique_filename}",
                "size_mb": round(save_path.stat().st_size / (1024 * 1024), 2),
                "timestamp": datetime.now().isoformat()
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload Error: {str(e)}")


@app.post("/api/chatbot", tags=["Heart Health Chatbot"])
async def chatbot(request: ChatbotRequest):
    """
    Heart Health Chatbot with Medical Intent Validation
    KEPT FROM ORIGINAL REPO - NO CHANGES
    """
    if not chatbot_service:
        raise HTTPException(status_code=503, detail="Chatbot service not initialized")
    
    try:
        result = await chatbot_service.process_message(
            message=request.message,
            user_data=request.user_data or {}
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot Error: {str(e)}")

@app.exception_handler(404)
async def not_found(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "available": ["/api/xray/analyze", "/api/ecg/upload", "/api/chatbot"]
        }
    )

@app.on_event("startup")
async def startup():
    print("=" * 70)
    print("PulseX AI Service v3.0.0")
    print("=" * 70)
    print(f"✓ X-ray Binary Classifier: {'Active' if xray_service else 'Inactive'}")
    print(f"✓ Heart Health Chatbot: {'Active' if chatbot_service else 'Inactive'}")
    print(f"✓ ECG Storage: Active")
    print("=" * 70)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
>>>>>>> origin/master
