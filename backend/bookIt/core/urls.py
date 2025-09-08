from django.urls import path
from . import views
from .views import *

urlpatterns = [
    # test route
    path("hello/", views.HelloView.as_view(), name="hello"),
    # Profile route
    path("auth/me/", MeView.as_view(), name="me"),
    # Book routes
    path("books/", BookListCreateView.as_view(), name="book-list"),
    path("books/my", MyBookListView.as_view(), name="my-book-list"),
    
    path("books/<int:pk>/", BookDetailView.as_view(), name="book-detail"), 
    # Trending and Recommended
    path("books/trending/", TrendingBooksView.as_view(), name="trending-books"),
    path("books/recommended/", RecommendedBooksView.as_view(), name="recommended-books"),
    path("books/selling-rapidly/", SellingRapidlyBooksView.as_view(), name="selling-rapidly"),
    path("books/<int:book_id>/ownership/", BookOwnershipView.as_view(), name="book-ownership"),
    # Orders
    path("orders/", PurchaseBookView.as_view(), name="purchase-book"),
]
