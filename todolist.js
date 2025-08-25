document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var tableBody = document.querySelector('#todo-table tbody');

  form.onsubmit = function (e) {
    e.preventDefault();
    var task = input.value.trim();
    if (task === '') {
      alert('your input is empty');
      return;
    }
    var row = document.createElement('tr');

    var noCell = document.createElement('td');
    noCell.textContent = tableBody.children.length + 1;

    var taskCell = document.createElement('td');
    taskCell.textContent = task;

    var actionCell = document.createElement('td');
    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'Hapus';

    var editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    removeBtn.onclick = function () {
      if (confirm('Yakin mau dihapus?')) {
        tableBody.removeChild(row);
        updateRowNumbers();
      }
    };

    editBtn.onclick = function () {
      var currentTask = taskCell.textContent;
      var editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = currentTask;
      taskCell.textContent = '';
      taskCell.appendChild(editInput);
      editInput.focus();

      editInput.onblur = function () {
        var newTask = editInput.value.trim();
        if (newTask !== '') {
          taskCell.textContent = newTask;
        } else {
          taskCell.textContent = currentTask;
        }
      };

      editInput.onkeydown = function (event) {
        if (event.key === 'Enter') {
          editInput.blur();
        }
      };
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(removeBtn);

    row.appendChild(noCell);
    row.appendChild(taskCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);

    input.value = '';
  };

  function updateRowNumbers() {
    var rows = tableBody.children;
    for (var i = 0; i < rows.length; i++) {
      rows[i].children[0].textContent = i + 1;
    }
  }
});

function saveTasks() {
  var tasks = [];
  var rows = tableBody.children;
  for (var i = 0; i < rows.length; i++) {
    tasks.push(rows[i].children[1].textContent);
  }
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
  tasks.forEach(function(task) {
    var row = document.createElement('tr');

    var noCell = document.createElement('td');
    noCell.textContent = tableBody.children.length + 1;

    var taskCell = document.createElement('td');
    taskCell.textContent = task;

    var actionCell = document.createElement('td');
    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'Hapus';

    var editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    removeBtn.onclick = function () {
      if (confirm('Yakin mau dihapus?')) {
        tableBody.removeChild(row);
        updateRowNumbers();
        saveTasks();
      }
    };

    editBtn.onclick = function () {
      var currentTask = taskCell.textContent;
      var editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = currentTask;
      taskCell.textContent = '';
      taskCell.appendChild(editInput);
      editInput.focus();

      editInput.onblur = function () {
        var newTask = editInput.value.trim();
        if (newTask !== '') {
          taskCell.textContent = newTask;
        } else {
          taskCell.textContent = currentTask;
        }
        saveTasks();
      };

      editInput.onkeydown = function (event) {
        if (event.key === 'Enter') {
          editInput.blur();
        }
      };
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(removeBtn);

    row.appendChild(noCell);
    row.appendChild(taskCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}



function updateRowNumbers() {
  var rows = tableBody.children;
  for (var i = 0; i < rows.length; i++) {
    rows[i].children[0].textContent = i + 1;
  }
}

loadTasks();
