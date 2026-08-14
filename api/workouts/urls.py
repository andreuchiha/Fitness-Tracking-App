from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r"workoutplans", WorkoutPlanViewSet, basename="workoutplan")
router.register(r"workoutplanexercises", WorkoutPlanExerciseViewSet, basename="workoutplanexercise")
router.register(r"workoutsessions", WorkoutSessionViewSet, basename="workoutsession")
router.register(r"workoutsessionexercises", WorkoutSessionExerciseViewSet, basename="workoutsessionexercise")

urlpatterns = [
    path("", include(router.urls)),
]