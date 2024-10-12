/**
 * @swagger
 * components:
 *   schemas:
 *     StudentRegistration:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique user ID for the student
 *           example: "student123"
 *         password:
 *           type: string
 *           description: The password for the student account
 *           example: "strongpassword456"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the registration was created
 *           example: "2024-10-09T08:19:25.398Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the registration was last updated
 *           example: "2024-10-09T08:19:25.398Z"

 *     Student:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique user ID associated with the student
 *           example: "student123"
 *         task:
 *           type: string
 *           description: The task name assigned to the student
 *           example: "Math Assignment"
 *         admin:
 *           type: string
 *           description: The name of the designated admin for the task
 *           example: "adminUser"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the student record was created
 *           example: "2024-10-09T08:19:25.398Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the student record was last updated
 *           example: "2024-10-09T08:19:25.398Z"

 *     AssignmentStatus:
 *       type: object
 *       properties:
 *         taskId:
 *           type: string
 *           description: The ID of the associated student task
 *           example: "67063c8d2ad999c141f2f314"
 *         task:
 *           type: string
 *           description: The name of the task
 *           example: "Complete Project Report"
 *         status:
 *           type: string
 *           description: The current status of the assignment
 *           example: "Pending"
 */

/**
 * @swagger
 * /students/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique user ID for the student
 *                 example: "student123"
 *               password:
 *                 type: string
 *                 description: The password for the student account
 *                 example: "strongpassword456"
 *     responses:
 *       201:
 *         description: Student registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New student registered successfully!"
 *       400:
 *         description: Bad request 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User with the same username exists!"

 * /students/login:
 *   post:
 *     summary: Student login
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique user ID for the student
 *                 example: "student123"
 *               password:
 *                 type: string
 *                 description: The password for the student account
 *                 example: "strongpassword456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Unauthorized - invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials!"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student not registered with the system!"

 * /students/add-assignment:
 *   post:
 *     summary: Add assignment details
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *               - admin
 *             properties:
 *               task:
 *                 type: string
 *                 description: The task name to be assigned
 *                 example: "Math Assignment"
 *               admin:
 *                 type: string
 *                 description: The name of the designated admin
 *                 example: "adminUser"
 *     responses:
 *       201:
 *         description: Successfully added assignment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The unique user ID of the student
 *                       example: "67060cfb61e10d99d19fa913"
 *                     task:
 *                       type: string
 *                       description: The task name assigned to the student
 *                       example: "Math Assignment"
 *                     admin:
 *                       type: string
 *                       description: The designated admin for the task
 *                       example: "growthXadmin"
 *                     _id:
 *                       type: string
 *                       description: The ID of the assignment
 *                       example: "67068bc91d8e59a498c121f5"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the assignment was created
 *                       example: "2024-10-09T13:57:29.842Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the assignment was last updated
 *                       example: "2024-10-09T13:57:29.842Z"
 *                     __v:
 *                       type: integer
 *                       description: Version key for the document
 *                       example: 0
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not found"
 * 
 * /students/assignments:
 *   get:
 *     summary: Retrieve all assignments
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     description: The unique user ID of the student
 *                     example: "67060cfb61e10d99d19fa913"
 *                   task:
 *                     type: string
 *                     description: The task name assigned to the student
 *                     example: "Math Assignment"
 *                   admin:
 *                     type: string
 *                     description: The designated admin for the task
 *                     example: "growthXadmin"
 *                   _id:
 *                     type: string
 *                     description: The ID of the assignment
 *                     example: "67068bc91d8e59a498c121f5"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the assignment was created
 *                     example: "2024-10-09T13:57:29.842Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the assignment was last updated
 *                     example: "2024-10-09T13:57:29.842Z"
 *                   __v:
 *                     type: integer
 *                     description: Version key for the document
 *                     example: 0
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"

 * /students/status/{id}:
 *   get:
 *     summary: Retrieve assignment status by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the assignment
 *         schema:
 *           type: string
 *           example: "67063c8d2ad999c141f2f314"
 *     responses:
 *       200:
 *         description: Successfully retrieved assignment status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The current status of the assignment
 *                   example: "Pending"
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied!"
 *       404:
 *         description: Not Found - assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment with the current taskId not found!"
 */

/**
 * @swagger
 * /students/auth/google:
 *   get:
 *     summary: Redirects to Google for authentication. Needs to be done mannually.
 *     description: Initiates OAuth2 authentication with Google. Redirects the user to Google's login page, where they can log in and grant access to their email and profile information.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirects the user to Google's OAuth2 authentication page.
 *       401:
 *         description: Unauthorized access.
 */
