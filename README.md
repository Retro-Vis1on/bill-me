# Bill ME

This is an invoice management app.\
Tech Stack: MERN\
Deployed Link: https://cocky-austin-297416.netlify.app

## Associated Dependencies Docs:

### react-chart-js-2: https://www.npmjs.com/package/react-chartjs-2

### nodemailer: https://nodemailer.com/usage/

### graphql:https://graphql.org/

### JWT: https://jwt.io/

### bcrypt: https://github.com/kelektiv/node.bcrypt.js#readme

### mongoDB: https://www.mongodb.com/try/download/community

### nodeJS: https://nodejs.org/en/download/

## For Running Locally

### Frontend:

### `npm start`

This command should be run with frontend folder as current working directory.\
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend:

### `npm run dev`

This command should be run with backend folder as current working directory.\
Starts the server using nodemon at port 8000.

Also the enviroment variable needs to be configured for using nodemailer and jwt.

### .env Format:

| Variable | Function                         |
| -------- | -------------------------------- |
| KEY      | Jwt Secret                       |
| EMAIL    | Email ID for sending invoice pdf |
| PASSWORD | Password of the given Email ID   |
| DB_URL   | MongoDB Atlas Link               |
