# Journée de Révision
<img src="https://static.vecteezy.com/system/resources/previews/002/232/210/original/blackjack-logo-on-a-green-background-with-cards-chips-and-money-card-game-casino-game-illustration-free-vector.jpg" alt="drawing" width="200"/>

### Contexte :hearts::
Vous devez développer un jeu de blackJack pour au moins un joueur.  
Technos autorisées **HTML + CSS + JS**  
Organisation du projet libre  
Rendu du projet libre (pur texte ou graphique)  

Remise du livrable : **17h le 27/10** :metal: -- Tous les git seront téléchargés.   
**5 minutes de présentation par projet de 17h a 18h sur Discord (salon à définir)**  
### Ressources (Assets graphiques):
- 8 bit Deck card  
[<img src="https://img.itch.zone/aW1nLzM5NjQ5MTEuZ2lm/original/kS4Rjh.gif" alt="drawing" width="200"/>](https://drawsgood.itch.io/8bit-deck-card-assets)
- Fantasy Card  
 [<img src="https://img.itch.zone/aW1nLzQ5MTUwNDYucG5n/original/njs5rD.png" alt="drawing" width="200"/>](https://cazwolf.itch.io/pixel-fantasy-cards)
- Ou démerdez vous avec ça :wink: : https://itch.io/game-assets/free/tag-card-game
### But du jeu :diamonds::
La partie oppose individuellement chaque joueur contre la banque.   
**Le but est de battre le croupier sans dépasser le score de 21.**  
Dès qu'un joueur fait plus que 21, on dit qu'il « brûle » et il perd sa mise initiale. 
La valeur des cartes sont les suivantes :  
- de 2 à 9 : valeur nominale de la carte ;
- de 10 au roi (surnommées « bûche »)  : 10 points ;
- As : 1 ou 11 points (au choix du joueur).

Un Blackjack est la situation ou le joueur reçoit, dès le début du jeu, un As et une buche. 
Si le joueur atteint 21 points avec plus de deux cartes, on compte 21 points et non Blackjack.  

Les mises 	:dollar:	:dollar: sont toujours définies par le casino (le casino c'est vous :wink: ).  
La mise minimale est le montant minimum qu'un joueur doit parier pour jouer, et la mise maximale est le montant maximal que le joueur peut parier à chaque partie.  

### Mélange des cartes :spades: :
En général on compte **six jeux de 52 cartes**, afin d'éviter le comptage des cartes par les joueurs.  
1. Avant la première partie, les jeux de cartes sont séparés en plusieurs tas, chacun mélangé et coupé deux fois. 
2. Après cette étape, le jeu est rassemblé, coupé une fois par le croupier et une deuxième fois par un joueur. 
3. Enfin, une carte d'arrêt épaisse et rouge, afin d'être bien visible, est placée par le croupier, de manière à séparer le jeu en deux parties. 
La carte d'arrêt doit être placée en évitant d'avoir une partie du jeu inférieure à la taille d'un paquet de 52 cartes

**Lorsque la carte d'arrêt rouge est tirée**, le croupier termine le jeu en cours, rassemble les cartes déjà utilisées et les cartes restantes dans le sabot, et mélange le tout selon la procédure décrite précédemment.

### Tours de jeux 	:clubs:: 
1. **Au début de la partie**, le croupier distribue une carte face visible à chaque joueur et une carte face visible pour lui.  
  Il tire ensuite pour chaque joueur une seconde carte face visible et une seconde carte face cachée pour lui.  
  Les joueurs débutent donc la partie avec deux cartes visibles.  

2. **Une fois les premières cartes distribuées**, le croupier demande au premier joueur de la table (joueur situé à sa gauche) l'option qu'il désire choisir.  
Le joueur à plusieurs options selon la situation :

  - **Si le joueur à un Blackjack**, il n'a aucun choix à faire. Le joueur attend donc l'annonce des résultats.

   - **Si le joueur n'a pas de Blackjack,** plusieurs choix sont possibles :

   - **Demander une ou plusieurs cartes supplémentaires**, afin de se rapprocher de 21, sans le dépasser. 
Le joueur annonce alors « Carte ! », ou tapote sur la table de jeu (en anglais, on dit que le joueur « Hit », c'est-à-dire qu'il tire).  
   - **S'arrêter ou « rester »**(en anglais, on dit que le joueur « Stand »), et donc conserver ses cartes.  
Le joueur survole alors ses cartes avec sa main, pour indiquer son intention au croupier, ou annonce « je reste » ou « je m'arrête ».  
   - **Doubler sa mise** , à la seule condition de ne recevoir qu'une carte après cela.  
Le joueur double sa mise et reçoit une troisième carte finale.
   - **Splitter** Si le joueur à deux cartes de même valeur,**il peut « spliter »**, c'est-à-dire séparer ses deux cartes afin de jouer avec deux jeux, et une mise supplémentaire égale à celle qu'il a jouée au départ.  
Une fois les jeux séparés, le croupier ajoute une carte sur chaque main (afin d'en avoir deux par main), et le joueur joue chaque main de la même façon qu'une main simple.  
De manière générale, lors d'une séparation de deux cartes, il n'est pas possible d'obtenir un Blackjack. Par exemple, un joueur qui sépare deux bûches, et qui obtient un As sur une des deux mains, se verra compter 21 points et non un Blackjack. Ainsi, si le croupier à un Blackjack, le joueur perd sa mise.
- > On garde? Une règle particulière concerne la séparation de deux As : en séparant deux As, le joueur ne peut recevoir qu'une seule carte pour chacun des jeux et ne pourra pas séparer son jeu à nouveau s'il reçoit un troisième As10. Cependant
- > On garde? **Abandonner (en anglais : « Surrender »), et perdre la moitié de sa mise.**
- > On garde? **Dans certains casinos, le joueur peut séparer une troisième fois son jeu, si il obtient à nouveau une paire de même valeur.**  

  - **Assurance** Si la première carte du croupier est un As, le joueur a la possibilité de s'assurer contre un éventuel Blackjack du croupier. Pour cela, le joueur paye la moitié de sa mise initiale.

      1. **Si le croupier fait Blackjack**, il reçoit le double de son assurance (et pert sa mise sauf si le joueur à également Blackjack, auquel cas, il récupère sa mise) ;
      2. **Si le croupier ne fait pas Blackjack**, le joueur perd son assurance et le jeu reprend normalement.

### Fin de la partie
- Soit le joueur sort car il le souhaite.
- Soit le joueur est ruiné.
- Soit le casino est ruiné.
