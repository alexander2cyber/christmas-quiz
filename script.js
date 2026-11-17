let currentQuestion = 0;
let score = 0;
let answered = false;


const questions = [
    // ✝️ JESUS AND THE BIBLE
    
    {
        category: "Jesus & The Bible",
        difficulty: "Easy",
        question: "Where was Jesus born?",
        options: ["Jerusalem", "Bethlehem", "Rome", "Nazareth"],
        answer: "Bethlehem",
        explanation: "Jesus was born in Bethlehem."
    },
    {
        category: "Jesus & The Bible",
        difficulty: "Tricky",
        question: "Who was the mother of Jesus?",
        options: ["Mary", "Elizabeth", "Martha", "Ruth"],
        answer: "Mary",
        explanation: "Mary was the mother of Jesus."
    },
    {
        category: "Jesus & The Bible",
        difficulty: "Tricky",
        question: "What gifts did the wise men bring Jesus?",
        options: [
            "Silver, food and water",
            "Gold, frankincense and myrrh",
            "Gold, bread and wine",
            "Clothes, gold and silver"
        ],
        answer: "Gold, frankincense and myrrh",
        explanation: "The gifts were gold, frankincense and myrrh."
    },

    // 🎄 CHRISTMAS TRADITIONS
    {
        category: "Christmas Traditions",
        difficulty: "Easy",
        question: "What date is Christmas Day?",
        options: ["24 December", "25 December", "26 December", "31 December"],
        answer: "25 December",
        explanation: "Christmas Day is celebrated on 25 December in many countries."
    },
    {
        category: "Christmas Traditions",
        difficulty: "Tricky",
        question: "Which country is often credited with starting the Christmas tree tradition?",
        options: ["France", "Germany", "Spain", "Brazil"],
        answer: "Germany",
        explanation: "The modern Christmas tree tradition developed in Germany."
    },
    {
        category: "Christmas Traditions",
        difficulty: "Easy",
        question: "What does Santa traditionally travel in?",
        options: ["A car", "A train", "A sleigh", "A bus"],
        answer: "A sleigh",
        explanation: "Santa is traditionally shown travelling in a sleigh pulled by reindeer."
    },

    // 🍗 CHRISTMAS FOOD AND FEASTS
    {
        category: "Food & Feasts",
        difficulty: "Easy",
        question: "Which meat is commonly eaten for Christmas dinner in the UK?",
        options: ["Turkey", "Shark", "Kangaroo", "Frog"],
        answer: "Turkey",
        explanation: "Turkey is a popular choice for Christmas dinner in the UK."
    },
    {
        category: "Food & Feasts",
        difficulty: "Tricky",
        question: "What is the main ingredient in traditional mince pies?",
        options: ["Minced beef", "Dried fruit mixture", "Cheese", "Chocolate"],
        answer: "Dried fruit mixture",
        explanation: "Mince pies are traditionally filled with sweet mincemeat, usually made with dried fruit."
    },

    // ⭐ CELEBRITIES
    {
        category: "Celebrities",
        difficulty: "Easy",
        question: "Which singer released the hit song 'All I Want for Christmas Is You'?",
        options: ["Adele", "Mariah Carey", "Rihanna", "Beyonce"],
        answer: "Mariah Carey",
        explanation: "Mariah Carey released the song in 1994."
    },
    {
        category: "Celebrities",
        difficulty: "Tricky",
        question: "Which actor played Kevin in Home Alone?",
        options: ["Daniel Radcliffe", "Macaulay Culkin", "Tom Holland", "Leonardo DiCaprio"],
        answer: "Macaulay Culkin",
        explanation: "Macaulay Culkin played Kevin McCallister."
    },

    // 🎬 CHRISTMAS FILMS
    {
        category: "Christmas Films",
        difficulty: "Easy",
        question: "What is the name of the green character who tries to steal Christmas?",
        options: ["Shrek", "The Grinch", "Hulk", "Yoda"],
        answer: "The Grinch",
        explanation: "The Grinch is the famous Christmas character."
    },
    {
        category: "Christmas Films",
        difficulty: "Tricky",
        question: "In Home Alone, where is Kevin's family travelling?",
        options: ["London", "Paris", "New York", "Rome"],
        answer: "Paris",
        explanation: "Kevin's family travels to Paris and accidentally leaves him behind."
    },

    // 🎵 CHRISTMAS MUSIC
    {
        category: "Christmas Music",
        difficulty: "Easy",
        question: "Complete the song: 'Jingle bells, jingle bells...'",
        options: [
            "Christmas is here",
            "Jingle all the way",
            "Santa is near",
            "Snow is everywhere"
        ],
        answer: "Jingle all the way",
        explanation: "That's the famous next line of Jingle Bells."
    },

    // 🌍 CHRISTMAS AROUND THE WORLD
    {
        category: "Christmas Around The World",
        difficulty: "Tricky",
        question: "In which country is eating KFC a popular Christmas tradition?",
        options: ["Japan", "Italy", "Canada", "Egypt"],
        answer: "Japan",
        explanation: "Many people in Japan enjoy KFC as a Christmas meal."
    },
    {
        category: "Christmas Around The World",
        difficulty: "Easy",
        question: "What season is it in Australia during December?",
        options: ["Winter", "Autumn", "Summer", "Spring"],
        answer: "Summer",
        explanation: "Australia is in the Southern Hemisphere, where December is summer."
    },

    // 🎆 CELEBRATIONS
    {
        category: "Celebrations",
        difficulty: "Easy",
        question: "What date is New Year's Eve?",
        options: ["1 December", "24 December", "31 December", "1 January"],
        answer: "31 December",
        explanation: "New Year's Eve is on 31 December."
    }
];



