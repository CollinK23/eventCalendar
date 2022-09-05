from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Calendar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.user

class CalendarEvents(models.Model):
    events = models.ForeignKey(Calendar, on_delete=models.CASCADE) 
    event_date = models.DateField('Event Date')
    title = models.CharField("Event Name", max_length=100)
    start = models.TimeField('Start Time')
    end = models.TimeField('End Time')

    def __str__(self):
        return self.event_date