from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProjectList(APIView):
    def get(self, request):
        projects = [
            {'id': 1, 'name': 'Project A', 'status': 'ongoing'},
            {'id': 2, 'name': 'Project B', 'status': 'completed'},
        ]
        return Response(projects, status=status.HTTP_200_OK)
