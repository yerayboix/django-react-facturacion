from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework.decorators import action
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
        order_type_map = {
            'Pedido': 'P',
            'Factura': 'F',
            'Web': 'W',
        }
        if query:
            print(order_type_map.get(query))
            queryset = queryset.filter(Q(order_number__icontains=query) | Q(payment_method__icontains=query) | Q(invoice__client_name__icontains=query) | Q(payment_date__icontains=query) | Q(order_type__in=[order_type_map.get(query)] if order_type_map.get(query) else []))
        return queryset

class OrderTotalPagesView(APIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = CustomPageNumberPagination

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        rows = int(request.query_params.get('rows', 10))
        order_type_map = {
            'Pedido': 'P',
            'Factura': 'F',
            'Web': 'W',
        }
        if query:
            print(order_type_map.get(query))
            queryset = Order.objects.filter(Q(order_number__icontains=query) | Q(payment_method__icontains=query) | Q(invoice__client_name__icontains=query) | Q(payment_date__icontains=query) | Q(order_type__in=[order_type_map.get(query)] if order_type_map.get(query) else []))
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
    
class InvoiceListView(generics.ListAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('query', None)
        if query:
            queryset = queryset.filter(Q(title__icontains=query) | Q(author__icontains=query))
        return queryset
    
class InvoiceTotalPagesView(APIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    pagination_class = CustomPageNumberPagination

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        rows = int(request.query_params.get('rows', 10))
        if query:
            queryset = Invoice.objects.filter(Q(title__icontains=query) | Q(author__icontains=query))
        else:
            queryset = Invoice.objects.all()

        total_count = queryset.count()
        total_pages = int(total_count / rows)
        
        return Response({
            'total_pages': total_pages,
            'count': total_count
            
        }, status=status.HTTP_200_OK)

class InvoiceCreateView(generics.CreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

'''
INVOICE LINES
'''
class InvoiceLineListView(generics.ListAPIView):
    queryset = InvoiceLine.objects.all()
    serializer_class = InvoiceLineSerializer
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('query', None)
        if query:
            queryset = queryset.filter(Q(title__icontains=query) | Q(author__icontains=query))
        return queryset
    
    @action(detail=False, methods=['get'], url_path='by-invoice')
    def get_invoice_lines(self, request):
        invoice_id = request.query_params.get('invoice_id')
        if not invoice_id:
            return Response({"error": "invoice_id parameter is required"}, status=400)
        
        invoice_lines = InvoiceLine.objects.filter(invoice__id=invoice_id)
        page = self.paginate_queryset(invoice_lines)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(invoice_lines, many=True)
        return Response(serializer.data)
    
class InvoiceLineViewSet(viewsets.ModelViewSet):
    queryset = InvoiceLine.objects.all()
    serializer_class = InvoiceLineSerializer
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('query', None)
        if query:
            queryset = queryset.filter(Q(title__icontains=query) | Q(author__icontains=query))
        return queryset
    
    @action(detail=False, methods=['get'], url_path='by-invoice')
    def get_invoice_lines(self, request):
        invoice_id = request.query_params.get('invoice_id')
        if not invoice_id:
            return Response({"error": "invoice_id parameter is required"}, status=400)
        
        invoice_lines = InvoiceLine.objects.filter(invoice__id=invoice_id)
        page = self.paginate_queryset(invoice_lines)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(invoice_lines, many=True)
        return Response(serializer.data)

class InvoiceLineTotalPagesView(APIView):
    queryset = InvoiceLine.objects.all()
    serializer_class = InvoiceLineSerializer
    pagination_class = CustomPageNumberPagination

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        rows = int(request.query_params.get('rows', 10))
        if query:
            queryset = InvoiceLine.objects.filter(Q(title__icontains=query) | Q(author__icontains=query))
        else:
            queryset = InvoiceLine.objects.all()

        total_count = queryset.count()
        total_pages = int(total_count / rows)
        
        return Response({
            'total_pages': total_pages,
            'count': total_count
            
        }, status=status.HTTP_200_OK)

class InvoiceLineCreateView(generics.CreateAPIView):
    queryset = InvoiceLine.objects.all()
    serializer_class = InvoiceLineSerializer

class InvoiceLineRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InvoiceLine.objects.all()
    serializer_class = InvoiceLineSerializer