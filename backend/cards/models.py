from django.db import models
from django.contrib.auth import get_user_model

class Card(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    type = models.PositiveSmallIntegerField(default=1) # Default to 1 = "general" for now.
    front = models.TextField()
    back = models.TextField()
    known = models.BooleanField(default=False)

    # TODO rename "type" to "category".