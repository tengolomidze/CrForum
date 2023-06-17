from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Post(models.Model):
    def validate_image(fieldfile_obj):
        filesize = fieldfile_obj.size
        megabyte_limit = 5
        if filesize > megabyte_limit*1024*1024:
            raise ValidationError("Very big file : (")
        return fieldfile_obj
        

    title = models.CharField(max_length=300)
    description = models.TextField(max_length=1024, blank=True)
    img = models.ImageField(upload_to='images', blank=True, null=True, validators=[validate_image])
    userID = models.IntegerField() 

    uploadTime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    
        

class Comment(models.Model):
    postID = models.IntegerField()
    userID = models.IntegerField()
    text = models.TextField(max_length=516, blank=False, null=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class Vote(models.Model):
    postID = models.IntegerField()
    userID = models.IntegerField()
    upVote = models.BooleanField(default=True)

    def __str__(self):
        return str(self.postID)


