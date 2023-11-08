from django.urls import path
from . import views
urlpatterns=[
    path('',views.INDEX,name='INDEX'),
    path('Contact/',views.Contact,name='Contact'),
    path('About/',views.About,name='About'),
    path('Manager/',views.Manager,name='Manager'),
    path('User/',views.User1,name='User1'),
    path('Admin/',views.Admin,name='Admin'),
    path('login/',views.login,name='login'),
    path('Registration/',views.Registration,name='Registration'),
    path('Modules/',views.Modules,name='Modules'),
    path('loginUser/',views.loginUser,name='loginUser'),
    path('loginManager/',views.loginManager,name='loginManager'),
    path('customerlist/',views.get_all_users_data,name='customerlist'),







]


