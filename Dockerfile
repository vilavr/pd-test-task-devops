# Use the official Node.js 22 image as the base image
FROM node:22

WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first
# This allows Docker to cache the npm install step if these files haven't changed
COPY package*.json ./

RUN NODE_ENV=production npm ci

COPY . .

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
