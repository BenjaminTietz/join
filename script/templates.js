/* templates from addTask.js */

/**
 * Function to create the HTML template for the members' options in the form.
 * @param {Object} contact - The contact object.
 * @returns {string} - The HTML template for the member option.
 */
function templateMembersChose(contact) {
    return /*html*/`
        <option value="${contact['name']}">${contact['name']}</option>
    `;
};


/**
 * Function to create the HTML template for a subtask element.
 * @param {number} i - The index of the subtask.
 * @returns {string} - The HTML template for the subtask element.
 */
function templateSubtasks(i) {
    return /*html*/`
        <div class="text-subtask">
            ${subtasks[i]}
            <img onclick="deleteSubtask(${i})" class="hover" id="delete_btn_subtasks${i}" src="../assets/icons/trash.png" alt="">
        </div>
    `;
};


/**
 * Function to create the HTML template for the selected members.
 * @param {number} i - The index of the selected member.
 * @returns {string} - The HTML template for the selected member element.
 */
function templateMembers(i) {
    return /*html*/`
        <div style="background-color: ${assignedToColors[i]}" onclick=deleteMember(${i}) class="member-add-task">
            <span>${assignedToInitials[i]}</span>
        </div>
    `;
};


/**
 * Function to create the HTML template for the pop-up notification.
 * @returns {string} - The HTML template for the pop-up notification.
 */
function templatePopUpTaskAdded() {
    return /*html*/`
        <div class="pop-up-task-added" id="pop_up_task_added">
                <span class="pop-up-task-added-text">Task added to board</span>
                <img class="pop-up-task-added-img" src="../assets/icons/icon_sidebar_board.svg" alt="">
        </div>
    `;
};


/* templates from board.js */


/**
 * Generates the HTML template for rendering a single task on the board.
 * @param {Object} task - The task object containing task information.
 * @param {number} j - The index of the task in the tasks array.
 * @param {string} status - The status of the task.
 * @returns {string} The HTML template for the single task.
 */
function templateSingleTask(task, j, status) {
    return /*html*/`
        <div draggable="true" class="single-task" onclick="openTask(${j})" ondragstart="startDragging(${j})">
            <div class="${task['category']} category">
                ${task['category'].slice(0, 1).toUpperCase()}${task['category'].slice(1)}
            </div>

            <div class="single-task-title">
                ${task['title']}
            </div>

            <div class="single-task-description">
                ${task['description']}
            </div>

            <div class="single-task-subtasks">
                <span>Subtasks: </span>${task['subtasks'].length}
                <div>
                    <progress class="progressbar" id="progressbar${j}" value="${task['subtasksDone'].length}" min="0" max="${task['subtasks'].length}"></progress>
                </div>
                <div id="subtasksDoneText${j}">${task['subtasksDone'].length} of ${task['subtasks'].length} done </div>
            </div>

            <div class="container-member-prio">
                <div class="single-task-member" id="single_task_member${j}"></div>
                <div class="single-task-prio" id="single-task-prio${j}"></div>
            </div>

            <div onclick="doNotClose(event)" class="change-status-mobile">
                <span>Change status</span>
                <img id="statusUp${status}${j}" onclick="changeStatusClick(${j},'up')" class="img-btn-status-up" src="../assets/icons/icon_arrow_down.png" alt="">
                <img id="statusDown${status}${j}" onclick="changeStatusClick(${j},'down')" class="img-btn-status-down" src="../assets/icons/icon_arrow_down.png" alt="">
            </div>
        </div>
    `;
};


/**
 * Generates the HTML template for rendering the task details view.
 *
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for the task details view.
 */
function templateDetailsTask(j) {
    return /*html*/`
        <!-- HTML template for task details view -->
        <div onclick="doNotClose(event)" class="container-single-task">
            <div class="${tasks[j]['category']} category detail-task-category">
                ${tasks[j]['category'].slice(0, 1).toUpperCase()}${tasks[j]['category'].slice(1)}
            </div>

            <div class="detail-task-title">
                ${tasks[j]['title']}
            </div>

            <div class="detail-task-description">
                ${tasks[j]['description']}
            </div>

            <div class="detail-task-date">
                <span>Due Date:</span>
                ${tasks[j]['dueDate']}
            </div>

            <div class="detail-task-prio">
                <span>Priority:</span>
                <div id="detail_task_prio_img"></div>
            </div>


            <div class="detail-task-subtasks">
                <span>Subtasks</span>
                <div class="detail-task-subtasks-container" id="detail_task_subtasks"></div>
            </div>

            <div class="detail-task-member">
                <span>Assigned to:</span>
                <div class="detail-task-member-container" id="detail_task_member"></div>                
            </div>

            <img class="detail-task-close-btn" onclick="closeTaskDetail()" src="../assets/icons/icon_cross_dark.svg" alt="">
            <div class="container-container-delete-and-edit-task">
                <div class="container-delete-and-edit-task">
                    <div class="container-delete-task">
                        <img onclick="deleteTask(${j})" src="../assets/icons/icon_trash_dark.svg" alt="">
                    </div>

                    <div class="container-edit-task">
                        <img onclick="editTask(${j})" src="../assets/icons/icon_pencil.svg" alt="">
                    </div>


                </div>
            </div>
        </div>
    `;
};


