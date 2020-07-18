from rest_framework import generics

from .models import Card
from .serializers import CardSerializer

class ListCards(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer