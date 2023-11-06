# Utilisez l'image Node.js 14 LTS comme base
FROM node:18

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et le fichier yarn.lock dans le conteneur
COPY ../package.json yarn.lock ./

# Installer les dépendances du projet avec Yarn
RUN yarn install

# Copier l'ensemble du code source dans le conteneur
COPY .. .

# Exposer le port sur lequel l'application NestJS écoute (par défaut : 3000)
EXPOSE 3000

# Commande pour démarrer l'application NestJS
CMD ["yarn", "start"]
