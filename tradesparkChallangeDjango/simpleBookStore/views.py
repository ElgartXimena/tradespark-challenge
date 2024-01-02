from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Author, Category, Book
from .serializers import AuthorSerializer, CategorySerializer, BookSerializer

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=True, methods=['post'])
    def remove_category(self, request, pk=None):
        book = self.get_object()
        category_name = request.data.get('category_name', None)

        if category_name:
            category = book.categories.get(name=category_name)
            book.categories.remove(category)
            return Response({'message': 'Category removed successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Category name is required'}, status=status.HTTP_400_BAD_REQUEST)

