from django.http import HttpResponse, HttpResponseBadRequest
from django.conf import settings
import os

def image_view(request, image):
    # Ensure the image parameter contains only alphanumeric characters, dots, and underscores
  
    if ".." in image or "/" in image or "\\" in image or " " in image:
        return HttpResponseBadRequest("Invalid image parameter")
    
    # Construct the full path to the image file
    image_path = os.path.join(settings.MEDIA_ROOT, 'images', image)

    # Check if the file exists and is within the allowed directory
    if not os.path.isfile(image_path) or not image_path.startswith(settings.MEDIA_ROOT):
        return HttpResponseBadRequest("Invalid image")

    with open(image_path, 'rb') as f:
        return HttpResponse(f.read(), content_type='image/jpeg')  # Adjust content type as per your image type