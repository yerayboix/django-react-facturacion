from django.db import models

# Create your models here.
'''
BOOKS
'''
class Book(models.Model):
    title = models.CharField(max_length=256, unique=True)
    amount = models.IntegerField(default=0)
    price = models.FloatField(default=0.0)
    discount = models.FloatField(default=0.0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['pk']
        verbose_name = "Book"
        verbose_name_plural = "Books"