from rest_framework import viewsets

from .models import *
from .serializers import *

class WorkoutPlanViewSet(viewsets.ModelViewSet):
    queryset = WorkoutPlan.objects.all()
    serializer_class = WorkoutPlanSerializer


class WorkoutPlanExerciseViewSet(viewsets.ModelViewSet):
    queryset = WorkoutPlanExercise.objects.all()
    serializer_class = WorkoutPlanExerciseSerializer


class WorkoutSessionViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSession.objects.all()
    serializer_class = WorkoutSessionSerializer


class WorkoutSessionExerciseViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSessionExercise.objects.all()
    serializer_class = WorkoutSessionExerciseSerializer
    