from django.db import models

# Create your models here.
'''
BOOKS
'''
class Book(models.Model):
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256, default='')
    amount = models.IntegerField(default=0)
    isbn = models.CharField(max_length=256, default='')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['pk']
        verbose_name = "Book"
        verbose_name_plural = "Books"