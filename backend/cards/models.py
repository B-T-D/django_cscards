from django.db import models

class Card(models.Model):
    type = models.PositiveSmallIntegerField(default=1) # Default to 1 = "general" for now.
    front = models.TextField()
    back = models.TextField()
    known = models.BooleanField(default=False)