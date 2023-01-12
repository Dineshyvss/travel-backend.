# Tutorial Backend with Node

This application allows users to create and maintain a list of tutorials that can have multiple lessons within. Please visit https://github.com/OC-ComputerScience/tutorial-frontend-vue2 for the Vue 2 frontend repository or https://github.com/OC-ComputerScience/tutorial-frontend-vue3 for the Vue 3 frontend repository.

#### Please note:
- You will need to create a database and be able to run it locally.
- This project utilizes **Google Authentication** to allow users to log in.
- You will need to provide a **Client ID from Google** for this project to run locally.

## Project Setup
1. Install the project.
```
npm install
```

2. Make a local tutorial database.
    - Create a schema/database.
    - The sequelize in this project will make all the tables for you.

3. Make sure you have a project registered with the **Google Developer console**.
    - https://console.developers.google.com/
    - Enable **Google+ API** and **Google Analytics API**.
    - Enable an **OAuth consent screen**.
    - Create an **OAuth client ID**.
    - Save your **Client ID** and **Client Secret** in a safe place.

4. Add a local **.env** file and make sure the **client ID** and **client secret** are the values you got from Google. Also make sure that the **database** variables are correct.
    - CLIENT_ID = '**your-google-client-id**'
    - CLIENT_SECRET = '**your-google-client-secret**'
    - DB_HOST = 'localhost'
    - DB_PW = '**your-local-database-password**'
    - DB_USER = '**your-local-database-username**' (usually "root")
    - DB_NAME = '**your-local-database-name**'

5. Compile and run the project locally.
```
npm run start
```
