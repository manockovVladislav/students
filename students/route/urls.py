
from django.urls import path
from .views import *

urlpatterns = [
    path('', route),
    path('create/', create),
    path('list/', getList),
]