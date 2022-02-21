from django.urls import path, include
from .views import ChannelListCreateApiView, MessageListCreateApiView, MessageListDetail

app_name = 'channels'

urlpatterns = [
    path('', ChannelListCreateApiView.as_view(), name='channel_list'),
    path('<int:channel>/messages/', MessageListCreateApiView.as_view(),
         name='message_list_create'),
    path('<int:channel>/messages/<int:pk>/',
         MessageListDetail.as_view(), name='message_list_detail')
]
