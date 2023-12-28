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