/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


 const myQuestions = [
  {
    question: "1. Why is a V-notch considered more sensitive at low flow rates compared to other notches?",  ///// Write the question inside double quotes
    answers: {
      a: "It has a larger opening",                  ///// Write the option 1 inside double quotes
      b: "The flow area increases rapidly with head",                  ///// Write the option 2 inside double quotes
      c: "It reduces the velocity of flow",                  ///// Write the option 3 inside double quotes
      d: "It is easier to manufacture"                   ///// Write the option 4 inside double quotes
    },
    correctAnswer: "b"                ///// Write the correct option inside double quotes
  },

  {
    question: "2. What does the angle θ represent in the V-notch discharge formula?",  ///// Write the question inside double quotes
    answers: {
      a: "Width of the notch",                  ///// Write the option 1 inside double quotes
      b: "Water surface slope",                  ///// Write the option 2 inside double quotes
      c: "Angle of the V-notch",                  ///// Write the option 3 inside double quotes
      d: "Height of the fluid"                   ///// Write the option 4 inside double quotes
    },
    correctAnswer: "c"                ///// Write the correct option inside double quotes
  },

  {
    question: "3. What happens to the flow rate if the head over a 90° V-notch doubles?",  ///// Write the question inside double quotes
    answers: {
      a: "It doubles",                  ///// Write the option 1 inside double quotes
      b: "It triples",                  ///// Write the option 2 inside double quotes
      c: "It increases more than double",                  ///// Write the option 3 inside double quotes
      d: "It stays the same"                   ///// Write the option 4 inside double quotes
    },
    correctAnswer: "c"                ///// Write the correct option inside double quotes
  },

  {
    question: "4. Which property of water directly affects the theoretical discharge through a V-notch?",  ///// Write the question inside double quotes
    answers: {
      a: "Temperature",                  ///// Write the option 1 inside double quotes
      b: "Surface tension",                  ///// Write the option 2 inside double quotes
      c: "Density",                  ///// Write the option 3 inside double quotes
      d: "Color"                   ///// Write the option 4 inside double quotes
    },
    correctAnswer: "c"                ///// Write the correct option inside double quotes
  },

  {
    question: "5. What happens to the coefficient of discharge (Cd) if energy losses around the V-notch increase?",  ///// Write the question inside double quotes
    answers: {
      a: "It increases",                  ///// Write the option 1 inside double quotes
      b: "It decreases",                  ///// Write the option 2 inside double quotes
      c: "It becomes zero",                  ///// Write the option 3 inside double quotes
      d: "It remains unchanged"                   ///// Write the option 4 inside double quotes
    },
    correctAnswer: "b"                ///// Write the correct option inside double quotes
  },                              ///// To add more questions, copy the section below 
  									                ///// this line


  /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
      till closing curly braces comma ( }, )

      and paste it below the curly braces comma ( below correct answer }, ) of above 
      question

  Copy below section

  {
    question: "This is question n?",
    answers: {
      a: "Option 1",
      b: "Option 2",
      c: "Option 3",
      d: "Option 4"
    },
    correctAnswer: "c"
  },

  Copy above section

  */

];

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
