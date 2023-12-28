from django.contrib.auth import get_user_model
from django.test import TestCase

# Create your tests here.
class UserAccountsManagerTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email="normal@user.com", user_role="resident", password="foo")
        self.assertEqual(user.email, "normal@user.com")
        self.assertEqual(user.user_role, "resident")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_admin)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="", user_role="resident", password="foo")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="normal@user.com", user_role="", password="foo")
        with self.assertRaises(TypeError):
            User.objects.create_user(password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(email="super@user.com", user_role="admin", password="foo")
        self.assertEqual(admin_user.email, "super@user.com")
        self.assertEqual(admin_user.user_role, "admin")
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_admin)
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_superuser)

        with self.assertRaises(ValueError):
            User.objects.create_superuser(email="super@user.com", user_role="admin", password="foo", is_superuser=False)