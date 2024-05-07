const quizData = [
    {
      question: 'The Governor General of India at the time of formation of the Indian National Congress was __?',
      options: ['Lord Chelmsford' , 'Lord Dalhousie', 'Lord Dufferin' , 'None of these'],
      answer: 'Lord Dufferin',
    },
    {
        question: 'Who among the following was the first Indian to get selected in ICS (Indian Civil Services)?',
        options: ['Ras Bihari Bose' , 'Satyendra Nath Tagore', 'Devendranath Tagore' , 'Surendranath Banerjee'],
        answer: 'Satyendra Nath Tagore',
      },
      {
        question: 'The attack on Pearl Harbour by Japan during World War 2 was aimed at neutralizing ______ and preventing it from interfering in Japan military operations in ______.',
        options: ['U. S. Pacific Fleet, South-East Asia' , 'U. S. Atlantic Fleet, South Asia', 'U. S. Seventh Fleet, East Asia' , 'None of the above'],
        answer: 'U. S. Pacific Fleet, South-East Asia',
      },
      {
        question: 'The main objective of the organisation named "Hetaerae Philike" was to expel the ____________ government from Greece.',
        options: ['Chinese' , 'Turkish', 'French' , 'None of the above'],
        answer: 'Turkish',
      },
      {
        question: 'Which system contributed to economic unification in Germany before Political Unification?',
        options: ['Matternich system' , 'Zolleverin', 'Frankfurt Parliament' , 'None of the above'],
        answer: 'Zolleverin',
      },
      {
        question: 'In which year did the Boston Tea Party take place?',
        options: ['1773' , '1776', '1775' , '1774'],
        answer: '1773',
      },
      {
        question: 'The Hundred Years war was fought between which two countries?',
        options: ['England and France' , 'England and Italy', 'England and Germany' , 'Germany and France'],
        answer: 'England and France',
      },
      {
        question: 'Who is the pioneer of the Social Contract Theory?',
        options: ['Hobbes' , 'Locke', 'Rousseau' , 'All options are correct'],
        answer: 'All options are correct',
      },
      {
        question: 'Who was the first woman to become the Prime Minister of a country in the world ?',
        options: ['Benazir Bhutto' , 'Indira Gandhi', 'Margaret Thatcher' , 'Sirimavo Bandaranaike '],
        answer: 'Sirimavo Bandaranaike ',
      },
      {
        question: 'The attack by the third estate on the Bastille prison sparked the _______.',
        options: ['Russian Revolution' , 'French Revolution', 'Break up of Soviet Union' , 'The fall of Tsar'],
        answer: 'French Revolution',
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
