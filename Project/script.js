function createAjax(obj, action, meth) {
	obj.action = action;

	$.ajax({
		type: meth,
		url: "ajax.php",
		data: obj,
		dataType: "json",
		success: function (response) {
			return response;
			//$("#message").html(`${response.message} (${response.number})`);
		},
		error: function (response) {
			console.log("ERROR");
		},
		complete: function (response) {
			console.log("COMPLETE");
		}
	});
}

function addTask(task) {
	res=createAjax(task, "addTask", "POST");
	//TODO
}

function updateTask(task) {
	res=createAjax(task, "updateTask", "POST");
	//TODO
}

function deleteTask(task) {
	res=createAjax(task, "deleteTask", "POST");
	//TODO
}

function addUser(user) {
	res=createAjax(task, "addUser", "POST");
	//TODO
}

function getTask(task) {
	res=createAjax(task, "getTask", "GET");
	//TODO
}

function getAllTask() {
	let task;
	res=createAjax(task, "getAllTask", "GET");
	//TODO
}

function getUser(user) {
	res=createAjax(user, "getUser", "GET");
	//TODO
}

function getAllUsers() {
	let user;
	res=createAjax(user, "getAllUsers", "GET");
	//TODO
}

function getCategories() {
	let cat;
	res=createAjax(cat, "getCategories", "GET");
	//TODO
}

function getRoles() {
	let role;
	res=createAjax(role, "getRoles", "GET");
	//TODO
}