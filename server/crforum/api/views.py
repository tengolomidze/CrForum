from django.shortcuts import render
from django.http import QueryDict
from rest_framework.decorators  import api_view
from rest_framework.response  import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt

from post.models import Post, Vote, Comment
from user.models import User

from post.serializers import PostSerializer, VoteSerializer, CommentSerializer
from user.serializers import UserSerializer

# Create your views here.
@api_view(["GET"])
def getPosts(request, *args, **kwargs):
    instance = Post.objects.all().order_by('-uploadTime', 'title')
    data = {}
    if instance:
        data = PostSerializer(instance, many=True).data

    return Response(data)

@api_view(["POST"])
def searchPosts(request, *args, **kwargs):
    instance = Post.objects.filter(title__contains=request.data['text']).order_by('-uploadTime', 'title')
    data = []
    if instance:
        data = PostSerializer(instance, many=True).data

    return Response(data)


@api_view(["GET"])
def getPost(request, ID):
    instance = Post.objects.filter(id = ID).first()
    data = {}
    if instance:
        data = PostSerializer(instance, many=False).data

    return Response(data)

@api_view(["GET"])
def getUser(request, ID):
    instance = User.objects.filter(id=ID).first()
    data = {}
    if instance:
        data = UserSerializer(instance, many=False).data

    return Response(data)

@api_view(["GET"])
def getComments(request, ID):
    instance = Comment.objects.filter(postID = ID)
    data = []
    if instance:
        data = CommentSerializer(instance, many=True).data

    return Response(data)

@api_view(["GET"])
def getVotes(request, ID):
    instance = Vote.objects.filter(postID = ID)
    data = {}
    if instance:
        data = VoteSerializer(instance, many=True).data

    n = 0


    for vote in data:
        if vote['upVote']:
            n += 1
        else:
            n -= 1

    data = {
        'votes': n
    }

    return Response(data)

@api_view(["POST"])
def createPost(request, *args, **kwargs):
    token = ""
    if "jwt" in request.data:
        token = request.data['jwt']
    if not token:
        raise AuthenticationFailed('Unauthenticated!')
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except:
        raise AuthenticationFailed('Unauthenticated!')

    

    _mutable = request.data._mutable
    request.data._mutable = True
    request.data["userID"] = payload["id"]
    request.data._mutable = _mutable


    serializer = PostSerializer(data = request.data)

    if(serializer.is_valid()):
        data = serializer.save()
        return Response(serializer.data)
    
    return Response({"errmsg": "not good data : ("})

@api_view(["POST"])
def addComment(request, *args, **kwargs):
    token = ""
    if "jwt" in request.data:
        token = request.data['jwt']
    if not token:
        raise AuthenticationFailed('Unauthenticated!')
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except:
        raise AuthenticationFailed('Unauthenticated!')
    
    request.data["userID"] = payload["id"]


    serializer = CommentSerializer(data = request.data)

    if(serializer.is_valid()):
        data = serializer.save()
        return Response(serializer.data)
    
    return Response({"errmsg": "not good data : ("})

@api_view(["POST"])
def addVote(request, *args, **kwargs):
    token = ""
    if "jwt" in request.data:
        token = request.data['jwt']
    if not token:
        raise AuthenticationFailed('Unauthenticated!')
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except:
        raise AuthenticationFailed('Unauthenticated!')
    


    request.data["userID"] = payload["id"]
    request.data["upVote"] =  request.data["voted"] == 1
    vote = Vote.objects.filter(userID=request.data["userID"], postID=request.data["postID"]).first()

    if(request.data["voted"] == 0):
        if vote:
            data = vote.delete()
            return Response({})
        else:
            return Response({})

    serializer = VoteSerializer(data = request.data)
    if(serializer.is_valid()):
        if(not vote):
                data = serializer.save()
                return Response({})
        else:
            vote.upVote = request.data['upVote']
            vote.save()
            return Response({})
    
    return Response({"errmsg": "not good data : ("})

@api_view(["POST"])
def seeVote(request, *args, **kwargs):
    token = ""
    if "jwt" in request.data:
        token = request.data['jwt']
    if not token:
        raise AuthenticationFailed('Unauthenticated!')
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except:
        raise AuthenticationFailed('Unauthenticated!')
    


    request.data["userID"] = payload["id"]
    vote = Vote.objects.filter(userID=request.data["userID"], postID=request.data["postID"]).first()

    if vote:
        if vote.upVote:
            return Response({'vote': 1})
        else:
            return Response({'vote': -1})
    
    return Response({'vote': 0})