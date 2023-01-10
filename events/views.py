from django.shortcuts import render, redirect
from events.models import CalendarEvents

# Create your views here.

def home(request):
    name = request.user.get_username()
    #database values passed into JS calendar
    context = {'events': list(CalendarEvents.objects.values().filter(user=request.user))}

    if request.method == "POST":

        date = request.POST.get('date__select')
        eventName = request.POST['eventname']
        startTime = request.POST['starttime']
        endTime = request.POST['endtime']

        new_event = CalendarEvents(user=request.user, event_date=date, title=eventName, start=startTime, end=endTime)
        new_event.save()
        return redirect('home')
    
    if request.method == "DELETE":
        return redirect('home')
    
    return render(request, 
        'calendar.html', {
        "name": name,
        "context" : context,
        })

def showEvents(request):
    name = request.user.get_username()

    data = CalendarEvents.objects.filter(user=request.user)

    return render(request, 
        'events.html', {
        "name": name,
        'data': data,
        })

def addEvent(request):
    if request.method == "POST":

        date = request.POST.get('date__select')
        eventName = request.POST['eventname']
        startTime = request.POST['starttime']
        endTime = request.POST['endtime']

        new_event = CalendarEvents(user=request.user, event_date=date, title=eventName, start=startTime, end=endTime)
        new_event.save()
    
        return redirect('events')
    return render(request, 'add.html')

def editEvent(request, event_id):
    event = CalendarEvents.objects.get(pk=event_id)
    if request.method == "POST":

        event.event_date = request.POST.get('date__select')
        event.title = request.POST['eventname']
        event.start = request.POST['starttime']
        event.end = request.POST['endtime']

        event.save()
        return redirect('events')

    return render(request,
    'edit.html', {
        'event': event,
    })

def deleteEvent(request, event_id):
    event = CalendarEvents.objects.get(pk=event_id)
    event.delete()
    return redirect('events')