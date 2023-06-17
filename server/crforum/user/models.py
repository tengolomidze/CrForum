from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.exceptions import ValidationError

"""
class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError("Users must have email!")
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        

        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, name, password=None):
        if not email:
            raise ValueError("Users must have email!")
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, is_staff=True)
        

        user.set_password(password)
        user.save()
        return user
"""


class User(models.Model):
    email = models.EmailField(max_length=64, unique=True)
    name = models.CharField(max_length=32, blank=False, null=False)
    password = models.CharField(max_length=32)
    is_staff = models.BooleanField(default=False)

    def validate_image(fieldfile_obj):
        filesize = fieldfile_obj.size
        megabyte_limit = 5
        if filesize > megabyte_limit*1024*1024:
            print("Very big file : (")
            raise ValidationError("Very big file : (")
        return fieldfile_obj

    img = models.ImageField(upload_to='images', validators=[validate_image], blank=True, null=True, default="/images/default.png")
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email