# Utilise une image Node.js officielle légère basée sur Debian Slim
# → Adaptée pour un environnement de production (plus rapide et plus petit)
FROM node:20-slim

# Définit le dossier de travail à l'intérieur du conteneur
# → Toutes les commandes suivantes seront exécutées depuis /app
WORKDIR /app

# Copie uniquement les fichiers nécessaires à l'installation des dépendances
# → Cela permet à Docker de mettre en cache cette étape si les fichiers ne changent pas
COPY package*.json tsconfig.json ./

# Installe toutes les dépendances (production + développement)
# → On a besoin de TypeScript et autres outils de build avant de compiler
RUN npm install

# Copie le reste du code source de ton projet dans le conteneur
# → Fait après l’installation des dépendances pour ne pas invalider le cache Docker inutilement
COPY . .

# Compile le projet TypeScript en JavaScript dans le dossier /dist
RUN npm run build

# Supprime les dépendances de développement pour alléger l’image
# → On ne garde que ce qui est nécessaire pour exécuter l’application
RUN npm prune --production

# Expose le port sur lequel ton serveur Node.js écoute
EXPOSE 3002

#eneur
 ## → Lance ton serveur en exécutant le fichier compilé dans /dist Commande de démarrage du cont
CMD ["node", "dist/index.js"]
