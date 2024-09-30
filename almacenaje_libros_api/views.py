from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import *
from .serializer import *
from django.db.models import Q
from .pagination import CustomPageNumberPagination

'''
BOOKS
'''

class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = CustomPageNumberPagination  # Usa el paginador personalizado

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('query', None)
        if query:
            queryset = queryset.filter(Q(title__icontains=query) | Q(author__icontains=query))
        return queryset


class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookCreateView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookTotalPagesView(APIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = CustomPageNumberPagination

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        rows = int(request.query_params.get('rows', 10))
        if query:
            queryset = Book.objects.filter(Q(title__icontains=query) | Q(author__icontains=query))
        else:
            queryset = Book.objects.all()

        total_count = queryset.count()
        total_pages = int(total_count / rows)
        
        return Response({
            'total_pages': total_pages,
            'count': total_count
            
        }, status=status.HTTP_200_OK)
    
'''
ORDERS
'''
class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('query', None)
        if query:
            queryset = queryset.filter(Q(title__icontains=query) | Q(author__icontains=query))
        return queryset

class OrderTotalPagesView(APIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = CustomPageNumberPagination

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        rows = int(request.query_params.get('rows', 10))
        if query:
            queryset = Order.objects.filter(Q(title__icontains=query) | Q(author__icontains=query))
        else:
            queryset = Order.objects.all()

        total_count = queryset.count()
        total_pages = int(total_count / rows)
        
        return Response({
            'total_pages': total_pages,
            'count': total_count
            
        }, status=status.HTTP_200_OK)
    
class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
