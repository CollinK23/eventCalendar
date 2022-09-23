from socket import fromshare
from django import forms

class calendarForm(forms.Form):
    Title = forms.CharField()
    Date = forms.DateTimeField( )