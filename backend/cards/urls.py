from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .apiviews import ListCards, EditCard, DeleteCard

urlpatterns = [
    path('jwtoken/', jwt_views.TokenObtainPairView.as_view(), name='jwtoken_obtain_pair'), # JSON webtoken access token
    path('jwtoken/refresh/', jwt_views.TokenRefreshView.as_view(), name='jwtoken_refrech'), # JSON webtoken refresh token
    path('list/', ListCards.as_view()),
    path('create/', ListCards.as_view()),
    path('edit/<int:pk>/', EditCard.as_view()),
    path('delete/<int:pk>/', DeleteCard.as_view())
]