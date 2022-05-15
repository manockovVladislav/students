
from datetime import date, datetime
from time import time
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.core.serializers import serialize
from .models import Students
import json
import random
import string
# Create your views here.


def route(request):
    return render(request, 'routeTemplates/route.html')



def create(request):

    success = 'error'
    if request.POST:
        success = 'success'
        data = request.POST.dict()
        firs_name = data.get('firstName')
        last_name = data.get('lastName')
        group = data.get('group')
        dateCreate = str(datetime.now())

        data_text = firs_name + ','+ last_name + ','+ group + "," + dateCreate+ ';\n' 
        with open("test.json", "a") as file:
            file.write(data_text)

    response_object = {
        'status': success
    }
    return HttpResponse(json.dumps(response_object), content_type="application/json")


def getList(request):
    
    arr_global = []

    with open("test.json", "r") as file:
        for line in file:
            firs_name = line.split(',')[0]
            last_name = line.split(',')[1]
            group = line.split(',')[2]
            date_create = line.split(',')[3]

            one_object = {
                'firs_name': firs_name,
                'last_name': last_name,
                'groupe': group,
                'date_create': date_create
            }
            arr_global.append(one_object)
  
 
    return HttpResponse(json.dumps(arr_global), content_type="application/json")


