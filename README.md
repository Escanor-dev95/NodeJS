```bash
npm init -y
npm i -D typescript ts-node-dev @types/express @types/cors
npm i express cors dotenv
npx tsc --init
```

| Commande | Description |
|-----------|-------------|
| `docker-compose build` | Build les images |
| `docker-compose up` | Lance les conteneurs |
| `docker-compose up -d` | Lance en arrière-plan |
| `docker-compose logs -f` | Affiche les logs |
| `docker-compose up --build` | Rebuild après modification |
| `docker-compose down` | Stoppe et supprime les conteneurs |
| `docker ps` | Liste les conteneurs actifs |