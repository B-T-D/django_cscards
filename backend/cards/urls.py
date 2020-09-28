from django.urls import path

from .views import index, ListCards, EditCard, DeleteCard

urlpatterns = [
    path('', index, name="single_page_app"),
    path('api/v1/list/', ListCards.as_view()),
    path('api/v1/create/', ListCards.as_view()),
    path('api/v1/edit/<int:pk>/', EditCard.as_view()),
    path('api/v1/delete/<int:pk>/', DeleteCard.as_view())
]