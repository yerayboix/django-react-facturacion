from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import *

router = routers.DefaultRouter()
router.register(r'books', BookView, 'books') 

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title='Books API'))
]
