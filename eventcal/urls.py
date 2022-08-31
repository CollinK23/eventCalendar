from django.contrib import admin
from django.urls import path, include
from registerUser import views as regV
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("signup/", regV.registerUser, name="registerUser"),
    path('events/', include('events.urls')),
    path('', TemplateView.as_view(template_name="home.html")),
    path('', include("django.contrib.auth.urls")),
]
