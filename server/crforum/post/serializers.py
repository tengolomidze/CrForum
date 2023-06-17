from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Post, Vote, Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'description',
            'img',
            'userID',
            'uploadTime',
        ]
    



class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = [
            'id',
            'postID',
            'userID',
            'upVote',
        ]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id',
            'postID',
            'userID',
            "text",
            "created_at"
        ]