/**
 * Generates the HTML template for the form to add a new task on the board.
 * @param {string[]} stati - An array containing different task statuses: todo, progress, awaiting, done.
 * @returns {string} The HTML template for the add task form.
 */
function templateFormAddTaskBoard(stati) {
    return /*html*/`
        <!-- HTML template for the add task form -->
        <div class="container-formular-task-on-board" onclick="doNotClose(event)">

<img onclick="closeAddTaskBoard()" src="../assets/icons/icon_cross_dark.svg" alt class="detail-task-close-btn">

<span class="title-formular-on-board">Add Task</span>

<form id="form_add_task" class="form-add-task" onsubmit="addTaskAndCloseForm('${stati}'); return false">

    <div class="left_side_desktop-add-task">

        <div class="container-input">
            <span class="form-text-add-task">Title</span>
            <input class="inputfield-add-task" type="text" required placeholder="Enter a title" name=""
                id="title_form">
        </div>

        <div class="container-input">
            <span class="form-text-add-task">Description</span>
            <textarea class="inputfield-add-task" maxlength="200" placeholder="Enter a description" name=""
                id="description_form"></textarea>
        </div>

        <div class="container-input">
            <span class="form-text-add-task">Category</span>
            <select class="inputfield-add-task" type="text" required name="" id="category_form">
                <option value="" disabled selected>Select a category</option>
                <option class="sales" value="sales">Sales</option>
                <option class="marketing" value="marketing">Marketing</option>
                <option class="accounting" value="accounting">Accounting</option>
                <option class="development" value="development">Development</option>
                <option class="purchase" value="purchase">Purchase</option>
            </select>
        </div>

        <div class="container-input">
            <span class="form-text-add-task">Assigned to</span>
            <select oninput="addMember()" class="inputfield-add-task" type="text" required name=""
                id="assignedTo_form">
            </select>

            <div class="" id="click_to_delete_text"></div>

            <div class="selected-members-add-task" id="selected_members_add_task">

            </div>
        </div>
    </div>

    <img class="line-icon-add-task" src="../assets/icons/vertical_line_addTask.svg" alt="">

    <div class="right_side_desktop-add-task">

        <div class="container-input">
            <span class="form-text-add-task">Due date</span>
            <input class="inputfield-add-task" type="date" required placeholder="dd/mm/yyyy" name=""
                id="dueDate_form">
        </div>

        <div class="container-input">
            <span class="form-text-add-task">Prio</span>

            <div class="container-prio-btn-add-task">

                <div id="prio_btn_urgent" class="prio-btn-add-task" onclick="setPrioValue('urgent')">
                    <span class="text-btn-prio-add-task">Urgent</span>
                    <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio alta" clip-path="url(#clip0_66768_2703)">
                                <g id="Capa 2">
                                <g id="Capa 1">
                                <path id="Vector" d="M18.9043 14.7547C18.6696 14.7551 18.4411 14.6803 18.2522 14.5412L10.0001 8.458L1.74809 14.5412C1.63224 14.6267 1.50066 14.6887 1.36086 14.7234C1.22106 14.7582 1.07577 14.7651 0.933305 14.7437C0.790837 14.7223 0.653973 14.6732 0.530528 14.599C0.407083 14.5247 0.299474 14.427 0.213845 14.3112C0.128216 14.1954 0.0662437 14.0639 0.0314671 13.9243C-0.00330956 13.7846 -0.0102098 13.6394 0.0111604 13.497C0.0543195 13.2095 0.21001 12.9509 0.443982 12.7781L9.34809 6.20761C9.53679 6.06802 9.76536 5.99268 10.0001 5.99268C10.2349 5.99268 10.4635 6.06802 10.6522 6.20761L19.5563 12.7781C19.7422 12.915 19.8801 13.1071 19.9503 13.327C20.0204 13.5469 20.0193 13.7833 19.9469 14.0025C19.8746 14.2216 19.7349 14.4124 19.5476 14.5475C19.3604 14.6826 19.1352 14.7551 18.9043 14.7547Z" fill="#FF3D00"/>
                                <path id="Vector_2" d="M18.9043 9.00568C18.6696 9.00609 18.4411 8.93124 18.2522 8.79214L10.0002 2.70898L1.7481 8.79214C1.51412 8.96495 1.22104 9.0378 0.93331 8.99468C0.645583 8.95155 0.386785 8.79597 0.213849 8.56218C0.0409137 8.32838 -0.0319941 8.03551 0.011165 7.74799C0.054324 7.46048 0.210015 7.20187 0.443986 7.02906L9.3481 0.458588C9.5368 0.318997 9.76537 0.243652 10.0002 0.243652C10.2349 0.243652 10.4635 0.318997 10.6522 0.458588L19.5563 7.02906C19.7422 7.16598 19.8801 7.35809 19.9503 7.57797C20.0204 7.79785 20.0193 8.03426 19.947 8.25344C19.8746 8.47262 19.7349 8.66338 19.5476 8.79847C19.3604 8.93356 19.1352 9.00608 18.9043 9.00568Z" fill="#FF3D00"/>
                                </g>
                                </g>
                                </g>
                                <defs>
                                <clipPath id="clip0_66768_2703">
                                <rect width="20" height="14.5098" fill="white" transform="translate(0 0.245117)"/>
                                </clipPath>
                                </defs>
                            </svg>
                </div>

                <div id="prio_btn_medium" class="prio-btn-add-task prio-selected" onclick="setPrioValue('medium')">
                    <span class="text-btn-prio-add-task">Medium</span>
                    <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio media" clip-path="url(#clip0_66768_2710)">
                                <g id="Capa 2">
                                <g id="Capa 1">
                                <path id="Vector" d="M18.9041 8.22528H1.09589C0.805242 8.22528 0.526498 8.10898 0.320979 7.90197C0.11546 7.69495 0 7.41419 0 7.12143C0 6.82867 0.11546 6.5479 0.320979 6.34089C0.526498 6.13388 0.805242 6.01758 1.09589 6.01758H18.9041C19.1948 6.01758 19.4735 6.13388 19.679 6.34089C19.8845 6.5479 20 6.82867 20 7.12143C20 7.41419 19.8845 7.69495 19.679 7.90197C19.4735 8.10898 19.1948 8.22528 18.9041 8.22528Z" fill="#FFA800"/>
                                <path id="Vector_2" d="M18.9041 2.98211H1.09589C0.805242 2.98211 0.526498 2.86581 0.320979 2.6588C0.11546 2.45179 0 2.17102 0 1.87826C0 1.5855 0.11546 1.30474 0.320979 1.09772C0.526498 0.890712 0.805242 0.774414 1.09589 0.774414L18.9041 0.774414C19.1948 0.774414 19.4735 0.890712 19.679 1.09772C19.8845 1.30474 20 1.5855 20 1.87826C20 2.17102 19.8845 2.45179 19.679 2.6588C19.4735 2.86581 19.1948 2.98211 18.9041 2.98211Z" fill="#FFA800"/>
                                </g>
                                </g>
                                </g>
                                <defs>
                                <clipPath id="clip0_66768_2710">
                                <rect width="20" height="7.45098" fill="white" transform="translate(0 0.774414)"/>
                                </clipPath>
                                </defs>
                            </svg>
                </div>

                <div id="prio_btn_low" class="prio-btn-add-task" onclick="setPrioValue('low')">
                    <span class="text-btn-prio-add-task">Low</span>
                    <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio baja">
                                <g id="Capa 2">
                                <g id="Capa 1">
                                <path id="Vector" d="M10 9.00614C9.7654 9.00654 9.53687 8.9317 9.34802 8.79262L0.444913 2.22288C0.329075 2.13733 0.231235 2.02981 0.15698 1.90647C0.0827245 1.78313 0.033508 1.64638 0.0121402 1.50404C-0.031014 1.21655 0.0418855 0.923717 0.214802 0.689945C0.387718 0.456173 0.646486 0.300615 0.934181 0.257493C1.22188 0.21437 1.51493 0.287216 1.74888 0.460004L10 6.54248L18.2511 0.460004C18.367 0.374448 18.4985 0.312529 18.6383 0.277782C18.7781 0.243035 18.9234 0.236141 19.0658 0.257493C19.2083 0.278844 19.3451 0.328025 19.4685 0.402225C19.592 0.476425 19.6996 0.574193 19.7852 0.689945C19.8708 0.805697 19.9328 0.937168 19.9676 1.07685C20.0023 1.21653 20.0092 1.36169 19.9879 1.50404C19.9665 1.64638 19.9173 1.78313 19.843 1.90647C19.7688 2.02981 19.6709 2.13733 19.5551 2.22288L10.652 8.79262C10.4631 8.9317 10.2346 9.00654 10 9.00614Z" fill="#7AE229"/>
                                <path id="Vector_2" d="M10 14.7547C9.7654 14.7551 9.53687 14.6802 9.34802 14.5412L0.444913 7.97142C0.210967 7.79863 0.0552944 7.54005 0.0121402 7.25257C-0.031014 6.96509 0.0418855 6.67225 0.214802 6.43848C0.387718 6.20471 0.646486 6.04915 0.934181 6.00603C1.22188 5.96291 1.51493 6.03575 1.74888 6.20854L10 12.291L18.2511 6.20854C18.4851 6.03575 18.7781 5.96291 19.0658 6.00603C19.3535 6.04915 19.6123 6.20471 19.7852 6.43848C19.9581 6.67225 20.031 6.96509 19.9879 7.25257C19.9447 7.54005 19.789 7.79863 19.5551 7.97142L10.652 14.5412C10.4631 14.6802 10.2346 14.7551 10 14.7547Z" fill="#7AE229"/>
                                </g>
                                </g>
                                </g>
                            </svg>
                </div>

                <input required id="prio_hidden" type="hidden" value="medium">
            </div>
        </div>

        <div class="container-input pos-relative">
            <span class="form-text-add-task">Subtasks</span>
            <input class="inputfield-add-task" maxlength="30" type="text" placeholder="Add new subtask"
                name="" id="input_subtask">
            <img onclick="addSubtask()" class="btn-plus-add-task" src="../assets/icons/icon_plus_dark.svg"
                alt="">
            <div class="container-subtasks" id="container_subtasks">

            </div>
        </div>
    </div>

    <div class="btn-container-add-task-on-board">
        <button onclick="reset(); resetPrioValue(); resetSubtaskArray(); resetAssignedTo()"
            id="btn_clear_task" type="button" for class="btn-clear">
            <span>Clear</span>
            <img src="../assets/icons/icon_cross_dark.svg" alt="">
        </button>

        <button type="submit" class="btn-create-task" id="btn_add_task_on_board_submit">
            <span>Create Task</span>
            <img src="../assets/icons/icon_check_bright.svg" alt="">
        </button>

    </div>
</form>
</div>

</div>   
    `;
};


