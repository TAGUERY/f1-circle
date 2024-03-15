# f1-circle

**Contexte** : 

Les données : 
1. pilotes, circuits, écurie : formula1.com
  - site officiel de la f1 qui regroupe toutes les données des pilotes, circuits et écuries
  - Toutes les données depuis le début de la F1 sont stockés dans leur database.
   
2. circuits svg : https://github.com/f1laps/f1-track-vectors
  - circuits svg qui seront téléchargés pour être affichée sur le site.
  - le repo utilise les ressources du jeu F1, de codemaster, pour mettre à disposition les tracés. 

3. annectdotes f1 :
    3.1. https://www.dubizzle.com/blog/cars/formula-1-facts/
      - les données seront prises manuellement du site pour créer notre base de donnée de fun facts.
      - le site dubizzle est une blog de voiture qui regroupe plusieurs informations dans le monde automobile.
    3.2 (d'autres données à trouver sur des pilotes/circuits/etc. 

**Description** 
Les données sont organisées de manière structurée pour assurer une gestion efficace et une utilisation simplifiée dans le cadre du projet. Voici comment chaque type de données sera structuré :
 
Données Numériques (JSON):
    Les données relatives aux pilotes, circuits et constructeurs seront stockées dans des fichiers JSON distincts.
    Chaque fichier JSON aura une structure définie avec des attributs spécifiques pour chaque entité (pilote, circuit, écurie).
    Par exemple, le fichier "pilotes.json" pourrait contenir des attributs tels que "Nom", "Nationalité", "Équipe actuelle", etc.

Données Textuelles (Tableau):
    Les anecdotes et autres données textuelles seront organisées dans un tableau CSV.
    Chaque élément du tableau représentera une anecdote ou une information textuelle.
    L'accès aux informations se fera de manière dynamique en tirant aléatoirement des éléments du tableau pour enrichir le contenu du site web.


**But**: 
Le projet est conçu pour expliquer le monde de la Formule 1, il permet de faire d'écouvrir la F1 de manière simple avec des annecdotes ainsi que de simple informations sur les pilotes/écuries/pistes. 
Le but est de faire apprendre de manière agréable et amusante avec des informations diverses dans ce monde. 

**Références**: 
Les données utilisées via le site de la formule 1 est utilisé par beaucoup d'autres personnes. En effet, toutes les applications parlant de F1, site de sport mécanique, etc. peuvent utiliser ces donner pour les affichers selon leur envie sur le site internet. Toutes ces données seront donc très souvent utilisées dans le contexte du sport automobile. Leur utilisation peut varier selon les sites/applications. 


** Maquette Figma **
https://www.figma.com/file/aHjqff5qHTj6d1IeCdGtXg/Maquette-f1circle?type=design&node-id=0%3A1&mode=design&t=QFFKYciPC3J9L0yE-1
