$(document).on('keypress', '.input_name', function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		checkRegister();
	}
});

$(document).on('keypress', '.input_email', function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		checkRegister();
	}
});

$(document).on('keypress', '.input_password', function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		checkRegister();
	}
});

$(document).on('click', '.submit', function(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
	checkRegister();
});

function notification(option) {
	if (option == 0) {
		$('.regist_error').addClass('notification');
		setTimeout(function() {
			$('.regist_error').removeClass('notification');
		}, 3000);
	} else {
		$('.regist_success').addClass('notification');
		setTimeout(function() {
			$('.regist_success').removeClass('notification');
		}, 3000);
	}
};

function checkRegister() {
	var name = $(".input_name").val();
	var email = $(".input_email").val();
	var password = $(".input_password").val();
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+com+$/;
	if (name == '') {
		$(".error1")[0].innerText = "Please enter name";
		$(".error1").removeAttr('hidden');
		$(".error2").attr('hidden', 'true');
		$(".error3").attr('hidden', 'true');
		$(".input_name").focus();
	} else if (email == '') {
		$(".error2")[0].innerText = "Please enter e-mail";
		$(".error2").removeAttr('hidden');
		$(".error1").attr('hidden', 'true');
		$(".error3").attr('hidden', 'true');
		$(".input_email").focus();
	} else if (!filter.test(email)) {
		$(".error2")[0].innerText = "Please enter email in correct format";
		$(".error2").removeAttr('hidden');
		$(".error1").attr('hidden', 'true');
		$(".error3").attr('hidden', 'true');
		$(".input_email").focus();
	} else if (password == '') {
		$(".error3")[0].innerText = "Please enter password";
		$(".error3").removeAttr('hidden');
		$(".error1").attr('hidden', 'true');
		$(".error2").attr('hidden', 'true');
		$(".input_password").focus();
	} else {
		$.ajax({
			url: 'regist',
			type: 'POST',
			data: {
				'name': name,
				'e-mail': email,
				'password': password,
			},
			success: function(result) {
				if (result == 1) {
					notification(1);
					window.location = 'login';
				} else {
					$(".input_email").focus();
					notification(0);
				}

			}
		})
	}
}