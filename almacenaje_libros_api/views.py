from telnetlib import STATUS
from requests import Response
from rest_framework import generics
from .models import Book
from .serializer import BookSerializer
from django.db.models import Q
from .pagination import CustomPageNumberPagination

class BookListView(generics.ListCreateAPIView):
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