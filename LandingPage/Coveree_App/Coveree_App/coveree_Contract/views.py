from django.shortcuts import render
from django.db import models
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse

# Create your views here.
def contract(request):
    return render(request,'contract.html')

def formVehicule(request):
    value=request.POST['imm']
    num=request.POST('iVimm')
    vtc=request.POST('vtc')
    anti=request.POST('iValrm')
    details=Vehicule( ImmatriculationBool=value,Immatriculation=num,Antivol=anti,VTC=vtc)
    details.save()
    return render(request,'contract.html')