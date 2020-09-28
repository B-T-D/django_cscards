from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.shortcuts import render

from .models import Card
from .serializers import CardSerializer

def index(request):
    return render(request, "build/index.html")

class ListCards(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class EditCard(generics.RetrieveUpdateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class DeleteCard(generics.DestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer



