from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.getBlogs),
    path('post/', views.postBlog),
    path('put/<int:pk>/', views.putBlog),
    path('delete/<int:pk>/', views.deleteBlog),
]
