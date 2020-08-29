
/**
 *                                     STORE                             */
const store = {
    questions: [
      {
        question: 'What is the level of signal generated before it is amplified by amp to line level?',
        answers: [
          'Capacitor',
          'Ampere',
          'Mic Level',
          'Pink Noise'
        ],
        correctAnswer: 'Mic Level'
      },
      {
        question: 'Difference between loudest and quietest SPL?',
        answers: [
          'Fundamental',
          'Dynamic Range',
          'Limiter',
          'Hertz'
        ],
        correctAnswer: 'Dynamic Range'
      },
      {
        question: 'Device that mutes a signal when it falls bellow a certain level?',
        answers: [
          'Noise Gate',
          'White Noise',
          'Gain',
          'Audio Velocity'
        ],
        correctAnswer: 'Noise Gate'
      },
      {
        question: 'Boosts or cuts frequiencies around a specified frequency',
        answers: [
          'Amplifier',
          'Bandpass Filter',
          'Condenser Mic',
          'Audio Velocity'
        ],
        correctAnswer: 'Bandpass Filter'
      },
      {
        question: 'A device that brings an electrical signal from microphone level to line level.',
        answers: [
          'A/D',
          'Preamp',
          'Audio Velocity',
          'Dynamic Range'
        ],
        correctAnswer: 'Preamp'
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    submittingAnswer: false,
    score: 0, 

    currentQuestionState: {
      answerArray:[]
    }
  };
  
  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
/********** TEMPLATE GENERATION FUNCTIONS **********/

// Generates the HTML for the start page.
function generateWelcomeString() {
  return `
  <div class="welcome">
    <form>
      <p>
       Welcome! This quiz will asses your fundemental audio knowledge.
      </p>
      <button type="submit"id="startQuiz" autofocus>Start</button>
    </form>
  </div>
    `;
}

// Generates the quiz format HTML (question number, question, answers, submit, & score).
function generateQuizForm(questionObject) {
  return `
    <div class='quiz-form'>
      <p>Question ${questionObject.index}/${store.questions.length}</p>
      <p><b>${questionObject.question.question}</b></p>

      <form>
        <ol type="A" style="list-style:none; padding:0px;">
          ${generateQuizAnswers(questionObject.question.answers)}
        </ol>
        <button type="submit" class="submit-answer">Submit</button>
      </form> 
      <p>Score: ${store.score}</p>
    </div>
    `;
}

// Generates answer results page & see results bttn HTML. 
function generateAnswerResults(){
  let answerArray = store.currentQuestionState.answerArray;

  const buttons = {
    next: ' <button type="submit" class="next-question" autofocus>Next</button>',
    results: '<button type="submit" class="see-results" autofocus>See Results</button>'
  };

  let correctResponse = `"${answerArray[1]}" is correct`;
  let incorrectResponse = `${answerArray[2]} is not correct. The correct answer is
  "${answerArray[1]}"`;

  let isLastQuestion = (store.questionNumber + 1) === (store.questions.length);
  
  return `
    <div class="answer-response">
     <form>
       <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
       <p> Score: ${store.score}</p>
       ${isLastQuestion ? buttons.results : buttons.next}
    </form>
    </div>
  `;
}


// Generate all possible answers
function generateQuizAnswers(answers){
  let answerArray = [];
  let indexArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
    indexArray.push(answers.indexOf(answer));
  });
  return answerArray.map(answer => generateAnswerArray(answer)).join('');
}

// Generate each individual answer
function generateAnswerArray(answer){
  let questionNumber = store.questionNumber;
  let name = store.questions[questionNumber].answers.indexOf(answer);
  return `
    <li>
      <div class="answer-container">
        <input type="radio" name="answer" id="answer-${name}" data-answer="${answer}">
        <label for="answer-${name}"> ${answer}</label>
      </div>
    </li>
  `;
}

// Generate Results HTML & Restart Bttn
function generateQuizResultsString(){
  return `
    <div class='quiz-results'>
          <p>You got ${store.score} correct out of ${store.questions.length * 1}</p>            
        <button class="restart-quiz">Restart Quiz</button>      
    </div> 
`;
}


