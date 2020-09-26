from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


from .models import Card
from .serializers import CardSerializer

class ListCards(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class EditCard(generics.RetrieveUpdateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class DeleteCard(generics.DestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer



