from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TokenObtainPairWithUsername(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        """Add username as a custom claim in the token."""