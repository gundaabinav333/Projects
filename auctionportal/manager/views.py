from django.shortcuts import render,redirect

# Create your views here.
from django.http import HttpResponse
from .models import createAuction,addVehicle,feedback




# Create your views here.
def Auctionlist(request):
    varone=createAuction.objects.all()
    return render(request,'Manager/Auctionlist.html',{'vartwo':varone})

def vehiclelist(request):
    varone=addVehicle.objects.all()
    return render(request,'Manager/Vehiclelist.html',{'vartwo':varone})


def History(request):
    return render(request,'Manager/History.html')
def logout(request):
    return render(request,'Managerlogout.html')
def Notification(request):
    return render(request,'Manager/Notification.html')
def Profile(request):
    return render(request,'Manager/Profile.html')
def Vehiclelist(request):
    return render(request,'Manager/Vehiclelist.html')
def manager(request):
    return render(request,'Manager/manager.html')

def submit_feedback(request):
    if request.method == 'POST':
        fname = request.POST.get('fname')
        femail = request.POST.get('femail')
        ffeedback = request.POST.get('ffeedback')

        # Create a new feedback instance and save it to the database
        feedback_entry = feedback.objects.create(name=fname, email=femail, userFeedback=ffeedback)
        return render(request,'Manager/feedback.html',{'result': "Feedback Submitted Successfully"})

  # Redirect to a success page or another appropriate URL
    else:
        return render(request, 'Manager/feedback.html')
    


def feedbacklist(request):
    varone=feedback.objects.all()
    return render(request,'feedbacklist.html',{'vartwo':varone})







