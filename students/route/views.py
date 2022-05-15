
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

        student = Students()
        student.first_name = firs_name
        student.last_name = last_name
        student.groupe = group
        student.save()


    response_object = {
        'status': success
    }
    return HttpResponse(json.dumps(response_object), content_type="application/json")


def getList(request):
    
    students_list = Students.objects.all()
    students_list_model = serialize("json", students_list)
 
    return HttpResponse(json.dumps(students_list_model), content_type="application/json")
