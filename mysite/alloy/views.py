from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt

import numpy as np
import scipy as sp
import plotly.graph_objs as go
from plotly.offline import plot
# import matplotlib.pyplot as plt

# Create your views here.
def index(request):
    template = loader.get_template('index.html')

    context = {}

    return HttpResponse(template.render(context, request))

@csrf_exempt
def get_time_domain(request):

    return HttpResponse('') 