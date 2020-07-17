from django.urls import path, include

from .views import CardManagerView

urlpatterns = [
    path('', CardManagerView.as_view(), name="card_manager"),
]