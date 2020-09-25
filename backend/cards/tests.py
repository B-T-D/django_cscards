from django.test import TestCase # this is some Django-tailored subclass of unittest.TestCase (?)
from django.contrib.auth import get_user_model

import random
from datetime import datetime

import django



from .models import Card

class CardModelTests(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="mockuser",
            password="testpass123"
        )
        self.categories = [1, 2] # Eligible values for a Card's "type"
                                # (i.e. subject-matter category) field

    def test_that_testing_works(self):
        self.assertEqual(2 + 2, 4)

    def test_instantiate_card(self):
        """Can a Card object be instantiated?"""
        testcard = Card()
        self.assertIsInstance(testcard, Card)

    def test_must_create_with_user(self):
        """Does the database raise an error if caller tries to create a card
        with no "user" ForeignKey field?"""
        with self.assertRaises(django.db.utils.IntegrityError):
            Card.objects.create(
                type=1,
                front="front text",
                back="back text",
            )

    def test_date_added_auto_now_add(self):
        """Does a new card instance initialize with a date_added value equal to
        the time of creation?"""
        start = django.utils.timezone.now()
        new_card = Card.objects.create(
            user=self.user,
            type=1,
            front="front text",
            back="back text"
        )
        end = django.utils.timezone.now()
        self.assertTrue(start <= new_card.date_added <= end)



