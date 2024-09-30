from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    path('api/v1/books/', BookListView.as_view(), name='book-list'),
    path('api/v1/books/create/', BookCreateView.as_view(), name='book-create'),
    path('api/v1/books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-detail'),
    path('api/v1/books/total-pages/', BookTotalPagesView.as_view(), name='book-list-total-pages'),
    # Orders
    path('api/v1/orders/', OrderListView.as_view(), name='order-list'),
    path('api/v1/orders/total-pages/', OrderTotalPagesView.as_view(), name='order-list-total-pages'),
    path('api/v1/orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('api/v1/orders/<int:pk>/', OrderRetrieveUpdateDestroyView.as_view(), name='order-detail'),
    # Invoices
    path("docs/", include_docs_urls(title='Books API'))
]
