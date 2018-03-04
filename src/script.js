window.onload = function() {

  var questionsObj = {
    'https://img.pokemondb.net/artwork/bulbasaur.jpg': [
      {Bulbasaur: true},
      {Ivysaur: false},
      {Venusaur: false},
      {Raichu: false}
    ],
    'https://img.pokemondb.net/artwork/charizard.jpg': [
      {Charizard: true},
      {Nidoking: false},
      {Charmander: false},
      {Vulpix: false}
    ],
    'https://img.pokemondb.net/artwork/gengar.jpg': [
      {Gengar: true},
      {Haunter: false},
      {Jynx: false},
      {Geodude: false}
    ],
    'https://img.pokemondb.net/artwork/feraligatr.jpg': [
      {Feraligatr: true},
      {Ekans: false},
      {Blastoise: false},
      {Golem: false}
    ],
    'https://img.pokemondb.net/artwork/sudowoodo.jpg': [
      {Sudowoodo: true},
      {Koffing: false},
      {Cubone: false},
      {Tauros: false}
    ],
    'https://img.pokemondb.net/artwork/magikarp.jpg': [
      {Magikarp: true},
      {Gyarados: false},
      {Lapras: false},
      {Eevee: false}
    ],
    'https://img.pokemondb.net/artwork/metagross.jpg': [
      {Metagross: true},
      {Omastar: false},
      {Omanyte: false},
      {Kabuto: false}
    ],
    'https://img.pokemondb.net/artwork/entei.jpg': [
      {Entei: true},
      {Suicune: false},
      {Moltres: false},
      {Flareon: false}
    ],
    'https://img.pokemondb.net/artwork/blaziken.jpg': [
      {Blaziken: true},
      {Numel: false},
      {Salamence: false},
      {Zigzagoon: false}
    ],
    'https://img.pokemondb.net/artwork/kyogre.jpg': [
      {Kyogre: true},
      {Groudon: false},
      {Rayquaza: false},
      {Deoxys: false}
    ]
  };

  //starts the main content hidden. will be revealed when start game is pressed
  $('.game').toggle();

  //allows/prevents the click event from being used
  var canClick = true;

  //used to store and clear our interval for each round
  var interval;
  var correct = 0;
  var incorrect = 0;
  var skipped = 0;

  var gameObj = {
    //gets set when getQuestionChoices is invoked
    randomQuestion: undefined,

    //will store an array of objects. The key is the choice. The value is true or false based on the answer to randomQuestion
    questionChoices: undefined,
    correctChoice: undefined,
    remainingQuestions: undefined,
    time: 1,

    //gets all our questions from questionsObj by collecting all the keys as an array.
    getRemainingQuestions: function() {
      this.remainingQuestions = Object.keys(questionsObj);
    },

    //gets our random question, and its choices
    getQuestionChoices: function() {

      //gets random number based off how many keys are in this.remainingQuestions
      var randomNumber = Math.floor(Math.random() * this.remainingQuestions.length);

      //selects a random key (question) from this.remainingQuestions based off the random number
      this.randomQuestion = this.remainingQuestions[randomNumber];

      //sets all choices for the current question as an array of objects
      this.questionChoices = questionsObj[this.randomQuestion];

      //removes the current question from this.remainingQuestions array
      this.remainingQuestions.splice(randomNumber, 1);
    },

    //Starts a new round. displays our choices.
    start: function() {
      this.getQuestionChoices();

      //starts our timer for the round
      this.startTimer();

      //allows the click event to run at the start of a new round.
      canClick = true;

      //updates .game-content__h3 with the question
      $('.pokemon-container__image').attr('src', this.randomQuestion);

      //Used to reset the time on each new round
      this.time = 1;
      $('.game__h5').text(`Time Remaining: ${this.time}`);

      //displays choices to the screen
      for (i = 0; i < 4; i++) {

        //each choice is an object. the key is an option to guess, the value is true or false.
        var choiceObj = this.questionChoices[i];
        
        //the key of choiceObj, which is a potential answer. It is stored as an array with one value, but we get that string value from the array
        var choice = Object.keys(choiceObj)[0];
        
        //gets the true or false value of each key from choiceObj
        var potentialAnswer = choiceObj[choice];
        
        //If potential answer is true, then the choice variable is correct. Stores choice in this.correctChoice
        if (potentialAnswer) { this.correctChoice = choice; }

        //adds choices to the screen
        var children = $('.game-content').children();
        $(children[i]).text(choice);
      }
      // console.log(choiceObj)
      // console.log(choice)
      // console.log(potentialAnswer)
    },

    //subtracts from our total time and updates .game__h5 with the time
    decrement: function() {

      //only updates if greater than 0
      if (this.time > 0) {
        this.time--;
        $('.game__h5').text(`Time Remaining: ${gameObj.time}`);
      }

      //clears interval if time is out 
      else {
        clearInterval(interval);
        skipped++;
        $('.game-score-tracker__div3--style .badge').text(`${skipped}`);

        //if no more questions remain, then the game is over. Brings back all questions and resets score
        if (this.remainingQuestions.length === 0) {
          canClick = false
          //displays new game button
          $('.btn').fadeIn();

        //if questions remain, then a new question is given automatically
        } else {
          this.start();
        }
      }
    },

    //gets invoked in this.start to begin the timer.
    startTimer: function() {
      interval = setInterval(gameObj.decrement.bind(gameObj), 1000);
    }
  };
  
  // these 2 methods start our game
  // gameObj.getRemainingQuestions();
  // gameObj.start();

  //checks if your guess was correct
  $('.game-content__div--style').click(function() {

    //prevents the click event from running when the setTimeout function gets called to start a new round.
    if (canClick) {
      canClick = false;

      //clears the current interval for the round.
      clearInterval(interval);

      //tracks your correct and incorrect guesses
      if ($(this).text() === gameObj.correctChoice) {
        correct++;
        $('.game-score-tracker__div1--style .badge').text(`${correct}`);
      } else {
        incorrect++;
        $('.game-score-tracker__div2--style .badge').text(`${incorrect}`);
      }

      //if the gameObj.remainingQuestions array has 0 items, then its the last round of the game.
      if (gameObj.remainingQuestions.length > 0) {

        //starts a new round after 2 seconds
        setTimeout(gameObj.start.bind(gameObj), 2000);
      } else {

        //fades in new game button
        $('.btn').fadeIn();
      }
    }
  });

  // starts the first game
  $('.start-game-btn').click(function() {

    //reveals main content
    $('.game').toggle();

    //removes button
    $(this).remove();

    //These 2 functions start the game
    gameObj.getRemainingQuestions();
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
    gameObj.getRemainingQuestions();
    gameObj.start();

    //fades our button out
    $('.btn').fadeOut();

    //resets score display
    $('.game-score-tracker__div1--style .badge').text(`${correct}`);
    $('.game-score-tracker__div2--style .badge').text(`${incorrect}`);
    $('.game-score-tracker__div3--style .badge').text(`${skipped}`);
  })

};