/**
 * Generates the HTML template for a single contact option in the "Assigned to" dropdown.
 * @param {Object} contact - The contact object containing contact information (e.g., name).
 * @returns {string} The HTML template for a single contact option in the dropdown.
 */
function templateMembersChose(contact) {
    return /*html*/`
    <option value="${contact['name']}">${contact['name']}</option>
`;
};


/**
 * Generates the HTML template for a single subtask in the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 * @param {number} i - The index of the subtask in the subtasks array.
 * @returns {string} The HTML template for a single subtask in the edit task form.
 */
function templateSubtasksEditTask(j, i) {
    return /*html*/`
        <div class="text-subtask">
            <label class="form-control">
                <span><input type="checkbox" id="subtask_edit_${i}"></span>
                </label>
                ${tasks[j]['subtasks'][i]}
                <img onclick="deleteSubtaskEditTask(${j}, ${i})" class="hover" id="delete_btn_subtasks${i}" src="../assets/icons/trash.png" alt="">
        </div>
    `;
};


/**
 * Generates the HTML template for a single selected member in the edit task form.
 * @param {number} i - The index of the member in the assignedTo array.
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for a single selected member in the edit task form.
 */
function templateMembersEditTask(i, j) {
    return /*html*/`
        <div style="background-color: ${tasks[j]['colors'][i]}" onclick=deleteMemberEditTask(${i},${j}) class="member-add-task">
            <span>${tasks[j]['initials'][i]}</span>
        </div>
    `;
};


