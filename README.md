Donation Platform
This is a Donation Platform built using Node.js and Express.js. The platform integrates with Paystack for handling payments, and it allows users to donate to different causes, track donations, and verify payments.

Table of Contents
Features
Requirements
Installation
Configuration
Running the Application
Routes
Donation Routes
Technologies Used
License
Features
Secure Donations: Users can donate securely to various causes using Paystack integration.
Payment Verification: Payment status can be verified using Paystack's API.
Donation Tracking: Users can view all their donations and track how much has been raised for a cause.
JWT Authentication: Routes for making donations are protected using JWT-based authentication.
Requirements
Node.js (v14 or higher)
MongoDB (for database storage)
A Paystack account and secret key
Installation
Clone the repository:

bash
Copy code

cd donation-platform
Install dependencies:

bash
Copy code
npm install
Make sure MongoDB is running locally or provide a remote MongoDB URI in the .env file.

Configuration
Create a .env file in the root of the project and add the following environment variables:

bash
Copy code
PAYSTACK_SECRET_KEY=your_paystack_secret_key
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret_key

PAYSTACK_SECRET_KEY: Your Paystack API key.
MONGO_URI: The MongoDB connection string.
JWT_SECRET: A secret key used for signing JSON Web Tokens.

Running the Application
To start the application:

bash
Copy code
npm start
The app will start running on http://localhost:3000.

To run the app in development mode:

bash
Copy code
npm run dev
This will start the app using nodemon for automatic restarts on code changes.

Routes
Donation Routes
Method	Endpoint	Description	Authentication Required
POST	/initiate-donation	Initiate a new donation process	Yes
GET	/verify-payment/:reference	Verify the payment with the given reference	No
POST	/donate	Update the raised amount for a cause	Yes
GET	/donations	Get all donations	No
1. Initiate Donation
Endpoint: POST /initiate-donation
Description: Initializes a new donation. If the payment reference is not provided, the payment is initialized with Paystack.
Payload:
json
Copy code
{
  "causeId": "string",
  "amount": "number"
}
Authentication: JWT required.
2. Verify Payment
Endpoint: GET /verify-payment/:reference
Description: Verifies a payment using the Paystack API with the provided reference.
Response:
json
Copy code
{
  "message": "Payment verification successful",
  "payment": {
    // Paystack payment details
  }
}
3. Donate (Update Raised Amount)
Endpoint: POST /donate
Description: Updates the raised amount for a cause after a successful donation.
Payload:
json
Copy code
{
  "causeId": "string",
  "amount": "number"
}
Authentication: JWT required.
4. Get All Donations
Endpoint: GET /donations
Description: Retrieves all donations from the database.
Response:
json
Copy code
[
  {
    "_id": "string",
    "donor": "string",
    "cause": "string",
    "amount": "number",
    "paymentReference": "string",
    "status": "string"
  }
]
Technologies Used
Node.js: JavaScript runtime for the backend
Express.js: Web framework for Node.js
MongoDB: NoSQL database for storing donation and cause data
Mongoose: ODM (Object Data Modeling) for MongoDB
Paystack API: Used to handle payments and payment verification
JSON Web Tokens (JWT): For authentication and route protection
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contribution
Feel free to fork this repository, make changes, and submit a pull request.

Contact
For any inquiries or help, please contact:

Name: Eze Omereji
Email: enomereji"gmail.com