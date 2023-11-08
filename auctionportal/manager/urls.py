from django.urls import path
from . import views
urlpatterns=[
    path('',views.manager,name='manager'),
    path('Auctionlist/',views.Auctionlist,name='Auctionlist'),
    path('feedback/', views.submit_feedback, name='feedback'),  # Update the view function name here

    path('History/',views.History,name='History'),
    path('logout/',views.logout,name='logout'),
    path('Notification/',views.Notification,name='Notification'),
    path('Profile/',views.Profile,name='Profile'),
    path('Vehiclelist/',views.vehiclelist,name='vehiclelist'),
    path('feedbacklist/',views.feedbacklist,name='feedbacklist'),

]
