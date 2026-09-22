from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register(r"exercises", ExerciseViewSet, basename="exercise")
router.register(r"musclegroups", MuscleGroupViewSet, basename="musclegroup")
router.register(r"equipment", EquipmentViewSet, basename="equipment")
router.register(r"exercisemusclegroups", ExerciseMuscleGroupViewSet, basename="exercisemusclegroup")

urlpatterns = [
    path("", include(router.urls)),
]