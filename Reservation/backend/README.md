# MWT-Project-backend

# 1. Execute following commands to install dependencies
pip install django
pip install pymysql
pip install djangorestframework
pip install cryptography
pip install django-cors-headers

python manage.py makemigrations
python manage.py flush
python manage.py migrate

# 2. Run the "init_queries.sql" script in MySQL Command line or MySQL workbench.

# 3. Execute following command to start the application
python manage.py runserver 0.0.0.0:8000