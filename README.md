"# API"
"# API"
"# API"

# Download the API folder

# when the folder, in the folder name bar highlight it type cmd(command prompt)

# when cmd is opne type npm install

# after that a node_modules folder will be installed

# create a .env file, follow this steps 1)inside .env file create two variable like this JWT_SECRET_KEY and JWT_REFRESH_KEY 2) open your workspace in cmd and type node wait a few seconds 3)type require('crypto').randomBytes(64).toString('hex') a string will be generated.4)copy the string to JWT_SECRET_KEY = the string generated without quote, run same step 3 again and assing the value to JWT_REFRESH_KEY = the string generated.

# when installation is done type npm start

# some error might occur due to some missing dependencies search for it on google and install them in the API folder

# To access image type localhost:5000/images/imagename without public folder

# You have to create your own mongodb database by visiting mongodb atlas website and also download mongodb compass community and replace proccess.env.DB_HOST with the url provided to you in db.js, and also make changes to the schema in model folder as you which

# You can test this application by using localhost:5000/api/docs or download postman to test the api

# if you have any problem contact me on dolaposokoya97@gmail.com
