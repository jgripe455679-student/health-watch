# from djoser.views import UserViewSet
# from rest_framework.response import Response
# from django.core.exceptions import PermissionDenied

# class ActivateUser(UserViewSet):
#     def get_serializer(self, *args, **kwargs):
#         serializer_class = self.get_serializer_class()
#         kwargs.setdefault("context", self.get_serializer_context())

#         # this line is the only change from the base implementation
#         kwargs["data"] = {"uid": self.kwargs["uid"], "token": self.kwargs["token"]}

#         return serializer_class(*args, **kwargs)
    
#     def activation(self, request, *args, **kwargs):
#         try:
#             super().activation(request, *args, **kwargs)
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except:
#             raise PermissionDenied()

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status

# from .serializers import UserCreateSerializer

# # Create your views here.
# @api_view(["POST"])
# def register(request):
#     serializer = UserCreateSerializer(data=request.data)
#     if serializer.is_valid():
#         user = serializer.save()
#         return Response(status=201)