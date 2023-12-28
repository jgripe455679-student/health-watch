from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserAccountCreationForm, UserAccountChangeForm
from .models import UserAccount

# Register your models here.
class UserAccountAdmin(UserAdmin):
    add_form = UserAccountCreationForm
    form = UserAccountChangeForm
    model = UserAccount

    list_display = ("email", "user_role", "is_staff", "is_admin", "is_active",)
    list_filter = ("email", "user_role", "is_staff", "is_admin", "is_active",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("user_role", "is_staff", "is_admin", "is_active", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "user_role", "password1", "password2", "is_staff", "is_admin", "is_active", "user_permissions"
            )
        }),
    )

    search_fields = ("email",)
    ordering = ("email",)

admin.site.register(UserAccount, UserAccountAdmin)