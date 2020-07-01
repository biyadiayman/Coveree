from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
# Create your views here.
def contract(request):
    return render(request,'contract.html')