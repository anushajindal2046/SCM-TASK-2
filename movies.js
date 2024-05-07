const quizData = [
    {
      question: 'Which movie won the best Feature Film award at the 69th National Film Awards in 2023?',
      options: ['Rocketry: The Nambi Effect' , 'Gangubai Kathiawadia', 'Sarpatta Parambarai' , ' RRR'],
      answer: 'Rocketry: The Nambi Effect',
    },
    {
        question: 'Which movie has won the most number of Oscars?',
        options: ['Titanic' , 'Jungle Book', 'Avatar' , 'Cabaret'],
        answer: 'Titanic',
      },
      {
        question: 'Who is the director of the movie ‘The Fabelmans’, which was seen in the news?',
        options: ['Steven Spielberg' , 'George Lucas', 'Quentin Tarantino' , 'Martin Scorsese'],
        answer: 'Steven Spielberg',
      },
      {
        question: 'The director of the film Life of Pi is',
        options: ['Spilberg' , 'Aang Li', 'Michel Haneke' , 'Robert De Niro'],
        answer: 'Aang Li',
      },
      {
        question: 'Who is known as the "Father of Indian Cinema"?',
        options: ['V. Shantaram' , 'Prithvi Raj Kapoor', 'Dadasaheb Phalke' , 'Satyajit Ray'],
        answer: 'Dadasaheb Phalke',
      },
      {
        question: 'The Emmy Awards are presented for excellence in which of the following fields ?',
        options: ['Music' , 'Literature', 'Cinema' , 'Television industry'],
        answer: 'Television industry',
      },
      {
        question: 'Who among the following is the first female from India to win a Grammy award?',
        options: ['Monali Thakur' , 'Neeti Mohan', 'Tanvi Shah' , 'Palak Muchhal'],
        answer: 'Tanvi Shah',
      },
      {
        question: 'Who among the following is the first Indian to get an Oscar Award?',
        options: ['Bhanu Athaiya' , 'Satyajit Ray', 'AR Rahman' , 'Resul Pookutty'],
        answer: 'Bhanu Athaiya',
      },
      {
        question: 'Who did the cat in the classic movie The Godfather belong to?',
        options: ['Francis Ford Coppola' , 'Diane Keaton', 'Al Pachino' , 'No one—the cat was a stray.'],
        answer: ' No one—the cat was a stray.',
      },
      {
        question: 'Who plays the famous"Iron man" in Marvel Cinematic Universe',
        options: ['Robert Downey Junior' , 'Chris Hemsworth', 'Chris Evans' , 'Robert Pattinson'],
        answer: '',
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
