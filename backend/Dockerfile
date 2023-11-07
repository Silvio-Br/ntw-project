FROM node:18-alpine AS build
# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et le fichier yarn.lock dans le conteneur
COPY package.json yarn.lock ./

# Installer les dépendances du projet avec Yarn
RUN yarn install

# Copier l'ensemble du code source dans le conteneur
COPY .. .

RUN yarn build

FROM node:18-alpine
WORKDIR /app
EXPOSE 3000:3000
COPY --from=build /app/dist/ dist
COPY --from=build /app/config config
COPY --from=build /app/node_modules/ node_modules
CMD ["node", "dist/main"]