/********** RENDER FUNCTION(S) **********/

// Render Quiz and generate correct HTML
function renderQuiz () {
  if(store.quizStarted === false) {
    if(store.questionNumber === store.questions.length){
      const quizResultsString = generateQuizResultsString();
      $('main').html(quizResultsString); 
    } else {
      const quizWelcomeInterfaceString = generateWelcomeString();
      $('main').html(quizWelcomeInterfaceString);
    }
  } else if (store.quizStarted === true) {
    if(store.submittingAnswer === false) {
      const quizInterfaceString = generateQuizForm(currentQuestion());
      $('main').html(quizInterfaceString);
    } else if (store.submittingAnswer === true) {
      const quizAnswerResponseString = generateAnswerResults();
      $('main').html(quizAnswerResponseString);
    }
  } 
}

// check to see if answer is selected, prompts alert if no answer is selected, 
//checks answer with correct answer and stores in answerArray
function checkCorrectAnswer() {
  let radios = $('input:radio[name=answer]');
  let selectedAnswer = $('input[name="answer"]:checked').data('answer');
  let questionNumber = store.questionNumber;
  let correctAnswer = store.questions[questionNumber].correctAnswer;

  if (radios.filter(':checked').length === 0) {
    alert('Select an answer before moving on.');
    return;
  } else {
    store.submittingAnswer = true;
    if(selectedAnswer === correctAnswer){
      store.score += 1;
      store.currentQuestionState.answerArray = [true, correctAnswer, selectedAnswer];
    } else {
      store.currentQuestionState.answerArray = [false, correctAnswer, selectedAnswer];
    }
  }
}

// Change quiz start to true.
function startQuiz() {
  store.quizStarted = true;
}

// Renders current question.
function currentQuestion(){
  let index = store.questionNumber;
  let questionObject = store.questions[index];
  return {
    index: index + 1,
    question: questionObject
  };
}

// Renders next question.
function nextQuestion(){
  if (store.questionNumber < store.questions.length){
    store.questionNumber++;
    store.submittingAnswer = false;
  } else if(store.questionNumber === store.questions.length) {
    store.quizStarted = false;
  }
}

// Changes quiz start to false & question number equal to questions length to generate Result HTML
function seeResults() {
  store.quizStarted = false;
  store.questionNumber ++;
}

// Resets questions array to generate Quiz Start HTML
function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.submittingAnswer = false;
  store.currentQuestionState.answerArray = [];
  store.score = 0; 
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
// Controller layer

// Start Bttn (quiz started true => render generateQuizInterfaceString for first question)
function handleBeginQuizSubmit(){
  $('main').on('click', '#startQuiz', (event) => {
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

// Submit Answer (checks to see if correct answer, then render generateAnswerResult HTML)
function handleSubmitAnswer() {
  $('main').on('click' , '.submit-answer', (event) => {
    event.preventDefault();
    checkCorrectAnswer();
    renderQuiz();
  });
}

// Next Question (As long as question number is less than questions.length, adds +1 to q. number/resets answer submitted, 
// and renders generateQuizInterfaceString HTML for next question)
function handleNextQuestionSubmit(){
  $('main').on('click', '.next-question', (event) => {
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

// See Results Bttn (changes quiz started to false and adds +1 to make question length equal
// then renders generateQuizResultsString)
function handleSeeResultsSubmit(){
  $('main').on('click', '.see-results', (event) => {
    event.preventDefault();
    seeResults();
    renderQuiz();
  });
}

// Restart Quiz Bttn (changes all questions properties back to 'default' state,
// which then tells renderQuiz to generate Welcome HTML to restart)
function handleRestartQuizSubmit(){
  $('main').on('click', '.restart-quiz', (event) => {
    event.preventDefault();
    restartQuiz();
    renderQuiz();
  });
}


// This function will launch all other functions after the page is loaded
function handleQuiz (){
  renderQuiz();
  handleBeginQuizSubmit();
  handleSubmitAnswer();
  handleNextQuestionSubmit();
  handleRestartQuizSubmit();
  handleSeeResultsSubmit();
}

$(handleQuiz);
