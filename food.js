const quizData = [
    {
      question: 'Consider the following statement made by a student while giving her introduction in a meeting:"I am from a place where most of people prefer to eat fish cooked in mustard oil."The student must be from: ',
      options: ['Goa' , 'Kerala', 'Kashmir' , 'Mizoram'],
      answer: 'Kashmir',
    },
    {
        question: '"Dhokla"is a delicacy of which state of India?',
        options: ['Gujarat' , 'Odisha', 'Karnataka' , 'Maharashtra'],
        answer: 'Gujarat',
      },
      {
        question: 'Which of the following dish is popular in Hong Kong? ',
        options: ['Som Jam' , 'Ling-hu-fen ', 'Mapu Tofu' , 'Sushi'],
        answer: 'Ling-hu-fen ',
      },
      {
        question: 'Where does Apple Strudel traditionally come from?',
        options: ['Austria' , 'Australia', 'Mexico' , 'Thailand'],
        answer: 'Austria',
      },
      {
        question: 'How do you spell the name of this traditional Spanish dish?',
        options: ['Piealla' , 'Paella', 'Pialla' , 'None of these'],
        answer: 'Paella',
      },
      {
        question: 'What is Canada famous for producing?',
        options: ['Chocolate' , 'Maple Syrup', 'Fish' , 'Popcorn'],
        answer: 'Maple Syrup',
      },
      {
        question: 'Chinese fortune cookies were invented in America, true or false?',
        options: ['True' , 'False', 'Cannot say anything' , 'Mujhe kya main toh batak hoon'],
        answer: '',
      },
      {
        question: 'Where does sushi come from?',
        options: ['China' , 'South Korea', 'Japan' , 'Hong Kong'],
        answer: 'Japan',
      },
      {
        question: 'Which city in Italy does pizza come from?',
        options: ['Piza' , 'Naples', 'Milan' , 'Rome'],
        answer: 'Naples',
      },
      {
        question: 'Though it originated in China, which fruit was named for Persia, where Europeans first encountered it?',
        options: ['Peach' , 'Pineapple', 'Apple' , 'Banana'],
        answer: 'Peach',
      },
  ];

  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');

  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];

      const optionText = document.createTextNode(shuffledOptions[i]);

      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }

  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }

  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }

  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }

  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);

  displayQuestion();
