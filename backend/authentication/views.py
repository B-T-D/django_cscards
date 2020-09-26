from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import TokenObtainPairWithUsernameSerializer

class TokenObtainPairWithUsernameView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = TokenObtainPairWithUsernameSerializer

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