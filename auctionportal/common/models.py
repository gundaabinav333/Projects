from django.db import models



class contact(models.Model): 
    name = models.CharField(max_length=30)
    email= models.CharField(max_length=15)
    mobile = models.CharField(max_length=11)


