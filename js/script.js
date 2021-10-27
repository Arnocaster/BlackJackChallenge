/**
 * OBJET JEUX DE CARTES
 */
const cardGame = {
    globalSettings :{
        cardPerGameQuantity : 52,
        joker : false,
        cardGamesQuantity : 6,
        minLastSplit : 52,
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
        //Le croupier distribue une carte face visible a chaque joueur et une pour lui à la fin
        players.forEach(function(element){
            cardGame.pickCard(1,element.cards,cardSet);
        });  

        // //Il tire une seconde carte visible pour chaque joueur et fini par une cachée pour lui
        players.forEach(function(element){
            cardGame.pickCard(1,element.cards,cardSet);
        });
        cardGame.calculateScore();  
        cardGame.isGameOver();

        // //Affichage des cartes tirées
        players.forEach(function(element){
            cardGame.displayHandOfCards(element);
        });
        //A deux le croupier demande alors quelle action le joueur veut faire
        // //***TOUR DU JOUEUR
        cardGame.playerTurn();
        cardGame.dealerTurn();
        cardGame.playerTurn();
        cardGame.dealerTurn();
 

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
    //FONCTION : MECANIQUE DE JEU DU JOUEUR 
    playerTurn : function(){
        let thisParty = cardGame.thisParty;
        let player = thisParty.player;
        let playerAction = Number(prompt('Que voulez vous faire?\n 1)Tirer une carte 2)S\'arréter 3)Doubler 4)Spliter'));
        switch (playerAction){
            case 1 : 
                cardGame.pickCard(1,player.cards,thisParty.cardSet);
                cardGame.calculateScore();  
                cardGame.displayHandOfCards(player);
                cardGame.isGameOver();
                break;
            default : 'défaut';
        }
    },
    dealerTurn : function(){
        let thisParty = cardGame.thisParty;
        let dealer = thisParty.dealer;
        //Si le dealer a deux cartes && As + 7 ou inversement
        if(dealer.cards.length < 3 && dealer.cards[0] === 1 && dealer.cards[1] === 7
            ||dealer.cards.length < 3 && dealer.cards[0] === 7 && dealer.cards[1] === 1){
            return;
        } else if (dealer.actualScore < 17){
            cardGame.pickCard(1,dealer.cards,thisParty.cardSet);
            cardGame.calculateScore();  
            cardGame.displayHandOfCards(dealer);
            cardGame.isGameOver();
        } else {
            return;
        }

    },
    //FONCTION : CONTROLE LE GAME OVER
    isGameOver : function(){
        let thisParty = cardGame.thisParty;
        let playerScore = thisParty.player.actualScore;
        let dealerScore = thisParty.dealer.actualScore;
        let winner = null;
        let looser = null;
        
        if (playerScore > 21){
            winner = thisParty.dealer;
            looser = thisParty.player;
            thisParty.isGameOver = true;
        } else if  (dealerScore > 21){
            winner = thisParty.player;
            looser = thisParty.dealer;
            thisParty.isGameOver = true;
        }      
        if (thisParty.isGameOver === true){
            console.log(`${looser.name} a dépassé les limites (${looser.actualScore}), c'est ${winner.name} qui remporte la partie!`);
        }
    },
};

//EXECUTION DU CODE
cardGame.init();
