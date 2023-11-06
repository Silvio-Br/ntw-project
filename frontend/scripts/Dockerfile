# Utilisez l'image Node.js LTS (14.x) comme base
FROM node:18

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier package.json et le fichier yarn.lock dans le conteneur
COPY package.json yarn.lock ./

# Installez les dépendances de l'application avec Yarn
RUN yarn install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Construisez l'application Angular en utilisant la commande de construction (par exemple, ng build)
RUN yarn build

# Exposez le port sur lequel l'application Angular sera accessible
EXPOSE 4200

# Commande pour démarrer l'application Angular (utilisez le serveur de développement pour le développement)
# host 0.0.0.0
CMD ["yarn", "start", "--host", "0.0.0.0"]
