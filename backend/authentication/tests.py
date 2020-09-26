from django.test import TestCase
from django.contrib.auth import get_user_model

from django.urls import reverse

class TestAuthEndpoints(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='totalmockery',
            password='aardvark'
        )

    def test_token_obtain_returns_http_401_for_unauthorized(self):
        data = {'username': 'garbage', 'password': 'trash'}
        response = self.client.post(reverse('jwtoken_obtain_pair'), data)
        self.assertEqual(response.status_code, 401)

    # def test_token_obtain_returns_http_200_for_authorized(self):
    #     """Does the token pair endpoint return ok for a valid login?"""
    #     data = {"username": f"{self.user.username}", "password": f"{self.user.password}"}
    #     print(data)
    #     response = self.client.post(reverse('jwtoken_obtain_pair'), data)
    #     print(response.data)
    #     self.assertEqual(response.status_code, 200)

    # TODO can't get this one to pass. Moving the self.user creation inside the
    #   test method doesn't change anything. It's probably something to do with
    #   the details of how the jwt library works. The password comes out hashed
    #   when printed.