from dataclasses import asdict
from celery import chain
from domain.analysis.models.trait_predictor_factory import TraitPredictorFactory
from domain.analysis.models.trait_scores_calculator_factory import TraitScoresCalculatorFactory
from domain.analysis.providers.posts_provider_factory import PostsProviderFactory
from domain.entities.analysis import Analysis, AnalysisStatus
from domain.entities.post import AnalyzedPost, Post
from domain.entities.trait_scores import TraitScores
from infrastructure.celery.deps import analysis_repository, results_repository
from infrastructure.celery.app import app

@app.task(queue="analyze-post")
def analyze_post(analysis: Analysis, post: Post):
    trait_predictor = TraitPredictorFactory.create(analysis)
    prediction = trait_predictor.predict(post)
    analyzed_post = AnalyzedPost(**asdict(post), analysis_id=analysis.id, traits=prediction)
    results_repository.create_posts([analyzed_post])


@app.task(queue="aggregate-scores")
def aggregate_scores(analysis: Analysis):
    posts = results_repository.get_posts(analysis.id)
    scores_calculator = TraitScoresCalculatorFactory.create(analysis)
    scores = TraitScores(
        analysis_id=analysis.id,
        type=analysis.type,
        scores=scores_calculator.calculate(posts),
    )
    results_repository.create_scores(scores)


@app.task(queue="analyze-profile")
def analyze_profile(analysis: Analysis):
    print("entered analyze profile")
    return


@app.task(queue="update-analysis-status")
def set_status(analysis: Analysis, status: AnalysisStatus):
    analysis.status = status
    analysis_repository.update_analysis(analysis)


@app.task(queue="run-analysis")
def analyze(analysis):
    posts = PostsProviderFactory.create(analysis.sources).get_posts()
    print(posts)
    workflow = chain(
        set_status.si(analysis, AnalysisStatus.IN_PROGRESS),
        analyze_profile.si(analysis),
        chain(analyze_post.si(analysis, post) for post in posts),
        aggregate_scores.si(analysis),
        set_status.si(analysis, AnalysisStatus.COMPLETED)
    )
    workflow.apply_async(link_error=set_status.si(analysis, AnalysisStatus.FAILED))
