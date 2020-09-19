from django.urls import path

from .apiviews import ListCards, EditCard, DeleteCard

urlpatterns = [
    path('list/', ListCards.as_view()),
    path('create/', ListCards.as_view()),
    path('edit/<int:pk>/', EditCard.as_view()),
    path('delete/<int:pk>/', DeleteCard.as_view())
]