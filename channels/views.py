from django.shortcuts import render
from rest_framework import generics

from .models import Channel, Message
from .serializers import ChannelSerializer, MessageSerializer

# Create your views here.


class ChannelListCreateApiView(generics.ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer


class MessageListCreateApiView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        """
        View should return a list of all messages located
        in a speicified channel.
        """
        channel = self.kwargs['channel']
        return Message.objects.filter(channel=channel)

    def perform_create(self, serializer):
        """
        Saves the user information and sets it to user field
        """
        serializer.save(user=self.request.user)


class MessageListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
