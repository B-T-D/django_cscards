from django.urls import path, include
from django.conf import settings # for DJ debug toolbar thing

from .views import index, ListCards, EditCard, DeleteCard

urlpatterns = [
    path('', index, name="single_page_app"),
    path('api/v1/list/', ListCards.as_view()),
    path('api/v1/create/', ListCards.as_view()),
    path('api/v1/edit/<int:pk>/', EditCard.as_view()),
    path('api/v1/delete/<int:pk>/', DeleteCard.as_view())
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls))
    ] + urlpatterns