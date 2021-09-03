const btnAllClear = document.getElementById("btnAllClear");
const lblToday = document.getElementById("lblToday");
const btnAddTodo = document.getElementById("btnAddTodo");
const inputText = document.getElementById("inputText");
const todoList = document.getElementById("todoList");

let index = 0;

const createNewTodoElement = (todoText, doneInfo, idInfo) => {
  contents = JSON.parse(localStorage.getItem("datalist"));
  const li = document.createElement("li");
  const divTextCon = document.createElement("div");
  divTextCon.className = "text-content";
  li.appendChild(divTextCon);

  const label = document.createElement("label");
  label.textContent = todoText;

  const i = document.createElement("i");
  switch (doneInfo) {
    case true:
      i.className = "fa fa-check-circle";
      label.style.textDecoration = "line-through";
      break;
    case false:
      i.className = "fa fa-circle-thin";
      break;
    default:
      break;
  }
  i.setAttribute("aria-hidden", "true");
  i.onclick = markIconClicked;
  i.id = idInfo;

  divTextCon.appendChild(i);
  divTextCon.appendChild(label);

  const divDel = document.createElement("div");
  const di = document.createElement("i");
  di.id = idInfo;
  di.className = "fa fa-trash-o";
  di.setAttribute("aria-hidden", "true");
  di.onclick = delIconClicked;
  divDel.appendChild(di);

  li.appendChild(divDel);

  todoList.appendChild(li);
};

inputText.onkeypress = inputTextEnter;
btnAllClear.onclick = btnAllClearClicked;

function btnAllClearClicked() {
  todoList.innerHTML = "";
  localStorage.clear();
}

function markIconClicked(clickEventInfo) {
  const todoText = clickEventInfo.target.nextElementSibling;
  const key = clickEventInfo.target.id;

  contents = JSON.parse(localStorage.getItem("datalist"));
  switch (clickEventInfo.srcElement.className) {
    case "fa fa-circle-thin":
      clickEventInfo.srcElement.className = "fa fa-check-circle";
      todoText.style.textDecoration = "line-through";
      contents[key].done = true;
      break;
    case "fa fa-check-circle":
      clickEventInfo.srcElement.className = "fa fa-circle-thin";
      todoText.style.textDecoration = "none";
      contents[key].done = false;
      break;
    default:
      break;
  }
  localStorage.setItem("datalist", JSON.stringify(contents));
}

function delIconClicked(clickEventInfo) {
  clickEventInfo.target.parentElement.parentElement.remove();
  const key = clickEventInfo.target.id;

  contents = JSON.parse(localStorage.getItem("datalist"));
  contents.splice(key, 1);
  localStorage.setItem("datalist", JSON.stringify(contents));
}

const delIconNew = (clickEventInfo) =>
  clickEventInfo.target.parentElement.parentElement.remove();

function inputTextEnter() {
  if (event.keyCode == 13) {
    if (localStorage.length == 0) {
      var datalist = [{ id: 0, text: "dummy", done: false }];
      localStorage.setItem("datalist", JSON.stringify(datalist));
    }
    contents = JSON.parse(localStorage.getItem("datalist"));
    contents.push({
      id: contents[contents.length - 1].id + 1,
      text: inputText.value,
      done: false,
    });
    localStorage.setItem("datalist", JSON.stringify(contents));
    createNewTodoElement(
      inputText.value,
      contents[contents.length - 1].done,
      contents[contents.length - 1].id
    );
    inputText.value = "";
    index++;
  }
}

function getToday() {
  let today = new Date();
  let month, day, date;

  month = settingMonth(today);
  day = settingDay(today);
  date = today.getDate();

  lblToday.innerText = `${day}, ${month} ${date}`;
}

function settingMonth(today) {
  switch (today.getMonth()) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      break;
  }
}

function settingDay(today) {
  switch (today.getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      break;
  }
}

const loadLocalStorage = () => {
  contents = JSON.parse(localStorage.getItem("datalist"));
  for (var i = 1, length = contents.length; i < length; ++i) {
    createNewTodoElement(contents[i].text, contents[i].done, contents[i].id);
  }
};

if (localStorage.length != 0) {
  loadLocalStorage();
}
getToday();
