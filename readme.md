# Assignment submission portal

This Assignment Submission Portal is a system that is used to facilitate the process of submission and management of assignments by both the users and the administrators. Students are able to upload their assignments, whilst administrators are able to accept or reject the submissions with the management system.

## Key Features

- **User Functionality**:

  - **Register**:Users can register by using a user Id and password.
  - **Login**: Users can log into their account using the registered user id and password. OAuth 2.0 supported (Google)
  - **Submit assignment**: User can submit their assignment.
  - **View assignment status**:User can view their assignment status, whether the assignment is accepted/rejected by the admin.

- **Admin Functionality**:
  - **Register**:Admin can register by using a user Id and password.
  - **Login**:Admin can log into their account using the registered user id and password. OAuth 2.0 supported (Google)
  - **Accept/Reject**:Admin can accept/reject the assignment tagged under his name.

## Technologies Used:

- **node.js**
- **express.js**
- **mongodb**
- **mongoose**
- **swagger-jsdoc**
- **swagger-ui-express**
- **jsonwebtoken**
- **bcrypt**
- **dotenv**
- **passport**
- **passport-google-oauth2**

## Installation:

**The installation steps are provided in the root folder as PDF inside the git repository**

#### Please Note: The user and admin data submission will be in json format. And also set up the below mentioned APIs into the google cloud console (https://console.cloud.google.com/apis).

## APIs:

- **Student**:

  - **Register API=> POST /students/register**: To register a new student

    - Conditions:
      - The userId must be unique
      - The userId cannot be be used by more than one users
        **example**:
        request

    ```json
    {
      "userId": "admin123",
      "password": "strongpassword123"
    }
    ```

  - **Login API => POST /students/login**: To log into the existing account

    - Conditions:
      - The user need to register before login
      - The user need to enter both the fields correctly to get the access. The user will get a jwt token in response, and for further requests jwt token is used for authentication.
        **example**:
        response

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Add assignment API=> POST /students/add-assignment**: To add assignments

      - Conditions :

        - The user must be logged in and have a valid jwt token to submit assignments
          **example**:
          request

        ```json
        {
          "task": "Math Assignment",
          "admin": "adminUser"
        }
        ```

    - **Get all assignments API=> GET /students/assignments**: To view all submited assignments

      - Conditions:
        - The User must be logged in to view the assignments
          **example**:
          respose
          ```json
          [
            {
              "userId": "67060cfb61e10d99d19fa913",
              "task": "Math Assignment",
              "admin": "growthXadmin",
              "_id": "67068bc91d8e59a498c121f5",
              "createdAt": "2024-10-09T13:57:29.842Z",
              "updatedAt": "2024-10-09T13:57:29.842Z",
              "__v": 0
            }
          ]
          ```

    - **Get assignment status API=> GET /students/status/{id}**: To get the status of the selected assignment

      - Conditions:
        - The user must be logged in
        - The user must provide a valid assigment ID which is the **\_id** of the **GET /students/assignments** api
          **example**
          response
        ```json
        {
          "status": "Pending"
        }
        ```

    - **Get the token using OAuth2.0(Google) GET /students/auth/google**: To get the token as the response after login for further authentication
      - Conditions:
        - The user must login using google account.
        - Use this token for further auth and authorization

- **Admin**:

  - **Register API=> POST /admin/register**: To register a new admin

    - Conditions:

      - The userId must be unique
      - The userId cannot be be used by more than one users
        **example**:
        request

      ```json
      {
        "userId": "admin123",
        "password": "strongpassword123"
      }
      ```

  - **Login API => POST /admin/login**: To log into the existing account

    - Conditions:

      - The user need to register before login
      - The user need to enter both the fields correctly to get the access. The user will get a jwt token in response, and for further requests jwt token is used for authentication.
        **example**:
        response

        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

  - **View assignments API => GET /admin/find**: To find all the assignments tagged under the admin

    - Conditions:

      - The user should be logged in and have a valid jwt token
        **example**
        response

      ```json
      {
        "assignment": [
          {
            "_id": "67063c8d2ad999c141f2f314",
            "userId": "67060cfb61e10d99d19fa913",
            "task": "chinmay",
            "admin": "growthXadmin",
            "createdAt": "2024-10-09T08:19:25.398Z",
            "updatedAt": "2024-10-09T08:19:25.398Z",
            "__v": 0
          }
        ]
      }
      ```

  - **Accept assignments API => POST /admin/accept/{id}**: To accept the user's assignment

    - Conditions:
      - Admin must be logged in and have a valid token
      - Admin must enter the correct assignment id which is the **\_id** of the **GET /admin/Find** api
        **example**
        response
      ```json
      {
        "message": "Assignment status updated!"
      }
      ```

  - **Reject assignments API => POST /admin/reject/{id}**:

    - Conditions:
      - Admin must be logged in and have a valid token
      - Admin must enter the correct assignment id which is the **\_id** of the **GET /admin/Find** api
        **example**
        response
      ```json
      {
        "message": "Assignment status updated!"
      }
      ```

  - **Get the token using OAuth2.0(Google) GET /admin/auth/google**: To get the token as the response after login for further authentication
    - Conditions:
      - The user must login using google account.
      - Use this token for further auth and authorization
