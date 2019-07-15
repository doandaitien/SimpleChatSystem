$(document).on('keypress', '.input_email', function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		checkLogin();
	}
});

$(document).on('keypress', '.input_password', function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		checkLogin();
	}
});

$(document).on('click', '.submit', function(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
	checkLogin();
});

function checkLogin() {
	var email = $(".input_email").val();
	var password = $(".input_password").val();
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (email == '') {
		$(".error1").attr('hidden', 'true');
		$(".error2").attr('hidden', 'true');
		$(".error1")[0].innerText = "Please enter email";
		$(".error1").removeAttr('hidden');
		$(".error2").attr('hidden', 'true');
		$(".input_email").focus();
	} else if (!filter.test(email)) {
		$(".error1")[0].innerText = "Please enter email in correct format";
		$(".error1").removeAttr('hidden');
		$(".error2").attr('hidden', 'true');
		$(".input_email").focus();
	} else if (password == '') {
		$(".error2")[0].innerText = "Please enter password";
		$(".error2").removeAttr('hidden');
		$(".error1").attr('hidden', 'true');
		$(".input_password").focus();
	} else {
		$.ajax({
			url: 'login',
			type: 'POST',
			data: {
				email: email,
				password: password,
			},
			success: function(result) {
				if (result != 0) {
					window.location = "../chat/feed";
				} else if (result == 0) {
					$(".error2")[0].innerText = "Incorrect email or password";
					$(".error2").removeAttr('hidden');
					$(".error1").attr('hidden', 'true');
					$(".input_email").focus();
				}
			}
		})
	}
}