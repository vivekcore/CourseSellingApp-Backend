# Course Selling App

A full-featured backend application for an online course selling platform built with Node.js, Express, and MongoDB. This application enables users to browse and purchase courses, while admins can create and manage course content.

## 🌟 Features

### User Features

- **User Authentication**: Secure signup and signin with JWT tokens
- **Password Security**: Bcrypt password hashing
- **Course Browsing**: View all available courses with details
- **Course Purchase**: Purchase courses and manage purchases
- **Purchase History**: View all purchased courses

### Admin Features

- **Admin Authentication**: Secure admin signup and signin
- **Course Management**: Create, read, update, and delete courses
- **Course Upload**: Add course details including title, description, price, and image
- **Course Editing**: Update course information
- **Analytics**: Track courses created by each admin

### Security Features

- **JWT Authentication**: Token-based user and admin authentication
- **Input Validation**: Zod schema validation for all endpoints
- **Password Hashing**: Bcrypt for secure password storage
- **Role-Based Access**: Separate authentication for users and admins

## 🛠️ Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Security**: Bcrypt
- **Environment Config**: dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🚀 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd CourseSellingApp
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/coursesellingapp
ADMIN_JWT=your_admin_jwt_secret
USER_JWT=your_user_jwt_secret
```

4. Start the server:

```bash
node index.js
```

The server will start on `http://localhost:3000`

## 📂 Project Structure

```
CourseSellingApp/
├── index.js                 # Main server file
├── config.js                # Configuration and JWT secrets
├── package.json             # Project dependencies
├── .env                     # Environment variables
├── db/
│   └── db.js               # MongoDB schemas and models
├── routes/
│   ├── userRoute.js        # User endpoints
│   ├── courseRoutes.js     # Course endpoints
│   └── adminRoutes.js      # Admin endpoints
└── middleWares/
    ├── user.js             # User authentication middleware
    └── admin.js            # Admin authentication middleware
```

## 🔌 API Endpoints

### User Routes (`/user`)

#### Signup

- **POST** `/user/signup`
- **Body**:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response**: Success/Error message

#### Signin

- **POST** `/user/signin`
- **Body**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response**: JWT token

#### Get Purchases

- **GET** `/user/purchases`
- **Headers**: `Authorization: <JWT_TOKEN>`
- **Response**: Array of purchased courses

### Course Routes (`/course`)

#### Browse Courses

- **GET** `/course/preview`
- **Response**: Array of all courses

#### Purchase Course

- **POST** `/course/purchase`
- **Headers**: `Authorization: <JWT_TOKEN>`
- **Body**:

```json
{
  "courseId": "course_mongodb_id"
}
```

- **Response**: Success/Error message

### Admin Routes (`/admin`)

#### Signup

- **POST** `/admin/signup`
- **Body**:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "admin@example.com",
  "password": "password123"
}
```

- **Response**: Success/Error message

#### Signin

- **POST** `/admin/signin`
- **Body**:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

- **Response**: JWT token

#### Create Course

- **POST** `/admin/course`
- **Headers**: `Authorization: <JWT_TOKEN>`
- **Body**:

```json
{
  "title": "React Basics",
  "description": "Learn React fundamentals",
  "price": 29.99,
  "imageUrl": "https://example.com/image.jpg"
}
```

- **Response**: Success message with course details

#### Update Course

- **PUT** `/admin/course`
- **Headers**: `Authorization: <JWT_TOKEN>`
- **Body**:

```json
{
  "courseID": "course_mongodb_id",
  "title": "Advanced React",
  "description": "Master React patterns",
  "price": 49.99,
  "imageUrl": "https://example.com/image.jpg"
}
```

- **Response**: Success/Error message

#### Delete Course

- **DELETE** `/admin/course`
- **Headers**: `Authorization: <JWT_TOKEN>`
- **Body**:

```json
{
  "courseID": "course_mongodb_id"
}
```

- **Response**: Success/Error message

## 💾 Database Schema

### User Collection

```javascript
{
  firstname: String (3-20 chars),
  lastname: String (max 20 chars),
  email: String (unique),
  password: String (hashed)
}
```

### Admin Collection

```javascript
{
  firstname: String (3-20 chars),
  lastname: String (max 20 chars),
  email: String (unique),
  password: String (hashed)
}
```

### Courses Collection

```javascript
{
  title: String (3-150 chars),
  description: String (3-500 chars),
  price: Number,
  imageUrl: String,
  creatorId: ObjectId (Admin reference)
}
```

### Purchases Collection

```javascript
{
  courseId: ObjectId (Course reference),
  userId: ObjectId (User reference)
}
```

## 🔐 Authentication Flow

### User Authentication

1. User signs up with email and password
2. Password is hashed using bcrypt
3. User signs in with email and password
4. Server validates credentials and returns JWT token
5. User includes JWT token in Authorization header for protected routes

### Admin Authentication

Similar to user authentication with separate JWT secret for admins.

## ✅ Input Validation

All endpoints use Zod schema validation to ensure data integrity:

**User Signup/Signin Validation**:

- firstname: 3-20 characters
- lastname: max 20 characters
- email: valid email format
- password: required

**Course Creation Validation**:

- title: 3-150 characters
- description: 3-500 characters
- price: number
- imageUrl: string (URL)

## 🚀 Getting Started

1. Set up MongoDB and get your connection string
2. Create `.env` file with required variables
3. Install dependencies: `npm install`
4. Start server: `node index.js`
5. Test endpoints using Postman or curl

Example signup request:

```bash
curl -X POST http://localhost:3000/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 📝 Notes

- JWT secrets in `config.js` should be changed to strong, unique values before deployment
- Consider using environment variables for JWT secrets instead of hardcoding
- Implement rate limiting for production deployments
- Add CORS configuration if frontend is on a different domain

## 🔄 Future Enhancements

- Email verification
- Password reset functionality
- Course ratings and reviews
- Course completion tracking
- Payment gateway integration
- Admin dashboard
- User profile management
- Search and filter courses

## 📄 License

ISC

## 👤 Author

Created as a learning project for MongoDB and Express.js backend development.

---

**Happy coding! 🎉**
