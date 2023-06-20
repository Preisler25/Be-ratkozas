# Base image used 
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Installing project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Running default command 
CMD ["npm", "start"]