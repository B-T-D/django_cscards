from django.urls import path, include

from .views import CardManagerView
from .apiviews import ListCards, EditCard

urlpatterns = [
    path('vanilla/', CardManagerView.as_view(), name="card_manager"),
    path('list/', ListCards.as_view()),
    path('create/', ListCards.as_view()),
    path('edit/<int:pk>/', EditCard.as_view())
]