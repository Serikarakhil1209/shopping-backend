This project supports:
✅ User Authentication (Signup/Login)
✅ Role-based Authorization (User/Admin)
✅ Product Management (CRUD by Admin)
✅ Cart Management (Users can add/remove items)
✅ Order Management (Place/Cancel/View orders)
✅ Secure APIs with JWT

Shopping API
Auth

POST /auth/signup → Register new user

POST /auth/login → Login user

Products (Public)

GET / → Get all products

GET /Product/:id → Get single product

Admin (Products)

POST /admin/post/product → Add product

PUT /admin/put/product/:id → Update product

DELETE /admin/delete/product/:id → Delete product

User Cart

POST /user/cart/add → Add product to cart

GET /user/cart/getProducts → Get cart items

DELETE /user/cart/remove/:id → Remove product from cart

Orders
User

POST /order/user/post → Place order

GET /order/user/get → Get my orders

DELETE /order/user/delete → Cancel my order

Admin

GET /order/admin/all → Get all orders

PUT /order/admin/update/:id → Update order status

