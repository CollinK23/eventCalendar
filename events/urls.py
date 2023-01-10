import json
from django.urls import path
from . import views

urlpatterns = [
    #path('', views.home, name="home")
    path('', views.home, name="home"),
    path('events', views.showEvents, name='events'),
    path('add/', views.addEvent, name='addEvent'),
    path('edit/<event_id>', views.editEvent, name='editEvent'),
    path('delete/<event_id>', views.deleteEvent, name='deleteEvent'),
]
