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

class LogoutAndBlackListRefreshTokenForUserView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        print(f"\nrequest to api blacklist view endpoint was \n{request.data}\n")
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            print(f"token = {token}")
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(f"exception was {e}")
            return Response(status=status.HTTP_400_BAD_REQUEST)

