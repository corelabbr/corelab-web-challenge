FROM node:20-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn
# Copy app files
COPY . .
# Expose port
EXPOSE 5173
# Start the app
CMD [ "yarn", "run", "dev", "--", "--host", "0.0.0.0" ]
