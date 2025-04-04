

from django.shortcuts import render, get_object_or_404, redirect
from .models import Post 

def post_list(request):
    posts = Post.objects.all()

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)

def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)

def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        post.delete()
        return redirect('post_list') 