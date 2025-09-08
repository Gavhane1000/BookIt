from rest_framework import serializers
from .models import Book, BookGenre, Order

class BookGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookGenre
        fields = ["id", "genre"]

class BookSerializer(serializers.ModelSerializer):
    genres = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="genre"
    )

    class Meta:
        model = Book
        fields = [
            "id", "title", "author", "description", "price",
            "created_on", "stored_at", "cover_image_url", "pdf_file","genres",
        ]
        
class BookOwnedSerializer(serializers.ModelSerializer):
    owns = serializers.BooleanField(read_only=True)

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'description', 'price',
            'created_on', 'stored_at', 'cover_image_url', 'genres', 'owns'
        ]
        
class BookOwnershipSerializer(serializers.Serializer):
    owns_book = serializers.BooleanField()
    
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'book', 'created_on']