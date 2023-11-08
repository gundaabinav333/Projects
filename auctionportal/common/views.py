from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login



# Create your views here.
def INDEX(request):
    return render(request, 'INDEX.html')


def Contact(request):
    return render(request, 'Contact.html')


def About(request):
    return render(request, 'About.html')

def loginUser(request):
    return render(request, 'loginUser.html')

def loginManager(request):
    return render(request, 'loginManager.html')


def Modules(request):
    return render(request, 'Modules.html')


def User1(request):
    return render(request, 'User.html')


def Manager(request):
    return render(request, 'Manager.html')


def Admin(request):
    return render(request, 'Admin.html')

def customerlist(request):
    return render(request, 'customerlist.html')



def Registration(request):
    if request.method == 'POST':
        username = request.POST.get('yourusername')
        firstname = request.POST.get('yourfirstname')
        lastname = request.POST.get('yourlastname')
        password = request.POST.get('yourpassword')
        confirmpassword = request.POST.get('yourconfirmpassword')

        if password == confirmpassword:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username already exists')
            else:
                user = User.objects.create_user(
                    username=username, first_name=firstname, last_name=lastname, password=password)
                user.save()
                messages.success(request, 'User created successfully')
                return  render(request, 'Registration.html', {'result': "Registration Successful"})


        else:
            messages.error(request, 'Passwords do not match')

    return render(request, 'Registration.html')


def login(request):
    if request.method == 'POST':
        email = request.POST.get('loginEmail')
        password = request.POST.get('loginPassword')
        user = authenticate(request, username=email, password=password)

        if user is not None:
            if user.is_staff:
                # Redirect staff members to 'About.html'
                return redirect('loginManager')
            else:
                # Redirect non-staff users to 'About.html'
                return redirect('loginUser')
        else:
            # Handle authentication failure, e.g., show an error message
            return render(request, 'login.html', {'result': "Invalid email or password"})

    return render(request, 'login.html')



def get_all_users_data(request):
        varone = User.objects.all()
        return render(request,'customerlist.html',{'vartwo':varone})
       
            
    
    
    