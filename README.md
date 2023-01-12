# PROTECHGEAR

Full stack eCommerce platform built from the ground up with React, Redux, Express, MongoDB, Google Cloud Storage, and Cloud Datastore where users are able to order latest tech gadgets.

## Authors

-   [@i-zokirov](https://github.com/i-zokirov)

## Tech Stack

**Client:** React, Redux, React-Boostrap

**Server:** Nodejs, Express

**Databases:** MongoDB, Google Cloud Storage, Cloud Datastore

## Demo

Live demo can be viewed with the following link: [https://protechgear.onrender.com](https://protechgear.onrender.com)

Feel free to register with a dummy account to test the application features.

## Features

-   Fully featured shopping cart
-   Product reviews and ratings
-   Top products carousel
-   Product list pagination
-   Product search feature
-   Multistep checkout process (shipping address entry, payment method selection, etc)
-   Fully working PayPal / credit card payment integration
-   Integrated Google Cloud Storage for static assets (products images etc.)
-   User profile with orders
-   Admin product management panel
-   Admin user management panel
-   Admin order management panel
-   User email verification

### User email verification plan:

-   User model should have a verified attribute that is false by default
-   When the user submits a valid signup form, a new User record is created (who's verified attribute will be false initially)
-   Create a long random string (128 characters) with a crypto library and store it in the database Google Datastore in this case with a reference to the User record in MongoDB by id reference. Because good enough to store temporary values :P
-   Send an email to the supplied email address (Using Gmail API because it is free :P) with the hash as part of a link pointing back to a route on the application server
-   When the user clicks the link and hits the route, check for the hash passed in the URL, ensure the hashed token is not expired when clicked on.
-   If all statements above are positive, get the related user record from MongoDB and set the verified property to true
-   Delete the hash from the Datastore, it is no longer needed
-   User email is now verified

## Roadmap

Follow along as I continue to add more features to the project. Keep an eye on the progress and the backlog [here](https://github.com/i-zokirov/protechgear/projects/1?fullscreen=true) 🙂

You can view the current version of the app here at [https://protechgear.onrender.com](https://protechgear.onrender.com)

Pending Development plans:

-   Redis integrations

-   PM2 Cluster management Integration

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_DB_URI`

`JWT_SECRET`

`PAYPAL_CLIENT_ID`

## Run Locally

Clone the project

```bash
  git clone https://github.com/i-zokirov/protechgear.git
```

Go to the project directory

```bash
  cd protechgear
```

Install dependencies (run npm install in root folder as well as frontend folder)

```bash
  npm install
```

Start the server

```bash
  npm run server
```

Start the frontend

```bash
  npm run client
```

Start the server and frontend simultenously

```bash
  npm run dev
```

Google Cloud Storage and Cloud Datastore APIs require service account keys in JSON files location in path ./backend/keys. Get your service account keys from GCP project. For more, [see this article](https://cloud.google.com/iam/docs/understanding-service-accounts).

## License

[MIT](https://choosealicense.com/licenses/mit/)
