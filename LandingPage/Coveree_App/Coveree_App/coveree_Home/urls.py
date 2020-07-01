
from coveree_Home import views
from django.contrib import admin
from django.urls import include,path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index),
     path('contract.html',include('coveree_Contract.urls'))
   
]