/**
 * Generates the HTML template for the edit task form.
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for the edit task form.
 */
function templateEditTask(j) {
    return /*html*/`
        <!-- HTML template for the edit task form -->
        <div class="container-formular-task-on-board" onclick="doNotClose(event)">
            
            <!-- Close button for the edit task form -->
            <img onclick="closeEditTask()" src="../assets/icons/icon_cross_dark.svg" alt="" class="detail-task-close-btn">
            
            <!-- Title of the edit task form -->
            <span class="title-formular-on-board">Edit Task</span>

            <!-- Edit task form -->
            <form id="form_add_task" class="form-add-task" onsubmit="return false">

                <!-- Left side of the form containing task details -->
                <div class="left_side_desktop-add-task">

                    <!-- Input field for the task title -->
                    <div class="container-input">
                        <span class="form-text-add-task">Title</span>
                        <input value="${tasks[j]['title']}" class="inputfield-add-task" type="text" required placeholder="Enter a title" name=""
                            id="title_form">
                    </div>

                    <!-- Text area for the task description -->
                    <div class="container-input">
                        <span class="form-text-add-task">Description</span>
                        <textarea class="inputfield-add-task" maxlength="200" placeholder="Enter a description" name=""
                            id="description_form">${tasks[j]['description']}</textarea>
                    </div>

                    <!-- Dropdown select field for task category -->
                    <div class="container-input">
                        <span class="form-text-add-task">Category</span>
                        <select class="inputfield-add-task" type="text" required name="" id="category_form">
                            <option value="${tasks[j]['category']}" disabled selected>${tasks[j]['category'].slice(0, 1).toUpperCase()}${tasks[j]['category'].slice(1)}</option>
                            <option class="sales" value="sales">Sales</option>
                            <option class="marketing" value="marketing">Marketing</option>
                            <option class="accounting" value="accounting">Accounting</option>
                            <option class="development" value="development">Development</option>
                            <option class="purchase" value="purchase">Purchase</option>
                        </select>
                    </div>

                    <!-- Dropdown select field for assigning the task to a team member -->
                    <div class="container-input">
                        <span class="form-text-add-task">Assigned to</span>
                        <select oninput="addMemberEditTask(${j})" class="inputfield-add-task" type="text" name=""
                            id="assignedTo_form">
                        </select>

                        <!-- Click to delete text for selected team members -->
                        <div class="" id="click_to_delete_text"></div>

                        <!-- Container for displaying selected team members -->
                        <div class="selected-members-add-task" id="selected_members_add_task">

                        </div>
                    </div>
                </div>

                <!-- Vertical line separating the left and right sides of the form -->
                <img class="line-icon-add-task" src="../assets/icons/vertical_line_addTask.svg" alt="">

                <!-- Right side of the form containing task details -->
                <div class="right_side_desktop-add-task">

                    <!-- Input field for the task due date -->
                    <div class="container-input">
                        <span class="form-text-add-task">Due date</span>
                        <input value="${tasks[j]['dueDate']}" class="inputfield-add-task" type="date" required placeholder="dd/mm/yyyy" name=""
                            id="dueDate_form">
                    </div>

                    <!-- Priority buttons for the task -->
                    <div class="container-input">
                        <span class="form-text-add-task">Prio</span>

                        <div class="container-prio-btn-add-task">

                            <!-- Urgent priority button -->
                            <div id="prio_btn_urgent" class="prio-btn-add-task" onclick="setPrioValueEditTask(${j},'urgent')">
                                <span class="text-btn-prio-add-task">Urgent</span>
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio alta" clip-path="url(#clip0_66768_2703)">
                                <g id="Capa 2">
                                <g id="Capa 1">
                                <path id="Vector" d="M18.9043 14.7547C18.6696 14.7551 18.4411 14.6803 18.2522 14.5412L10.0001 8.458L1.74809 14.5412C1.63224 14.6267 1.50066 14.6887 1.36086 14.7234C1.22106 14.7582 1.07577 14.7651 0.933305 14.7437C0.790837 14.7223 0.653973 14.6732 0.530528 14.599C0.407083 14.5247 0.299474 14.427 0.213845 14.3112C0.128216 14.1954 0.0662437 14.0639 0.0314671 13.9243C-0.00330956 13.7846 -0.0102098 13.6394 0.0111604 13.497C0.0543195 13.2095 0.21001 12.9509 0.443982 12.7781L9.34809 6.20761C9.53679 6.06802 9.76536 5.99268 10.0001 5.99268C10.2349 5.99268 10.4635 6.06802 10.6522 6.20761L19.5563 12.7781C19.7422 12.915 19.8801 13.1071 19.9503 13.327C20.0204 13.5469 20.0193 13.7833 19.9469 14.0025C19.8746 14.2216 19.7349 14.4124 19.5476 14.5475C19.3604 14.6826 19.1352 14.7551 18.9043 14.7547Z" fill="#FF3D00"/>
                                <path id="Vector_2" d="M18.9043 9.00568C18.6696 9.00609 18.4411 8.93124 18.2522 8.79214L10.0002 2.70898L1.7481 8.79214C1.51412 8.96495 1.22104 9.0378 0.93331 8.99468C0.645583 8.95155 0.386785 8.79597 0.213849 8.56218C0.0409137 8.32838 -0.0319941 8.03551 0.011165 7.74799C0.054324 7.46048 0.210015 7.20187 0.443986 7.02906L9.3481 0.458588C9.5368 0.318997 9.76537 0.243652 10.0002 0.243652C10.2349 0.243652 10.4635 0.318997 10.6522 0.458588L19.5563 7.02906C19.7422 7.16598 19.8801 7.35809 19.9503 7.57797C20.0204 7.79785 20.0193 8.03426 19.947 8.25344C19.8746 8.47262 19.7349 8.66338 19.5476 8.79847C19.3604 8.93356 19.1352 9.00608 18.9043 9.00568Z" fill="#FF3D00"/>
                                </g>
                                </g>
                                </g>
                                <defs>
                                <clipPath id="clip0_66768_2703">
                                <rect width="20" height="14.5098" fill="white" transform="translate(0 0.245117)"/>
                                </clipPath>
                                </defs>
                            </svg>
                            </div>

                            <!-- Medium priority button -->
                            <div id="prio_btn_medium" class="prio-btn-add-task" onclick="setPrioValueEditTask(${j},'medium')">
                                <span class="text-btn-prio-add-task">Medium</span>
                                <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio media" clip-path="url(#clip0_66768_2710)">
                                <g id="Capa 2">
                                <g id="Capa 1">
                                <path id="Vector" d="M18.9041 8.22528H1.09589C0.805242 8.22528 0.526498 8.10898 0.320979 7.90197C0.11546 7.69495 0 7.41419 0 7.12143C0 6.82867 0.11546 6.5479 0.320979 6.34089C0.526498 6.13388 0.805242 6.01758 1.09589 6.01758H18.9041C19.1948 6.01758 19.4735 6.13388 19.679 6.34089C19.8845 6.5479 20 6.82867 20 7.12143C20 7.41419 19.8845 7.69495 19.679 7.90197C19.4735 8.10898 19.1948 8.22528 18.9041 8.22528Z" fill="#FFA800"/>
                                <path id="Vector_2" d="M18.9041 2.98211H1.09589C0.805242 2.98211 0.526498 2.86581 0.320979 2.6588C0.11546 2.45179 0 2.17102 0 1.87826C0 1.5855 0.11546 1.30474 0.320979 1.09772C0.526498 0.890712 0.805242 0.774414 1.09589 0.774414L18.9041 0.774414C19.1948 0.774414 19.4735 0.890712 19.679 1.09772C19.8845 1.30474 20 1.5855 20 1.87826C20 2.17102 19.8845 2.45179 19.679 2.6588C19.4735 2.86581 19.1948 2.98211 18.9041 2.98211Z" fill="#FFA800"/>
                                </g>
                                </g>
                                </g>
                                <defs>
                                <clipPath id="clip0_66768_2710">
                                <rect width="20" height="7.45098" fill="white" transform="translate(0 0.774414)"/>
                                </clipPath>
                                </defs>
                            </svg>
                            </div>

                            <!-- Low priority button -->
                            <div id="prio_btn_low" class="prio-btn-add-task" onclick="setPrioValueEditTask(${j},'low')">
                                <span class="text-btn-prio-add-task">Low</span>
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio baja">
                                <g id="Capa 2">
                                <g id="Capa 1">
                                <path id="Vector" d="M10 9.00614C9.7654 9.00654 9.53687 8.9317 9.34802 8.79262L0.444913 2.22288C0.329075 2.13733 0.231235 2.02981 0.15698 1.90647C0.0827245 1.78313 0.033508 1.64638 0.0121402 1.50404C-0.031014 1.21655 0.0418855 0.923717 0.214802 0.689945C0.387718 0.456173 0.646486 0.300615 0.934181 0.257493C1.22188 0.21437 1.51493 0.287216 1.74888 0.460004L10 6.54248L18.2511 0.460004C18.367 0.374448 18.4985 0.312529 18.6383 0.277782C18.7781 0.243035 18.9234 0.236141 19.0658 0.257493C19.2083 0.278844 19.3451 0.328025 19.4685 0.402225C19.592 0.476425 19.6996 0.574193 19.7852 0.689945C19.8708 0.805697 19.9328 0.937168 19.9676 1.07685C20.0023 1.21653 20.0092 1.36169 19.9879 1.50404C19.9665 1.64638 19.9173 1.78313 19.843 1.90647C19.7688 2.02981 19.6709 2.13733 19.5551 2.22288L10.652 8.79262C10.4631 8.9317 10.2346 9.00654 10 9.00614Z" fill="#7AE229"/>
                                <path id="Vector_2" d="M10 14.7547C9.7654 14.7551 9.53687 14.6802 9.34802 14.5412L0.444913 7.97142C0.210967 7.79863 0.0552944 7.54005 0.0121402 7.25257C-0.031014 6.96509 0.0418855 6.67225 0.214802 6.43848C0.387718 6.20471 0.646486 6.04915 0.934181 6.00603C1.22188 5.96291 1.51493 6.03575 1.74888 6.20854L10 12.291L18.2511 6.20854C18.4851 6.03575 18.7781 5.96291 19.0658 6.00603C19.3535 6.04915 19.6123 6.20471 19.7852 6.43848C19.9581 6.67225 20.031 6.96509 19.9879 7.25257C19.9447 7.54005 19.789 7.79863 19.5551 7.97142L10.652 14.5412C10.4631 14.6802 10.2346 14.7551 10 14.7547Z" fill="#7AE229"/>
                                </g>
                                </g>
                                </g>
                            </svg>
                            </div>

                            <!-- Hidden input for storing the priority value (not needed) -->
                            <!-- <input required id="prio_hidden" type="hidden" value="medium"> -->
                        </div>
                    </div>

                    <!-- Input field for adding subtasks to the task -->
                    <div class="container-input pos-relative">
                        <span class="form-text-add-task">Subtasks</span>
                        <input class="inputfield-add-task" maxlength="30" type="text" placeholder="Add new subtask"
                            name="" id="input_subtask">
                        <img onclick="addSubtaskEditTask(${j})" class="btn-plus-add-task" src="../assets/icons/icon_plus_dark.svg"
                            alt="">
                        <!-- Container for displaying subtasks -->
                        <div class="container-subtasks" id="container_subtasks">
                            
                        </div>
                    </div>
                </div>

                <!-- Container for the buttons at the bottom of the form -->
                <div class="btn-container-add-task-on-board">
                    <!-- Reset button to reset the form -->
                    <button onclick="editTask(${j})"
                        id="btn_clear_task" type="button" for class="btn-clear">
                        <span>Reset</span>
                        <img src="../assets/icons/icon_cross_dark.svg" alt="">
                    </button>

                    <!-- Button to save the changes made in the form -->
                    <button onclick="safeChangesEditTask(${j})" class="btn-create-task">
                        <span>Safe Changes</span>
                        <img src="../assets/icons/icon_check_bright.svg" alt="">
                    </button>
                </div>
            </form>
        </div>
    </div>
    `;
};


