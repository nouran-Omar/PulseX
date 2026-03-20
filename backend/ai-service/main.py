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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
            "ecg_storage": "Secure file upload"
        }
    }


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
