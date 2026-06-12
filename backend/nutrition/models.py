from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class FoodLog(models.Model):

    MEAL_CHOICES = [
        ("BREAKFAST", "Breakfast"),
        ("LUNCH", "Lunch"),
        ("DINNER", "Dinner"),
        ("SNACK", "Snack"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="food_logs")
    food_name = models.CharField(max_length = 100)
    date = models.DateField()
    calories = models.PositiveBigIntegerField()
    protein = models.DecimalField(max_digits = 6, decimal_places = 2)
    carbs = models.DecimalField(max_digits = 6, decimal_places = 2)
    fats = models.DecimalField(max_digits = 6, decimal_places = 2)
    meal_type = models.CharField(max_length = 20, choices = MEAL_CHOICES)

    def __str__(self):
        return f"{self.food_name} ({self.user.username})"
    

