from django.urls import path
from .views import home_page_view, about_page_view

urlpatterns = [
    path('', home_page_view, name='home_page'),
    path('about/', about_page_view, name='about_page')
]