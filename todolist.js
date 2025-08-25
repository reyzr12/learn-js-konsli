document.addEventListener('DOMContentLoaded', function () {
  window.tableBody = document.querySelector('#todo-table tbody');
  loadTasks();
  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var submitBtn = form.querySelector('button[type="submit"]');
  var editingRow = null;

  form.onsubmit = function (e) {
    e.preventDefault();
    var task = input.value.trim();
    if (task === '') {
      alert('your input is empty');
      return;
    }

    if (editingRow) {
      // Update existing row
      editingRow.children[1].textContent = task;
      editingRow = null;
      submitBtn.textContent = 'Submit';
      input.value = '';
      saveTasks();
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
        saveTasks();
        // Reset edit state if deleting the row being edited
        if (editingRow === row) {
          editingRow = null;
          submitBtn.textContent = 'Submit';
          input.value = '';
        }
      }
    };

    editBtn.onclick = function () {
      input.value = taskCell.textContent;
      input.focus();
      editingRow = row;
      submitBtn.textContent = 'Update';
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(removeBtn);

    row.appendChild(noCell);
    row.appendChild(taskCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);

    input.value = '';
    saveTasks();
  };
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
        // Reset edit state if deleting the row being edited
        var form = document.getElementById('todo-form');
        var submitBtn = form.querySelector('button[type="submit"]');
        var input = document.getElementById('todo-input');
        if (window.editingRow === row) {
          window.editingRow = null;
          submitBtn.textContent = 'Submit';
          input.value = '';
        }
      }
    };

    editBtn.onclick = function () {
      var form = document.getElementById('todo-form');
      var input = document.getElementById('todo-input');
      var submitBtn = form.querySelector('button[type="submit"]');
      input.value = taskCell.textContent;
      input.focus();
      window.editingRow = row;
      submitBtn.textContent = 'Update';
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
