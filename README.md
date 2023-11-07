# Projet NTW

Le projet NTW est une application Web développée en Angular, NestJS et utilisant MongoDB comme base de données. Il est conçu pour gérer la communication et la gestion des absences entre trois types d'utilisateurs : les étudiants, les professeurs et les administrateurs.

## Objectif du Projet

L'objectif principal du projet NTW est de créer une plateforme de communication et de gestion des absences pour une école ou une institution similaire. Les acteurs clés de l'application sont les suivants :

1. **Étudiants** : Les étudiants peuvent envoyer des messages aux professeurs et recevoir des informations sur leurs absences.

2. **Professeurs** : Les professeurs ont la possibilité d'envoyer des messages aux étudiants et de créer ou modifier des absences pour les étudiants.

3. **Administrateurs** : Les administrateurs ont le pouvoir de créer de nouveaux étudiants et professeurs.

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Lancement du Projet

Pour lancer le projet NTW, suivez ces étapes :

1. Clonez le dépôt Git du projet sur votre machine locale.

   ```bash
   git clone https://github.com/Silvio-Br/ntw-project.git
   ```

2. Accédez au répertoire du projet.

   ```bash
   cd ntw-project
   ```

3. Exécutez le docker-compose pour lancer l'application. La base de données sera initialisée avec un jeu de données de test.

   ```bash
   docker-compose up --build
   ```

4. Une fois le projet lancé avec succès, vous pouvez accéder à l'application en utilisant votre navigateur Web à l'adresse `http://localhost:4200`.

## Utilisation de l'Application

Vous pouvez vous connecter en tant qu'administrateur avec les identifiants suivants :

- **Email :** `admin@admin.com`
- **Mot de passe :** `password`

Tous les comptes créés à l'initialisation de la base de données ont le mot de passe `password`.

## Auteurs

Ce projet a été développé par :

- Silvio BRANCATI
- Iliass HALIMI
