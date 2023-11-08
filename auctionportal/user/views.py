from django.shortcuts import render
from django.http import HttpResponse
from manager.models import createAuction

# Create your views here.

def customerlist(request):
    return render(request,'user/customerlist.html')

def history(request):
    return render(request,'user/history.html')
def logout(request):
    return render(request,'user/logout.html')
def Notification(request):
    return render(request,'user/Notification.html')
def Profile(request):
    return render(request,'user/Profile.html')
def Rating(request):
    return render(request,'userRating.html')
def user(request):
    return render(request,'user/user.html')
def Vehiclelist(request):
    return render(request,'user/Vehiclelist.html')

def Auctionlist(request):
    varone=Auctionlist.objects.all()
    return render(request,"user/Auctionlist.html",{'vartwo':varone})
# def addVehicle(request):
#     varone=addVehicle.objects.all()
#     return render(request,"user/Vehiclelist.html",{'vartwo':varone})
