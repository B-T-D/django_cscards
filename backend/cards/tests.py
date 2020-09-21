from django.test import TestCase # this is some Django-tailored subclass of unittest.TestCase (?)

from .models import Card

class CardModelTests(TestCase):

    def setUp(self):
        pass

        # self.user = get_user_model().objects.create_user(
        #     username="mockuser",
        #     password="testpass123"
        # )

    def test_that_testing_works(self):
        self.assertEqual(2 + 2, 4)

