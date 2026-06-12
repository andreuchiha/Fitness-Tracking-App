from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class WeightLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="weight_logs")
    date = models.DateField()
    weight = models.DecimalField(max_digits = 5, decimal_places = 2)
    notes = models.TextField(blank = True)

    def __str__(self):
        return f"{self.user.username} - {self.weight_kg}kg ({self.date})"