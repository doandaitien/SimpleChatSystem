<div class="container-fluid">
	<div class="row">
		<div class="col-3 col-sm-3 col-md-3 col-lg-3 content1">
			<div class="version text-center">
				Simple Chat System 4.0
			</div>
			<div class="info text-center">
				<div class="avatar">
					<?php echo $this->Html->image('user.png',array(
									'height' => 'auto',
									'width' => '150',
									'escape' => false,
									'style' => array(
										'border-radius : 50%'
									)
								)
							); ?>
				</div>
				<div class="email">
					<?php echo $this->Session->read('user.e-mail') ?>
				</div>
			</div>
			<div class="list_user_chat">
				<div class="list_user">Danh sách người dùng truy cập</div>
			</div>
			<div class="author text-center">
				hust-doandaitien260898 InternShip TMH-TechLab2019
			</div>
		</div>
		<div class="col-9 col-sm-9 col-md-9 col-lg-9 content2">
			<div class="row">
				<div class="col-12 col-sm-12 col-md-12 col-lg-12 content2_header">
					<div class="header_left">
						<div class="avatar_head float-left mr-2">
							<?php echo $this->Html->image('user.png',array(
									'height' => 'auto',
									'width' => '35',
									'escape' => false,
									'style' => array(
										'border-radius : 50%'
									)
								)
							); ?>
						</div>
						<div class="fullname_head">
							<label><?php echo $this->Session->read('user.name') ?></label>
						</div>
						<div id="user_id" hidden="true"><?php echo $this->Session->read('user.id') ?></div>
					</div>
					<div class="header_right">
						<a href="../user/logout" title=""><i class="fa fa-sign-out"></i></a>
					</div>
				</div>
			</div>
			<div class="row mess">
				<div class="col-8 col-sm-8 col-md-8 col-lg-8 content2_1">
					<div class="chat">
						<?php foreach ($feed as $key => $value): ?>
							<?php if($value['tFeed']['media_file_name'] != '' || $value['tFeed']['message'] != ''){ ?>
								<div class="one_message">
									<div class="id" hidden="true"><?php echo $value['tFeed']['id']; ?></div>
									<div class="name_user_message"><?php echo $value['tFeed']['name']; ?></div>
									<div class="id_user_message" hidden="true"><?php echo $value['tFeed']['user_id']; ?></div>
									<?php if($value['tFeed']['media_file_name'] != ''){?>
										<div class="form-inline form3">
											<div class="form-group media_show_init">
												<?php
													if(end(explode('.', $value['tFeed']['media_file_name'])) == 'mp4')
													{
														echo $this->Html->media('../video/upload/'.$value['tFeed']['media_file_name'],array(
																'height' => 'auto',
																'width' => '375px',
																'class' => 'mess_user_media mr-2',
																'controls' => true
															)
														); 
													}
													else{
														echo $this->Html->image('upload/'.$value['tFeed']['media_file_name'],array(
																'height' => 'auto',
																'width' => '375px',
																'escape' => false,
																'class' => 'mess_user_media mr-2'
															)
														); 
													}
												?>
											</div>
											<?php if ($this->Session->read('user.id') == $value['tFeed']['user_id']){?>
												<div class="form-group media_show" hidden="true">
													<?php 
														if(end(explode('.', $value['tFeed']['media_file_name'])) == 'mp4')
														{
															echo $this->Html->media('../video/upload/'.$value['tFeed']['media_file_name'],array(
																	'height' => 'auto',
																	'width' => '375px',
																	'class' => 'mess_user_media mr-2',
																	'controls' => true
																)
															); 
														}
														else{
															echo $this->Html->image('upload/'.$value['tFeed']['media_file_name'],array(
																	'height' => 'auto',
																	'width' => '375px',
																	'escape' => false,
																	'class' => 'mess_user_media mr-2'
																)
															); 
														}
													?>
												</div>
												<div class="remove_media_success mr-2" hidden="true">Remove success,please click tick to save action</div>
												<i class="fa fa-times remove_mess_media" data-toggle="tooltip" title="Remove media message" hidden="true"></i>
												<div class="photo ml-2 choose_other_file" hidden="true">
													<div class="btn btn-outline-info input_choose_other_file">Choose other file</div>
													<?php if(end(explode('.', $value['tFeed']['media_file_name'])) == 'mp4'){ ?>
														<input type="file" name="" value="" class="post_media_other" accept=".mp4">
													<?php }else{ ?>
														<input type="file" name="" value="" class="post_media_other" accept=".jpg, .png, .gif, .jpeg">
													<?php } ?>
												</div>
											<?php }?>
										</div>
									<?php } ?>
									<div class="form-inline form1">
										<?php if($this->Session->read('user.id') == $value['tFeed']['user_id'] && $value['tFeed']['message'] == ''){ ?>
											<div class="form-group message_empty"></div>
											<div hidden="true" class="btn btn-success mr-2 edit"><i class="fa fa-check"></i></div>
											<div hidden="true" class="btn btn-danger back"><i class="fa fa-times"></i></div>
										<?php }elseif($this->Session->read('user.id') != $value['tFeed']['user_id'] && $value['tFeed']['message'] == ''){?>
											<div class="form-group message_empty"></div>
										<?php }elseif($this->Session->read('user.id') == $value['tFeed']['user_id'] && $value['tFeed']['message'] != ''){ ?>
											<div class="form-group message_show">
												<div class="mess_user_message mr-2"><?php echo $value['tFeed']['message']; ?></div>
												<input hidden="true" class="mess_user_input form-control mr-2" value="<?php echo $value['tFeed']['message']; ?>"></input>
											</div>
											<div hidden="true" class="btn btn-success mr-2 edit"><i class="fa fa-check"></i></div>
											<div hidden="true" class="btn btn-danger back"><i class="fa fa-times"></i></div>
										<?php }else{ ?>
											<div class="form-group">
												<div class="mess_user_message mr-2"><?php echo $value['tFeed']['message']; ?></div>
											</div>
										<?php } ?>
									</div>
									<div class="form-inline form2">
										<div class="form-group time_user_message">
											<?php echo $value['tFeed']['update_at']; ?>
										</div>
										<?php if ($this->Session->read('user.id') == $value['tFeed']['user_id']):?>
											<div class="btn btn-primary mr-2 edit_mess">EDIT</div>
											<div class="btn btn-danger delete_mess">DELETE</div>
										<?php endif; ?>
									</div>
								</div>
							<?php } ?>
						<?php endforeach ?>
					</div>
					<div class="input_chat">
						<div class="info_name input-group">
							<div class="input-group-prepend mr-2">
								<span class="input-group-text info_name_label">Name</span>
							</div>
							<input type="text" class="form-control info_name_input" readonly="readonly" value="<?php echo $this->Session->read('user.name') ?>">
							<div class="btn btn-primary ml-2 btn_post">POST</div>
							<div class="photo ml-2">
								<div class="btn btn-info">MEDIA</div>
								<input type="file" name="" value="" class="post_photo" accept=".jpg, .png, .gif, .jpeg, .mp4">
							</div>
							<?php echo $this->Html->link('LOGOUT','../user/logout',
								array('class' => 'btn btn-success ml-2 btn_logout')
							); ?>
						</div>
						<div class="input-group show_media" hidden="true">
							<div class="media">
								<image class="media_image" height="100px" width="auto" hidden="true"/>
								<video src="" autobuffer autoloop loop controls hidden="true" class="media_video" height="100px" width="auto"></video>
							</div>
							<i class="fa fa-times remove_media"></i>
						</div>
						<form action="" method="post" enctype="" class="input-group">
							<div class="input-group-prepend mr-2">
								<span class="input-group-text info_mess_label">Message</span>
							</div>
							<textarea name="" class="form-control message info_mess_area"></textarea>
						</form>
					</div>
				</div>
				<div class="col-4 col-sm-4 col-md-4 col-lg-4 content2_2">
					<div class="title_content2_2 text-center">Thông tin liên quan tới cuộc trò chuyện</div>
					<div class="info_file">
						<div class="title1">Tệp được chia sẻ</div>
					</div>
					<div class="info_audio">
						<div class="title2">Audio được chia sẻ</div>
					</div>
					<div class="info_link">
						<div class="title3">Link được chia sẻ</div>
					</div>
					<div class="info_image">
						<div class="title4">Ảnh được chia sẻ</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="btn btn-success edit_success">
	<i class="fa fa-check success" aria-hidden="true"></i>
	<p class="notification_success">Edit success</p>
</div>
<div class="btn btn-success delete_success">
	<i class="fa fa-check success" aria-hidden="true"></i>
	<p class="notification_success">Delete success</p>
</div>
<div class="btn btn-danger send_message_error">
	<i class="fa fa-exclamation-circle error" aria-hidden="true"></i>
	<p class="notification_error">Please enter message or photo</p>
</div>

<?php echo $this->Html->script('feed'); ?>