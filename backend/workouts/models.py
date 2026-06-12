from django.db import models
from django.contrib.auth.models import User
from exercises.models import Exercise

# Create your models here.

class WorkoutPlan(models.Model):

    DAY_CHOICES = [
        ("MONDAY", "Monday"),
        ("TUESDAY", "Tuesday"),
        ("WEDNESDAY", "Wednesday"),
        ("THURSDAY", "Thursday"),
        ("FRIDAY", "Friday"),
        ("SATURDAY", "Saturday"),
        ("SUNDAY", "Sunday")
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workout_plans")
    workout_name = models.CharField(max_length=100)
    day_of_week = models.CharField(max_length = 20, choices = DAY_CHOICES)

    def __str__(self):
        return self.name



class WorkoutPlanExercise(models.Model):
    plan = models.ForeignKey(WorkoutPlan, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    sets = models.PositiveIntegerField()
    reps = models.PositiveIntegerField()
    rest = models.PositiveIntegerField()
    order_index = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.plan.name} - {self.exercise.name}"
    


class WorkoutSession(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workout_sessions")
    workout_plan = models.ForeignKey(WorkoutPlan, on_delete=models.CASCADE)
    date = models.DateField()
    duration = models.PositiveIntegerField()
    notes = models.TextField()



class WorkoutSessionExercise(models.Model):

    workout_session = models.ForeignKey(WorkoutSession, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    sets_completed = models.PositiveIntegerField()
    reps_completed = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()