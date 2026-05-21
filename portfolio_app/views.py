from django.shortcuts import render

def index(request):
    return render(request, 'portfolio_app/index.html')
