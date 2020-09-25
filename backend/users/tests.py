from django.test import TestCase

from .models import CustomUser

class TestCustomUserBasicFunctionality(TestCase): # Django.test.TestCase is the parent--not unittest TestCase.
                                                    # The latter would cause problems with the test needing to interact with DB.
    """Basic tests for CustomUser to confirm not obviously broken."""

    def setUp(self):
        self.testpass = "testpass123" # universal test password

    def test_pk(self):
        """Is the first user's pk an integer?"""
        first_user = CustomUser.objects.create_user(
            username="mockuser1",
            password="testpass123"
        )
        #print(f"Pk of the first mock user was {first_user.pk}")
        self.assertIsInstance(first_user.pk, int)

    def test_pk_increments(self):
        """Do additional users have the expected pks? I.e. at this writing,
        should just be sequential integers. Second user created should have
        pk=2."""
        second_user = CustomUser.objects.create_user(
            username="mockuser2",
            password="testpass123"
        )
        #self.assertEqual(self.initial_pk, second_user.pk + 1)
        self.assertIsInstance(second_user.pk, int)
        for i in range(second_user.pk + 1, second_user.pk + 9):
            #print(f"i is {i}")
            mock_user = CustomUser.objects.create_user(
                username=f"mockuser{i}",
                password=self.testpass
            )
            #print(f"mock_user pk is {mock_user.pk}")
            self.assertEqual(i, mock_user.pk)
            self.assertIsInstance(mock_user.pk, int)

    # TODO clean up debug prints once confirmed works for Travis environment

# Create your tests here.
