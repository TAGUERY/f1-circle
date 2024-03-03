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
 Toutes les données sont affichées sur des sites web, il faudra donc les extraire manuellement. 
 - Les données numériques sur les pilotes, circuits et constructeurs seront mise dans un fichier JSON.
 - Les données textuelles comme les annecdotes, pourront être mise dans un tableau. Nous pourrons piocher dans le tableau pour ajouter les annecdotes sur le site web.

**But**: 
Le projet est conçu pour expliquer le monde de la Formule 1, il permet de faire d'écouvrir la F1 de manière simple avec des annecdotes ainsi que de simple informations sur les pilotes/écuries/pistes. 
Le but est de faire apprendre de manière agréable et amusante avec des informations diverses dans ce monde. 

**Références**: 
Les données utilisées via le site de la formule 1 est utilisé par beaucoup d'autres personnes. En effet, toutes les applications parlant de F1, site de sport mécanique, etc. peuvent utiliser ces donner pour les affichers selon leur envie sur le site internet. Toutes ces données seront donc très souvent utilisées dans le contexte du sport automobile. Leur utilisation peut varier selon les sites/applications. 
