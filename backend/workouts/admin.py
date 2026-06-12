from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(WorkoutPlan)
admin.site.register(WorkoutPlanExercise)
admin.site.register(WorkoutSession)
admin.site.register(WorkoutSessionExercise)
