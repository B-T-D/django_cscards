## cards site React frontend

# see https://mherman.org/blog/dockerizing-a-react-app/

# pull node base image
FROM node:14.12.0

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.3

# add app
COPY . ./

# start app
CMD ["npm", "start"]