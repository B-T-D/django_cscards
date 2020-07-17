from django.shortcuts import render

from .models import Card

from django.views.generic import ListView

class CardManagerView(ListView):
    model = Card
    template_name = 'card_manager.html'


# Create your views here.