/**
 * Generate the HTML template for displaying a task's priority as "Urgent".
 *
 * @param {number} j - The index of the task in the 'tasks' array.
 * @returns {string} The HTML template for displaying the task's priority as "Urgent".
 */
function templateDetailTaskPrioUrgent(j) {
    return /*html*/`
    <div class="prio-selected-urgent prio_svg border-low prio-btn-add-task">
        <span>${tasks[j]['prio'].slice(0, 1).toUpperCase()}${tasks[j]['prio'].slice(1)}</span>
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Prio alta" clip-path="url(#clip0_66768_2703)">
            <g id="Capa 2">
            <g id="Capa 1">
            <path id="Vector" d="M18.9043 14.7547C18.6696 14.7551 18.4411 14.6803 18.2522 14.5412L10.0001 8.458L1.74809 14.5412C1.63224 14.6267 1.50066 14.6887 1.36086 14.7234C1.22106 14.7582 1.07577 14.7651 0.933305 14.7437C0.790837 14.7223 0.653973 14.6732 0.530528 14.599C0.407083 14.5247 0.299474 14.427 0.213845 14.3112C0.128216 14.1954 0.0662437 14.0639 0.0314671 13.9243C-0.00330956 13.7846 -0.0102098 13.6394 0.0111604 13.497C0.0543195 13.2095 0.21001 12.9509 0.443982 12.7781L9.34809 6.20761C9.53679 6.06802 9.76536 5.99268 10.0001 5.99268C10.2349 5.99268 10.4635 6.06802 10.6522 6.20761L19.5563 12.7781C19.7422 12.915 19.8801 13.1071 19.9503 13.327C20.0204 13.5469 20.0193 13.7833 19.9469 14.0025C19.8746 14.2216 19.7349 14.4124 19.5476 14.5475C19.3604 14.6826 19.1352 14.7551 18.9043 14.7547Z" fill="#FF3D00"/>
            <path id="Vector_2" d="M18.9043 9.00568C18.6696 9.00609 18.4411 8.93124 18.2522 8.79214L10.0002 2.70898L1.7481 8.79214C1.51412 8.96495 1.22104 9.0378 0.93331 8.99468C0.645583 8.95155 0.386785 8.79597 0.213849 8.56218C0.0409137 8.32838 -0.0319941 8.03551 0.011165 7.74799C0.054324 7.46048 0.210015 7.20187 0.443986 7.02906L9.3481 0.458588C9.5368 0.318997 9.76537 0.243652 10.0002 0.243652C10.2349 0.243652 10.4635 0.318997 10.6522 0.458588L19.5563 7.02906C19.7422 7.16598 19.8801 7.35809 19.9503 7.57797C20.0204 7.79785 20.0193 8.03426 19.947 8.25344C19.8746 8.47262 19.7349 8.66338 19.5476 8.79847C19.3604 8.93356 19.1352 9.00608 18.9043 9.00568Z" fill="#FF3D00"/>
            </g>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_66768_2703">
            <rect width="20" height="14.5098" fill="white" transform="translate(0 0.245117)"/>
            </clipPath>
            </defs>
        </svg>
    </div>
    `;
};


