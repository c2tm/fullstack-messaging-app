from django.contrib import admin

from channels.models import Channel, Message

# Register your models here.
admin.site.register(Channel)
admin.site.register(Message)
