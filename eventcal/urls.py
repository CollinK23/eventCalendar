from django.contrib import admin
from django.urls import path, include
from registerUser import views as regV

urlpatterns = [
    path('admin/', admin.site.urls),
    path("signup/", regV.registerUser, name="registerUser"),
    path('', include('events.urls')),
]
