# About Coffee Taster App
The coffee taster app is a web application for registering coffee cup ratings. The app is built with **vanilla javascript** and uses **Google Firebase** as the backend for authentication and database storage.

## Screenshots

> aaa

# How to dev?

Feel free to adapt the project to your needs. The project is built with HTML, SCSS and Javascript with OOP as structure. The app can be bundled with **Parcel.js**.

## NPM

Run `npm -i` to install the required dependencies.

## Firebase

This projects uses Google Firebase for authentication and database. Make sure you've an Firebase project.
Copy the file `.env.development.example` to `.env.development` and replace the values in this new file with the values of your Firebase project.

This ENV file is only used for local development.
## Development

Run `npm run dev` to bundle the project with Parcel.js and open a local preview of the app.

## Edit as your needs

You can change the project by editing the Javascript logic under the ***src/js*** folder.
The stylesheets ars located under ***src/style***.


# How to deploy?

## Set ENV variables

Set the envoirement variables before building! Using an online building e.g. Netlify? Make sure to define this variables before the building process takes place.


## Build with parcel

Build an optimized version by running `npm run build`. The bundles version becomes availible under the ***dist*** folder.