// LOGIN FUNCTION
const loginForm = document.getElementById("loginForm");
 
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
 
        const playerName = document.getElementById("playerName").value.trim();
 
        if (playerName === "") {
            alert("Please enter your name!");
            return;
        }
 
        sessionStorage.setItem("playerName", playerName);
 
        window.location.href = "member.html";
    });
}

// QUIZ FUNCTION
function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("progress").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("category").textContent =
        q.category + " | " + q.difficulty;

    document.getElementById("question").textContent = q.question;

    document.getElementById("feedback").textContent = "";
    document.getElementById("score").textContent = "Score: " + score;

    const optionsArea = document.getElementById("options");
    optionsArea.innerHTML = "";

    q.options.forEach(function (option) {
        const button = document.createElement("button");
        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(option, button);
        });

        optionsArea.appendChild(button);
    });

    answered = false;
    document.getElementById("nextButton").disabled = true;
}

// CHECK ANSWER
function checkAnswer(selectedAnswer) {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const feedback = document.getElementById("feedback");

    if (selectedAnswer === q.answer) {
        score++;
        feedback.textContent = "Correct! 🎉 " + q.explanation;
    } else {
        feedback.textContent =
            "Not quite! The answer is " + q.answer + ". " + q.explanation;
    }

    document.getElementById("score").textContent = "Score: " + score;

    document.querySelectorAll("#options button").forEach(function (button) {
        button.disabled = true;

        if (button.textContent === q.answer) {
            button.style.background = "#16803c";
        } else if (button.textContent === selectedAnswer) {
            button.style.background = "#b51f2b";
        }
    });

    document.getElementById("nextButton").disabled = false;
}

// NEXT QUESTION
const nextButton = document.getElementById("nextButton");

if (nextButton) {
    nextButton.addEventListener("click", function () {
        if (!answered) return;

        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    });
}
function nextQuestion() {
    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        showFinalResults();
    }
}

// FINAL SCORE
function showResults() {
    showFinalResults();
}
    

// RESTART
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
 
    document.getElementById("nextButton").style.display = "";
    showQuestion();
}

// START QUIZ WHEN MEMBER PAGE OPENS
const questionElement = document.getElementById("question");

if (questionElement) {
    const playerName = sessionStorage.getItem("playerName") || "Christmas Player";
    document.getElementById("welcome").textContent = "Good luck, " + playerName + "!";
    showQuestion();
}
const christmasMusic = document.getElementById("christmasMusic");

function startChristmasmusic() {
    christmasMusic.volume = 1;
    christmasMusic.play();
}

function stopChristmasMusic() {
    christmasMusic.pause();
}

function toggleMusic() {
    if (christmasMusic.paused) {
        christmasMusic.play();
        document.getElementById("musicBtn").innerText = "🎵 Music ON";
    } else {
        christmasMusic.pause();
        document.getElementById("musicBtn").innerText = "🔇 Music OFF";
    }
}
function showFinalResults() {
    const percentage = Math.round(
        (score / questions.length) * 100
    );

    let title, message, gift, emoji;

    if (percentage < 40) {
        title = "SANTA'S NAUGHTY LIST!";
        message = "Oh no! Santa is NOT impressed. Better behave next year!";
        gift = "A lump of coal 🪨";
        emoji = "😈";
    }
    else if (percentage < 70) {
        title = "SANTA'S WATCHLIST!";
        message = "Santa has his eyes on you. You're walking a thin line!";
        gift = "A candy cane 🍬";
        emoji = "👀";
    }
    else if (percentage < 90) {
        title = "THE NICE LIST!";
        message = "Well done! You've made Santa proud!";
        gift = "A Christmas present 🎁";
        emoji = "🎅";
    }
    else {
        title = "SANTA'S FAVOURITE!";
        message = "INCREDIBLE! You are a Christmas legend!";
        gift = "A GOLDEN PRESENT 🏆";
        emoji = "🌟";
    }

    if (typeof stopChristmasMusic === "function") {
        stopChristmasMusic();
    }

    document.getElementById("category").textContent =
        "🎄 FINAL RESULTS 🎄";

    document.getElementById("question").innerHTML =
        `${emoji}<br>${title}`;

    document.getElementById("options").innerHTML = `
        <h2>${percentage}%</h2>
        <p>${message}</p>
        <h3>Your Christmas reward:</h3>
        <p>${gift}</p>
        <p>Your score: ${score}/${questions.length}</p>
    `;

    document.getElementById("feedback").textContent =
        "Santa has made his decision! 🎅";

    document.getElementById("progress").textContent =
        "Quiz completed!";

    document.getElementById("nextButton").style.display = "none";
 
}
