// scroll
var height = $(".chat")[0]['scrollHeight'];
$(".chat").animate({ scrollTop: height }, 1000);
var user_id = $("#user_id")[0].innerText;
var timedate = getTime();

// getTime now
function getTime()
{
	var time = new Date();
	// format month
	if(time.getMonth()+ 1 <10){
		month = '0'+(time.getMonth()+1);
	}else{
		month = time.getMonth()+1;
	}
	// format day
	if(time.getDate() <10){
		date = '0'+time.getDate();
	}else{
		date = time.getDate();
	}
	var year = time.getFullYear();
	var timeString = year+"-"+month+"-"+date+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
	return timeString;
}

$(document).on('keypress', '.message', function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){ //enter
		sendMessage();
	}
});

$(document).on('click', '.btn_post', function(event) {
	sendMessage();
});

// post message
function sendMessage()
{
	var photo = $('.post_photo').prop('files')[0];
	var mess = $('.message').val();
	var name = $(".info_name_input").val();
	var email = $(".email")[0].innerText;
	var form_data = new FormData();
	form_data.append('user_id', user_id);
	form_data.append('name', name);
	form_data.append('message', mess);
	form_data.append('create_at', timedate);
	form_data.append('update_at', timedate);
	form_data.append('email', email);
	if($(".show_media")[0]['attributes'].length == 2 && mess == '')
	{
		notification(2);
		$('textarea').val('');
	}
	else
	{
		if($(".post_photo").val() != '')
		{
			form_data.append('file', photo);
		}
		$.ajax({
			url: 'ajaxFeed',
			type: 'POST',
			dataType: 'json',
			contentType : false,
			cache : false,
			processData: false,
			data: form_data,
			success: function(res) {
				ajaxEditChat(res,user_id);
				$(".show_media").attr('hidden','true');
				$(".chat").css({
					'min-height': '500px',
					'max-height': '500px'
				});
				$(".post_photo").val(null);
				$(".chat").animate({ scrollTop: $(".chat")[0]['scrollHeight'] }, 1000);
				$('textarea').val('');
			}
		})
	}
}

$(document).on('click', '.edit_mess', function(event) {
	var form1 = $(this).parent('.form2').prev('.form1');
	form1.find('.mess_user_message').attr('hidden', 'true');
	form1.find('.mess_user_input').removeAttr('hidden');
	form1.find('.edit').removeAttr('hidden');
	form1.find('.back').removeAttr('hidden');
	var form3 = $(this).parent('.form2').parent('.one_message').find('.form3');
	if(form3.length == 1)
	{
		form3.find('.media_show_init').attr('hidden', 'true');
		form3.find('.media_show').removeAttr('hidden');
		form3.find('.remove_mess_media').removeAttr('hidden');
		form3.find('.choose_other_file').removeAttr('hidden');
	}
});

$(document).on('click', '.back', function(event) {
	var form3 = $(this).parent('.form1').prev('.form3');
	if (form3.length == 1) {
		form3.find('.media_show_init').removeAttr('hidden');
		var img = form3.find('.media_show_init').html();
		form3.find('.media_show').html(img);
		form3.find('.media_show').attr('hidden', 'true');
		form3.find('.remove_media_success').attr('hidden','true');
		form3.find('.remove_mess_media').attr('hidden','true');
		form3.find('.choose_other_file').attr('hidden','true');
		form3.find('.post_media_other').val(null);
	}
	var form1 = $(this).parent('.form1');
	if(form1.find('.mess_user_message').length == 1)
	{
		form1.find('.mess_user_input').val(form1.find('.mess_user_input')[0]['defaultValue']);
		form1.find('.mess_user_message').removeAttr('hidden');
		form1.find('.mess_user_input').attr('hidden', 'true');
	}
	$(this).prev('.edit').attr('hidden', 'true');
	$(this).attr('hidden', 'true');
});

// edit message
$(document).on('click', '.edit', function(event) {
	var this_is = $(this);
	var form1 = $(this).parent('.form1');
	var id = form1.parent('.one_message').children('.id')[0].innerText;
	var mess_edit = '';
	if(form1.find('.message_show').length == 1)
	{
		mess_edit = form1.find('.mess_user_input').val();
	}
	var email = $(".email")[0].innerText;
	var form3 = form1.prev('.form3');
	var form_data = new FormData();
	form_data.append('id',id);
	form_data.append('message',mess_edit);
	form_data.append('update_at',timedate);
	form_data.append('email',email);
	if(form3.length == 1)
	{
		if(form3.find('.post_media_other').val() == '')
		{
			if(form3.find('.media_show')[0]['attributes'].length == 2)
			{
				var media_file_name = "remove";
				form_data.append('media_file_name',media_file_name);
			}
		}
		else
		{
			var photo = form3.find('.post_media_other').prop('files')[0];
			form_data.append('file',photo);
		}
	}
	$.ajax({
		url: 'ajaxEditFeed',
		type: 'POST',
		dataType: 'json',
		data: form_data,
		contentType : false,
		cache : false,
		processData: false,
		success: function(res) {
			form1.find('.mess_user_message').removeAttr('hidden');
			form1.find('.mess_user_input').attr('hidden', 'true');
			$(this_is).next('.back').attr('hidden', 'true');
			$(this_is).attr('hidden', 'true');
			notification(1);
			ajaxEditChat(res,user_id);
		}
	})
});

