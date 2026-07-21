from rest_framework import viewsets

from .models import *
from .serializers import *


class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


class MuscleGroupViewSet(viewsets.ModelViewSet):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer


class ExerciseMuscleGroupViewSet(viewsets.ModelViewSet):
    queryset = ExerciseMuscleGroup.objects.all()
    serializer_class = ExerciseMuscleGroupSerializer