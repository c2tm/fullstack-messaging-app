from django.urls import include, path

app_name = 'api'

urlpatterns = [
    path('channels/', include('channels.urls', namespace="channels"))
]
