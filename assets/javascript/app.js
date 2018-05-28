window.onload = function() {

  var pokemonObj = {
    './assets/images/bulbasaur.jpg': {
      Bulbasaur: true,
      Ivysaur: false,
      Venusaur: false,
      Raichu: false
    },
    './assets/images/charizard.jpg': {
      Charizard: true,
      Nidoking: false,
      Charmander: false,
      Vulpix: false
    },
    './assets/images/gengar.jpg': {
      Gengar: true,
      Haunter: false,
      Jynx: false,      
      Geodude: false
    },
    './assets/images/feraligatr.jpg': {
      Feraligatr: true,
      Ekans: false,
      Blastois: false,
      Golem: false
    },
    './assets/images/sudowoodo.jpg': {
      Sudowoodo: true,
      Koffing: false,
      Cubone: false,
      Tauros: false
    },
    './assets/images/magikarp.jpg': {
      Magikarp: true,
      Gyarados: false,
      Lapras: false,
      Eevee: false
    },
    './assets/images/metagross.jpg': {
      Metagross: true,
      Omastar: false,
      Omanyte: false,
      Kabuto: false
    },
    './assets/images/entei.jpg': {
      Entei: true,
      Suicune: false,
      Moltres: false,
      Flareon: false
    },
    './assets/images/blaziken.jpg': {
      Blaziken: true,
      Numel: false,
      Salamence: false,
      Zigzagoon: false
    },
    './assets/images/kyogre.jpg': {
      Kyogre: true,
      Groudon: false,
      Rayquaza: false,
      Deoxys: false
    }
  };

  //allows/prevents the click event from being used
  var canClick = true;

  //used to store and clear the interval for each round
  var interval;

  //tracks the score
  var correct = 0;
  var incorrect = 0;
  var skipped = 0;

  var gameObj = {
    //gets set when getPokemonChoices is invoked
    randomPokemon: undefined,

    //will store the object value for each pokemon.
    pokemonChoicesObj: undefined,

    //will store an array of keys from pokemonChoicesObj
    pokemonChoicesArr: undefined,

    //will store the correct pokemon
    correctChoice: undefined,

    //will be the remaining pokemon file paths. After a round, that pokemon is removed from this array
    remainingPokemon: undefined,

    //time used for each round
    time: 5,

    //gets all the pokemon from pokemonObj by collecting all the keys as an array. Called at the start of each game.
    getRemainingPokemon: function() {
      this.remainingPokemon = Object.keys(pokemonObj);
    },

    //gets the random pokemon, and its choices
    getPokemonChoices: function() {

      //gets random number based off how many keys are in this.remainingPokemon
      var randomNumber = Math.floor(Math.random() * this.remainingPokemon.length);

      //selects a random key (pokemon image) from this.remainingPokemon based off the random number
      this.randomPokemon = this.remainingPokemon[randomNumber];

      //sets all choices for the current pokemon as an object
      this.pokemonChoicesObj = pokemonObj[this.randomPokemon];

      //removes the current question from this.remainingPokemon array
      this.remainingPokemon.splice(randomNumber, 1);

      //gets an array of the pokemon we can choose from, from this.pokemonChoicesObj. Passes that array to this.randomizeChoices to display each choice in a random order
      this.pokemonChoicesArr = this.randomizeChoices(Object.keys(this.pokemonChoicesObj));
    },

    //this.pokemonChoicesArr will be passed into this function in order to randomly display the choices
    randomizeChoices: function(arr) {
      var newArr = [];

      //a while loop is needed since arr.length is changing on each loop due to the splice method      
      while (arr.length > 0) {

        //generates a random number to pull a value from arr
        var randomNumber = Math.floor(Math.random() * arr.length);
        var current = arr[randomNumber];

        //removes the random pokemon from the passed in array
        arr.splice(randomNumber, 1);

        //pushes the random value into the new array.
        newArr.push(current);
      }

      //final result is a new array with its values in a random order
      return newArr;
    },

    //Starts a new round. displays the choices.
    start: function() {
      this.getPokemonChoices();

      //starts the timer for the round
      this.startTimer();

      //allows the click event to run at the start of a new round.
      canClick = true;

      //countdown bg color starts at 100%
      $('.timer--background-fill').css('height', '100%');

      //updates .pokemon-container__image with the pokemon image
      $('.pokemon-container__image').attr('src', this.randomPokemon);

      //Used to reset the time on each new round
      this.time = 5;
      $('.timer__p--position').text(`${this.time}`);

      //displays choices to the screen
      for (i = 0; i < this.pokemonChoicesArr.length; i++) {

        //current choice for each loop through this.pokemonChoicesArr
        var choice = this.pokemonChoicesArr[i];
        
        //gets the true or false value of each key from this.pokemonChoicesObj
        var potentialAnswer = this.pokemonChoicesObj[choice];
        
        //If potential answer is true, then the choice variable is correct. Stores choice in this.correctChoice
        if (potentialAnswer) { this.correctChoice = choice; }

        //adds choices to the screen
        var children = $('.game-content').children();
        $(children[i]).text(choice);
      }

    },

    //subtracts from the total time and updates timer__p--position with the time
    decrement: function() {

      //only updates if greater than 0
      if (this.time > 0) {
        this.time--;
        $('.timer__p--position').text(`${gameObj.time}`);
      }

      //clears interval if time is out 
      else {
        clearInterval(interval);
        skipped++;
        $('.game-score-tracker__div3--style .badge').text(`${skipped}`);

        //if no more questions remain, then the game is over. Brings back all questions and resets score
        if (this.remainingPokemon.length === 0) {
          canClick = false
          //displays new game button
          $('.btn--width').fadeIn();

        //if questions remain, then a new question is given automatically
        } else {
          this.start();
        }
      }

      //determines the percent of time used for the round. This is used for the changing height of the bg color on the timer
      var timeLeft = (this.time / 5) * 100;
      timeLeft += '%';
      $('.timer--background-fill').css('height', timeLeft);
    },

    //gets invoked in this.start to begin the timer.
    startTimer: function() {
      interval = setInterval(gameObj.decrement.bind(gameObj), 1000);
    }
  };

  //checks if the guess was correct
  $('.game-content__div--style').click(function() {

    //prevents the click event from running when the setTimeout function gets called to start a new round.
    if (canClick) {
      canClick = false;

      //clears the current interval for the round.
      clearInterval(interval);

      //clears the timer bg color
      $('.timer--background-fill').css('height', '0');

      //tracks the correct and incorrect guesses
      if ($(this).text() === gameObj.correctChoice) {
        correct++;
        $('.game-score-tracker__div1--style .badge').text(`${correct}`);
        $('.timer__p--position').text('Correct!');
      } else {
        incorrect++;
        $('.game-score-tracker__div2--style .badge').text(`${incorrect}`);
        $('.timer__p--position').text('Incorrect!');
      }

      //if the gameObj.remainingPokemon array has 0 items, then its the last round of the game.
      if (gameObj.remainingPokemon.length > 0) {

        //starts a new round after 2 seconds
        setTimeout(gameObj.start.bind(gameObj), 2000);
      } else {

        //fades in new game button
        $('.btn--width').fadeIn();
      }
    }
  });

  // starts the first game
  $('.start-game-btn').click(function() {

    //reveals main content
    $('.game').fadeIn();

    //removes button
    $(this).remove();

    //These 2 functions start the game
    gameObj.getRemainingPokemon();
    gameObj.start();
  });

  //starts a new game after a game is finished
  $('.btn--width').click(function () {

    //resets scores
    canClick = true;
    correct = 0;
    incorrect = 0;
    skipped = 0;

    //These 2 methods used together start a new game
    gameObj.getRemainingPokemon();
    gameObj.start();

    //fades button out
    $('.btn--width').fadeOut();

    //resets score display
    $('.game-score-tracker__div1--style .badge').text(`${correct}`);
    $('.game-score-tracker__div2--style .badge').text(`${incorrect}`);
    $('.game-score-tracker__div3--style .badge').text(`${skipped}`);
  });

};