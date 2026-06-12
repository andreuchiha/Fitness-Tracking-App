from django.db import models

# Create your models here.

class MuscleGroup(models.Model):
    name = models.CharField(max_length = 50)


class Equipment(models.Model):
    name = models.CharField(max_length = 70)


class Exercise(models.Model):
    name = models.CharField(max_length = 100)
    equipment = models.ForeignKey(Equipment, on_delete=models.SET_NULL, null = True)
    instructions = models.TextField()
    difficulty = models.CharField(max_length = 20)
    image_url = models.URLField(blank = True)


class ExerciseMuscleGroup(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    muscle_group = models.ForeignKey(MuscleGroup, on_delete=models.CASCADE)