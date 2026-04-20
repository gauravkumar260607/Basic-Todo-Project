if(!localStorage.getItem("loggedInUser")) window.location.href="index.html";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let plan = localStorage.getItem("plan") || "Free";

const user = localStorage.getItem("loggedInUser");
document.getElementById("profileName").innerText = user;
document.getElementById("topUser").innerText = user;
document.getElementById("currentPlan").innerText = plan;

function logout(){
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle("show");
}

function showSection(section){
  ["dashboardSection","settingsSection","subscriptionSection"].forEach(id=>{
    document.getElementById(id).style.display="none";
  });

  document.getElementById(section).style.display="block";

  dashBtn.classList.remove("active");
  setBtn.classList.remove("active");
  subBtn.classList.remove("active");

  if(section==="dashboardSection") dashBtn.classList.add("active");
  if(section==="settingsSection") setBtn.classList.add("active");
  if(section==="subscriptionSection") subBtn.classList.add("active");
}

function subscribe(type){
  plan = type;
  localStorage.setItem("plan", type);
  document.getElementById("currentPlan").innerText = type;
  alert("Subscribed to " + type + " plan!");
}

function addTask(){
  const input = document.getElementById("taskInput");
  if(input.value.trim()==="") return;

  tasks.push({text:input.value,done:false});
  input.value="";
  saveTasks();
  renderTasks();
}

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML="";

  tasks.forEach((task,index)=>{
    list.innerHTML += `
      <li>
        <span class="${task.done?'done':''}" onclick="toggleTask(${index})">${task.text}</span>
        <div class="actions">
          <button onclick="toggleTask(${index})">✓</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      </li>
    `;
  });

  updateStats();
}

function toggleTask(i){
  tasks[i].done=!tasks[i].done;
  saveTasks();
  renderTasks();
}

function deleteTask(i){
  tasks.splice(i,1);
  saveTasks();
  renderTasks();
}

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats(){
  const total=tasks.length;
  const completed=tasks.filter(t=>t.done).length;
  const pending=total-completed;
  const progress=total?Math.round((completed/total)*100):0;

  totalTasks.innerText=total;
  completedTasks.innerText=completed;
  pendingTasks.innerText=pending;
  progressPercent.innerText=progress+"%";
}

function updateClock(){
  clock.innerText = new Date().toLocaleTimeString();
}

setInterval(updateClock,1000);
updateClock();
renderTasks();