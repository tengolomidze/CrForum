from rest_framework import serializers
from .models import User
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'password', 'img', 'is_staff']
        extra_kwargs = {
            'email': {'write_only': True},
            'password': {'write_only': True},
            'is_staff': {'read_only': True}
        }

    def create(self, validated_data):
        #password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        #if password is not None:
            #instance.set_password(password)

        instance.save()
        return instance
    
class UserEditSerializer(serializers.ModelSerializer):

    def validate_image(fieldfile_obj):
        filesize = fieldfile_obj.size
        megabyte_limit = 5
        if filesize > megabyte_limit*1024*1024:
            raise ValidationError("Very big file : (")
        return fieldfile_obj

    name = serializers.CharField(max_length=32, required=True)
    img = serializers.ImageField(use_url=True, validators=[validate_image], default="/images/default.png", required=False)

    class Meta:
        model = User
        fields = [ 'name', 'img']