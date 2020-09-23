from django.test import TestCase

from .models import CustomUser

class TestCustomUserBasicFunctionality(TestCase):
    """Basic tests for CustomUser to confirm not obviously broken."""

    def setUp(self):
        self.testpass = "testpass123" # universal test password
        self.user = CustomUser.objects.create_user(
            username="mockuser1",
            password="testpass123"
        )

    def test_pk(self):
        """Is the first user's pk ("id") the integer 1?"""
        self.assertEqual(1, self.user.pk)
        self.assertIsInstance(self.user.pk, int)

    def test_pk_increments(self):
        """Do additional users have the expected pks? I.e. at this writing,
        should just be sequential integers. Second user created should have
        pk=2."""
        second_user = CustomUser.objects.create_user(
            username="mockuser2",
            password="testpass123"
        )
        self.assertEqual(2, second_user.pk)
        self.assertIsInstance(second_user.pk, int)
        for i in range(3, 11):
            mock_user = CustomUser.objects.create_user(
                username=f"mockuser{i}",
                password=self.testpass
            )
            self.assertEqual(i, mock_user.pk)
            self.assertIsInstance(mock_user.pk, int)

# Create your tests here.
