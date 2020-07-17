function formValidate(){

	var fname = document.getElementById('fname'),
			email = document.getElementById('email'),
			phone = document.getElementById('phone'),
			inquiry = document.getElementById('inquiry'),
			textareaMessage = document.getElementById('message'),
			requiredFields = document.querySelectorAll(".required"),
			alertBox = document.querySelectorAll(".required span"),
			emptyField = 0;

	var formObj = {
		fname: fname.value,
		email: email.value,
		phone: phone.value,
		inquiry: inquiry.value,
		message: message.value
	};

	for(var i = 0; i < requiredFields.length; i++){
		var elSpan = document.createElement("span"),
			textMessage = document.createTextNode("Please provide a valid " + requiredFields[i].getAttribute("name"));
			//Text will be display in the element with the field name based on the the attribute name

		elSpan.append(textMessage);

		if(requiredFields[i].value == ""){
			emptyField++;
			//Condition to avoid creating extra elements after the required fieids
			if(requiredFields[i].nextElementSibling == null) {
				requiredFields[i].classList.add("alert-box");
				requiredFields[i].after(elSpan); //adding new element in the DOM for the alert box if the field is empty

			}
		} else {
			//Condition to avoid removing no existing elements if the fields are not empty
			if(requiredFields[i].nextElementSibling != null) {
				requiredFields[i].classList.remove("alert-box");
				requiredFields[i].nextElementSibling.remove();
			}
		}
	}

	//If all fields are not empty then form will be executed otherwise will be on hold
	if(emptyField == 0){
		//return true;
		ajaxCall("https://www.pryices.com/api/ajaxForm/","post", formObj);
	} else {
		return false;
	}
}

function ajaxCall(url, method, obj){
	fetch(url, {
		method: method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		alert(data.message);
	});
}
