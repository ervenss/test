const employees = [
    { name: "Антонов Максим Дмитриевич (Директор по развитию)", gender: "male", photo: "photos/maxim.jpg" },
    { name: "Полынцева Светлана Валерьевна (Директор по продажам)", gender: "female", photo: "photos/sveta.jpg" },
    { name: "Одинаев Шариф Худжамуродович (Учредитель)", gender: "male", photo: "photos/charif.jpg" },
    { name: "Смирнов Михаил Олегович (Маркетолог)", gender: "male", photo: "photos/mixail.jpg" },
    { name: "Петряев Антон Павлович (Руководитель frontend разработки)", gender: "male", photo: "photos/antoxa.jpg" },
    { name: "Мельников Иван Александрович (Директор по персоналу)", gender: "male", photo: "photos/ivan.jpg" },
    { name: "Миллер Эдуард Яковлевич (HR)", gender: "male", photo: "photos/idyard.jpg" },
    { name: "Курилко Кирилл Иванович (Помощник)", gender: "male", photo: "photos/kirill.jpg" },
    { name: "Калинин Александр Владимирович (Менеджер по документообороту)", gender: "male", photo: "photos/sasha.jpg" },
    { name: "Хоменко Дмитрий Витальевич (Менеджер В2В продаж)", gender: "male", photo: "photos/dima.jpg" },
    { name: "Зангиев Сосланбек Дмитриевич (Генеральный директор)", gender: "male", photo: "photos/medved.jpg" },
    { name: "Баширова Кристина Руслановна (Переводчик, контент-менеджер)", gender: "female", photo: "photos/kris.jpg" },
    { name: "Кудрявцев Евгений Сергеевич (Руководитель отдела разработки)", gender: "male", photo: "photos/jeka.jpg" },
    { name: "Ечменица Младен (МОП)", gender: "male", photo: "photos/mladen.jpg" },
    { name: "Горбатененко Арсений Кириллович (МОП)", gender: "male", photo: "photos/arseni.png" },
    { name: "Трухачев Иван Федорович (МОП)", gender: "male", photo: "photos/tryxachev.png" },


    { name: "Садигзаде Хикмет Асамаддин Оглы (Разработчик frontend)", gender: "male", photo: "photos/hicmet.png" },
    { name: "Гаршин Даниил Викторович (Разработчик backend)", gender: "male", photo: "photos/garhin.jpg" },
    { name: "Мягков Алексей Сергеевич  (Разработчик backend)", gender: "male", photo: "photos/skuf.jpg" },
    { name: "Митяшин Игорь Валерьевич  (Разработчик backend)", gender: "male", photo: "photos/igar.jpg" },
    { name: "Кругликов Вячеслав Артемович (Разработчик frontend)", gender: "male", photo: "photos/slava.jpg" },
    { name: "Волошин Максим Вадимович (Разработчик frontend)", gender: "male", photo: "photos/maxim3.jpg" },
    { name: "Турнов Анатолий Фёдорович (Стажер backend)", gender: "male", photo: "photos/tola.jpg" },



    { name: "Гряник Кирилл Денисович (Дизайнер)", gender: "male", photo: "photos/kir.jpg" },




    { name: "Саид Азим Сара (МОП)", gender: "female", photo: "photos/sara.jpg" },
    { name: "Упорова Виктория Николаевна (МОП)", gender: "female", photo: "photos/vika.jpg" },
    { name: "Матвеева Снежана Алексеевна (МОП)", gender: "female", photo: "photos/snejana.jpg" },
    { name: "Кузьмина Ксения Дмитриевна (МОП)", gender: "female", photo: "photos/ksenia.jpg" },
    { name: "Павлова Ирина Сергеевна (МОП)", gender: "female", photo: "photos/ira.png" },

    { name: "Авакян Диана Андраниковна (Аналитик)", gender: "female", photo: "photos/diana.jpg" },
    { name: "Акимова Анастасия Павловна (Специалист ОКК)", gender: "female", photo: "photos/nastya.jpg" },
    { name: "Попова Алина Анатольевна (Супервайзер)", gender: "female", photo: "photos/alina.jpg" },
    { name: "Лукоянова Юлия Юрьевна (Супервайзер)", gender: "female", photo: "photos/ulia.jpg" },





    { name: "Милованов Александр Сергеевич (МОП)", gender: "male", photo: "photos/alexander.jpg" },
    { name: "Зайчиков Егор Евгеньевич (МОП)", gender: "male", photo: "photos/egor.jpg" },
    { name: "Федорук Даниил Григорьевич (МОП)", gender: "male", photo: "photos/fedoruc.jpg" },
    { name: "Серебренников Михаил Сергеевич (Офис-менеджер)", gender: "male", photo: "photos/mixail2.png" },
    { name: "Ярыгин Никита Александрович (Проджект менеджер)", gender: "male", photo: "photos/nikita.jpg" },







    { name: "Янцен Максим (МОП)", gender: "male", photo: "photos/maxim2.jpg" },
    { name: "Звонов Дмитрий Анатольевич (МОП)", gender: "male", photo: "photos/zvonov.jpg" }
];

