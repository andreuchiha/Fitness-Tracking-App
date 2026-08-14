from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import FoodLog
from .serializers import FoodLogSerializer

class FoodLogViewSet(viewsets.ModelViewSet):

    serializer_class = FoodLogSerializer
    permission_classes = [IsAuthenticated]


    # So users can only see their own food logs, we override the get_queryset method to filter the queryset based on the currently authenticated user.
    def get_queryset(self):
        return FoodLog.objects.filter(user=self.request.user)
    

    # To Stop users from creating food logs for other users, we override the perform_create method to set the user field to the currently authenticated user.
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