/**
 * Generate the HTML template for displaying a task's priority as "Medium".
 *
 * @param {number} j - The index of the task in the 'tasks' array.
 * @returns {string} The HTML template for displaying the task's priority as "Medium".
 */
function templateDetailTaskPrioMedium(j) {
    return /*html*/`
    <div class="prio-selected-medium prio_svg border-low prio-btn-add-task">
        <span>${tasks[j]['prio'].slice(0, 1).toUpperCase()}${tasks[j]['prio'].slice(1)}</span>         
        <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Prio media" clip-path="url(#clip0_66768_2710)">
            <g id="Capa 2">
            <g id="Capa 1">
            <path id="Vector" d="M18.9041 8.22528H1.09589C0.805242 8.22528 0.526498 8.10898 0.320979 7.90197C0.11546 7.69495 0 7.41419 0 7.12143C0 6.82867 0.11546 6.5479 0.320979 6.34089C0.526498 6.13388 0.805242 6.01758 1.09589 6.01758H18.9041C19.1948 6.01758 19.4735 6.13388 19.679 6.34089C19.8845 6.5479 20 6.82867 20 7.12143C20 7.41419 19.8845 7.69495 19.679 7.90197C19.4735 8.10898 19.1948 8.22528 18.9041 8.22528Z" fill="#FFA800"/>
            <path id="Vector_2" d="M18.9041 2.98211H1.09589C0.805242 2.98211 0.526498 2.86581 0.320979 2.6588C0.11546 2.45179 0 2.17102 0 1.87826C0 1.5855 0.11546 1.30474 0.320979 1.09772C0.526498 0.890712 0.805242 0.774414 1.09589 0.774414L18.9041 0.774414C19.1948 0.774414 19.4735 0.890712 19.679 1.09772C19.8845 1.30474 20 1.5855 20 1.87826C20 2.17102 19.8845 2.45179 19.679 2.6588C19.4735 2.86581 19.1948 2.98211 18.9041 2.98211Z" fill="#FFA800"/>
            </g>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_66768_2710">
            <rect width="20" height="7.45098" fill="white" transform="translate(0 0.774414)"/>
            </clipPath>
            </defs>
        </svg>
    </div>  
    `;
};