let shuffledEmployees = [];
let currentStep = 0;
let correctAnswers = 0;
let incorrectAnswers = [];
const sadSoundPath = "audio/sad_violin.mp3";
const victorySoundPath = "audio/pobeda.mp3";
const victoryImagePath = "images/mini.gif";
const defeatImagePath = "images/minions.gif";

let sadAudio = null;
let victoryAudio = null;
let audioTimeout = null;

let timerInterval = null;
let startTime = 0;
let timerElement = null;

document.getElementById("start-test").addEventListener("click", startTest);
document.getElementById("restart-test").addEventListener("click", restartTest);

function startTest() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("test-screen").classList.remove("hidden");
    currentStep = 0;
    correctAnswers = 0;
    incorrectAnswers = [];
    shuffledEmployees = shuffleArray([...employees]);

    // Создаем таймер и сразу показываем его
    startTimer(); // Таймер сразу начинает отсчет
    renderStep();
}

function startTimer() {
    // Если таймер еще не создан, создаем его
    if (!timerElement) {
        timerElement = document.createElement("div");
        timerElement.style.position = "fixed";
        timerElement.style.top = "20px";
        timerElement.style.right = "20px";
        timerElement.style.color = "black"; // Черный цвет для цифр
        timerElement.style.fontFamily = "Arial, sans-serif";
        timerElement.style.fontSize = "22px";
        timerElement.textContent = "00:00"; // Устанавливаем начальное значение
        document.body.appendChild(timerElement);
    }

    startTime = Date.now(); // Сохраняем текущее время

    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Форматирование таймера
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
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
        button.classList.add("split-button");

        const [name, position] = option.split(" (");
        const bottomText = position ? position.replace(")", "") : "";

        const topDiv = document.createElement("div");
        topDiv.classList.add("top");
        topDiv.textContent = name;

        const bottomDiv = document.createElement("div");
        bottomDiv.classList.add("bottom");
        bottomDiv.textContent = bottomText;

        button.appendChild(topDiv);
        button.appendChild(bottomDiv);

        button.addEventListener("click", () => handleAnswer(option === employee.name));
        nameOptionsDiv.appendChild(button);
    });
}

function generateOptions(employee) {
    const names = employees
        .filter(e => e.name !== employee.name && e.gender === employee.gender) // Фильтруем по полу
        .map(e => e.name);

    // Увеличиваем количество вариантов до 5
    while (names.length < 5) {
        names.push(`Имя ${names.length + 1}`);
    }

    return shuffleArray([...names.slice(0, 5), employee.name]);
}

function handleAnswer(isCorrect) {
    if (isCorrect) correctAnswers++;
    else incorrectAnswers.push(shuffledEmployees[currentStep]);

    currentStep++;
    renderStep();
}

function showResults() {
    document.getElementById("test-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("result-text").textContent = `Вы ответили правильно ${correctAnswers} раз(а) из ${employees.length}.`;

    const resultImage = document.getElementById("result-image");
    if (incorrectAnswers.length > 0) {
        playSadSound();
        resultImage.src = defeatImagePath;
    } else {
        playVictorySound();
        resultImage.src = victoryImagePath;
    }

    stopTimer(); // Останавливаем таймер после окончания теста
}

function playSadSound() {
    if (sadAudio) {
        sadAudio.pause();
        sadAudio.currentTime = 0;
    }

    sadAudio = new Audio(sadSoundPath);
    sadAudio.play();
    audioTimeout = setTimeout(() => sadAudio.pause(), 5000);
}

function playVictorySound() {
    if (victoryAudio) {
        victoryAudio.pause();
        victoryAudio.currentTime = 0;
    }

    victoryAudio = new Audio(victorySoundPath);
    victoryAudio.play();
}

function restartTest() {
    location.reload();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
