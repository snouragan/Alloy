from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt

import numpy as np
import scipy as sp
import plotly.graph_objs as go
from plotly.offline import plot
# import matplotlib.pyplot as plt

sine_list = []
Fs = 44100
T = 1 / Fs
step = 0.1
N = Fs*step
period = np.arange(N)*T

class Sine:
    number_of_components = 0
    def __init__(self, id):
        Sine.number_of_components = Sine.number_of_components + 1
        self._name = id
        self._in = 0;
        self._freq = 1000
        self._pulse = 2*np.pi*self._freq

        self._out = self.generate_sine_wave()
        self.time_domain = self.generate_time_domain()

    def get_name(self):
        return self._name
    
    def generate_sine_wave(self):
        sineWave = np.sin(self._pulse*period)
        return sineWave
    
    def generate_time_domain(self):
        time_domain = go.Scatter(x=period, y=self._out, mode='lines', name='sine')
        return time_domain
    
    def __del__(self):
        Sine.number_of_components = Sine.number_of_components - 1

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

@csrf_exempt
def get_time_domain(request):
    # sine = next((x for x in sine_list if x.get_name == id), None)
    sine = sine_list[0]
    fig = go.Figure(data=sine)
    fig_html = plot(fig, output_type='div')
    return HttpResponse(fig_html) 