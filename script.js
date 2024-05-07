const quizData = [
    {
      question: 'Grand Slam is used in which of the following games?',
      options: ['Lawn Tennis' , 'Football', 'Badminton' , 'none of the above'],
      answer: 'Lawn Tennis',
    },
    {
      question: 'Which is the most successful in the UEFA Champions league?',
      options: ['Manchester United', 'Bayern Munich ', 'Real Madrid', 'AC Milan'],
      answer: 'Real Madrid',
    },
    {
      question: 'Which country won the FIFA World Cup in 2022?',
      options: ['Brazil', 'Germany', 'France', 'Argentina'],
      answer: 'Argentina',
    },
    {
      question: 'Where the first Olympic games took place?',
      options: ['Australia', 'USA', 'England', 'Greece'],
      answer: 'Greece',
    },
    {
      question: 'Who scored the most goals in 2022 FIFA World cup?',
      options: [
        'Kylian Mbappe',
        'Lionel Messi',
        'Cristiano Ronaldo',
        'Romelu Lukaku',
      ],
      answer: 'Kylian Mbappe',
    },
    {
      question: 'Which country hosted the 2022 FIFA World Cup?',
      options: ['Qatar', 'France', 'USA', 'India'],
      answer: 'Qatar',
    },
    {
      question: 'Who is called the GOD OF CRICKET?',
      options: [
        'Sachin Tendulkar',
        'Virat Kohli',
        'Ricky Ponting',
        'Viv Richards',
      ],
      answer: 'Sachin Tendulkar',
    },
    {
      question: 'Toni Kroos is associated with which sport?',
      options: ['Football', 'Cricket', '100 m sprint', 'Golf'],
      answer: 'Football',
    },
    {
      question: 'Which of the following team won the IPL 2023',
      options: [
        'Chennai Super Kings',
        'Mumbai Indians',
        'Gujarat Titans',
        'Kolkata Knight Riders',
      ],
      answer: 'Chennai Super Kings',
    },
    {
      question: 'Who has the most number of Grand slams?',
      options: ['Andy Murray', 'Roger Federer', 'Novak Djokovic', 'Rafael Nadal'],
      answer: 'Novak Djokovic',
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
