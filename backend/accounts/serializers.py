from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
# from django.contrib.auth.password_validation import validate_password
from .models import AddressDetails, UserProfile

User = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):
    address_line_one = serializers.CharField(write_only=True)
    address_line_two = serializers.CharField(write_only=True)
    address_line_three = serializers.CharField(write_only=True)
    province = serializers.CharField(write_only=True, required=True)
    barangay = serializers.CharField(write_only=True, required=True)
    city = serializers.CharField(write_only=True, required=True)
    zip_code = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(write_only=True, required=True)
    middle_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=True)
    date_of_birth = serializers.DateField(required=True)
    gender = serializers.CharField(write_only=True, required=True)
    relationship_status = serializers.CharField(write_only=True, required=True)
    phone_number = serializers.CharField(write_only=True, required=True)

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "email",
            "user_role",
            "password",
            "first_name",
            "middle_name",
            "last_name",
            "date_of_birth",
            "gender",
            "relationship_status",
            "phone_number"
            "address_line_one",
            "address_line_two",
            "address_line_three",
            "province",
            "barangay",
            "city",
            "zip_code",
        )
    
    # def create(self, validated_data):
    #     try:
    #         with transaction.atomic():
    #             # Create a new user
    #             user = User.objects.create_user(**validated_data)
    #             print(validated_data)
    #             # Create an instance of AddressDetails
    #             address_details = AddressDetails.objects.create(
    #                 address_line_one = validated_data["address_line_one"],
    #                 address_line_two = validated_data["address_line_two"],
    #                 address_line_three = validated_data["address_line_three"],
    #                 province = validated_data["province"],
    #                 barangay = validated_data["barangay"],
    #                 city = validated_data["city"],
    #                 zip_code = validated_data["zipcode"]
    #             )

    #             # Create an instance of UserProfile
    #             UserProfile.objects.create(
    #                 user = user,
    #                 first_name = validated_data["first_name"],
    #                 middle_name = validated_data["middle_name"],
    #                 last_name = validated_data["last_name"],
    #                 date_of_birth = validated_data["date_of_birth"],
    #                 gender = validated_data["gender"],
    #                 relationship_status = validated_data["relationship_status"],
    #                 phone_number = validated_data["phone_number"],
    #                 address_details = address_details
    #             )

    #             # if settings.SEND_ACTIVATION_EMAIL:
    #             #     user.is_active = False
    #             #     user.save(updated_fields=["is_active"])
    #         return user
    #     except IntegrityError:
    #         self.fail("cannot_create_user")
    #     return user
    
    # @transaction.atomic
    # def perform_create(self, validated_data):
    #     address_line_one = validated_data.pop("address_line_one")
    #     address_line_two = validated_data.pop("address_line_two")
    #     address_line_three = validated_data.pop("address_line_three")
    #     province = validated_data.pop("province")
    #     barangay = validated_data.pop("barangay")
    #     city = validated_data.pop("city")
    #     zip_code = validated_data.pop("zip_code")
    #     first_name = validated_data.pop("first_name")
    #     middle_name = validated_data.pop("middle_name")
    #     last_name = validated_data.pop("last_name")
    #     date_of_birth = validated_data.pop("date_of_birth")
    #     gender = validated_data.pop("gender")
    #     relationship_status = validated_data.pop("relationship_status")
    #     phone_number = validated_data.pop("phone_number")

    #     with transaction.atomic():
    #         user = User.objects.create_user(**validated_data)
            
    #         address_details = AddressDetails.objects.create(
    #             address_line_one = address_line_one,
    #             address_line_two = address_line_two,
    #             address_line_three = address_line_three,
    #             province = province,
    #             barangay = barangay,
    #             city = city,
    #             zip_code = zip_code
    #         )

    #         UserProfile.objects.create(
    #             user = user,
    #             first_name = first_name,
    #             middle_name = middle_name,
    #             last_name = last_name,
    #             date_of_birth = date_of_birth,
    #             gender = gender,
    #             relationship_status = relationship_status,
    #             phone_number = phone_number,
    #             address_details = address_details
    #         )

    #         if settings.SEND_ACTIVATION_EMAIL:
    #             user.is_active = False
    #             user.save(updated_field=["is_active"])

    #     return user
    
    # def validate_password(self, value):
    #     user = self.user if self.user else self.Meta.model()

    #     try:
    #         validate_password(value, user)
    #     except serializers.ValidationError as e:
    #         serializer_error = serializers.as_serializer_error(e)
    #         raise serializers.ValidationError(
    #             {"password": serializer_error[api_setting.NON_FIELDS_ERRORS_KEY]}
    #         )

    #     return value