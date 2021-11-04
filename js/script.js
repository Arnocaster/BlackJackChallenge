/**
 * OBJET JEUX DE CARTES
 */
const cardGame = {
    globalSettings :{
        cardPerGameQuantity : 52,
        joker : false,
        cardGamesQuantity : 6,
        minLastSplit : 52,
        minBet : 25,
        maxBet : 50,
    },
    thisParty : {
        cardSet : [],
        playerToPlay : true,
        isGameOver : false,
        player :{
            name : 'Player',
            cards : [],
            actualScore : 0,
            money : 500,
            bet : 0,
        },
        dealer : {
            name : 'Dealer',         
            cards : [],
            actualScore : 0,
            money : 50000,
        },
    },
    //FONCTION D'INITIALISATION
    init : function(){
        cardGame.createCardSet();
        
        let thisParty = cardGame.thisParty;
        let player = thisParty.player;
        let dealer = thisParty.dealer;
        let cardSet = cardGame.thisParty.cardSet;
        let players = [thisParty.player,thisParty.dealer];
        //Le joueur parie
        cardGame.playerBet();
        //Le croupier distribue une carte face visible a chaque joueur et une pour lui à la fin
        players.forEach(function(element){
            cardGame.pickCard(1,element.cards,cardSet);
        });  

        // //Il tire une seconde carte visible pour chaque joueur et fini par une cachée pour lui
        players.forEach(function(element){
            cardGame.pickCard(1,element.cards,cardSet);
        });
        cardGame.calculateScore();

        // //Affichage des cartes tirées
        players.forEach(function(element){
            cardGame.displayHandOfCards(element);
        });
        //A deux le croupier demande alors quelle action le joueur veut faire
        // //***TOUR DU JOUEUR
      
        cardGame.playerTurn();
 

        //Si le joueur a un blackjack alors il ne fait rien, le croupier joue
        //Si le joueur n'as pas de blackjack
        //-->Il peut demander une ou plusieurs cartes supplémnetaires
        //-->S'arréter et laisser le dealer jouer
        //-->Doubler sa mise mais il ne peut tirer qu'une carte et ne peux plus jouer.
        //-->Splitter SSI il a deux cartes de même valeur : chaque carte devient un jeux à part entière pour lequel il peut agir indépendement.
        //Mais il ne peut plus faire de blackjack => Si le croupier a un blackjack  le joueur perd
        //-->Assurance : si la première carte du croupier est un as le joueur peut s'assurer : Il paye la moitié de sa mise Soit le croupier fait blackjack => 
        // //***TOUR DU DEALER
        //Si le dealer < 17 alors il tire
        //Si le dealer a As + 7 (=18) il s'arrete
        //Sinon il s'arrete

    },
    //FONCTION : CREE UN JEUX & MELANGE LES CARTES 
    createCardSet : function(){
        //FONCTION QUI TRANSFORME LE NUMERO DE LA CARTE (0-13) par sa valeur en jeux
        function scoreValue(cardNumber){
            if (cardNumber > 10 ){
                return 10;
            } else {
                return cardNumber;
            }
        }
        //Array qui va stocker toutes les cartes
        // BOUCLE COLLECTION DE JEUX DE CARTE
        let cardGamesCollection = [];
        for(let numberOfCardGame = 0 ; numberOfCardGame < cardGame.globalSettings.cardGamesQuantity;numberOfCardGame++){
           
            // BOUCLE JEUX DE CARTE
            let thisCardGame = [];
            for (let cardColor = 0 ; cardColor < 4 ; cardColor++){
                // Trèfle = Clubs ; Carreaux = Diamonds ; Coeur = Hearts ; Pique = Spades 
                let thisColor = null;
                switch(cardColor) {
                    case 0 : 
                        thisColor = '\u2663';
                        break;
                    case 1 : 
                        thisColor = '\u2666';
                        break;
                    case 2 : 
                        thisColor = '\u2665';
                        break;
                    case 3 : 
                        thisColor = '\u2660';
                        break;

                }
                
            
                //BOUCLE CARTE Boucle qui génère des valeurs de cartes sans couleur
                for (let cardValue = 1 ; cardValue < 14; cardValue++){
                    let thisCard = {color : thisColor ,value : cardValue, score : scoreValue(cardValue) };
                    thisCardGame.push(thisCard);
                }
                //FIN DE LA BOUCLE JEUX DE CARTE
                //On (mélange + coupe) * 2 
                thisCardGame = cardGame.shuffleCards(thisCardGame);
                thisCardGame = cardGame.sliceCards(thisCardGame);
                thisCardGame = cardGame.shuffleCards(thisCardGame);
                thisCardGame = cardGame.sliceCards(thisCardGame);
                cardGamesCollection.push(thisCardGame);
                
            }
            
            //FIN DE LA BOUCLE COLLECTION DE JEUX DE CARTE
            //Si la collection est complète On rassemble les jeux de cartes
            if (numberOfCardGame === cardGame.globalSettings.cardGamesQuantity-1){
                for (let i = 1 ; i < cardGamesCollection.length; i++){
                    cardGamesCollection[0] = cardGamesCollection[0].concat(cardGamesCollection[i]);
                }
                cardGamesCollection = cardGamesCollection[0];
         
            }

       
            
        }
        //On coupe deux foix l'ensemble des jeux
        // cardGamesCollection = cardGame.sliceCards(cardGamesCollection);
        // cardGamesCollection = cardGame.sliceCards(cardGamesCollection);
        
        //On coupe le jeux a une position > 52 cartes
        cardGamesCollection = cardGame.sliceCards(cardGamesCollection,cardGame.globalSettings.minLastSplit);
        cardGame.thisParty.cardSet = cardGamesCollection;
    },
    //FONCTION : MELANGE UN JEUX
    shuffleCards : function(cardGameElt){
        let shuffledCardGame =[];
        while (cardGameElt.length > 0){         
            let cardPicked = cardGameElt.splice(Math.round(Math.random()*cardGameElt.length-1),1);
            shuffledCardGame.push(cardPicked[0]); 
        }
        return shuffledCardGame;
    },
    //FONCTION : COUPE UN JEUX 
    sliceCards : function(cardGameElt,minCardtoSlice){ 
        if (minCardtoSlice === undefined){ minCardtoSlice = 0;}
        let placeWhereISlice = Math.round((Math.random()*(cardGameElt.length-minCardtoSlice))+minCardtoSlice);
        let after = cardGameElt.slice(placeWhereISlice);
        let before = cardGameElt.slice (0,placeWhereISlice);
        if (minCardtoSlice === 0){
            after.concat(before);
            return cardGameElt;
        } else {
            return before;
        }
        
    },
    //FONCTION : PIOCHE UNE OU PLUSIEURS CARTE DANS UN JEU
    pickCard : function(numberOfCard,personToGive,cardGameElt){
        let thisCard = cardGameElt.splice(0,1);
        //console.log('pickcard', personToGive);
        personToGive.push(thisCard[0]);     
    },
    //FONCTION : Affichage d'une main
    displayHandOfCards : function(handOfCards){
        let cardsToShow = `${handOfCards.name}:`;
        handOfCards.cards.forEach(function(element){
            let thisValue = null;
            switch (element.value){
                case 11 : 
                    thisValue = 'J';
                    break;
                case 12 : 
                    thisValue = 'Q';
                    break;
                case 13 : 
                    thisValue = 'K';
                    break;
                default :
                    thisValue = element.value;
                    break;
            
            }
            cardsToShow += `${element.color}${thisValue}|`;          
        });
        cardsToShow += `(${handOfCards.actualScore})`;
        //Affiche Paris et argent restant
        if (handOfCards.name !== 'Dealer'){
            cardsToShow += ` [Bet: ${cardGame.thisParty.player.bet}$ (Money : ${cardGame.thisParty.player.money})]`;
        }
        console.log(cardsToShow);
    },
    //FONCTION : Calcule le score des deux mains actuelles et mets à jour les valeurs
    calculateScore : function(){
        let thisParty = cardGame.thisParty;
        let players = [thisParty.dealer,thisParty.player];
        //Player elt renvoie l'objet player
        players.forEach(function(playerElt){
            playerElt.actualScore = 0;
            //playerCards renvoire le sous objet cards de l'objet player
            playerElt.cards.forEach(function(playerCard){
                //Si après addition le score < 21 alors la carte vaut 11 
                if (playerCard.score === 1 && (playerElt.actualScore + playerCard.score) < 21) {
                    playerCard.score = 11;
                }
                playerElt.actualScore += playerCard.score;
                
            });
        });
    },
    //FONCTION : Calcule les gains du joueur
    calculatePrize : function(){

    },
    playerBet : function (){
        let playerBet = Number(prompt(`Combien voulez vous parier (Min :${cardGame.globalSettings.minBet}$, Max : ${cardGame.globalSettings.maxBet}$)?`));
        if(playerBet >= cardGame.globalSettings.minBet 
                     && playerBet <= cardGame.globalSettings.maxBet 
                     && playerBet <= cardGame.thisParty.player.money){
            cardGame.thisParty.player.money -= playerBet;
            cardGame.thisParty.player.bet = playerBet;
            cardGame.thisParty.dealer.money += playerBet;
            return;
        } else (cardGame.playerBet());
    },
    //FONCTION : MECANIQUE DE JEU DU JOUEUR 
    playerTurn : function(){
        let thisParty = cardGame.thisParty;
        let player = thisParty.player;
        //Si le joueur a 21 il s'arrete automatiquement
        if (player.actualScore === 21) {
            thisParty.playerToPlay = false;
            cardGame.dealerTurn();
        } else {
            //Sinon on lui propose de jouer
            let playerAction = Number(prompt('Que voulez vous faire?\n 1)Tirer une carte 2)S\'arréter 3)Doubler 4)Spliter'));

            switch (playerAction){
                //Le joueur tire
                case 1 : 
                    cardGame.pickCard(1,player.cards,thisParty.cardSet);
                    cardGame.calculateScore();  
                    cardGame.displayHandOfCards(player);
                    //Si son score n'a pas dépassé 21 il peut rejouer
                    if (player.actualScore < 21){
                        cardGame.playerTurn();
                    //Sinon c'est le tour du dealer
                    } else {
                        cardGame.dealerTurn();
                    }
                    break;
                case 2 : 
                    //Le joueur s'arrete c'est au tour du dealer
                    thisParty.playerToPlay = false;
                    cardGame.dealerTurn();
                    break;
                //Si ce n'est pas un de ces 4 cas
                default : cardGame.playerTurn();
            }
        }
       
    },

    //A retravailler
    dealerTurn : function(){
        let thisParty = cardGame.thisParty;
        let dealer = thisParty.dealer;
        //Si le dealer a deux cartes && As + 7 ou inversement, il reste.
        // if(dealer.cards.length < 3 && dealer.cards[0] === 1 && dealer.cards[1] === 7
        //     ||dealer.cards.length < 3 && dealer.cards[0] === 7 && dealer.cards[1] === 1){
        //     cardGame.isGameOver();
        //     return;
        if (dealer.actualScore <= 17){
            cardGame.pickCard(1,dealer.cards,thisParty.cardSet);
            cardGame.calculateScore();  
            cardGame.displayHandOfCards(dealer);
            if (dealer.actualScore < 17) {
                cardGame.dealerTurn();
            } else {
                cardGame.isGameOver();
            }
        } else {
            cardGame.isGameOver();
        }
         
    },
    //FONCTION : CONTROLE LE GAME OVER
    isGameOver : function(){
        let thisParty = cardGame.thisParty;
        let playerBet = thisParty.player.bet;
        let playerMoney = thisParty.player.money;
        let dealerMoney = thisParty.dealer.money;
        let playerScore = thisParty.player.actualScore;
        let dealerScore = thisParty.dealer.actualScore;
        let winner = null;
        let looser = null;
        let playerPrize = 0;
        //debugger;
        //Si le joueur a dépassé 21 OU un score inferieur au dealer il a perdu
        if (playerScore > 21 || playerScore < dealerScore && dealerScore < 21){
            winner = thisParty.dealer;
            looser = thisParty.player;
            playerPrize = 0;
            //Si le dealer a dépassé 21 && que le joueur n'a pas dépassé OU que le score du dealer est inferieur à celui du joueur le dealer a perdu
        } else if (dealerScore > 21 && playerScore <= 21 || dealerScore < playerScore){
            winner = thisParty.player;
            looser = thisParty.dealer;
            //si le joueur a un blackjack il gagne pour un ratio de 3:2 (mise *(2+3)/2) ou indice 2.5
            if (playerScore === 21){
                playerPrize = (playerBet * 5)/2;
                playerMoney += playerPrize;
            } else {
                //Si le joueur gagne simplement le casino verse 1:1 c'est a dire 2 fois sa mise dont sa mise de départ soit 2x sa mise
                playerPrize = playerBet * 2;
                playerMoney += playerPrize;
                dealerMoney -= playerPrize;
            }
        } else {
            //sinon égalité et aucun dépassement le joueur récupère sa mise
            playerPrize = playerBet;
            playerMoney += playerPrize;
            dealerMoney -= playerPrize;
        }

        let recette = playerPrize - playerBet;
        console.log(`${looser.name} a perdu (${looser.actualScore}), c'est ${winner.name} qui remporte la partie!`);
        console.log(`Il vous reste ${playerMoney}$ votre recette est de ${recette}$`);
        playerBet = 0;
    },
};

//EXECUTION DU CODE
cardGame.init();
