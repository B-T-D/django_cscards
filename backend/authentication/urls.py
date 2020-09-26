from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import LogoutAndBlackListRefreshTokenForUserView

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='jwtoken_obtain_pair'), # JSON webtoken access token
        # TODO subclass the token pair view and have it return the user name in the encoded string not just the id
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='jwtoken_refresh'), # JSON webtoken refresh token
    path('blacklist/', LogoutAndBlackListRefreshTokenForUserView.as_view(), name="jwtoken_blacklist"), # Blacklist a token pair
]