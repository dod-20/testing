let currentIndex = 0;
let lesson;

async function getLesson(lessonNum) {
    try {
        const response = await fetch(`../lessons/verbs/lesson${lessonNum}.json`);
        lesson = await response.json();
        console.log(lesson.title);
        startLesson(); // call rendering after JSON is loaded
    } catch (error) {
        console.error(error);
    }
}

function startLesson() {
    document.getElementById("lesson-title").textContent = lesson.title;
    renderLesson(currentIndex);
}

function renderLesson(index) {
    const container = document.querySelector(".lesson-main");
    const next = document.getElementById("nextBtn");
    next.disabled = true;
    container.innerHTML = "";

    const exercise = lesson.exercises[index];
    
    if (exercise.type === "fill-in-the-blank") {
        const p = document.createElement("p");
        p.textContent = exercise.sentence;
        const input = document.createElement("input");

        input.addEventListener("input", () => {
            next.disabled = input.value.trim() === "";
        });

        container.appendChild(p);
        container.appendChild(input);

        next.onclick = () => {
            alert(input.value.trim() === exercise.expectedAnswer ? "Correct!" : `Incorrect! Correct: ${exercise.expectedAnswer}`);
            currentIndex++;
            loadNext();
        };
    } else if (exercise.type === "multiple-choice") {
        const p = document.createElement("p");
        p.textContent = exercise.sentence;
        container.appendChild(p);

        let selected = null;

        exercise.options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.textContent = opt;
            btn.addEventListener("click", () => {
                selected = idx;
                next.disabled = false;
            });
            container.appendChild(btn);
        });

        next.onclick = () => {
            if (selected === exercise.correctOption) {
                alert("Correct!");
            } else {
                alert(`Incorrect. Correct: ${exercise.options[exercise.correctOption]}`);
            }
            selected = null;
            currentIndex++;
            loadNext();
        };
    }
}

function loadNext() {
    const next = document.getElementById("nextBtn");
    if (currentIndex < lesson.exercises.length) {
        renderLesson(currentIndex);
        next.disabled = true;
    } else {
        alert("Lesson completed!");
        document.getElementById("lesson-title").textContent = "Lesson Finished";
        document.querySelector(".lesson-main").innerHTML = "";
        next.style.display = "none";
    }
}

// Start by fetching the lesson
getLesson(1);
