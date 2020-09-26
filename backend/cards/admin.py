from django.contrib import admin

from .models import Card

class CardAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ("id", "user", "front", "times_right", "times_wrong",
                    "last_reviewed", "last_modified", "date_added")

admin.site.register(Card, CardAdmin)
