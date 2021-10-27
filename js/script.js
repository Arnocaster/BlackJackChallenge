/**
 * OBJET JEUX DE CARTES
 */
const cardGame = {
    globalSettings :{
        cardPerGameQuantity : 52,
        joker : false,
        cardGamesQuantity : 6,
    },
    thisParty : {
        cardSet : [],
        playerToPlay : true,
        player :{
            cards : [],
            money : 500,
        },
        dealer : {         
            cards : [],
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
        

        console.log(player,dealer);
        
        //Il tire une seconde carte visible pour chaque joueur et fini par une cachée pour lui
        //A deux le croupier demande alors quelle action le joueur veut faire
        //***TOUR DU JOUEUR
        //Si le joueur a un blackjack alors il ne fait rien, le croupier joue
        //Si le joueur n'as pas de blackjack
        //-->Il peut demander une ou plusieurs cartes supplémnetaires
        //-->S'arréter et laisser le dealer jouer
        //-->Doubler sa mise mais il ne peut tirer qu'une carte et ne peux plus jouer.
        //-->Splitter SSI il a deux cartes de même valeur : chaque carte devient un jeux à part entière pour lequel il peut agir indépendement.
        //Mais il ne peut plus faire de blackjack => Si le croupier a un blackjack  le joueur perd
        //-->Assurance : si la première carte du croupier est un as le joueur peut s'assurer : Il paye la moitié de sa mise Soit le croupier fait blackjack => 
        //***TOUR DU DEALER
        //Si le dealer < 17 alors il tire
        //Si le dealer a As + 7 (=18) il s'arrete
        //Sinon il s'arrete

    },
    //CREE UN JEUX & MELANGE LES CARTES 
    createCardSet : function(){
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
                        thisColor = 'C';
                        break;
                    case 1 : 
                        thisColor = 'D';
                        break;
                    case 2 : 
                        thisColor = 'H';
                        break;
                    case 3 : 
                        thisColor = 'S';
                        break;

                }
                //BOUCLE CARTE Boucle qui génère des valeurs de cartes sans couleur
                for (let cardValue = 1 ; cardValue < 14; cardValue++){
                    let thisCard = {color : thisColor ,value : cardValue};
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
        cardGamesCollection = cardGame.sliceCards(cardGamesCollection);
        cardGamesCollection = cardGame.sliceCards(cardGamesCollection);
        
        //On coupe le jeux a une position > 52 cartes
        cardGamesCollection = cardGame.sliceCards(cardGamesCollection,52);
        cardGame.thisParty.cardSet = cardGamesCollection;
    },
    //MELANGE UN JEUX
    shuffleCards : function(cardGame){
        let shuffledCardGame =[];
        while (cardGame.length > 0){         
            let cardPicked = cardGame.splice(Math.round(Math.random()*cardGame.length-1),1);
            shuffledCardGame.push(cardPicked[0]);
           
        }
        return shuffledCardGame;
    },
    //COUPE UN JEUX 
    sliceCards : function(cardGame,minCardtoSlice){ 
        if (minCardtoSlice === undefined){ minCardtoSlice = 0;}
        let placeWhereISlice = Math.round((Math.random()*(cardGame.length-minCardtoSlice))+minCardtoSlice);
        let after = cardGame.slice(placeWhereISlice);
        let before = cardGame.slice (0,placeWhereISlice);
        if (minCardtoSlice === 0){
            after.concat(before);
            return cardGame;
        } else {
            return before;
        }
        
    },
    //PIOCHE UNE OU PLUSIEURS CARTE DANS UN JEU
    pickCard : function(numberOfCard,personToGive,cardGame){
        let thisCard = cardGame.splice(0,1);
        //console.log('pickcard', personToGive);
        personToGive.push(thisCard[0]);       
    }


};

//EXECUTION DU CODE
cardGame.init();
