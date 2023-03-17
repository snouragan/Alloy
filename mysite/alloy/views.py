from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def index(request):
    template = loader.get_template('index.html')

    context = {}

    return HttpResponse(template.render(context, request))

@csrf_exempt
def create_component(request):
    return HttpResponse('')

@csrf_exempt
def get_number_of_components(request):
    return HttpResponse('')

