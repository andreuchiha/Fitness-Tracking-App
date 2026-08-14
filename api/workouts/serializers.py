## A serializer converts Django model objects into JSON and vice versa. ##
from rest_framework import serializers
from .models import *

class WorkoutPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPlan
        fields = "__all__"
        read_only_fields = ["user"]



class WorkoutPlanExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPlanExercise
        fields = "__all__"



class WorkoutSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutSession
        fields = "__all__"
        read_only_fields = ["user"]



class WorkoutSessionExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutSessionExercise
        fields = "__all__"