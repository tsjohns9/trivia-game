window.onload = function() {

  var questionsObj = {
    question0: [
      {q0c1: true},
      {q0c2: false},
      {q0c3: false},
      {q0c4: false}
    ],
    question1: [
      {q1c1: true},
      {q1c2: false},
      {q1c3: false},
      {q1c4: false}
    ],
    question2: [
      {q2c1: true},
      {q2c2: false},
      {q2c3: false},
      {q2c4: false}
    ],
    question3: [
      {q3c1: true},
      {q3c2: false},
      {q3c3: false},
      {q3c4: false}
    ],
    question4: [
      {q4c1: true},
      {q4c2: false},
      {q4c3: false},
      {q4c4: false}
    ],
    question5: [
      {q5c1: true},
      {q5c2: false},
      {q5c3: false},
      {q5c4: false}
    ],
    question6: [
      {q6c1: true},
      {q6c2: false},
      {q6c3: false},
      {q6c4: false}
    ],
    question7: [
      {q7c1: true},
      {q7c2: false},
      {q7c3: false},
      {q7c4: false}
    ],
    question8: [
      {q8c1: true},
      {q8c2: false},
      {q8c3: false},
      {q8c4: false}
    ],
    question9: [
      {q9c1: true},
      {q9c2: false},
      {q9c3: false},
      {q9c4: false}
    ],
  };

  //allows/prevents the click event from being used
  var canClick = true;

  //used to store and clear our interval for each round
  var interval;
  var wins = 0;
  var losses = 0;

  var gameObj = {
    //gets set when getQuestionChoices is invoked
    randomQuestion: undefined,

    //will store an array of objects. The key is the choice. The value is true or false based on the answer to randomQuestion
    questionChoices: undefined,
    correctChoice: undefined,
    time: 5,
    clockRunning: true,

    //gets our random question, and its choices
    getQuestionChoices: function() {

      //gets all keys (questions) in questionsObj
      var questionsObjKeys = Object.keys(questionsObj);

      //gets random number based off how many keys are in questionsObj
      var randomNumber = Math.floor(Math.random() * questionsObjKeys.length);

      //selects a random key (question) from questionsObj based off the random number
      this.randomQuestion = questionsObjKeys[randomNumber];

      //sets all choices for the current question as an array of objects
      this.questionChoices = questionsObj[this.randomQuestion];
    },

    //Starts the game. displays our choices. Also used to restart the game.
    start: function() {
      this.getQuestionChoices();

      //allows the click event to run at the start of a new round.
      canClick = true;

      //updates .game-content__h3 with the question
      $('.game__h3').text(this.randomQuestion);

      //Used to reset the time on each new round
      this.time = 5;
      $('.game__h5').text(`Time Remaining: ${this.time}`);

      //starts our timer for the round
      this.startTimer();

      //displays choices to the screen
      for (i = 0; i < 4; i++) {

        //each choice is an object. the key is an option to guess, the value is true or false.
        var choiceObj = this.questionChoices[i];
        
        //the key of choiceObj, which is a potential answer. It is stored as an array.
        var choice = Object.keys(choiceObj);

        //gets the true or false value of each key from choiceObj
        var potentialAnswer = choiceObj[choice];

        //If potential answer is true, then the choice variable is correct. Stores choice in this.correctChoice
        if (potentialAnswer) { this.correctChoice = choice[0]; }

        //adds choices to the screen
        var children = $('.game-content').children();
        $(children[i]).text(choice);
      }
      
    },

    //subtracts from our total time and updates .game__h5 with the time
    decrement: function() {

      //only updates if greater than 0
      if (this.time > 0) {
        this.time--;
        $('.game__h5').text(`Time Remaining: ${gameObj.time}`);
      }

      //if time is out, then a new game begins automatically and clears our interval
      else {
        clearInterval(interval);
        this.start();
        losses++;
        $('.game-score-tracker__div2--style .badge').text(`${losses}`);
      }
    },

    //gets invoked in this.start to begin the timer.
    startTimer: function() {
      interval = setInterval(gameObj.decrement.bind(gameObj), 1000);
    }
  };
  
  gameObj.start();

  //checks if your guess was correct
  $('.game-content__div--style').click(function() {

    //prevents the click event from running when the setTimeout function gets called to start a new round.
    if (canClick) {
      canClick = false;

      //clears the current interval for the round.
      clearInterval(interval);

      //starts a new round after 2 seconds
      setTimeout(gameObj.start.bind(gameObj), 2000);

      //tracks your wins and losses
      if ($(this).text() === gameObj.correctChoice) {
        wins++;
        $('.game-score-tracker__div1--style .badge').text(`${wins}`);
      } else {
        losses++;
        $('.game-score-tracker__div2--style .badge').text(`${losses}`);
      }
    }
  });

};