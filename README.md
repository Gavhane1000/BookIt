# BookIt 📚

BookIt is a full-stack web application for discovering, buying, and managing books. It features a React frontend and a Django backend with JWT authentication, book management, and purchase functionality.

## Features

- User authentication (JWT)
- Browse trending, recommended, and fast-selling books
- Book details, purchase, and ownership tracking
- Admin book editing and management
- Responsive UI with Tailwind CSS

## Project Structure
BookIt/ 
├── backend/ 
|   └── bookIt/ 
|       ├── core/ # Django app: models, views, serializers, urls 
|       ├── bookIt/ # Django project: settings, wsgi, asgi
|       ├── manage.py 
|       └── media/ # Book cover images 
├── frontend/ │ 
|   └── bookIt/ 
|       ├── src/ # React source code 
|       ├── public/ 
|       ├── package.json 
|       ├── vite.config.js 
|       └── index.html 
└── DB.xlsx # (Optional) Database file

## Getting Started

### Backend (Django)

1. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
2. **Configure PostgreSQL:** 
    backend/bookIt/bookIt/settings.py.
3. **Run migrations:**
    python manage.py migrate
4. **Start the server:**
    python manage.py runserver

### Frontend (React)

1. **Install dependencies:**
    npm install
2. **Start the development server:**
    npm run dev

## Usage
    Login with your credentials.
    Browse books, view details, and purchase.
    Admins can edit book details and upload cover images.
## Tech Stack
    Frontend: React, Vite, Tailwind CSS
    Backend: Django, Django REST Framework, JWT
    Database: PostgreSQL