# Trailhead Frontend
This repo will hold our react.js frontend parts of our COSC 98 project

To get our hello world started: `npm start`

## Architecture

We plan to code using react.js
NB: we had to remove the camal casing due to the warning: "name can no longer contain capital letters"

React.js for user interface, React Router for page navigation, and either Axios or Fetch API for calling the backend APIs is we use any. 

## Setup
installations: 
`npm install axios`
`npm install @react-google-maps/api` to make sure the google maps will connect to the map feature in the webapp

run: 
`npm create-react-app trailheadfrontend`

## Deployment

We will need to use `npm install` and `npm start`

`npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Render
Our website is hosted on render. Follow this link to open it: https://utrekfrontend.onrender.com/
Note: inital loading time for first page may take a little longer. You can try refresh the page but it may take a little more time.

## Django API 

We choose to centralize our API calls in one file — apiServices — which contains the functions createTrip, getTrips, updateTrip and deleteTrip. We will modify these functions as need be later in our development. 

This organizational decsion allows our team to import only neccesary functions from apiServices to other files. 

## Designs
Individual Trip: 

![image](https://github.com/user-attachments/assets/0475c07a-228e-422c-8dae-91483ae0ec33)

Messaging: 

![image](https://github.com/user-attachments/assets/be16ebf8-cd73-492d-b766-fde40306d84d)

Home Page:

<img width="1059" alt="Screenshot 2024-10-20 at 8 41 07 PM" src="https://github.com/user-attachments/assets/116f664c-72d1-43d7-aba0-138d1482da99">

Trips

<img width="1061" alt="Screenshot 2024-10-20 at 8 41 22 PM" src="https://github.com/user-attachments/assets/965212ef-1d47-456d-a185-fdfe4df3d8c5">

Profile:

<img width="1058" alt="Screenshot 2024-10-20 at 8 43 16 PM" src="https://github.com/user-attachments/assets/7ac32827-c579-4479-bc86-4b5be137fe76">

## Authors

Ari Rojas 
Colin Kearns 
Muthoni Mbesa
Sammy Rago
Dara Casey

## Acknowledgments

## Other Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

