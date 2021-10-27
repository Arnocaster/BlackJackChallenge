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
    },
    //CREE UN JEUX & MELANGE LES CARTES 
    init : function(){
        //Array qui va stocker toutes les cartes
        //COLLECTION DE JEUX DE CARTE
        let cardGamesCollection = [];
        //Boucle qui génère 6 jeux
        for(let numberOfCardGame = 0 ; numberOfCardGame < cardGame.globalSettings.cardGamesQuantity;numberOfCardGame++){
            //COLLECTION DE JEUX DE CARTES
            let thisCardGame = [];
            //JEUX DE CARTE
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
                //CARTE Boucle qui génère des valeurs de cartes sans couleur
                for (let cardValue = 1 ; cardValue < 14; cardValue++){
                    let thisCard = {color : thisColor ,value : cardValue};
                    thisCardGame.push(thisCard);
                }

            }
            //On (mélange + coupe) * 2 
            thisCardGame = cardGame.shuffleCards(thisCardGame);
            thisCardGame = cardGame.sliceCards(thisCardGame);
            thisCardGame = cardGame.shuffleCards(thisCardGame);
            thisCardGame = cardGame.sliceCards(thisCardGame);
            cardGamesCollection.push(thisCardGame);
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
        cardGame.thisParty.cardSet.push(cardGamesCollection);
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
            console.log(placeWhereISlice);
            return before;
        }
        
    }
};

//EXECUTION DU CODE
cardGame.init();
console.log(cardGame.thisParty.cardSet);