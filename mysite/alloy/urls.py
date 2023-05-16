from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # path('create_component', views.create_component, name='create_component'),
    # path('get_number_of_components', views.get_number_of_components, name='get_number_of_components'),
    # path('get_time_domain', views.get_time_domain, name='get_time_domain'),
]
