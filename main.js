(function(window) {

    let Card = function(){
        this.id = ""
        this.data = ""
        this.cardCont = document.createElement('div')
        this.cardCont.className = 'card_container'
        this.cardFront = document.createElement('div')
        this.cardFront.className = 'card_front'
        this.cardBack = document.createElement('div')
        this.cardBack.className = 'card_back'
        this.buildCard = function(parentFrag){
            let flipDiv = document.createElement('div'),
                frontValDiv = document.createElement('div'),
                backValDiv = document.createElement('div'),
                catDiv = document.createElement('div')

                flipDiv.className = "flip"
                frontValDiv.className = "front_val"
                backValDiv.className = "back_val"
                catDiv.className = "cat_val"

            frontValDiv.innerHTML = this.data.q //this q comes from flashcard_QA.json file
            backValDiv.innerHTML = this.data.a

            //link to 'learn more'
            let learnMore = document.createElement('a')
            learnMore.text = 'Learn More'
            learnMore.href = this.data.link
            learnMore.target = '_blank'
            learnMore.addEventListener('click', function(e){
                e.stopPropagation()
            })
            let infoImage = document.createElement('img')
            infoImage.src =  'images/info.svg'
            learnMore.appendChild(infoImage)
            backValDiv.appendChild(learnMore)
            catDiv.innerHTML = this.data.category
            

            this.cardFront.appendChild(frontValDiv)
            this.cardFront.appendChild(catDiv)
            this.cardBack.appendChild(backValDiv)

            flipDiv.appendChild(this.cardFront)
            flipDiv.appendChild(this.cardBack)

            this.cardCont.id = this.id
            this.cardCont.appendChild(flipDiv)
            this.cardCont.addEventListener('click', function(e){
                e.currentTarget.classList.toggle('flip_card')
                
            })
            parentFrag.appendChild(this.cardCont)

                
        }
    }

    let Deck = function(deck_div, option){
        this.deckData = option.data 
        this.buildDeck = function(){
            //this function is highly reused. first starting the game and also after shuffling
            
            let parentFrag = document.createDocumentFragment() //https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
            deck_div.innerHTML = ""
            for(let i = this.deckData.length - 1; i >= 0; i--){
                let card = new Card()
                card.id = "card-" + i
                card.data =  this.deckData[i]
                card.buildCard(parentFrag)
            }
            deck_div.appendChild(parentFrag)
        }
    }
    Deck.prototype.shuffle = function(cardsToShuffle){
        //https://bost.ocks.org/mike/shuffle/

        var m = cardsToShuffle.length, t, i;

        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = cardsToShuffle[m];
          cardsToShuffle[m] = cardsToShuffle[i];
          cardsToShuffle[i] = t;
        }
      
        return cardsToShuffle;
    }

    let Game = function(el, option){
        this.el = document.getElementById(el)
        this.option = option

        //info section
        this.info_div = document.createElement('div')
        this.info_div.id = 'info_div'

        //deck section
        this.deck_div = document.createElement('div')
        this.deck_div.id = 'deck_div'
        this.gameDeck = new Deck(this.deck_div, option)
        this.gameDeck.buildDeck()

        //shuffle
        let shuffleBtn = document.createElement('button')
        shuffleBtn.innerHTML = 'Shuffle'
        shuffleBtn.addEventListener('click', (e) => {
            this.gameDeck.deckData = this.gameDeck.shuffle.call(this, this.gameDeck.deckData)
            this.gameDeck.buildDeck(this.deck_div)
        })
        this.info_div.appendChild(shuffleBtn)
        //discard pile
        //rules

    
        this.el.appendChild(this.info_div)
        this.el.appendChild(this.deck_div)
    }

    window.Game = Game
})(window);