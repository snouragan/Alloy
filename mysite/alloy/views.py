from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt

sine_list = []

class Sine:
    number_of_components = 0
    def __init__(self, id):
        Sine.number_of_components = Sine.number_of_components + 1
        self.name = id

    def get_name(self):
        return self.name

# Create your views here.
def index(request):
    template = loader.get_template('index.html')

    context = {}

    return HttpResponse(template.render(context, request))

@csrf_exempt
def create_component(request):
    
    id = request.POST['id']
    sine_list.append(Sine(id))

    for sine in sine_list:
        print(sine.get_name())

    return HttpResponse('')

@csrf_exempt
def get_number_of_components(request):
    return HttpResponse(Sine.number_of_components)

