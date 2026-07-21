## A serializer converts Django model objects into JSON and vice versa. ##
from rest_framework import serializers
from .models import WeightLog

class WeightLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightLog
        fields = "__all__"

        