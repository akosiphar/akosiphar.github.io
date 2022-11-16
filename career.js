window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];

	const newTodoForm = document.querySelector('#new-todo-form');

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			iD: e.target.elements.id.value,
			name: e.target.elements.name.value,
            desc: e.target.elements.desc.value,
            reason: e.target.elements.reason.value,
            tDate: e.target.elements.tDate.value,
            cDate: e.target.elements.cDate.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('tr');
		todoItem.classList.add('todo-item');

		// const label = document.createElement('label');
		// const input = document.createElement('input');
		// const span = document.createElement('span');
		const iD = document.createElement('td');
		const name = document.createElement('td');
		const desc = document.createElement('td');
		const reason = document.createElement('td');
		const tDate = document.createElement('td');
		const cDate = document.createElement('td');
		const actions = document.createElement('td');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');


		iD.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		iD.innerHTML = `<input type="text" value="${todo.iD}" readonly>`;
		name.innerHTML = `<input type="text" value="${todo.name}" readonly>`;
		desc.innerHTML = `<input type="text" value="${todo.desc}" readonly>`;
		reason.innerHTML = `<input type="text" value="${todo.reason}" readonly>`;
		tDate.innerHTML = `<input type="text" value="${todo.tDate}" readonly>`;
		cDate.innerHTML = `<input type="text" value="${todo.cDate}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(iD);
		todoItem.appendChild(name);
		todoItem.appendChild(desc);
		todoItem.appendChild(reason);
		todoItem.appendChild(tDate);
		todoItem.appendChild(cDate);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		edit.addEventListener('click', (e) => {
			const input = desc.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.desc = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}