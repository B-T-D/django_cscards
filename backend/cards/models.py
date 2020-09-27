from django.db import models
from django.contrib.auth import get_user_model

from datetime import datetime

class Card(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    type = models.PositiveSmallIntegerField(default=1) # Default to 1 = "general" for now.
    front = models.TextField()
    back = models.TextField()
    known = models.BooleanField(default=False)
    times_right = models.PositiveSmallIntegerField(default=0)
    times_wrong = models.PositiveSmallIntegerField(default=0)

    last_reviewed = models.DateTimeField(blank=True, null=True) # TODO won't last_modified already auto update on a change to times right or times wrong?
    last_modified = models.DateTimeField(auto_now=True)
    date_added = models.DateTimeField(auto_now_add=True, blank=True)

    # TODO add validators that prevent the front end making any change other than += 1.
    # TODO or have a separate endpoint(s) for incrementing right and wrong.

    def increment_times_right(self):
        self.times_right += 1

    def increment_times_wrong(self):
        self.times_wrong += 1


    # TODO rename "type" to "category".