/**
 * Generate the HTML template for displaying a task's priority as "Low".
 *
 * @param {number} j - The index of the task in the 'tasks' array.
 * @returns {string} The HTML template for displaying the task's priority as "Low".
 */
function templateDetailTaskPrioLow(j) {
    return /*html*/`
    <div class="prio-selected-low prio_svg prio-btn-add-task">
        <span>${tasks[j]['prio'].slice(0, 1).toUpperCase()}${tasks[j]['prio'].slice(1)}</span>
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Prio baja">
            <g id="Capa 2">
            <g id="Capa 1">
            <path id="Vector" d="M10 9.00614C9.7654 9.00654 9.53687 8.9317 9.34802 8.79262L0.444913 2.22288C0.329075 2.13733 0.231235 2.02981 0.15698 1.90647C0.0827245 1.78313 0.033508 1.64638 0.0121402 1.50404C-0.031014 1.21655 0.0418855 0.923717 0.214802 0.689945C0.387718 0.456173 0.646486 0.300615 0.934181 0.257493C1.22188 0.21437 1.51493 0.287216 1.74888 0.460004L10 6.54248L18.2511 0.460004C18.367 0.374448 18.4985 0.312529 18.6383 0.277782C18.7781 0.243035 18.9234 0.236141 19.0658 0.257493C19.2083 0.278844 19.3451 0.328025 19.4685 0.402225C19.592 0.476425 19.6996 0.574193 19.7852 0.689945C19.8708 0.805697 19.9328 0.937168 19.9676 1.07685C20.0023 1.21653 20.0092 1.36169 19.9879 1.50404C19.9665 1.64638 19.9173 1.78313 19.843 1.90647C19.7688 2.02981 19.6709 2.13733 19.5551 2.22288L10.652 8.79262C10.4631 8.9317 10.2346 9.00654 10 9.00614Z" fill="#7AE229"/>
            <path id="Vector_2" d="M10 14.7547C9.7654 14.7551 9.53687 14.6802 9.34802 14.5412L0.444913 7.97142C0.210967 7.79863 0.0552944 7.54005 0.0121402 7.25257C-0.031014 6.96509 0.0418855 6.67225 0.214802 6.43848C0.387718 6.20471 0.646486 6.04915 0.934181 6.00603C1.22188 5.96291 1.51493 6.03575 1.74888 6.20854L10 12.291L18.2511 6.20854C18.4851 6.03575 18.7781 5.96291 19.0658 6.00603C19.3535 6.04915 19.6123 6.20471 19.7852 6.43848C19.9581 6.67225 20.031 6.96509 19.9879 7.25257C19.9447 7.54005 19.789 7.79863 19.5551 7.97142L10.652 14.5412C10.4631 14.6802 10.2346 14.7551 10 14.7547Z" fill="#7AE229"/>
            </g>
            </g>
            </g>
        </svg>
    </div>
    `;
};


