const quizData = [
    {
      question: ' A resort area – centered around a mineral spring, hot spring and the like, where one can find options for hydrotherapy is called_____',
      options: ['Spring Resort' , 'Spa', 'Jacuzzi' , 'None of these'],
      answer: 'Spring Resort',
    },
    {
        question: 'Maginot line exists between which country?',
        options: ['Namibia and Angola' , 'USA and Canada', 'France and Germany' , 'Germany and Poland'],
        answer: 'France and Germany',
      },
      {
        question: 'The Grand Canyon located in which country?',
        options: ['Canada' , 'Bolivia', 'Ghana' , 'The US'],
        answer: 'The US',
      },
      {
        question: 'Which is the largest river island in the world?',
        options: ['Srirangam Island' , 'Majuli Island', 'Bhavani Island' , 'Agatti Island'],
        answer: 'Majuli Island',
      },
      {
        question: 'Which Strait divides Europe from Africa ?',
        options: ['Bosporus' , 'Bering', 'Gibraltar' , 'Dover'],
        answer: 'Gibraltar',
      },
      {
        question: 'China does not share its border with',
        options: ['Russia' , 'Afganistan', 'Mongolia' , 'Bulgaria'],
        answer: 'Bulgaria',
      },
      {
        question: 'The most travelled country in the world?',
        options: ['China' , 'Spain', 'France' , 'Maldives'],
        answer: 'France',
      },
      {
        question: 'Most visited city in the world',
        options: ['Paris' , 'Bangkok', 'Madrid' , 'London'],
        answer: 'Bangkok',
      },
      {
        question: 'Most visited Tourist attraction in the world',
        options: ['The Colosseum, Rome' , 'Central Park, N.Y.C.', 'Times Square, N.Y.C.' , 'The Las Vegas Strip, Las Vegas'],
        answer: 'The Las Vegas Strip, Las Vegas',
      },
      {
        question: 'Odd one out',
        options: ['Great Wall of China' , 'Machu Picchu', 'Taj Mahal' , 'Statue of Liberty'],
        answer: 'Statue of Liberty',
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
