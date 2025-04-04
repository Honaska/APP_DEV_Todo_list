"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from myapp.views import post_list, post_delete,post_detail,post_edit

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', post_list, name='post_list'),
    path('api/posts/<int:pk>/', post_detail, name='post_detail'), 
    path('api/posts/<int:pk>/edit/', post_edit, name='post_edit'),  
    path('api/posts/<int:pk>/delete/', post_delete, name='post_delete'),
]
