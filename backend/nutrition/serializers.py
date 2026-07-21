## A serializer converts Django model objects into JSON and vice versa. ##
from rest_framework import serializers
from .models import FoodLog

class FoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodLog
        fields = "__all__"

