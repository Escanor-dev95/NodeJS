# Projet Node JS

L'API a été mise en ligne avec une gestion de l'environnement via Postman et une variable {{API_URL}} -> attribuer comme valeur "https://node.escanordev.fr" ou "http://localhost:3002"

Un utilisateur Admin ayant accès à toutes les routes a été créé sur le serveur, se rendre sur la route "/auth/login" puis se connecter avec email "admin@mail.fr" et password "password", puis mettre le token récupéré dans "Authorization > Bearer Token" sur Postman.

## Routes disponibles 

### ROLES

[Lien postman](https://nodejs-app.postman.co/workspace/Nodejs-App~9b7c2dfd-cc3d-4999-9f47-c2bdfd3d9a23/collection/42844419-69f04208-ddb3-453a-9f12-2bd889485385?action=share&creator=42844419)

1. POST /roles (admin, owner, customer) : 
   ```ts
   {
        "name" : "admin"
    }
   ```  

2. GET /roles 

3. GET /roles/:roleId

4. PUT /roles/:roleId :
    ```ts
    {
        "name" : "admin"
    }
    ```

5. DELETE /roles/:roleId

### USERS

1. POST /users :
    ```ts
    {
        "name" : "Florian",
        "email" : "florian@test.fr",
        "password" : "password",
        "role" : "6947c34551a6fb6dc78e8c10"
    } 
    ```

2. GET /users

3. GET /users/:userId

4. PUT /users/:userId :
    ```ts
    {
        "name" : "Florian",
        "email" : "florian@test.fr",
        "password" : "password",
        "role" : "6947c34551a6fb6dc78e8c10",
        "score" : 20
    } 
    ```

5. DELETE /users/:id

6. GET /users/active => Permet de récupérer les comptes actifs
   
7. PATCH /users/hide/:id => Permet de désactiver un compte utilisateur

### LOGIN

1. POST /auth/login => Une fois la connexion réussite, on reçoit un token afin de pouvoir utiliser les différentes routes : 
    ```ts
    {
        "email": "florian@test.fr",
        "password": "password"
    }
    ```

    Pour utiliser les routes restreintes, il faut mettre le token dans postman (type Bearer)

### SALLES

1. POST /salles :
    ```ts
    {
        "name": "Outdoor Corner",
        "address": "Parc des Sports, 33000 Bordeaux",
        "capacity": 30,
        "description": "Espace extérieur pour entraînements fonctionnels.",
        "manager": "6947cc1172bbd3bcadf88e0a"
    }
    ```

2. GET /salles

3. GET /salles/:salleId

4. PUT /salles/:salleId : 
    ```ts
    {
        "name": "Outdoor Corner",
        "address": "Parc des Sports, 33000 Bordeaux",
        "capacity": 30,
        "description": "Espace extérieur pour entraînements fonctionnels.",
        "manager": "6947cc1172bbd3bcadf88e0a"
    }
    ```

5. DELETE /salles/:salleId

6. PATCH /salles/approve

7. GET /salles/approve

### EQUIPEMENTS

1. POST /equipments : 
    ```ts
    {
        "name": "Barre olympique",
        "max_weight": 300,
        "quantity": 4,
        "salle": "6947cf713623bfd52af94657"
    }
    ```

2. GET /equipments

3. GET /equipments/:equipmentId

4. PUT /equipments/:equipmentId :
    ```ts
    {
        "name": "Barre olympique",
        "max_weight": 300,
        "quantity": 4,
    }
    ```

5. DELETE /equipments/:equipmentId

6. GET /equipments/salle/:salleId => Récupérer les équipements d'une salle

7. DELETE /equipments/salle/:salleId => Supprimer tous les équipements d'une salle

### EXERCICES

1. POST /exercices :
    ```ts
    {
        "name": "Course sur tapis",
        "description": "Endurance cardio sur tapis.",
        "muscle_group": ["cardio"],
        "difficulty": "beginner",
        "salle": "6947cf713623bfd52af94657",
        "equipment": "6947d16eb111dfdea4a9caa3"
    }
    ```

2. GET /exercices

3. GET /exercices/:exerciceId

4. PUT /exercices/:exerciceId :
    ```ts
    {
        "name": "Course sur tapis",
        "description": "Endurance cardio sur tapis.",
        "muscle_group": ["cardio"],
        "difficulty": "beginner",
        "salle": "6947cf713623bfd52af94657",
        "equipment": "6947d16eb111dfdea4a9caa3"
    }
    ```

5. DELETE /exercices/:exerciceId  

6. GET /exercices/salle/:salleId => Récupérer les exercices d'une salle

7. DELETE /exercices/salle/:salleId => Supprimer tous les exercices d'une salle

### CHALLENGES

1. POST /challenges :
   ```ts
   {
        "title": "Défi Cardio3",
        "description": "Brûle 500 calories en une séance.",
        "difficulty": 5,
        "duration": 60,
        "objectives": ["Brûler 500 calories"],
        "recommended": true,
        "winnable_points": 50,
        "calories" : 100,
        "isPublic" : false,
        "salle": "6947cf713623bfd52af94657",
        "exercice": "6947d1a4b111dfdea4a9caac",
        "user" : "6947cc1172bbd3bcadf88e0a"
    }
   ```

2. GET /challenges 

3. GET /challenges/:challengeId

4. PUT /challenges/:challengeId :
    ```ts
    {
        "title": "Défi Cardio3",
        "description": "Brûle 500 calories en une séance.",
        "difficulty": 5,
        "duration": 60,
        "objectives": ["Brûler 500 calories"],
        "recommended": true,
        "winnable_points": 50,
        "calories" : 100,
        "isPublic" : false,
        "salle": "6947cf713623bfd52af94657",
        "exercice": "6947d1a4b111dfdea4a9caac",
        "user" : "6947cc1172bbd3bcadf88e0a"
    }
    ```

5. DELETE /challenges/:challengeId 

6. GET /challenges/unapproved => Récupérer les challenges non approuvés
   
7. PATCH /challenges/approve/:challengeId => Approuver un challenge

8. GET /challenges/approved => Récupérer les challenges approuvés

9. GET /challenges/public => Récupérer les challenges publics

10. GET /challenges/exercice/:exerciceId => Récupérer la liste des challenges d'un exercice précis

11. GET /challenges/popular?limit=5 => Récupérer le challenge avec le plus de participant. "Limit=5" donne les 5 challenges qui ont le plus de participation

12. GET /challenges/difficulty/5 => Récupérer les challenges avec un niveau de difficulté

13. GET /challenges/duration?min=59&max=61 => Récupérer la durée d'un challenge en renseignant un minimum et un maximum

14. GET /challenges/user/:userId => Récupérer les challenges d'un utilisateur

### BADGES

1. POST /badges :
    ```ts
    {
        "name": "Participant Cardio",
        "description": "A participé au défi Cardio.",
        "type": "participation",
        "challenge": "6947f7fc3eeb9f2c8dbc3d7c",
        "category": "ended_challenges",
        "criteria": 1,
        "operator": ">="
    }
    ```

2. GET /badges

3. GET /badges/:badgeId

4. PUT /badges/:badgeId :
    ```ts
    {
        "name": "Participant Cardio",
        "description": "A participé au défi Cardio.",
        "type": "participation",
        "challenge": "6947f7fc3eeb9f2c8dbc3d7c",
        "category": "ended_challenges",
        "criteria": 1,
        "operator": ">="
    }
    ```

5. DELETE /badges/:badgeId

### PARTICIPATIONS

1. POST /participations :
    ```ts
    {
        "user": "6947cc1172bbd3bcadf88e0a",
        "challenge": "6947f7fc3eeb9f2c8dba3d7c"
    }
    ```

2. GET /participations => Récupérer toutes les participations

3. GET /participations/challenge/:challengeId => Récupérer les participants d'un challenge

4. PATCH /participations/:participationId/finish => Terminer la participation d'un utilisateur

### PROGRESSIONS

1. POST /progressions :
    ```ts
    {
        "burned_calories": 200,
        "actual_weight": 75,
        "score": 30,
        "ended_challenges": 2,
        "user": "6947cc1172bbd3bcadf88e0a"
    }
    ```

2. GET /progressions

3. GET /progressions/:progressionId

4. PUT /progressions/:progressionId :
    ```ts
    {
        "burned_calories": 200,
        "actual_weight": 75,
        "score": 30,
        "ended_challenges": 2,
        "user": "6947cc1172bbd3bcadf88e0a"
    }
    ```

5. DELETE /progressions/:progressionId 

6. GET /progressions/user/:userId => Récupérer la progression d'un utilisateur

### RECOMPENSES

1. POST /rewards :
    ```ts
    {
        "user": "694801a0999527afcd447522",
        "badge" : "6947f8ba8b3c996cdaf4b60e"
    }
    ```

2. GET /rewards

3. GET /rewards/:rewardId

4. PUT /rewards/:rewardId :
    ```ts
    {
        "user": "694801a0999527afcd447522",
        "badge" : "6947f8ba8b3c996cdaf4b60e"
    }
    ```

5. DELETE /rewards/:rewardId

6. GET /rewards/badge/:badgeId => Récupérer les récompenses associées au badge

7. GET /rewards/user/:userId => Récupérer les récompenses d'un utilisateur 

## En plus

1. Hashage des mots de passe des comptes utilisateur

2. Gestion des rôles avec la restriction des routes via un token de connexion

3. Mise en ligne de l'API sur un serveur & mise en place du https avec un sous-domaine pointant vers le back-end.
