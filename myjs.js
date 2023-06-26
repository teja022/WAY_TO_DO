window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const pendingList = document.querySelector("#pending-tasks");
	const completedList = document.querySelector("#completed-tasks");
  
	form.addEventListener('submit', (e) => {
	  e.preventDefault();
  
	  const task = input.value;
  
	  const taskEl = createTaskElement(task);
  
	  pendingList.appendChild(taskEl);
  
	  input.value = '';
	});
  
	function createTaskElement(task) {
	  const taskEl = document.createElement('div');
	  taskEl.classList.add('task');
  
	  const taskContentEl = document.createElement('div');
	  taskContentEl.classList.add('content');
  
	  const taskInputEl = document.createElement('input');
	  taskInputEl.classList.add('text');
	  taskInputEl.type = 'text';
	  taskInputEl.value = task;
	  taskInputEl.setAttribute('readonly', 'readonly');
  
	  taskContentEl.appendChild(taskInputEl);
  
	  const taskActionsEl = document.createElement('div');
	  taskActionsEl.classList.add('actions');
  
	  const taskCompleteEl = document.createElement('button');
	  taskCompleteEl.classList.add('complete');
	  taskCompleteEl.innerText = 'Complete';
  
	  const taskDeleteEl = document.createElement('button');
	  taskDeleteEl.classList.add('delete');
	  taskDeleteEl.innerText = 'Delete';
  
	  taskActionsEl.appendChild(taskCompleteEl);
  
	  if (completedList.contains(taskEl)) {
		taskActionsEl.appendChild(taskDeleteEl);
  
		taskDeleteEl.addEventListener('click', (e) => {
		  deleteTask(taskEl);
		});
	  } else {
		const taskEditEl = document.createElement('button');
		taskEditEl.classList.add('edit');
		taskEditEl.innerText = 'Edit';
  
		taskActionsEl.appendChild(taskEditEl);
  
		taskEditEl.addEventListener('click', (e) => {
		  editTask(taskInputEl);
		});
  
		taskActionsEl.appendChild(taskDeleteEl);
  
		taskDeleteEl.addEventListener('click', (e) => {
		  deleteTask(taskEl);
		});
	  }
  
	  taskEl.appendChild(taskContentEl);
	  taskEl.appendChild(taskActionsEl);
  
	  taskCompleteEl.addEventListener('click', (e) => {
		markTaskComplete(taskEl);
	  });
  
	  return taskEl;
	}
  
	function markTaskComplete(taskEl) {
	  const completedTaskEl = taskEl.cloneNode(true);
	  completedTaskEl.querySelector('.complete').remove();
	  completedList.appendChild(completedTaskEl);
	  taskEl.remove();
  
	  // Reattach delete button event listener for completed tasks
	  const taskDeleteEl = completedTaskEl.querySelector('.delete');
	  taskDeleteEl.addEventListener('click', (e) => {
		deleteTask(completedTaskEl);
	  });
  
	  // Remove edit button from completed tasks
	  const taskEditEl = completedTaskEl.querySelector('.edit');
	  if (taskEditEl) {
		taskEditEl.remove();
	  }
	}
  
	function editTask(taskInputEl) {
	  if (taskInputEl.readOnly) {
		taskInputEl.removeAttribute("readonly");
		taskInputEl.focus();
	  } else {
		taskInputEl.setAttribute("readonly", "readonly");
	  }
	}
  
	function deleteTask(taskEl) {
	  taskEl.remove();
	}
  });
  