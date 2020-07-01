from django.urls import path
from coveree_Contract import views

urlpatterns = [
    path('', views.contract),
   
]