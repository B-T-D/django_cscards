from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TokenObtainPairWithUsernameSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        """Add username as a custom claim in the token."""
        token = super(TokenObtainPairWithUsernameSerializer, cls).get_token(user)

        token['username'] = user.username
        return token