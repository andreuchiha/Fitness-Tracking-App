from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r"workoutplans", WorkoutPlanViewSet)
router.register(r"workoutplanexercises", WorkoutPlanExerciseViewSet)
router.register(r"workoutsessions", WorkoutSessionViewSet)
router.register(r"workoutsessionexercises", WorkoutSessionExerciseViewSet)

urlpatterns = [
    path("", include(router.urls)),
]