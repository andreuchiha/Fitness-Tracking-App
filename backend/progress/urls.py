from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import WeightLogViewSet

router = DefaultRouter()
router.register(r"weightlogs", WeightLogViewSet)

urlpatterns = [
    path("", include(router.urls)),
]