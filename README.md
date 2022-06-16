
# PROTECHGEAR

Full stack eCommerce platform built from the ground up with React, Redux, Express & MongoDB where users can order latest tech gadgets.




## Tech Stack

**Client:** React, Redux, React-Boostrap

**Server:** Nodejs, Express

**Databases:** MongoDB, Google Cloud Storage


## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product list pagination
- Product search feature
- Multistep checkout process (shipping address entry, payment method selection, etc)
- Fully working PayPal / credit card integration
- Integrated Google Cloud Storage for static assets (products images etc.)
- User profile with orders
- Admin product management panel
- Admin user management panel
- Admin Order management panel



## Roadmap

Follow along as I continue to add more features to the project. Keep an eye on the progress and the backlog [here](https://github.com/i-zokirov/protechgear/projects/1?fullscreen=true) 🙂

You can view the current version of the app here at [protechgear.herokuapp.com](https://protechgear.herokuapp.com/)

Pending Development plans:

- Redis integrations

- PM2 Cluster management Integration

- User email verification

User email verification plan:
 - User model should have an verified attribute that is false by default
 - When the user submits a valid signup form, a new User is created (who's verified attribute will be false initially)
 - Create a long random string (128 characters) with a crypto library and store it in the database (Google Datastore because good enough to store temporary values :P) with a reference to the User ID in MongoDB
 - Send an email to the supplied email address (Using Gmail API because it is free :P) with the hash as part of a link pointing back to a route on the application server
 - When the user clicks the link and hits the route, check for the hash passed in the URL, ensure the hashed token is not expired when clicked on.  
 - If all statements above are positive, get the related user record from MongoDB and set the verified property to true
 - Delete the hash from the Datastore, it is no longer needed
 - User email is now verified


