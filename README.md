# library_management_system_apis

# API Documentation

This repository contains the API documentation for the authentication and book management system. Below are the available endpoints categorized by their functionality.

## Summary of All APIs

### Authentication APIs
1. **Register User**: [POST /api/v1/auth/register](#1-register-user)
2. **Verify OTP**: [POST /api/v1/auth/verify-otp](#2-verify-otp)
3. **Login User**: [POST /api/v1/auth/login](#3-login-user)
4. **User  Logout**: [GET /api/v1/auth/logout](#4-user-logout)
5. **User  Profile**: [GET /api/v1/auth/profile](#5-user-profile)
6. **Forgot Password**: [POST /api/v1/auth/password/forgot](#6-forgot-password)
7. **Reset Password**: [PUT /api/v1/auth/password/reset/{token}](#7-reset-password)
8. **Update Password**: [PUT /api/v1/auth/password/update](#8-update-password)

### Book APIs
1. **Add Book**: [POST /api/v1/book/admin/add](#1-add-book)
2. **Get All Books**: [GET /api/v1/book/all](#2-get-all-books)
3. **Delete Book**: [DELETE /api/v1/book/admin/{bookId}](#3-delete-book)

### Borrow APIs
1. **Record Borrow Book**: [POST /api/v1/borrow/record-borrow-book/{bookId}](#1-record-borrow-book)
2. **Return Borrowed Book**: [PUT /api/v1/borrow/return-borrowed-book/{bookId}](#2-return-borrowed-book)
3. **Get My Borrowed Books**: [GET /api/v1/borrow/my-borrowed-books/](#3-get-my-borrowed-books)
4. **Get All Borrowed Books (Admin)**: [GET /api/v1/borrow/admin-borrowed-books-by-users](#4-get-all-borrowed-books-admin)

### User APIs
1. **Get All Users**: [GET /api/v1/user/all-users](#1-get-all-users)
2. **Register New Admin**: [POST /api/v1/user/add/new-admin](#2-register-new-admin)

---

## Detailed API Endpoints

### Authentication APIs

#### 1. Register User
- **Endpoint:** `POST /api/v1/auth/register`
- **Purpose:** Register a new user.
- **Request Body:**
    ```json
    {
        "name": "sf",
        "email": "s@gmail.com",
        "password": "12345678"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/auth/register' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "sf",
        "email": "s@gmail.com",
        "password": "12345678"
    }'
    ```

#### 2. Verify OTP
- **Endpoint:** `POST /api/v1/auth/verify-otp`
- **Purpose:** Verify the OTP sent to the user's email.
- **Request Body:**
    ```json
    {
        "email": "s@gmail.com",
        "otp": "96284"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/auth/verify-otp' \
    --header 'Content-Type: application/json' \
    --data '{
        "email": "s@gmail.com",
        "otp": "96284"
    }'
    ```

#### 3. Login User
- **Endpoint:** `POST /api/v1/auth/login`
- **Purpose:** Log in an existing user.
- **Request Body:**
    ```json
    {
        "username": "sf",
        "email": "s@gmail.com",
        "password": "12345678"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/auth/login' \
    --header 'Content-Type: application/json' \
    --data '{
        "username": "sf",
        "email": "s@gmail.com",
        "password": "12345678"
    }'
    ```

#### 4. User Logout
- **Endpoint:** `GET /api/v1/auth/logout`
- **Purpose:** Log out the current user.
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/auth/logout'
    ```

#### 5. User Profile
- **Endpoint:** `GET /api/v1/auth/profile`
- **Purpose:** Retrieve the profile of the logged-in user.
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/auth/profile' \
    --header 'Cookie: token=YOUR_TOKEN_HERE'
    ```

#### 6. Forgot Password
- **Endpoint:** `POST /api/v1/auth/password/forgot`
- **Purpose:** Request a password reset link.
- **Request Body:**
    ```json
    {
        "email": "s@gmail.com"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/auth/password/forgot' \
    --header 'Content-Type: application/json' \
    --data '{
        "email": "s@gmail.com"
    }'
    ```

#### 7. Reset Password
- **Endpoint:** `PUT /api/v1/auth/password/reset/{token}`
- **Purpose:** Reset the user's password using the token received via email.
- **Request Body:**
    ```json
    {
        "password": "asdf1234",
        "confirmPassword": "asdf1234"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location --request PUT 'http://localhost:3333/api/v1/auth/password/reset/YOUR_TOKEN_HERE' \
    --header 'Content-Type: application/json' \
    --data '{
        "password": "asdf1234",
        "confirmPassword": "asdf1234"
    }'
    ```

#### 8. Update Password
- **Endpoint:** `PUT /api/v1/auth/password/update`
- **Purpose:** Update the user's current password.
- **Request Body:**
    ```json
    {
        "currentPassword": "asdf1234",
        "newPassword": "12345678",
        "confirmNewPassword": "12345678"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location --request PUT 'http://localhost:3333/api/v1/auth/password/update' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: token=YOUR_TOKEN_HERE' \
    --data '{
        "currentPassword": "asdf1234",
        "newPassword": "12345678",
        "confirmNewPassword": "12345678"
    }'
    ```

### Book APIs

#### 1. Add Book
- **Endpoint:** `POST /api/v1/book/admin/add`
- **Purpose:** Add a new book to the inventory.
- **Request Body:**
    ```json
    {
        "title": "sub mind",
        "author": "subs",
        "description": "About the every steps",
        "price": "150",
        "quantity": 20
    }
    ```
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/book/admin/add' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: token=YOUR_TOKEN_HERE' \
    --data '{
        "title": "sub mind",
        "author": "subs",
        "description": "About the every steps",
        "price": "150",
        "quantity": 20
    }'
    ```

#### 2. Get All Books
- **Endpoint:** `GET /api/v1/book/all`
- **Purpose:** Retrieve a list of all books.
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/book/all' \
    --header 'Cookie: token=YOUR_TOKEN_HERE'
    ```

#### 3. Delete Book
- **Endpoint:** `DELETE /api/v1/book/admin/{bookId}`
- **Purpose:** Delete a book from the inventory.
- **CURL Command:**
    ```bash
    curl --location --request DELETE 'http://localhost:3333/api/v1/book/admin/YOUR_BOOK_ID_HERE' \
    --header 'Cookie: token=YOUR_TOKEN_HERE'
    ```

### Borrow APIs

#### 1. Record Borrow Book
- **Endpoint:** `POST /api/v1/borrow/record-borrow-book/{bookId}`
- **Purpose:** Record the borrowing of a book.
- **Request Body:**
    ```json
    {
        "email": "user@gmail.com"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/borrow/record-borrow-book/YOUR_BOOK_ID_HERE' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: token=YOUR_TOKEN_HERE' \
    --data '{
        "email": "user@gmail.com"
    }'
    ```

#### 2. Return Borrowed Book
- **Endpoint:** `PUT /api/v1/borrow/return-borrowed-book/{bookId}`
- **Purpose:** Return a borrowed book.
- **Request Body:**
    ```json
    {
        "email": "user@gmail.com"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location --request PUT 'http://localhost:3333/api/v1/borrow/return-borrowed-book/YOUR_BOOK_ID_HERE' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: token=YOUR_TOKEN_HERE' \
    --data '{
        "email": "user@gmail.com"
    }'
    ```

#### 3. Get My Borrowed Books
- **Endpoint:** `GET /api/v1/borrow/my-borrowed-books/`
- **Purpose:** Retrieve a list of books borrowed by the logged-in user.
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/borrow/my-borrowed-books/' \
    --header 'Cookie: token=YOUR_TOKEN_HERE'
    ```

#### 4. Get All Borrowed Books (Admin)
- **Endpoint:** `GET /api/v1/borrow/admin-borrowed-books-by-users`
- **Purpose:** Retrieve a list of all borrowed books by users for admin.
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/borrow/admin-borrowed-books-by-users' \
    --header 'Cookie: token=YOUR_TOKEN_HERE'
    ```

### User APIs

#### 1. Get All Users
- **Endpoint:** `GET /api/v1/user/all-users`
- **Purpose:** Retrieve a list of all registered users.
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/user/all-users' \
    --header 'Cookie: token=YOUR_TOKEN_HERE'
    ```

#### 2. Register New Admin
- **Endpoint:** `POST /api/v1/user/add/new-admin`
- **Purpose:** Register a new admin user (Admin only).
- **Request Body:**
    ```json
    {
        "avatar": "file_path",
        "name": "khan",
        "email": "khan@gmail.com",
        "password": "12345678"
    }
    ```
- **CURL Command:**
    ```bash
    curl --location 'http://localhost:3333/api/v1/user/add/new-admin' \
    --header 'Cookie: token=YOUR_TOKEN_HERE' \
    --form 'avatar=@"/path/to/your/avatar.png"' \
    --form 'name="khan"' \
    --form 'email="khan@gmail.com"' \
    --form 'password="12345678"'
    ```

## Notes
 - Ensure to replace `YOUR_TOKEN_HERE` and `YOUR_BOOK_ID_HERE` with the actual token and book ID when making requests.
- The API endpoints are designed to handle various functionalities related to user authentication, book management, and borrowing processes.
- Each CURL command is structured to include necessary headers and data formats as required by the API specifications.
- For any additional features or modifications, please refer to the respective sections in the documentation.