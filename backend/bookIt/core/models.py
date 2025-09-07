from django.db import models
from django.contrib.auth.models import User

class BookGenre(models.Model):
    genre = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.genre


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    genres = models.ManyToManyField(BookGenre, related_name="books")
    created_on = models.DateTimeField(auto_now_add=True)
    stored_at = models.TextField(blank=False, null=False)

    # ✅ Local image storage
    cover_image = models.ImageField(upload_to="books/", null=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def cover_image_url(self):
        if self.cover_image:
            return self.cover_image.url
        return None


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)


class UserAction(models.Model):
    ACTION_CHOICES = [
        ("view", "View"),
        ("like", "Like"),
        ("wishlist", "Wishlist"),
        ("purchase", "Purchase"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    created_on = models.DateTimeField(auto_now_add=True)
