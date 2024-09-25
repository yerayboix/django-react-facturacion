from rest_framework.pagination import PageNumberPagination

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10  # Tamaño de página por defecto
    page_size_query_param = 'rows'  # Nombre del parámetro en la URL
    max_page_size = 100  # Número máximo de elementos permitidos por página
