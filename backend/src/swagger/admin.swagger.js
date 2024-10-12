/**
 * @swagger
 * components:
 *   schemas:
 *     AdminRegistration:
 *       type: object
 *       required:
 *         - userId
 *         - password
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique ID for the admin user
 *           example: "admin123"
 *         password:
 *           type: string
 *           description: The admin's password
 *           example: "strongpassword123"
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin user
 *     tags: [Admin]
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
 *                 description: The unique user ID for the admin
 *                 example: "admin123"
 *               password:
 *                 type: string
 *                 description: The password for the admin account
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin created successfully!"
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin with same userID exists"
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login an admin user
 *     tags: [Admin]
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
 *                 description: The unique user ID for the admin
 *                 example: "admin123"
 *               password:
 *                 type: string
 *                 description: The password for the admin account
 *                 example: "strongpassword123"
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated admin
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
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your bearer token
 */

/**
 * @swagger
 * /admin/find:
 *   get:
 *     summary: Retrieve tagged assignments
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tagged assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 assignment:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique ID of the assignment
 *                         example: "67063c8d2ad999c141f2f314"
 *                       userId:
 *                         type: string
 *                         description: The ID of the user associated with the assignment
 *                         example: "67060cfb61e10d99d19fa913"
 *                       task:
 *                         type: string
 *                         description: The task description
 *                         example: "chinmay"
 *                       admin:
 *                         type: string
 *                         description: The admin who created the assignment
 *                         example: "growthXadmin"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp when the assignment was created
 *                         example: "2024-10-09T08:19:25.398Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp when the assignment was last updated
 *                         example: "2024-10-09T08:19:25.398Z"
 *                       __v:
 *                         type: integer
 *                         description: The version key for the assignment
 *                         example: 0
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
 */

/**
 * @swagger
 * /admin/accept/{id}:
 *   post:
 *     summary: Accept an assignment
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the assignment to accept
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       200:
 *         description: Assignment accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment status updated!"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied!"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Given assignment id doesnot exists"
 */

/**
 * @swagger
 * /admin/reject/{id}:
 *   post:
 *     summary: Reject an assignment
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the assignment to reject
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       200:
 *         description: Assignment rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Assignment status updated!"
 *       401:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied!"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Given assignment id doesnot exists"
 */

/**
 * @swagger
 * /admin/auth/google:
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