// edit message
$(document).on('keypress', '.mess_user_input', function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){ //enter
		var this_is = $(this);
		var id = $(this).parent('.form-group').parent('.form1').parent('.one_message').children('.id')[0].innerText;
		var mess_edit = $(this).parent('.form-group').parent('.form1').find('.mess_user_input').val();
		$.ajax({
			url: 'ajaxEditFeed',
			type: 'POST',
			dataType: 'json',
			data: {
				'id' : id,
				'message' : mess_edit,
				'update_at' : timedate
			},
			success: function(res) {
				$(this_is).prev('.mess_user_message').removeAttr('hidden');
				$(this_is).parent('.form-group').next('.edit').next('.back').attr('hidden', 'true');
				$(this_is).parent('.form-group').next('.edit').attr('hidden', 'true');
				$(this_is).attr('hidden', 'true');
				notification(1);
				ajaxEditChat(res,user_id);
			}
		})
	}
});

// delete message
$(document).on('click', '.delete_mess', function(event) {
	var this_is = $(this);
	var id = $(this).parent('.form2').parent('.one_message').children('.id')[0].innerText;
	$.ajax({
		url: 'ajaxDeleteFeed',
		type: 'POST',
		dataType: 'json',
		data: {
			'id' : id
		},
		success: function(res) {
			ajaxEditChat(res,user_id);
			notification(3);
		}
	})
});

// notification
function notification(option){
	if(option == 1){
		$('.edit_success').addClass('notification');
		setTimeout(function(){
			$('.edit_success').removeClass('notification');
		}, 1000);
	}
	else if(option == 2)
	{
		$('.send_message_error').addClass('notification');
		setTimeout(function(){
			$('.send_message_error').removeClass('notification');
		}, 1000);
	}
	else
	{
		$('.delete_success').addClass('notification');
		setTimeout(function(){
			$('.delete_success').removeClass('notification');
		}, 1000);
	}	
};

