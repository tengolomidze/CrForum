from django.urls import path

from . import views

urlpatterns = [
    path("posts/", views.getPosts),
    path("posts/<int:ID>", views.getPost),
    path("posts/search", views.searchPosts),
    path("comments/add", views.addComment),
    path("comments/<int:ID>", views.getComments),
    path("posts/create", views.createPost),
    path("votes/add", views.addVote),
    path("votes/see", views.seeVote),
    path("votes/<int:ID>", views.getVotes),
    path("user/<int:ID>", views.getUser)
]
