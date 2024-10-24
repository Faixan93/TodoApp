const taskSummary = document.getElementById("task-summary");
const taskDescription = document.getElementById("task-description");
const taskDueDate = document.getElementById("task-due-date");
const incompleteList = document.getElementById("list-incomplete");
const completedList = document.getElementById("list-completed");

const saveButton = document.querySelector(".btn-save");

// Function to format the date
function formatDueDate(dateString) {
  if (!dateString) return "No due date";

  const date = new Date(dateString);
  const now = new Date();

  // Check if the due date is today
  const isToday = date.toDateString() === now.toDateString();

  // Check if the due date is tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (isToday) {
    return `Today, ${hours}:${minutes}`;
  } else if (isTomorrow) {
    return `Tomorrow, ${hours}:${minutes}`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}, ${hours}:${minutes}`;
  }
}
let taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
//for storing tasks
let taskId = 0;

saveButton.addEventListener("click", () => {
  const summaryValue = taskSummary.value.trim();
  const descriptionValue = taskDescription.value.trim() || "no description";
  const dueDateValue = taskDueDate.value.trim();

  const taskList = document.querySelector(".task-list");

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = false;
  checkbox.classList.add("form-check-input", "checkboxInput");
  checkbox.id = taskId + 1;

  /*   checkbox.style.appearance = "auto"; */
  const taskDetails = document.createElement("div");

  const task_Summary_Element = document.createElement("h5");
  task_Summary_Element.innerText = summaryValue;
  task_Summary_Element.classList.add("summaryElement");

  const task_Description_Element = document.createElement("p");
  task_Description_Element.innerText = descriptionValue;
  task_Description_Element.classList.add("mb-1", "description-completed");

  const task_dueDate_Element = document.createElement("small");
  task_dueDate_Element.innerText =
    dueDateValue !== "No due date"
      ? `⏰ ${formatDueDate(dueDateValue)}`
      : "No due date";
  task_dueDate_Element.classList.add("dueDateElement");

  taskDetails.appendChild(checkbox);
  taskDetails.appendChild(task_Summary_Element);
  taskDetails.appendChild(task_dueDate_Element);

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskDetails);
  taskList.appendChild(taskItem);
  console.log("original taskid", taskId);
  let temp = {
    summaryValue,
    descriptionValue,
    dueDateValue,
    completed: false,
    id: taskId + 1,
    remindLater: true,
  };
  taskId += 1;

  taskArray.push(temp);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));

  // Move task between incomplete and complete sections based on checkbox state
  /*   checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      taskDetails.appendChild(task_Description_Element);
      completedList.appendChild(taskItem);

      task_dueDate_Element.innerText = "";
      task_dueDate_Element.style.display = "none";

      task_Summary_Element.innerText = "";
      task_Summary_Element.style.display = "none";

      task_Description_Element.innerText = descriptionValue;
      task_Description_Element.style.display = "flex";
    } else {
      incompleteList.appendChild(taskItem);

      task_Summary_Element.style.display = "flex";
      task_Summary_Element.innerText = summaryValue;

      task_Description_Element.innerText = "";
      task_Description_Element.style.display = "none";

      task_dueDate_Element.style.display = "inline"; // Show the due date element again
      task_dueDate_Element.innerText =
        dueDateValue !== "no due date"
          ? `⏰ ${formatDueDate(dueDateValue)}`
          : "No due date";
    }
  }); */
  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      taskDetails.appendChild(task_Description_Element);
      taskItem.style.height = "24px";
      completedList.appendChild(taskItem);
      // Hide summary and due date, but keep the checkbox visible

      task_Description_Element.style.display = "none";
      task_dueDate_Element.style.display = "none";

      task_Summary_Element.innerText = summaryValue;
      /*       task_Summary_Element.classList.add("summaryElementCompleted");
       */ task_Summary_Element.style.color = "#b9b9be";
      task_Summary_Element.style.display = "flex";

      checkbox.checked = true;
      // Ensure checkbox remains visible
      checkbox.style.display = "inline";

      let temp_array = JSON.parse(localStorage.getItem("taskArray"));
      temp_array.map((element) => {
        if (element.id == checkbox.id) {
          element.completed = true;
        }
      });

      localStorage.setItem("taskArray", JSON.stringify(temp_array));
    } else {
      taskItem.style.height = "45px";
      incompleteList.appendChild(taskItem);

      task_Summary_Element.innerText = summaryValue;
      task_Summary_Element.style.color = "#000000";
      task_Summary_Element.style.display = "flex";

      task_Description_Element.innerText = "";
      task_Description_Element.style.display = "none";

      task_dueDate_Element.style.display = "inline"; // Show the due date element again
      task_dueDate_Element.innerText =
        dueDateValue !== "no due date"
          ? `⏰ ${formatDueDate(dueDateValue)}`
          : "No due date";

      // Ensure checkbox remains visible
      checkbox.style.display = "inline";
      checkbox.checked = false;
      let temp_array = JSON.parse(localStorage.getItem("taskArray"));
      temp_array.map((element) => {
        if (element.id == checkbox.id) {
          element.completed = false;
        }
      });

      localStorage.setItem("taskArray", JSON.stringify(temp_array));
    }
  });

  //clear form input
  taskSummary.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";

  //close model
  const modalElement = document.getElementById("taskModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();
});

// Function to show the notification
function showNotification(summaryValue, descriptionValue, taskId) {
  console.log("taskId", taskId);

  const notificationDiv = document.querySelector(".notification-contain");
  let textDiv = notificationDiv.querySelector(".text");
  textDiv.querySelector(".text-1").innerHTML = summaryValue;
  textDiv.querySelector(".text-2").innerHTML = descriptionValue;

  const skipButton = notificationDiv.querySelector("#skip-btn");
  const laterButton = notificationDiv.querySelector("#later-btn");

  // Remove previous event listeners to prevent duplicates
  skipButton.replaceWith(skipButton.cloneNode(true));
  laterButton.replaceWith(laterButton.cloneNode(true));

  notificationDiv
    .querySelector("#skip-btn")
    .addEventListener("click", () => skip(taskId));
  notificationDiv
    .querySelector("#later-btn")
    .addEventListener("click", () => remindLater(taskId));

  notificationDiv.style.display = "flex";
}

function checkTaskNotification() {
  const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
  /* const taskDateTime = localStorage.getItem("taskDateTime"); */

  taskArray.map((element) => {
    const currentDateTime = new Date();
    const taskTime = new Date(element.dueDateValue);

    // Calculate the difference in hours
    const diffInMs = Math.abs(currentDateTime - taskTime); //milli_seconds
    const diffInHours = diffInMs / (1000 * 60 * 60); //calculate hours left
    console.log("dffInhourss", diffInHours);
    // If the difference is 1 hour or less, show the notification
    if (diffInHours <= 1 && element.remindLater) {
      showNotification(
        element.summaryValue,
        element.descriptionValue,
        element.id
      );
    }
  });
}

function remindLater(id) {
  let temp_array = JSON.parse(localStorage.getItem("taskArray"));
  temp_array.map((element) => {
    if (element.id == id) {
      element.remindLater = true;
    }
  });
  const notificationDiv = document.querySelector(".notification-contain");
  notificationDiv.style.display = "none";
  localStorage.setItem("taskArray", JSON.stringify(temp_array));
}

function skip(id) {
  let temp_array = JSON.parse(localStorage.getItem("taskArray"));
  temp_array.map((element) => {
    if (element.id == id) {
      element.remindLater = false;
    }
  });
  const notificationDiv = document.querySelector(".notification-contain");
  notificationDiv.style.display = "none";

  localStorage.setItem("taskArray", JSON.stringify(temp_array));
}
let divElement = document.querySelector(".notification-contain");
let rectangle = divElement.querySelector(".rectangle");

rectangle.querySelector("#skip-btn").addEventListener("click", skip);
rectangle.querySelector("#later-btn").addEventListener("click", remindLater);

const handleGetTasks = () => {
  let task_array = JSON.parse(localStorage.getItem("taskArray")) || [];

  task_array.map((element) => {
    const taskList = document.querySelector(".task-list");
    const taskListCompleted = document.querySelector(".task-list-completed");

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = element.completed ? true : false;
    checkbox.classList.add("form-check-input", "checkboxInput");
    checkbox.id = element.taskId;

    const taskDetails = document.createElement("div");

    const task_Summary_Element = document.createElement("h5");
    task_Summary_Element.innerText = element.summaryValue;
    if (element.completed == false) {
      task_Summary_Element.classList.add("summaryElement");
    }
    if (element.completed == true) {
      task_Summary_Element.classList.add("summaryElementCompleted");
    }

    const task_Description_Element = document.createElement("p");
    task_Description_Element.innerText = element.descriptionValue;
    task_Description_Element.classList.add("mb-1", "description-completed");

    const task_dueDate_Element = document.createElement("small");
    task_dueDate_Element.innerText =
      element.dueDateValue !== "No due date"
        ? `⏰ ${formatDueDate(element.dueDateValue)}`
        : "No due date";
    task_dueDate_Element.classList.add("dueDateElement");

    taskDetails.appendChild(checkbox);
    taskDetails.appendChild(task_Summary_Element);

    if (element.completed == false) {
      task_dueDate_Element.style.display = "flex";
    }
    if (element.completed == true) {
      task_dueDate_Element.style.display = "none";
    }
    taskDetails.appendChild(task_dueDate_Element);

    /*     if (element.completed == false) {
      taskDetails.appendChild(task_dueDate_Element);
    } */

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskDetails);
    if (element.completed) {
      taskListCompleted.appendChild(taskItem);
    } else {
      taskList.appendChild(taskItem);
    }
    checkbox.addEventListener("click", function () {
      if (checkbox.checked) {
        taskDetails.appendChild(task_Description_Element);
        taskItem.style.height = "24px";
        completedList.appendChild(taskItem);

        // Hide summary and due date, but keep the checkbox visible

        task_Description_Element.style.display = "none";
        task_dueDate_Element.style.display = "none";

        task_Summary_Element.innerText = element.summaryValue;
        /* task_Summary_Element.classList.add("summaryElementCompleted"); */
        task_Summary_Element.style.color = "#b9b9be";
        task_Summary_Element.style.display = "flex";

        checkbox.checked = true;
        // Ensure checkbox remains visible
        checkbox.style.display = "inline";

        let temp_array = JSON.parse(localStorage.getItem("taskArray"));
        temp_array.map((item) => {
          if (item.id == element.id) {
            item.completed = true;
          }
        });

        localStorage.setItem("taskArray", JSON.stringify(temp_array));
      } else {
        taskItem.style.height = "45px";
        incompleteList.appendChild(taskItem);

        task_Summary_Element.innerText = element.summaryValue;
        task_Summary_Element.style.color = "#000000";
        task_Summary_Element.style.display = "flex";

        task_Description_Element.innerText = "";
        task_Description_Element.style.display = "none";

        task_dueDate_Element.style.display = "flex";

        task_dueDate_Element.innerText =
          element.dueDateValue !== "no due date"
            ? `⏰ ${formatDueDate(element.dueDateValue)}`
            : "No due date";

        checkbox.style.display = "inline";
        checkbox.checked = false;
        let temp_array = JSON.parse(localStorage.getItem("taskArray"));
        temp_array.map((item) => {
          if (item.id == element.id) {
            item.completed = false;
          }
        });

        localStorage.setItem("taskArray", JSON.stringify(temp_array));
      }
    });
  });
};
document.addEventListener("DOMContentLoaded", handleGetTasks);

// Periodically check for the task notification every minute (60000 milliseconds or 1 minute)
//setInterval(checkTaskNotification, 6000); // 6 seconds
setInterval(checkTaskNotification, 60000); //1 minute
