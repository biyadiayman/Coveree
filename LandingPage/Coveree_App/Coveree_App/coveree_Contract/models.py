from django.db import models

class Client(models.Model):
    IdClient=models.AutoField(primary_key=True)
    Prenom=models.CharField(max_length=40)
    Nom=models.CharField(max_length=40)
    Genre=models.CharField(max_length=1)
    DateNaissance=models.DateField()
    Adress=models.CharField(max_length=200)
    Account=models.ForeignKey(
        'UserAccount',on_delete=models.CASCADE
    )
    Conduit=models.ForeignKey(
        'Conduite',on_delete=models.CASCADE
    )
    Vehicul=models.ForeignKey(
        'Vehicule',on_delete=models.CASCADE
    )
    def __str__(self):
        return self.Nom +' '+Prenom
        
class UserAccount(models.Model):
    Login=models.CharField(unique=True,editable=True,max_length=40)
    Password=models.CharField(max_length=40)

class Conduite(models.Model):
    StatutMarital=models.CharField(max_length=100)
    AnneePermis=models.IntegerField()
    Suspended=models.BooleanField()
    Education=models.CharField(max_length=40)
    EsProprietaire=models.BooleanField()
    Assured=models.BooleanField()
    Profession=models.CharField(max_length=40)
    AnyAccident=models.BooleanField()
    PvInfraction=models.BooleanField()
    

class Vehicule(models.Model):
    ImmatriculationBool=models.BooleanField()
    Immatriculation=models.CharField(max_length=40)
    Antivol=models.CharField(max_length=40)
    VTC=models.BooleanField()
    