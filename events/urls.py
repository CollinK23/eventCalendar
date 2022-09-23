import json
from django.urls import path
from . import views

urlpatterns = [
    #path('', views.home, name="home")
    path('', views.home, name="home"),
    path('json', views.json, name='json'),
]
