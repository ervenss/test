const employees = [
    { name: "Максим", gender: "male", photo: "photos/maxim.jpg" },
    { name: "Света", gender: "female", photo: "photos/sveta.jpg" },
    { name: "Шариф", gender: "male", photo: "photos/charif.jpg" },
    { name: "Михаил", gender: "male", photo: "photos/mixail.jpg" },
    { name: "Антон Петряев", gender: "male", photo: "photos/antoxa.jpg" },
    { name: "Иван", gender: "male", photo: "photos/ivan.jpg" },
    { name: "Эдуард", gender: "male", photo: "photos/idyard.jpg" },
    { name: "Кирилл", gender: "male", photo: "photos/kirill.jpg" },
    { name: "Александр Калинин", gender: "male", photo: "photos/sasha.jpg" },
    { name: "Дмитрий", gender: "male", photo: "photos/dima.jpg" },
    { name: "Медведь", gender: "male", photo: "photos/medved.jpg" },
    { name: "Кристина", gender: "female", photo: "photos/kris.jpg" },
    { name: "Евгений", gender: "male", photo: "photos/jeka.jpg" },
    // Добавьте больше сотрудников
];

let shuffledEmployees = [];
let currentStep = 0;
let correctAnswers = 0;
let incorrectAnswers = []; // Храним неправильные ответы

const sadSoundPath = "audio/sad_violin.mp3"; // Путь к грустному звуку
const victorySoundPath = "audio/pobeda.mp3"; // Путь к звуку победы
const victoryImagePath = "images/mini.gif"; // Путь к картинке победы
const defeatImagePath = "images/minions.gif"; // Путь к картинке проигрыша

let sadAudio = null;
let victoryAudio = null;
let audioTimeout = null; // Таймер для ограничения звука

document.getElementById("start-test").addEventListener("click", startTest);
document.getElementById("restart-test").addEventListener("click", restartTest);

function startTest() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("test-screen").classList.remove("hidden");
    currentStep = 0;
    correctAnswers = 0;
    incorrectAnswers = [];
    shuffledEmployees = shuffleArray([...employees]); // Перемешиваем массив
    renderStep();
}

function renderStep() {
    if (currentStep >= shuffledEmployees.length) {
        showResults();
        return;
    }

    const employee = shuffledEmployees[currentStep];
    const options = generateOptions(employee);

    document.getElementById("employee-photo").src = employee.photo;

    const nameOptionsDiv = document.getElementById("name-options");
    nameOptionsDiv.innerHTML = "";

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => handleAnswer(option === employee.name));
        nameOptionsDiv.appendChild(button);
    });
}

function generateOptions(employee) {
    // Берем все имена сотрудников того же пола, кроме текущего
    const genderNames = employees
        .filter(e => e.gender === employee.gender && e.name !== employee.name)
        .map(e => e.name);

    // Убираем дубликаты и перемешиваем
    const uniqueNames = [...new Set(genderNames)];
    const shuffled = shuffleArray(uniqueNames);

    // Если уникальных имен недостаточно, добавляем фиктивные
    while (shuffled.length < 5) {
        shuffled.push(`Имя${shuffled.length + 1}`);
    }

    // Берем 5 случайных имен и добавляем правильный вариант
    const options = shuffled.slice(0, 5);
    options.push(employee.name); // Добавляем правильное имя

    // Перемешиваем все варианты
    return shuffleArray(options);
}

function handleAnswer(isCorrect) {
    if (!isCorrect) {
        incorrectAnswers.push(shuffledEmployees[currentStep]); // Запоминаем неправильный ответ
    } else {
        correctAnswers++;
    }
    currentStep++;
    renderStep();
}

function showResults() {
    document.getElementById("test-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("result-text").textContent = `Вы ответили правильно ${correctAnswers} раз(а) из ${employees.length}.`;

    const resultImage = document.getElementById("result-image");

    // Если есть неправильные ответы, проигрываем грустный звук
    if (incorrectAnswers.length > 0) {
        playSadSound();
        resultImage.src = defeatImagePath; // Показываем картинку проигрыша
    } else {
        playVictorySound();
        resultImage.src = victoryImagePath; // Показываем картинку победы
    }
}

function playSadSound() {
    // Останавливаем предыдущий звук, если он еще играет
    if (sadAudio) {
        sadAudio.pause();
        sadAudio.currentTime = 0;
    }

    sadAudio = new Audio(sadSoundPath);
    sadAudio.play();
    audioTimeout = setTimeout(() => sadAudio.pause(), 5000); // Остановка через 7 секунд
}

function playVictorySound() {
    // Останавливаем предыдущий звук, если он еще играет
    if (victoryAudio) {
        victoryAudio.pause();
        victoryAudio.currentTime = 0;
    }

    victoryAudio = new Audio(victorySoundPath);
    victoryAudio.play();
}

function restartTest() {
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("welcome-screen").classList.remove("hidden");

    // Останавливаем все звуки, если они играют
    if (sadAudio) {
        sadAudio.pause();
        sadAudio.currentTime = 0;
    }

    if (victoryAudio) {
        victoryAudio.pause();
        victoryAudio.currentTime = 0;
    }

    // Очищаем таймер для звуков
    if (audioTimeout) {
        clearTimeout(audioTimeout);
    }
}

// Утилита для перемешивания массива
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
