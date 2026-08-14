from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import *
from .serializers import *

class WorkoutPlanViewSet(viewsets.ModelViewSet):

    serializer_class = WorkoutPlanSerializer
    permission_classes = [IsAuthenticated]

    #So users can only see their own workout plans, we override the get_queryset method to filter the queryset based on the currently authenticated user.
    def get_queryset(self):
        return WorkoutPlan.objects.filter(user=self.request.user)
    
    #So users can only create workout plans for themselves, We override the perform_create method to set the user field to the currently authenticated user.
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WorkoutPlanExerciseViewSet(viewsets.ModelViewSet):

    serializer_class = WorkoutPlanExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WorkoutPlanExercise.objects.filter(
            plan__user=self.request.user
        )
    
    def perform_create(self, serializer):
        plan = serializer.validated_data["plan"]

        if plan.user != self.request.user:
            raise PermissionDenied("You do not own this workout plan.")
        
        serializer.save()


class WorkoutSessionViewSet(viewsets.ModelViewSet):

    serializer_class = WorkoutSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WorkoutSession.objects.filter(user = self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class WorkoutSessionExerciseViewSet(viewsets.ModelViewSet):

    serializer_class = WorkoutSessionExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WorkoutSessionExercise.objects.filter(
            workout_session__user=self.request.user
        )
    
    def perform_create(self, serializer):

        workout_session = serializer.validated_data["workout_session"]

        if workout_session.user != self.request.user:

            raise PermissionDenied("You do not own this workout session.")

        serializer.save()
    