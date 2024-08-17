# official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the docker container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json .

# Install all the dependencies in the docker container
RUN npm install 

# Copy all the contents of the web application 
COPY . .

# Start the app
CMD ["npm","start"]