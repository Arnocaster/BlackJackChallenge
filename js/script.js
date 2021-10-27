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
        cards : [],
    },
    //CREE UN JEUX & MELANGE LES CARTES 
    start : function(){
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
            cardGamesCollection.push(thisCardGame);
            //Mélange une fois les jeux rassemblés
            if (numberOfCardGame === cardGame.globalSettings.cardGamesQuantity-1){
                //On fusionne les 6 tableaux
                for (var i = 1 ; i < cardGamesCollection.length; i++){
                    cardGamesCollection[0] = cardGamesCollection[0].concat(cardGamesCollection[i]);
                }
                cardGamesCollection = cardGamesCollection[0];
            }
        }
        cardGame.thisParty.cards.push(cardGamesCollection);
    }
};

//EXECUTION DU CODE
cardGame.start();