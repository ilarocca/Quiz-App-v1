// Q. 1: Level of signal generated before it is amplified by amp to line level
//  - Capacitor, - Ampere, - Mic Level, - Fundamental
// Q. 2: Difference between loudest and quietest SPL
// - Fundamental, - Dynamic Range, - Limiter, - Hertz
// Q. 3: Device that mutes a signal when it falls bellow a certain level
// - Noise Gate, - White Noise, - Gain, - Audio Velocity
// Q. 4: Boosts or cuts frequiencies around a specified frequency
// - Bandpass Filter, - Amplifier, - Condenser Mic, - Audio Velocity 
// A device that brings an electrical signal from microphone level to line level. 
// - A/D, - Preamp, - Audio Velocity, - Dynamic Range

/**
 * Example store structure
 */
const store = {
    // 5 or more questions are required
    questions: [
      {
        question: 'What color is broccoli?',
        answers: [
          'red',
          'orange',
          'pink',
          'green'
        ],
        correctAnswer: 'green'
      },
      {
        question: 'What is the current year?',
        answers: [
          '1970',
          '2015',
          '2019',
          '2005'
        ],
        correctAnswer: '2019'
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
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
  
  // These functions return HTML templates
  
  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)