function ajaxEditChat(res,user_id)
{
	var template = '';
	for (var i = 0; i < res.length; i++) {
		if(res[i]['tFeed']['media_file_name'] != '' || res[i]['tFeed']['message'] != '')
		{
			var one_message = $("<div>").addClass('one_message')
				.append($("<div>").addClass('id').attr('hidden', 'true').text(res[i]['tFeed']['id']))
				.append($("<div>").addClass('name_user_message').text(res[i]['tFeed']['name']))
				.append($("<div>").addClass('id_user_message').attr('hidden', 'true').text(res[i]['tFeed']['user_id']));
			var form3 = $("<div>").addClass('form-inline form3');
			var form3_children_init = $("<div>").addClass('form-group media_show_init');
			var form3_children =  $("<div>").addClass('form-group media_show').attr('hidden','true');
			var form1 = $("<div>").addClass('form-inline form1');
			var form2 = $("<div>").addClass('form-inline form2')
				.append($("<div>").addClass('form-group time_user_message').text(res[i]['tFeed']['update_at']));
			var input_accept;
			if(res[i]['tFeed']['media_file_name'] != '')
			{
				var media_file_name = res[i]['tFeed']['media_file_name'];
				if(media_file_name.split('.')[media_file_name.split('.').length - 1] == 'mp4')
				{
					form3.append(
						form3_children_init.append(
							$("<video>").addClass('mess_user_media mr-2').attr({
								'height': 'auto',
								'width': '375px',
								'class':'mess_user_media mr-2',
								'controls':"true",
								'src' : '../video/upload/'+res[i]['tFeed']['media_file_name']
							})
						)
					)
					input_accept = $("<input>").addClass('post_media_other').attr({
										'type': 'file',
										'accept': '.mp4'
									})
				}
				else
				{
					form3.append(
						form3_children_init.append(
							$("<img>").addClass('mess_user_media mr-2').attr({
								'height': 'auto',
								'width': '375px',
								'class':'mess_user_media mr-2',
								'src' : '../img/upload/'+res[i]['tFeed']['media_file_name']
							})
						)
					)
					input_accept = $("<input>").addClass('post_media_other').attr({
										'type': 'file',
										'accept': '.jpg, .png, .gif, .jpeg'
									})
				}
				if(res[i]['tFeed']['user_id'] == user_id)
				{
					if(media_file_name.split('.')[media_file_name.split('.').length - 1] == 'mp4')
					{
						form3.append(
							form3_children.append(
								$("<video>").addClass('mess_user_media mr-2').attr({
									'height': 'auto',
									'width': '375px',
									'class':'mess_user_media mr-2',
									'controls':"true",
									'src' : '../video/upload/'+res[i]['tFeed']['media_file_name']
								})
							)
						)
					}
					else
					{
						form3.append(
							form3_children.append(
								$("<img>").addClass('mess_user_media mr-2').attr({
									'height': 'auto',
									'width': '375px',
									'class':'mess_user_media mr-2',
									'src' : '../img/upload/'+res[i]['tFeed']['media_file_name']
								})
							)
						)
					}
					form3.append(
						$("<div>").addClass('remove_media_success mr-2').attr('hidden', 'true').text('Remove success,please click tick to save action')
					).append(
						$("<i>").addClass('fa fa-times remove_mess_media').attr({
							'data-toggle': 'tooltip',
							'title': 'Remove media message',
							'hidden' : 'true'
						})
					).append(
						$("<div>").addClass('photo ml-2 choose_other_file').attr('hidden', 'true')
						.append(
							$("<div>").addClass('btn btn-outline-info input_choose_other_file').text('Choose other file')
						)
						.append(
							input_accept
						)
					)
				}
				one_message.append(form3);
			}
			if(res[i]['tFeed']['user_id'] == user_id && res[i]['tFeed']['message'] != '')
			{
				var form1_children = $("<div>").addClass('form-group message_show')
						.append($("<div>").addClass('mess_user_message mr-2').text(res[i]['tFeed']['message']));
					one_message.append(
						form1.append(
							form1_children.append($("<input>").addClass('mess_user_input form-control mr-2').attr('hidden', 'true').attr('type', 'text').attr('value',res[i]['tFeed']['message']))
						)
						.append(
							$("<div>").addClass('btn btn-success mr-2 edit').attr('hidden', 'true').append($("<i>").addClass('fa fa-check'))
						).append(
							$("<div>").addClass('btn btn-danger back').attr('hidden', 'true').append($("<i>").addClass('fa fa-times'))
						)
					)
			}
			else if(res[i]['tFeed']['user_id'] == user_id && res[i]['tFeed']['message'] == '')
			{
				one_message.append(
					form1.append(
						$("<div>").addClass('form-group message_empty')
					).append(
						$("<div>").addClass('btn btn-success mr-2 edit').attr('hidden', 'true').append($("<i>").addClass('fa fa-check'))
					).append(
						$("<div>").addClass('btn btn-danger back').attr('hidden', 'true').append($("<i>").addClass('fa fa-times'))
					)
				);
			}
			else if(res[i]['tFeed']['user_id'] != user_id && res[i]['tFeed']['message'] != '')
			{
				one_message.append(
					form1.append(
						$("<div>").addClass('mess_user_message mr-2').text(res[i]['tFeed']['message'])
					)
				)
			}
			else
			{
				one_message.append(
					form1.append(
						$("<div>").addClass('form-group message_empty')
					)
				)
			}

			if(res[i]['tFeed']['user_id'] == user_id)
			{
				form2.append($("<div>").addClass('btn btn-primary mr-2 edit_mess').text('EDIT'))
					.append($("<div>").addClass('btn btn-danger delete_mess').text('DELETE'));
				one_message.append(form2);
			}
			one_message.append(form2);
			template += one_message[0].outerHTML;
		}
	}

	$(".chat").html(template);
}

$(document).on('change', '.post_photo', function(event) {
	$(".show_media").removeAttr('hidden');
	$(".chat").css({
		'min-height': '375px',
		'max-height': '375px'
	});
	var url = URL.createObjectURL($(this)[0]['files'][0]);
	if($(this)[0]['files'][0]['type'] == 'video/mp4')
	{
		$(".media_image").attr('hidden', 'true');
		$(".media_video").removeAttr('hidden');
		$(".media_video").attr('src', url);
	}
	else
	{
		$(".media_video").attr('hidden', 'true');
		$(".media_image").removeAttr('hidden');
		$(".media_image").attr('src', url);
	}
});

$(document).on('click', '.remove_media', function(event) {
	$(".show_media").attr('hidden', 'true');
	$(".chat").css({
		'min-height': '500px',
		'max-height': '500px'
	});
	$(".post_photo").val(null);
});

$(document).on('click', '.remove_mess_media', function(event) {
	$(this).prev('.remove_media_success').prev('.media_show').attr('hidden', 'true');
	$(this).prev('.remove_media_success').removeAttr('hidden');
	$(this).next('.choose_other_file').find('.post_media_other').val(null);
	$(this).attr('hidden', 'true');
});

$(document).on('change', '.post_media_other', function(event) {
	var form3 = $(this).parent('.choose_other_file').parent('.form3');
	form3.find('.media_show').removeAttr('hidden');
	form3.find('.remove_media_success').attr('hidden', 'true');
	form3.find('.remove_mess_media').removeAttr('hidden');
	var url = URL.createObjectURL($(this)[0]['files'][0]);
	form3.find('.media_show').children(".mess_user_media").attr('src', url);
});
