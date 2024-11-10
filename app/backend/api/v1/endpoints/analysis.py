from datetime import datetime
from typing import List
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException

from api.v1.deps import get_analysis_repository, get_current_user
from api.v1.schema.analysis import (
    AnalysisResponse,
    CreateAnalysisRequest,
    UpdateAnalysisRequest,
)
from domain.entities.analysis import Analysis, AnalysisStatus
from domain.entities.user import User
from domain.repositories.analysis_repository import AnalysisRepository

router = APIRouter()


@router.get("/", response_model=List[AnalysisResponse])
async def get_all(
    user: User = Depends(get_current_user),
    repository: AnalysisRepository = Depends(get_analysis_repository),
):
    analyses = await repository.get_all_analyses(user.id)
    return analyses


@router.get("/{id}/", response_model=AnalysisResponse)
async def get(
    id: str,
    user: User = Depends(get_current_user),
    repository: AnalysisRepository = Depends(get_analysis_repository),
):
    analysis = await repository.get_analysis(user.id, id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis


@router.post("/", response_model=AnalysisResponse)
async def create(
    analysis_data: CreateAnalysisRequest,
    user: User = Depends(get_current_user),
    repository: AnalysisRepository = Depends(get_analysis_repository),
):
    analysis = Analysis(
        id=str(uuid4()),
        name=analysis_data.name,
        urls=analysis_data.urls,
        type=analysis_data.type,
        created_by=user.id,
        created_at=datetime.utcnow(),
        status=AnalysisStatus.CREATED,
    )
    await repository.create_analysis(analysis)
    return analysis


@router.post("/{id}/run", response_model=AnalysisResponse)
async def run(
    id: str,
    user: User = Depends(get_current_user),
    repository: AnalysisRepository = Depends(get_analysis_repository),
):
    pass


@router.put("/{id}", response_model=AnalysisResponse)
async def update(
    id: str,
    analysis_data: UpdateAnalysisRequest,
    user: User = Depends(get_current_user),
    repository: AnalysisRepository = Depends(get_analysis_repository),
):
    existing_analysis = await repository.get_analysis(user.id, id)
    if not existing_analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    if existing_analysis.status == AnalysisStatus.IN_PROGRESS:
        raise HTTPException(
            status_code=400, detail="Cannot update analysis while it's running"
        )

    analysis = Analysis(
        id=existing_analysis.id,
        name=analysis_data.name,
        urls=analysis_data.urls,
        type=analysis_data.type,
        created_by=existing_analysis.created_by,
        created_at=existing_analysis.created_at,
        status=AnalysisStatus.CREATED,
    )

    await repository.update_analysis(analysis)
    return analysis


@router.delete("/{id}")
async def delete(
    id: str,
    user: User = Depends(get_current_user),
    repository: AnalysisRepository = Depends(get_analysis_repository),
):
    analysis = await repository.get_analysis(user.id, id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    if analysis.status == AnalysisStatus.IN_PROGRESS:
        raise HTTPException(
            status_code=400, detail="Cannot delete analysis while it's running"
        )

    await repository.delete_analysis(user.id, id)
    return {"message": "Analysis deleted successfully"}
