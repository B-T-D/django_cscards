from django.urls import path, include

from .views import CardManagerView
from .apiviews import ListCards

urlpatterns = [
    path('vanilla/', CardManagerView.as_view(), name="card_manager"),
    path('', ListCards.as_view()),
]