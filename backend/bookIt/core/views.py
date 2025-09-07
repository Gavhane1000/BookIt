import base64
from django.core.files.base import ContentFile
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from django.utils.timezone import now, timedelta

from .models import Book, UserAction, Order
from .serializers import BookSerializer, BookOwnershipSerializer, OrderSerializer


# Test API
class HelloView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Hello, {request.user.username}!"})


# Profile API
class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        })


# List all books OR create new one
class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        cover_image = self.request.FILES.get("cover_image")
        serializer.save(cover_image=cover_image)


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_permissions(self):
        if self.request.method in ["PUT", "DELETE"]:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def update(self, request, *args, **kwargs):
        print(request)
        instance = self.get_object()
        partial = kwargs.pop("partial", False)

        cover_image = request.FILES.get("cover_image")
        if cover_image:
            instance.cover_image = cover_image
            instance.save()

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)



# 🔥 1. Trending Books
class TrendingBooksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        books = (
            Book.objects.annotate(interactions=Count("useraction"))
            .order_by("-interactions")[:4]
        )
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


# 🔥 2. Recommended Books (for logged-in user)
class RecommendedBooksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        user_genres = (
            UserAction.objects.filter(user=user)
            .values_list("book__genres", flat=True)
            .distinct()
        )

        purchased_books = Order.objects.filter(user=user).values_list("book_id", flat=True)

        books = (
            Book.objects.filter(genres__in=user_genres)
            .exclude(id__in=purchased_books)
            .annotate(popularity=Count("useraction"))
            .order_by("-popularity")[:4]
        )

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


# 🔥 3. Selling Rapidly
class SellingRapidlyBooksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        last_30_days = now() - timedelta(days=30)

        books = (
            Book.objects.filter(order__created_on__gte=last_30_days)
            .annotate(sales=Count("order"))
            .order_by("-sales")[:4]
        )

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

class BookOwnershipView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, book_id):
        try:
            book = Book.objects.get(id=book_id)
            owns_book = Order.objects.filter(user=request.user, book=book).exists()

            serializer = BookOwnershipSerializer({"owns_book": owns_book})
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Book.DoesNotExist:
            return Response(
                {"error": "Book not found"},
                status=status.HTTP_404_NOT_FOUND
            )
            
class PurchaseBookView(APIView):
    print("hahah", APIView)
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print(request)
        user = request.user
        book_id = request.data.get("book")

        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

        # Prevent duplicate purchase
        if Order.objects.filter(user=user, book=book).exists():
            return Response({"error": "Book already purchased"}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=user, book=book)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)