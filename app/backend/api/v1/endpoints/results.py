from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse

from api.v1.deps import (
    get_analysis_repository,
    get_current_user,
    get_results_repository,
)
from domain.entities.analysis import AnalysisStatus
from domain.entities.user import User
from domain.repositories.analysis_repository import AnalysisRepository
from domain.repositories.results_repository import ResultsRepository

router = APIRouter()


@router.get("/{id}/general-info")
async def get_general_info():
    pass


@router.get("/{id}/traits")
async def get_trait_scores(
    id: str,
    user: User = Depends(get_current_user),
    repository: AnalysisRepository = Depends(get_analysis_repository),
    results_repository: ResultsRepository = Depends(get_results_repository),
):
    analysis = await repository.get_analysis(user.id, id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    if analysis.status == AnalysisStatus.IN_PROGRESS:
        return JSONResponse(status_code=202, content=None)
    if analysis.status == AnalysisStatus.FAILED:
        return JSONResponse(status_code=500, content="Error occured during the analysis.")
    scores = await results_repository.get_scores(analysis.id)
    return scores


@router.get("/{id}/posts")
async def get_posts(
    id: str,
    user: User = Depends(get_current_user),
    repository: AnalysisRepository = Depends(get_analysis_repository),
    results_repository: ResultsRepository = Depends(get_results_repository),
):
    analysis = await repository.get_analysis(user.id, id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    if analysis.status == AnalysisStatus.IN_PROGRESS:
        return JSONResponse(status_code=202, content=None)
    if analysis.status == AnalysisStatus.FAILED:
        return JSONResponse(status_code=500, content="Error occured during the analysis.")
    posts = await results_repository.get_posts(analysis.id)
    return posts
