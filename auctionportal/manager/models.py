
from django.db import models




# Create your models here.
class createAuction(models.Model): 
    auction_name = models.CharField(max_length=30)
    auction_status = models.CharField(max_length=15)
    allocated_manager = models.CharField(max_length=15)



class contact(models.Model): 
    name = models.CharField(max_length=30)
    email= models.CharField(max_length=15)
    mobile = models.CharField(max_length=11)


class feedback(models.Model):
    name=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    userFeedback=models.CharField(max_length=500)

class addVehicle(models.Model):
    auction_name=models.CharField(max_length=30)
    vehicle_model=models.CharField(max_length=30)
    vehicle_number=models.CharField(max_length=30)
    minimum_bid_price = models.CharField(max_length=30, default='5000')
   

    manager=models.CharField(max_length=30)
