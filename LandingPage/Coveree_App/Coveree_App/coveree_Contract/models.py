from django.db import models

# Create your models here.
class Client(models.Model):
    Prenom=models.CharField()
    Nom=models.CharField()
    Genre=models.CharField()
    DateNaissance=models.DateField()
    Adress=models.CharField()
class Conduite(models.Model):
    StatutMarital=models.CharField()
    AnneePermis=models.IntegerField()
    Suspended=models.BooleanField()
    Education=models.CharField()
    Proprietaire=models.BooleanField()
    Assured=models.BooleanField()
    Profession=models.CharField()
    AnyAccident=models.BooleanField()
    PvInfraction=models.BooleanField()
class Vehicule(models.Model):
    Fabrication=models.IntegerField()
    Marque=models.CharField()
    StyleCaroosserie=models.CharField()
    StatutPossetion=models.CharField()
    Antivol=models.CharField()
    VTC=models.BooleanField()