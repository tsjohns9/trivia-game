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
  }

  var gameObj = {
    //gets set when getQuestionChoices is invoked
    randomQuestion: undefined,

    //will store an array of objects. The key is the choice. The value is true or false based on the answer to randomQuestion
    questionChoices: undefined,
    correctChoice: undefined,

    //gets our random question, and its choices
    getQuestionChoices: function() {

      //gets all keys (questions) in questionsObj
      var questionsObjKeys = Object.keys(questionsObj);

      //gets random number based off how many keys are in questionsObj
      var randomNumber = Math.floor(Math.random() * questionsObjKeys.length);

      //selects a random key (question) from questionsObj based off the random number
      this.randomQuestion = questionsObjKeys[randomNumber];

      //sets all choices for the current question
      this.questionChoices = questionsObj[this.randomQuestion];
    },

    //displays our choices
    displayQuestion: function() {
      this.getQuestionChoices();

      //updates .game-content__h3 with the question
      $('.game-content__h3').text(this.randomQuestion);

      //displays choices to the screen
      for (i = 0; i < 4; i++) {

        //each choice is an object. the key is an option to guess, the value is true or false.
        var choiceObj = this.questionChoices[i];
        
        //the key of choiceObj, which is a potential answer
        var choice = Object.keys(choiceObj);

        //gets the true or false value of each key from choiceObj
        var potentialAnswer = choiceObj[choice];

        //If potential answer is true, then the choice variable is correct. Stores choice in this.correctChoice
        if (potentialAnswer) { this.correctChoice = choice }

        //adds choices to the screen
        var children = $('.game-content').children();
        $(children[i]).text(choice)

        //creates div for each choice
        // var newDiv = $(`<div>${choice}</div>`)

        //displays each choice
        // $(newDiv).appendTo('.game-content');
      }
    }
  }

  
  gameObj.displayQuestion();
};