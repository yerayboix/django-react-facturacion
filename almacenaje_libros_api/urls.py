from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import *
from .views import InvoiceLineViewSet

router = routers.DefaultRouter()

router.register(r'invoice-lines', InvoiceLineViewSet, basename='invoice-line')

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
    path('api/v1/invoices/', InvoiceListView.as_view(), name='invoice-list'),
    path('api/v1/invoices/total-pages/', InvoiceTotalPagesView.as_view(), name='invoice-list-total-pages'),
    path('api/v1/invoices/create/', InvoiceCreateView.as_view(), name='invoice-create'),
    path('api/v1/invoices/<int:pk>/', InvoiceRetrieveUpdateDestroyView.as_view(), name='invoice-detail'),
    # Invoice Lines
    # path('api/v1/invoice-lines/', InvoiceLineListView.as_view(), name='invoice-line-list'),
    # path('api/v1/invoice-lines/total-pages/', InvoiceLineTotalPagesView.as_view(), name='invoice-line-list-total-pages'),
    # path('api/v1/invoice-lines/create/', InvoiceLineCreateView.as_view(), name='invoice-line-create'),
    # path('api/v1/invoice-lines/<int:pk>/', InvoiceLineRetrieveUpdateDestroyView.as_view(), name='invoice-line-detail'),
    path('api/v1/', include(router.urls)),
    path("docs/", include_docs_urls(title='Books API'))
]
