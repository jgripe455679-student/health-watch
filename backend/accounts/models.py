from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models #type: ignore
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField #type: ignore

# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, user_role, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address.")

        if not user_role:
            raise ValueError("Users must have a user role.")
        
        email = self.normalize_email(email)
        user = self.model(email=email, user_role=user_role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, user_role="admin", password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_admin") is not True:
            raise ValueError(_("Superuser must have is_admin=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, user_role, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    USER_ROLES = (
        ("resident", "Resident"),
        ("healthworker", "Health Worker"),
        ("admin", "Admin")
    )

    email = models.EmailField(_("email address"), unique=True)
    user_role = models.CharField(max_length=100, choices=USER_ROLES)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["user_role",]

    objects = UserAccountManager()

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    
    def save(self, *args, **kwargs):
        if self.user_role == "admin":
            self.is_staff = True
            self.is_admin = True
        elif self.user_role == "healthworker":
            self.is_staff = True
            self.is_admin = False
        else:
            self.is_staff = False
            self.is_admin = False
        
        super().save(*args, **kwargs)


class AddressDetails(models.Model):
    address_line_one = models.CharField(max_length=150, blank=True,)
    address_line_two = models.CharField(max_length=150, blank=True,)
    address_line_three = models.CharField(max_length=150, blank=True,)
    province = models.CharField(max_length=150, blank=True,)
    barangay = models.CharField(max_length=150, blank=True,)
    city = models.CharField(max_length=150, blank=True,)
    zip_code = models.CharField(max_length=5, blank=True,)
    
class UserProfile(models.Model):
    SEX_CHOICES = (
        ("f", "Female",),
        ("m", "Male",),
        ("r", "Rather not say",),
    )
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=150,)
    middle_name = models.CharField(max_length=150,)
    last_name = models.CharField(max_length=150,)
    date_of_birth = models.DateField()
    sex = models.CharField(max_length=1, choices=SEX_CHOICES,)
    relationship_status = models.CharField(max_length=50,)
    phone_number = models.CharField(max_length=50,)
    address_details = models.OneToOneField(AddressDetails, on_delete=models.CASCADE)

    def delete(self, *args, **kwargs):
        self.address_details.delete()
        return super(self.__class__, self).delete(*args, **kwargs)

   