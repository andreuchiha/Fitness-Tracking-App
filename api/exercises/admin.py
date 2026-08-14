from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(MuscleGroup)
admin.site.register(Equipment)
admin.site.register(Exercise)
admin.site.register(ExerciseMuscleGroup)