from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db.models.signals import post_delete

from djoser.signals import user_registered
from .models import AddressDetails, UserProfile

User = get_user_model()

@receiver(user_registered)
def create_address_and_profile(user, request, **kwargs):
    """
    Signal receiver to create AddressDetails and UserProfile instances
    after a User instance is saved.
    """
    if user:
        print("Created!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        # Create AddressDetails instance
        address_details = AddressDetails.objects.create(
            address_line_one = request.data.get("address_line_one", ""),
            address_line_two = request.data.get("address_line_two", ""),
            address_line_three = request.data.get("address_line_three", ""),
            province = request.data.get("province"),
            barangay = request.data.get("barangay"),
            city = request.data.get("city"),
            zip_code = request.data.get("zip_code")
            )

        # Create UserProfile instance
        UserProfile.objects.create(
            user = user,
            first_name = request.data.get("first_name"),
            middle_name = request.data.get("middle_name"),
            last_name = request.data.get("last_name"),
            date_of_birth = request.data.get("date_of_birth"),
            sex = request.data.get("sex"),
            relationship_status = request.data.get("relationship_status"),
            phone_number = request.data.get("phone_number"),
            address_details = address_details
            )

@receiver(post_delete, sender=UserProfile)
def post_delete_address(sender, instance, *args, **kwargs):
    if instance.address_details:
        instance.address_details.delete()