filterSelect.addEventListener('change', function () {
    input.value = '';
    const query = this.value.trim();
    fetch(`https://to-do-app-ot3b.onrender.com/filter?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(tasks => {
            taskContainer.innerHTML = ''; 

            if (tasks.length > 0) {
                tasks.forEach(task => {
                    const taskElement = document.createElement('div');
                    taskElement.classList.add("box");
                    taskElement.innerHTML = `
                        <div class="title c1">${task.title}</div>
                        <div class="c2">
                            <div class="time badge">${task.startTime} - ${task.endTime}</div>
                            <div class="status badge ${task.status.toLowerCase().replace(' ', '_')}">${task.status}</div>
                        </div>
                        <div class="options">
                            <div class="sub_options sub1">
                                <form method="get" action="https://to-do-app-ot3b.onrender.com/tasks/${task._id}">
                                    <button><img src="/assets/view_icon.png" alt=""></button>
                                </form>
                            </div>
                            <div class="sub_options sub2">
                                <form method="get" action="https://to-do-app-ot3b.onrender.com/tasks/edit/${task._id}">
                                    <button><img src="/assets/edit_icon.png" alt=""></button>
                                </form>
                            </div>
                            <div class="sub_options sub3">
                                <form id="delete_from" method="post" action="https://to-do-app-ot3b.onrender.com/tasks/${task._id}?_method=DELETE">
                                    <button type="button" id="delete_btn"><img src="/assets/delete_icon.png" alt=""></button>
                                </form>
                            </div>
                        </div>
                    `;
                    taskContainer.appendChild(taskElement);
                });
            } 
            
            else {
                taskContainer.innerHTML = '<div class="notask">No tasks found...</div>';
            }
        })
        .catch(error => console.error('Error:', error));
});



