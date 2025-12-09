[README.md](https://github.com/user-attachments/files/24062318/README.md)
# Restaurant Search API (Node.js + MySQL)

Live Swagger URL: https://convertcart-assign-1.onrender.com/docs/

This backend API lets you search restaurants by **dish name** and **price range**, and returns the **top 10 restaurants** ranked by **number of orders** for that dish.

---

## Tech Stack
- Node.js + Express
- MySQL
- mysql2 (promise)
- Swagger: swagger-jsdoc + swagger-ui-express

---

## Features
- Dish search by name (partial match supported)
- Price filter (`minPrice` to `maxPrice`)
- Top 10 restaurants ordered by `orderCount` (descending)
- Swagger documentation at `/docs`

---

## Project Structure

```
restaurant-search-api/
├─ sql/
│  ├─ schema.sql
│  └─ seed.sql
├─ src/
│  ├─ app.js
│  ├─ db.js
│  ├─ swagger.js
│  ├─ controllers/
│  │  └─ search.controller.js
│  └─ routes/
│     └─ search.routes.js
├─ package.json
└─ .env.example
```

---

## Local Setup

### 1) Install dependencies
```bash
npm install
```

### 2) Create `.env`
Create a file named `.env` in the project root:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=restaurant_search
DB_PORT=3306

# Optional (for hosted DB like Aiven)
DB_SSL_MODE=
```

### 3) Setup MySQL database (Workbench)
Run these SQL files in order:

1. `sql/schema.sql`
2. `sql/seed.sql`

Verify tables + data:
```sql
USE restaurant_search;
SHOW TABLES;

SELECT COUNT(*) FROM restaurants;
SELECT COUNT(*) FROM menu_items;
SELECT COUNT(*) FROM orders;
```

### 4) Start the server
Development (auto reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

Local server:
- http://localhost:3000  
Local Swagger:
- http://localhost:3000/docs  

---

## API Usage

### Endpoint
`GET /search/dishes`

### Required Query Params
- `name` (string)
- `minPrice` (number)
- `maxPrice` (number)

### Example Request
```text
/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

### Example Response
```json
[
  {
    "restaurantName": "Biryani Palace",
    "dishName": "Chicken Biryani",
    "dishPrice": 180,
    "orderCount": 70
  }
]
```

---

## Swagger Documentation
- Live: https://convertcart-assign-1.onrender.com/docs/
- Local: http://localhost:3000/docs

---

## Deployment (Render + Aiven MySQL)

### 1) Aiven (MySQL)
1. Create MySQL service on Aiven
2. Connect using MySQL Workbench (SSL required)
3. Run:
   - `sql/schema.sql`
   - `sql/seed.sql`

### 2) Render (Node.js)
1. Push project to GitHub
2. Create **Render Web Service**
   - Build Command: `npm install`
   - Start Command: `npm start`

### 3) Render Environment Variables
Set these in Render dashboard:

```env
PORT=3000

DB_HOST=<AIVEN_HOST>
DB_PORT=<AIVEN_PORT>
DB_USER=<AIVEN_USER>
DB_PASSWORD=<AIVEN_PASSWORD>
DB_NAME=restaurant_search

DB_SSL_MODE=REQUIRED
```

**Note (Aiven SSL):** Aiven requires SSL. This project enables SSL in `db.js`. For Render+Aiven, `rejectUnauthorized: false` is used to avoid the “self-signed certificate in certificate chain” error.

---

## Notes / Assumptions
- The schema stores **one ordered item per row** in `orders` using `orders.menu_item_id`.
- This is enough to count “how many times a dish was ordered” and rank restaurants.
- Optional enhancement: support multi-item orders using an `order_items` table.

---

## Author
Rajat Gore
