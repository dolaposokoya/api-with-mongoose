### Node JS API with mongodb and express

## Steps to run api

 - 📥 Download the API folder
 - 📁 open folder in command prompt or any terminal pf choice
 - ⌨️ type npm install in terminal

## To create a .env file, follow this steps 
- inside .env file create a variable like this JWT_SECRET_KEY
- open your workspace in cmd and type node wait a few seconds 
- type require('crypto').randomBytes(64).toString('hex') a string will be generated.4)copy the string to JWT_SECRET_KEY = the string generated without quote
- when above steps are complete type npm start
- To access image type localhost:5000/images/${imagename} without public folder
- You have to create your own mongodb database by visiting mongodb atlas website and also download mongodb compass community and replace proccess.env.DB_HOST with the url provided to you in db.js, and also make changes to the schema in model folder as you which
 - 📧 if you have any problem contact me 👉🏿 dolaposokoya97@gmail.com 
