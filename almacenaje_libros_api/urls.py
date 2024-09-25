from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    path('api/v1/books/', BookListView.as_view(), name='book-list'),
    path('api/v1/books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-detail'),
    path("docs/", include_docs_urls(title='Books API'))
]
