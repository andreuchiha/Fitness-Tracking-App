## A serializer converts Django model objects into JSON and vice versa. ##
from rest_framework import serializers
from .models import *

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = "__all__"


class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = "__all__"


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = "__all__"

class ExerciseMuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseMuscleGroup
        fields = "__all__"