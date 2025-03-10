// script.js

document.getElementById('addBtn').addEventListener('click', function() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        let taskList = document.getElementById('taskList');

        let li = document.createElement('li');
        li.innerHTML = `
            ${taskText} 
            <button onclick="deleteTask(this)">Delete</button>
            <input type="checkbox" onclick="toggleTaskCompletion(this)">
        `;
        
        taskList.appendChild(li);
        taskInput.value = ""; // Clear input field
    }
});

function deleteTask(button) {
    let taskItem = button.parentElement;
    taskItem.remove();
}

function toggleTaskCompletion(checkbox) {
    let taskItem = checkbox.parentElement;
    
    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
}
// حفظ المهام في localStorage
function saveTasks() {
    let tasks = [];
    const taskList = document.querySelectorAll('ul li');
    
    taskList.forEach(task => {
        let taskObj = {
            text: task.textContent.trim(),
            completed: task.classList.contains('completed')
        };
        tasks.push(taskObj);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// استرجاع المهام من localStorage عند تحميل الصفحة
window.onload = function() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.innerHTML += `
                <button onclick="deleteTask(this)">Delete</button>
                <input type="checkbox" onclick="toggleTaskCompletion(this)" ${task.completed ? 'checked' : ''}>
            `;
            document.getElementById('taskList').appendChild(li);
        });
    }
};
