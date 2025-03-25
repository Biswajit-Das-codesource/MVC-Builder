# BackSet - Express MVC Project Generator

BackSet is a CLI tool that **automates** the setup of an **Express.js MVC** project with **MongoDB integration**. It quickly creates the necessary folder structure, installs dependencies, and generates essential files to kickstart your backend project.

## 🚀 Features
- Automatically sets up an **MVC architecture** for Express.js
- Installs essential dependencies: **Express, Mongoose, CORS, bcryptjs, JWT, dotenv, cookie-parser, zod**
- Creates **models, controllers, and routes**
- Includes **MongoDB connection setup**
- Generates a **.env file** for configuration
- Adds **nodemon** for development ease

---
## 📦 Installation
To install the package globally, run:
```sh
npm install -g backset
```

Or, use it directly with **npx**:
```sh
npx backset
```

---
## 🛠 Usage
After installation, run the following command to generate a new Express MVC project:
```sh
backset my-project
```
This will create a folder named **my-project** with the necessary structure.

Then, navigate into the folder and start the server:
```sh
cd my-project
npm run dev
```

---
## 📂 Project Structure
After running the command, your project will look like this:
```
my-project/
├── models/
│   ├── user.model.js
├── controllers/
│   ├── user.controller.js
├── routes/
│   ├── user.routes.js
├── .env
├── index.js
├── package.json
├── README.md
```

---
## ⚙️ Environment Variables
The `.env` file includes:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
```
Modify these values as per your database configuration.

---
## 🔧 Scripts
Available npm scripts:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
- `npm start` → Runs the server normally.
- `npm run dev` → Runs the server with **nodemon** for automatic restarts.

---
## 📜 License
MIT License © 2025 Lipun

