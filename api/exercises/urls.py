from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r"exercises", ExerciseViewSet)
router.register(r"musclegroups", MuscleGroupViewSet)
router.register(r"equipment", EquipmentViewSet)
router.register(r"exercisemusclegroups", ExerciseMuscleGroupViewSet)


urlpatterns = [
    path("", include(router.urls)),
]