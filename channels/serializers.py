from rest_framework import serializers

from channels.models import Channel, Message


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ('id', 'name')


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Message
        fields = ('id', 'content', 'channel', 'username')
