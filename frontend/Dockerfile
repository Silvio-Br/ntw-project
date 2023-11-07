FROM node:18-alpine AS build

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier package.json et le fichier yarn.lock dans le conteneur
COPY package.json yarn.lock ./

# Installez les dépendances de l'application avec Yarn
RUN yarn install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY .. .

# Construisez l'application Angular en utilisant la commande de construction (par exemple, ng build)
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend /usr/share/nginx/html
