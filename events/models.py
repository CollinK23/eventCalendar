from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#class Calendar(models.Model):
    #user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    #def __str__(self):
        #return self.user

class CalendarEvents(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True) 
    event_date = models.DateField('Event Date', null=True)
    title = models.CharField("Event Name", max_length=100)
    start = models.TimeField('Start Time')
    end = models.TimeField('End Time')

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['event_date']