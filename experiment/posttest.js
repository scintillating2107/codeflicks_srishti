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
    question: "1. After performing the V-notch experiment, what is the most likely reason the actual discharge is less than the theoretical discharge?",  ///// Write the question inside double quotes
    answers: {
      a: "The notch was too wide",                  ///// Write the option 1 inside double quotes
      b: "Water was too cold",                  ///// Write the option 2 inside double quotes
      c: "Energy losses due to friction and turbulence",                  ///// Write the option 3 inside double quotes
      d: "Incorrect stopwatch reading"                   ///// Write the option 4 inside double quotes
    },
    correctAnswer: "c"                ///// Write the correct option inside double quotes
  },

  {
    question: "2. Which measurement most directly impacts the accuracy of the calculated discharge in a V-notch experiment?",  ///// Write the question inside double quotes
    answers: {
      a: "Time",                  
      b: "Angle of the notch",                  
      c: "Head (H) above the notch",                  
      d: "Notch thickness"                   
    },
    correctAnswer: "c"                
  },

  {
    question: "3. What is typically plotted to verify the discharge relationship in the V-notch experiment?",  
    answers: {
      a: "Q vs H^0.5",                  
      b: "H vs time",                  
      c: "Q vs H",                  
      d: "Q vs H^2.5"                   
    },
    correctAnswer: "d"                
  },

  {
    question: "4. How is the coefficient of discharge (Cd) determined experimentally in this setup?",  
    answers: {
      a: "By measuring pressure at the notch",                  
      b: "By comparing actual and theoretical discharge",                  
      c: "By calculating velocity head",                  
      d: "By checking water temperature"                   
    },
    correctAnswer: "b"                
  },

  {
    question: "5. If a graph of Q vs H^2.5 is a straight line, what does it indicate?",  
    answers: {
      a: "Measurement error in head",                  
      b: "Incorrect formula used",                  
      c: "The experimental data follows theoretical prediction",                  
      d: "Water flow was unsteady"                   
    },
    correctAnswer: "c"                
  }

  /* Add more questions below this comment using the template
  {
    question: "Your question here?",
    answers: {
      a: "Option 1",
      b: "Option 2",
      c: "Option 3",
      d: "Option 4"
    },
    correctAnswer: "correct_option_letter"
  },
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
