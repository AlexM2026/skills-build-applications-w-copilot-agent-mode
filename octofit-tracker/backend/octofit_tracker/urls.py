import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from rest_framework import routers

from .views import (
    ActivityViewSet,
    LeaderboardViewSet,
    TeamViewSet,
    UserViewSet,
    WorkoutViewSet,
)

codespace_name = os.environ.get("CODESPACE_NAME")
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"


def api_root(_request):
    return JsonResponse(
        {
            "base_url": base_url,
            "users": f"{base_url}/api/users/",
            "teams": f"{base_url}/api/teams/",
            "activities": f"{base_url}/api/activities/",
            "leaderboard": f"{base_url}/api/leaderboard/",
            "workouts": f"{base_url}/api/workouts/",
        }
    )


router = routers.DefaultRouter()
router.register("users", UserViewSet, basename="user")
router.register("teams", TeamViewSet, basename="team")
router.register("activities", ActivityViewSet, basename="activity")
router.register("leaderboard", LeaderboardViewSet, basename="leaderboard")
router.register("workouts", WorkoutViewSet, basename="workout")


urlpatterns = [
    path("", api_root, name="api-root"),
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
