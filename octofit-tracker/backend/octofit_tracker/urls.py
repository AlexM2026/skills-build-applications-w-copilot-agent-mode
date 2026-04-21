import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, TeamViewSet, ActivityViewSet, LeaderboardViewSet, WorkoutViewSet

codespace_name = os.environ.get("CODESPACE_NAME")
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"


def api_root(_request):
    return JsonResponse({"status": "ok", "base_url": base_url})

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'workouts', WorkoutViewSet)

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import path

codespace_name = os.environ.get("CODESPACE_NAME")
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"


def api_root(_request):
    return JsonResponse({"status": "ok", "base_url": base_url})


urlpatterns = [
    path("", api_root, name="api-root"),
    path("admin/", admin.site.urls),
]
