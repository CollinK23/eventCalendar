from django.shortcuts import render
from events.models import CalendarEvents
from django.core import serializers
from json import dumps
from django.http import JsonResponse

# Create your views here.

def home(request):
    name = request.user.get_username()

    context = {'events': list(CalendarEvents.objects.values())}

    if request.method == "POST":

        date = request.POST.get('date__select')
        eventName = request.POST['eventname']
        startTime = request.POST['starttime']
        endTime = request.POST['endtime']

        new_event = CalendarEvents(user=request.user, event_date=date, title=eventName, start=startTime, end=endTime)
        new_event.save()
    
    return render(request, 
        'calendar.html', {
        "name": name,
        "context" : context,
        })

def showEvents(request):
    name = request.user.get_username()

    data = serializers.serialize("python", CalendarEvents.objects.filter(user=request.user))

    return render(request, 
        'events.html', {
        "name": name,
        'data': data,
        })