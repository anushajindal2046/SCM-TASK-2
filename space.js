const quizData = [
    {
      question: 'Which woman astronaut has set the record for the longest single spaceflight by a woman?',
      options: ['Peggy Whitson' , 'Jessica Meir', 'Christina Koch' , 'Sunita Williams'],
      answer: 'Christina Koch',
    },
    {
        question: 'Which of the following space agencies uses a spacecraft named Hayabusa ?',
        options: ['CNES' , 'NASA', 'JAXA' , 'CNSA'],
        answer: 'JAXA',
      },
      {
        question: 'Who among the following was the first to explain that the rotation of the earth on its axis accounts for the daily rising and setting of the sun ?',
        options: ['Aryabhata' , 'Bhaskara', 'Brahmagupta' , 'Varahamihira'],
        answer: 'Aryabhata',
      },
      {
        question: 'The headquarters of SpaceX is located in which city?',
        options: ['Geneva, Switzerland' , 'Hawthorne, California', 'Beijing, China' , 'Tokyo, Japan'],
        answer: 'Hawthorne, California',
      },
      {
        question: 'Which planet has the largest rings?',
        options: ['Saturn' , 'Venus', 'Mars' , 'Jupiter'],
        answer: 'Saturn',
      },
      {
        question: 'In which galaxy we solar system exists',
        options: ['Milky way Galaxy' , 'Andromeda Galaxy', 'Whirlpool Galaxy' , 'Sombrero Galaxy'],
        answer: 'Milky way Galaxy',
      },
      {
        question: 'First human to go in space',
        options: ['Buzz Aldrin' , 'Neil Armstrong', 'Yuri Gagrin' , 'Kalpana Chawla'],
        answer: 'Yuri Gagrin',
      },
      {
        question: 'Which one is considered the Dwarf planet?',
        options: ['Pluto' , 'Mercury', 'Venus' , 'Earth'],
        answer: 'Pluto',
      },
      {
        question: 'Apart from Sun, The closest star to earth is ',
        options: ['Proxima Centauri' , 'Gliese 65', 'Epsilon Eridani' , 'Ross 128'],
        answer: 'Proxima Centauri',
      },
      {
        question: 'Which planet is called Red Planet?',
        options: ['Saturn' , 'Mars', 'Earth' , 'Jupiter'],
        answer: 'Mars',
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