/**
 * Renders a single member assigned to the task in the task details view.
 *
 * @param {string} member - The name of the member.
 * @param {number} k - The index of the member in the assignedTo array of the task.
 * @param {number} j - The index of the task in the tasks array.
 * @returns {string} The HTML template for the single member in the task details view.
 */
function templateMemberTaskDetail(member, k, j) {
    return /*html*/`
    <div class="container-initials-and-name-member-task-detail">
        <div style="background-color: ${tasks[j]['colors'][k]}" class="font-size-16 single-task-member-member">${tasks[j]['initials'][k]}</div> 
        <span class="font-weight-400">${member.slice(0, 1).toUpperCase()}${member.slice(1)}</span>
    </div>
    `;
};


/**
 * Generate the HTML template for displaying a subtask in the task detail view.
 *
 * @param {string} subtask - The text content of the subtask.
 * @param {number} k - The index of the subtask in the 'subtasks' array of the task.
 * @param {number} j - The index of the task in the 'tasks' array.
 * @returns {string} The HTML template for displaying the subtask in the task detail view.
 */
function templateSubtasksTaskDetail(subtask, k, j) {
    return /*html*/`
        <div class="text-subtask">
            <label class="form-control">
                <input type="checkbox" style="pointer-events: none;" disabled id="subtask_${k}"/>
            </label>
            ${subtask}   
        </div>
    `;
};