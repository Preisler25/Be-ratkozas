# Base image used
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Installing project dependencies
RUN npm install

RUN npm install -g nodemon
RUN npm install -g ts-node

# Copy the rest of the application code
COPY . .

# Running default command 
CMD ["npm", "start"]
