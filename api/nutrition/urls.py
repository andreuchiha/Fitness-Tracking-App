from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import FoodLogViewSet

router = DefaultRouter()
router.register(r"foodlogs", FoodLogViewSet, basename="foodlog")

urlpatterns = [
    path("", include(router.urls)),
]