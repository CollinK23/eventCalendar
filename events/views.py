from django.shortcuts import render
from events.models import CalendarEvents
from django.http import JsonResponse
import json

# Create your views here.

def home(request):
    name = request.user.get_username()
    if request.method == "POST":
        date = request.POST.get('date__select')
        print(request.POST.get('date__select'))
        eventName = request.POST['eventname']
        startTime = request.POST['starttime']
        endTime = request.POST['endtime']

        new_event = CalendarEvents(event_date=date, title=eventName, start=startTime, end=endTime)
        new_event.save()
    
    return render(request, 
        'calendar.html', {
        "name": name,
        })

def json(request):
    data = list(CalendarEvents.objects.values())
    return JsonResponse(data, safe=False)