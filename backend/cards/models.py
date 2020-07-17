from django.db import models

class Card(models.Model):
    type = models.PositiveSmallIntegerField()
    front = models.TextField()
    back = models.TextField()
    known = models.BooleanField(default=False)