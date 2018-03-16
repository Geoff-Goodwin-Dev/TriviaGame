// VARIABLE DECLARATIONS
var correct = 0;
var incorrect = 0;
var answerDisplayOrder = [1, 2, 3, 4];
var questionsObjArray = [];
var questionCounter = 0;
var q01;
var q02;
var q03;
var q04;
var q05;
var q06;
var q07;
var q08;
var q09;
var q10;
var q11;
var q12;
var q13;
var q14;
var q15;
var q16;
var q17;
var q18;
var q19;
var q20;
var timer;
var start;
var countDownDurationS;
var secondsRemaining;
var unusedSeconds = 0;
var selectedAnswer;

$(document).ready(function() {

  // Fisher–Yates Shuffle Function
  function fYShuffle(array) {
    var m = array.length, t, i;
    while (m) { // While there remain elements to shuffle…
      i = Math.floor(Math.random() * m--); // Pick a remaining element…
      t = array[m]; // And swap it with the current element.
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  // Trivia Question Object Constructor Function
  function TriviaQuestion (id, question, answer1, answer2, answer3, answer4) {
    this.id = id;
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.correct = answer1;
    // this.logQuestion = function () {
    //   console.log("Question ID:", this.id);
    //   console.log("Question:", this.question);
    //   console.log("Answer 1 (correct):", this.answer1);
    //   console.log("Answer 2:", this.answer2);
    //   console.log("Answer 3:", this.answer3);
    //   console.log("Answer 4:", this.answer4);
    //   console.log("--------------");
    // };
  }

  // TRIVIA QUESTION OBJECT GENERATION
  function questionCreation () {
    q01 = new TriviaQuestion("01", "What is the surname given to bastards born in Dorne?", "Sand", "Snow", "Snake", "Silt");
    questionsObjArray.push(q01);
    q02 = new TriviaQuestion("02", 'Which character is nicknamed “The Hound?"', "Sandor Clegane", "Gregor Clegane", "Canile Clegane", "Roger Clegane");
    questionsObjArray.push(q02);
    q03 = new TriviaQuestion("03", "Who is the Lord Commander of the Kingsguard at the beginning of Game of Thrones?", "Ser Barristan Selmy", "Ser Jamie Lannister", "Ser Loras Tyrell", "Ser Jeor Mormont");
    questionsObjArray.push(q03);
    q04 = new TriviaQuestion("04", "To whom was Margery Tyrell never married?", "Stannis Baratheon", "Joffrey Baratheon", "Renly Baratheon", "Tommen Baratheon");
    questionsObjArray.push(q04);
    q05 = new TriviaQuestion("05", 'Who was known as “The King Beyond the Wall?”', "Mance Rayder", "Jon Snow", "Maester Aemon", "Benjen Jon");
    questionsObjArray.push(q05);
    q06 = new TriviaQuestion("06", "How many times did Sansa Stark get married?", "Twice", "Never", "Once", "Three times");
    questionsObjArray.push(q06);
    q07 = new TriviaQuestion("07", "How is Lyanna Mormont related to Jorah Mormont?", "Cousin", "Daughter", "Wife", "Niece");
    questionsObjArray.push(q07);

    questionsObjArray = fYShuffle(questionsObjArray);
  }

  // TIMER FUNCTION PLAY
  function countDownTimer(){
    var countDownDurationMS = countDownDurationS * 1000;
    var diff = Date.now() - start; //determines difference between start time and current time
    secondsRemaining = Math.ceil((countDownDurationMS - diff) / 1000); //determines total seconds remaining in countdown
    var m = Math.floor(secondsRemaining / 60); //determines minutes part of total seconds remaining in countdown
    var mm; //converts single digit minutes to contain leading zero
    if (m < 10) {
      mm = "0" + m;
    } else {
      mm = m;
    }
    var s = secondsRemaining - m * 60; // determines seconds part of total seconds remaining in countdown
    var ss;
    if (s < 10) {
      ss = "0" + s;
    } else {
      ss = s;
    }
    $("#timer").text(mm + ':' + ss);
    if(secondsRemaining <= 0) {
      selectedAnswer = "";
      updateRoundStatusModal("Timeout");
      $("#modalRoundStatus").css("display", "block");

      incorrect++;
      $("#losses").text(incorrect);
      questionCounter++;
      return;
    }
    timer = setTimeout(countDownTimer,1000);
  }

  function updateRoundStatusModal(status) {
    switch (status) {
      case ("Correct"):
        $("#isCorrect").text("Correct!");
        $("#correctAnswerParagraph").css("display", "none");
        break;
      case ("Incorrect"):
        $("#isCorrect").text("I'm sorry, that's incorrect");
        break;
      case ("Timeout"):
        $("#isCorrect").text("Time's up!");
        $("#yourAnswerParagraph").css("display", "none");
        break;
      case ("GameOver"):
        $(".bulletListContainer").css("display", "none");
        $("#isCorrect").text("The Trivia Game of Thrones has ended!");
        $("#gameOverContainer").css("display", "block");
      default:
        break;
    }
    $("#questionReDisplay").text(questionsObjArray[questionCounter].question);
    $("#correctAnswerReDisplay").text(questionsObjArray[questionCounter].correct);
    $("#yourAnswerReDisplay").text(selectedAnswer);
  }

  // UPDATE DISPLAY OF THE TRIVIA QUESTION FUNCTION
  function updateQuestionDisplay() {
    $("#wins").text(correct);
    $("#losses").text(incorrect);
    $("#question").text(questionsObjArray[questionCounter].question);
    answerDisplayOrder = fYShuffle(answerDisplayOrder);
    console.log("shuffled order for answers", answerDisplayOrder);
    $("#answer" + answerDisplayOrder[0]).text(questionsObjArray[questionCounter].answer1);
    $("#answer" + answerDisplayOrder[1]).text(questionsObjArray[questionCounter].answer2);
    $("#answer" + answerDisplayOrder[2]).text(questionsObjArray[questionCounter].answer3);
    $("#answer" + answerDisplayOrder[3]).text(questionsObjArray[questionCounter].answer4);
  }

  // GAMEPLAY START BUTTON CLICKED FUNCTION
  $("#start").click(function() {
    questionCreation();
    updateQuestionDisplay();
    $("#questionTextContainer").css("display", "block");
    $("#startState").css("display", "none");

    countDownDurationS = 15;
    start = Date.now(); //sets the starting time for the timer
    countDownTimer(); //sets the timer in motion
  });

  // CLICKING AN ANSWER BUTTON FUNCTION
  $("#questionTextContainer").on("click", ".answerButton", function () {
    selectedAnswer = $(this).text();
    var correctAnswer = questionsObjArray[questionCounter].correct;
    console.log("correct Answer", correctAnswer);
    console.log("Selected Answer Text", selectedAnswer);

    // Storage of unused seconds for game end stats and stopping of timer
    unusedSeconds = unusedSeconds + secondsRemaining;
    console.log("unused seconds:", unusedSeconds);
    clearTimeout(timer);

    // Checking for Correct Answer
    if (selectedAnswer === correctAnswer) {
      updateRoundStatusModal("Correct");
      $("#modalRoundStatus").css("display", "block");

      correct++;
      $("#wins").text(correct);
    }
    else {
      updateRoundStatusModal("Incorrect");
      $("#modalRoundStatus").css("display", "block");

      incorrect++;
      $("#losses").text(incorrect);
    }
    questionCounter++;

  });

  // ADVANCES QUESTION DISPLAY TO THE NEXT QUESTION
  function nextQuestion() {
    if (questionCounter === 5) {
      updateRoundStatusModal("GameOver");
      $("#modalRoundStatus").css("display", "block");

    }
    else {
      updateQuestionDisplay();
      countDownDurationS = 15;
      start = Date.now(); //sets the starting time for the timer
      countDownTimer(); //sets the timer in motion
    }
  }

  // MODAL RELATED FUNCTIONS
  $("#instructionsButton").on("click", function() {
    $("#modalInstruction").css("display", "block");
  });

  $("#closeModal").on("click", function() {
    $("#modalInstruction").css("display", "none");
  });

  $("#closeModalRoundStatus").on("click", function() {
    resetModal();
    nextQuestion();
  });

  function resetModal() {
    $("#modalRoundStatus").css("display", "none");
    $("#questionReDisplay").text("");
    $("#correctAnswerReDisplay").text("");
    $("#yourAnswerReDisplay").text("");
    $("#yourAnswerParagraph").css("display", "block");
    $("#correctAnswerParagraph").css("display", "block");
    $(".bulletListContainer").css("display", "block");
    $("#gameOverContainer").css("display", "none");
  }


  $("#yes").on("click", function() {
    $("#modalRoundStatus").css("display", "none");
    resetModal();
    correct = 0;
    incorrect = 0;
    answerDisplayOrder = [1, 2, 3, 4];
    questionsObjArray = [];
    questionCounter = 0;
    unusedSeconds = 0;
    selectedAnswer = "";
    questionCreation();
    updateQuestionDisplay();
    $("#questionTextContainer").css("display", "block");
    $("#startState").css("display", "none");

    countDownDurationS = 15;
    start = Date.now(); //sets the starting time for the timer
    countDownTimer(); //sets the timer in motion
  });

});

