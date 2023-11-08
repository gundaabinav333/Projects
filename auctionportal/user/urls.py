from django.urls import path
from . import views 


urlpatterns=[
    path('',views.user,name='user'),
    path('Auctionlist/',views.Auctionlist,name='Auctionlist'),
    path('history/',views.history,name='history'),
    path('logout/',views.logout,name='logout'),
    path('Notification/',views.Notification,name='Notification'),
    path('Profile/',views.Profile,name='Profile'),
    path('Rating/',views.Rating,name='Rating'),
    path('Vehiclelist/',views.Vehiclelist,name='Vehiclelist')
]