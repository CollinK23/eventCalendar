from django.shortcuts import render
from events.forms import calendarForm

# Create your views here.

def home(request):
    name = request.user.get_username()

    form = calendarForm()

    
    return render(request, 
        'calendar.html', {
        "name": name,
        'form': form,
        })
