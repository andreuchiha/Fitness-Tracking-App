from rest_framework import viewsets

from .models import FoodLog
from .serializers import FoodLogSerializer

class FoodLogViewSet(viewsets.ModelViewSet):
    queryset = FoodLog.objects.all()
    serializer_class = FoodLogSerializer