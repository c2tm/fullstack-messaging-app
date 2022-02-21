from django.conf import settings
from django.db import models
from rest_framework import serializers

# Create your models here.


class Channel(models.Model):
    name = models.CharField(null=True, max_length=267)

    def __str__(self):
        return self.name


class Message(models.Model):
    content = models.CharField(null=True, max_length=267)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.content[:10]
