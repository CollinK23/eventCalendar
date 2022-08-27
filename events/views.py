from django.shortcuts import render
import calendar 
from calendar import HTMLCalendar
from datetime import datetime

# Create your views here.

def home(request, year=datetime.now().year, month=datetime.now().strftime('%B')):
    name = "Collin"

    month = month.capitalize()

    month_number = list(calendar.month_name).index(month)
    month_number = int(month_number)

    cal = HTMLCalendar().formatmonth(year, month_number)

    now = datetime.now()
    current_year = now.year
    return render(request, 
        'home.html', {
        "name": name,
        "year": year,
        "month": month,
        "calendar": cal,
        })