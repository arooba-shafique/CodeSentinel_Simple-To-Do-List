const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const pendingList = document.getElementById("pending");
const completedList = document.getElementById("completed");
const tabs = document.querySelectorAll(".tab");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = "";
});

function addTask(text, isCompleted = false) {
  const li = document.createElement("li");
  li.className = "item";
  li.innerHTML = `
    <span class="text ${isCompleted ? "completed" : ""}">${text}</span>
    <div class="actions">
      ${isCompleted ? '' : `<button class="btn complete"><i class="fas fa-check"></i></button>`}
      <button class="btn delete"><i class="fas fa-trash-alt"></i></button>
    </div>
  `;

  if (isCompleted) {
    completedList.appendChild(li);
  } else {
    pendingList.appendChild(li);
  }

  li.querySelector(".delete").addEventListener("click", () => {
    li.style.animation = "fadeAndScaleOut 0.3s forwards";
    li.addEventListener("animationend", () => li.remove());
  });

  if (!isCompleted) {
    li.querySelector(".complete").addEventListener("click", () => {
      const taskText = li.querySelector(".text").textContent;
      li.style.animation = "fadeAndSlideOut 0.5s forwards";
      li.addEventListener("animationend", () => {
        li.remove();
        addTask(taskText, true);
      });
    });
  }
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".list").forEach(list => list.classList.remove("active"));
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  const isDark = body.classList.contains("dark-theme");
  themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});
