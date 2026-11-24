/* required js for assignment */

function replaceWelcomeAndReminder() {
    let label = document.getElementById("welcome-header");
    let welcomeheaderinput = document.getElementById("welcome-header-input");
    if (welcomeheaderinput.value.trim() !== "") {
        label.textContent = "Hello, " + welcomeheaderinput.value + "!";
    }

    let bodylabel = document.getElementById("welcome-body");
    let welcomebodyinput = document.getElementById("welcome-body-input");
    if (welcomebodyinput.value.trim() !== "") {
        bodylabel.textContent = welcomebodyinput.value;
    }

    let chosentheme = document.getElementById("board-theme");

    document.body.style.color = "";
    document.body.style.background = "";

    if (chosentheme.value == "pink") {
        document.body.style.background = "pink";
    } else if (chosentheme.value == "blue") {
        document.body.style.background = "#8FD9FB";
    } else if (chosentheme.value == "purple") {
        document.body.style.background = "#B388FF";
    } else if (chosentheme.value == "green") {
        document.body.style.background = "#bffe28";
    } else if (chosentheme.value == "dark") {
        document.body.style.background = "#202A44";
        document.body.style.color = "#ffffff";
    } else if (chosentheme.value == "beach") {
        document.body.style.background = "url('beachimage.jpg') center / cover fixed";
    }
}

/* goal js */

function setGoal () {
    let goal = document.getElementById("focus-goal").value;
    if (goal.trim() === "") {
        return;
    }
    document.getElementById("current-goal").textContent = goal;
}

document.getElementById("set-goal-button").addEventListener("click", setGoal);

document.getElementById("focus-form").addEventListener("submit", function (event) {
    event.preventDefault();
    setGoal();
});

/* timer basics js */

let timeLeft = 3600;
let timer;

function showTime () {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    document.getElementById("timer-display").textContent = minutes + ":" + seconds;
}

function countDown () {
    timeLeft = timeLeft - 1;
    showTime();
    if (timeLeft <= 0) {
        stopTimer();
        document.getElementById("timer-status").textContent = "Time is up! Great job, take a 5 minute stretching break and hydrate!";
    }
}

function startTimer () {
    clearInterval(timer);
    timer = setInterval(countDown, 1000);
    document.getElementById("timer-status").textContent = "You've got this.";
}

function stopTimer () {
    clearInterval(timer);
    document.getElementById("timer-status").textContent = "Paused";
}

function resetTimer () {
    clearInterval(timer);
    timeLeft = document.getElementById("focus-duration").value * 60;
    showTime();
    document.getElementById("timer-status").textContent = "Ready to focus?";
}

document.getElementById("start-timer").addEventListener("click", startTimer);
document.getElementById("pause-timer").addEventListener("click", stopTimer);
document.getElementById("reset-timer").addEventListener("click", resetTimer);
document.getElementById("focus-duration").addEventListener("change", resetTimer);

/* to do list */

function addTask () {
    let input = document.getElementById("todo-input");
    let text = input.value.trim();
    if (text === "") {
        return;
    }
    let category = document.getElementById("task-category").value;

    let item = document.createElement("li");
    item.textContent = text + " (" + category + ")";

    item.addEventListener("click", function () {
        item.classList.toggle("done");
    });

    document.getElementById("todo-list").appendChild(item);
    input.value = "";
}

function clearCompleted () {
    let doneItems = document.querySelectorAll("#todo-list .done");
    doneItems.forEach(function (item) {
        item.remove();
    });
}

document.getElementById("add-task").addEventListener("click", addTask);
document.getElementById("clear-completed").addEventListener("click", clearCompleted);

document.getElementById("todo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
});

document.getElementById("todo-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

document.getElementById("focus-goal").addEventListener("keydown", function (event) {
    if (event.key ==="Enter") {
        event.preventDefault();
        setGoal();
    }
});
