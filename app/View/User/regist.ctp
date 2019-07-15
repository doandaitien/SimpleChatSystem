<div class="container">
	<div class="offset-2 col-8 col-sm-8 col-md-8 col-lg-8">
		<div class="titleapp text-center">Simple Chat System 1.0</div>
		<div class="form_login">
			<div class="login text-center">Register</div>
			<?php 
				echo $this->Form->create();
				echo $this->Form->input('username',array(
					'class' => 'form-control input_name',
					'placeholder' => 'john',
					'label' => array(
						'class' => 'label_name'
					)
				));
				echo $this->Html->div('error1', 'Please enter.',array(
					'hidden' => 'true'
				));
				echo $this->Form->input('email',array(
					'class' => 'form-control input_email',
					'placeholder' => 'example@com.vn',
					'label' => array(
						'class' => 'label_email'
					)
				));
				echo $this->Html->div('error2', 'Please enter.',array(
					'hidden' => 'true'
				));
				echo $this->Form->input('password',array(
					'class' => 'form-control input_password',
					'placeholder' => 'password',
					'label' => array(
						'class' => 'label_pass'
					)
				));
				echo $this->Html->div('error3', 'Please enter.',array(
					'hidden' => 'true'
				));
				echo $this->Form->input('Register',array(
					'type' => 'submit',
					'class' => 'btn btn-primary btn-block submit',
					'value' => 'Login',
					'label' => ''
				));
				echo $this->Form->end();
			?>
			<div class="text-center mt-5">
				<?php  
					echo $this->Html->div('label_register', 'Have already an account?');
					echo $this->Html->link('Login here','login',
						array('class' => 'button')
					);
				?>
			</div>
		</div>
		
	</div>
</div>
<div class="btn btn-danger regist_error">
	<i class="fa fa-exclamation-triangle error" aria-hidden="true"></i>
	<p class="notification_error">Email exists</p>
</div>
<div class="btn btn-success regist_success">
	<i class="fa fa-check success" aria-hidden="true"></i>
	<p class="notification_success">Register success</p>
</div>
<?php echo $this->Html->script('regist'); ?>