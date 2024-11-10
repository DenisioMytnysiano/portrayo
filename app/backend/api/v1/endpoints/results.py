from fastapi import APIRouter

router = APIRouter()

@router.get("/{id}/general-info")
def get_general_info():
    pass

@router.get("/{id}/traits")
def get_trait_scores():
    pass

@router.get("/{id}/comments")
def get_comments():
    pass