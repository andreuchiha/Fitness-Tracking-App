from rest_framework import viewsets

from .models import WeightLog
from .serializers import WeightLogSerializer

class WeightLogViewSet(viewsets.ModelViewSet):
    queryset = WeightLog.objects.all()
    serializer_class = WeightLogSerializer