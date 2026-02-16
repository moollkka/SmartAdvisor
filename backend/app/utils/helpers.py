import re
import pandas as pd
from datetime import datetime

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    if len(password) < 8:
        return "Le mot de passe doit contenir au moins 8 caractères"
    if not re.search(r'[A-Z]', password):
        return "Le mot de passe doit contenir au moins une majuscule"
    if not re.search(r'[a-z]', password):
        return "Le mot de passe doit contenir au moins une minuscule"
    if not re.search(r'[0-9]', password):
        return "Le mot de passe doit contenir au moins un chiffre"
    return None

def format_date(date_obj):
    if isinstance(date_obj, str):
        date_obj = datetime.fromisoformat(date_obj.replace('Z', '+00:00'))
    return date_obj.strftime('%Y-%m-%d %H:%M:%S')