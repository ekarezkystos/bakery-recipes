#🍞 Bakery Recipes App
A full‑stack web application for managing and browsing bakery recipes. Built with PHP (XAMPP) for backend and React + TailwindCSS (Vite) for frontend.


#📂 Project Structure
backend/ → PHP backend (API, database, seed data)

frontend/ → React frontend (UI, image upload/preview, CRUD)

recipes.sql → Database seed file with bakery recipes


#🍰 Features
Recipe CRUD: Add, edit, delete, and view bakery recipes

Image Upload & Preview: Upload recipe images with instant preview

Database Seed: Preloaded with realistic bakery recipes (recipes.sql) untuk testing

Responsive UI: TailwindCSS dengan bakery‑themed color palette


#📦 Seed Data
File recipes.sql sudah berisi beberapa resep bakery (roti, cake, pastry). Reviewer bisa langsung mencoba tanpa input manual.

#🚀 Getting Started

Kloningkan Repo ke C:\xampp\htdocs\
git clone https://github.com/ekarezkystos/recipe-baking.git
cd C:\xampp\htdocs\bakery-recipes>

Setup

Pastikan XAMPP sudah terinstall.

Jalankan Apache & MySql dari XAMPP Control Panel

Import Database:
  Buka PHPMyAdmin
  Buat Database baru : bakery_db
  Import File : backend/recipes.sql

Pada Command Prompt masuk ke directory C:\xampp\htdocs\bakery-recipes\frontend
C:\xampp\htdocs\bakery-recipes\frontend> npm install
C:\xampp\htdocs\bakery-recipes\frontend> npm run dev

Web akan jalan di http://localhost:5173/
