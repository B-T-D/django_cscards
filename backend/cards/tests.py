from django.test import TestCase # this is some Django-tailored subclass of unittest.TestCase (?)
from django.contrib.auth import get_user_model

from .models import Card

class CardModelTests(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="mockuser",
            password="testpass123"
        )

    def test_that_testing_works(self):
        self.assertEqual(2 + 2, 4)

    def test_instantiate_card(self):
        """Can a Card object be instantiated?"""
        testcard = Card()
        self.assertIsInstance(testcard, Card)

