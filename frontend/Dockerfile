## cards site React frontend

# see https://mherman.org/blog/dockerizing-a-react-app/

# pull node base image
FROM node:latest

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.3 -g
RUN npm run build

# add app
COPY . ./

# start app
CMD ["npm", "start"]