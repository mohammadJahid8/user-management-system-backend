
  ## User Data Management System  
  This backend application provides user registration, authentication, and user data management functionalities. It is built using Node.js, Express, MongoDB (Mongoose), TypeScript, JWT, Zod, and bcrypt for security.
  
  ### Technologies Used:  
  - **Node.js** : A JavaScript runtime for executing server-side code.
  - **Express.js** : A minimal and flexible Node.js web application framework.
  - **MongoDB** : A NoSQL database used for storing user data.
  - **TypeScript** :  A superset of JavaScript that adds static typing.
  - **JWT (JSON Web Tokens)** :  Used for authentication and creating access tokens.
  - **Zod** :  A TypeScript-first schema declaration and input validation library.
  - **Bcrypt** :  Used for securely hashing and storing user passwords.

  ### Deployment Instructions
  #### Prerequisites:
  - Node.js and npm installed.
  - MongoDB server.
  #### Steps:
  - Clone the Repository:
  ```
  https://github.com/mohammadJahid8/user-management-system-backend
  ```
  - Install Dependencies:
  ```
  npm install
  ```
  - Create a `.env` file in the project root and add the following environment variables:
  ```
PORT=5000

DATABASE_URL=mongodb://localhost:27017/yourdatabase
BCRYPT_SALT_ROUNDS=12
JWT_SECRET='yourjsonwebtokensecret'
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET='refreshsecret'
JWT_REFRESH_EXPIRES_IN=365d
```
- Build TypeScript:
```
npm run build
```
- Run the Server:
```
npm start
```
#### Base URL: https://user-management-system-backend-xi.vercel.app/api/v1

### API Endpoints:

#### Authorization & User Register:
- /register (POST)
```
body:
{
    "name": "md jahid",
    "email" :"mdjahid@gmail.com",
    "password": "password"
}
```

- /login (POST)
```
body:
{
    "email" :"mdjahid@gmail.com",
    "password": "password"
}
```
#### User Data Management (When making a request to any Data Management API, you must include the accessToken that you obtained after logging in within the Authorization headers.)
- /user (GET) -> Get all users
- /user/profile (GET) -> Get profile data
- /user/updateProfile (PATCH) -> Update profile (name & password)
```
body:
{
    "name": "Jahid",
    "oldPassword": "password",
    "newPassword": "123456"
}
```

#### The API documentation for this project can be found here: (https://documenter.getpostman.com/view/21064627/2s9YeD7sWC)