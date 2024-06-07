from django.shortcuts import render
from rest_framework import viewsets
from .serializer import *
from .models import *

# Create your views here.
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()