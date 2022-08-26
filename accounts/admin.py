from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUserModel
from .forms import CustomUserCreationForm, CustomUserChangeForm

class CustomUserAdmin(UserAdmin):
    model: CustomUserModel
    form = CustomUserChangeForm
    add_form: CustomUserCreationForm

admin.site.register(CustomUserModel, CustomUserAdmin)