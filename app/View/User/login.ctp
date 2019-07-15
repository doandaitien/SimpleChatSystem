<div class="container">
	<div class="offset-2 col-8 col-sm-8 col-md-8 col-lg-8">
		<div class="titleapp text-center">Simple Chat System 1.0</div>
		<div class="form_login">
			<div class="login text-center">Login</div>
			<?php 
				echo $this->Form->create();

				echo $this->Form->input('email',array(
					'class' => 'form-control input_email',
					'placeholder' => 'example@com.vn',
					'label' => array(
						'class' => 'label_email'
					)
				));
				echo $this->Html->div('error1', 'Error.',array(
					'hidden' => 'true'
				));
				echo $this->Form->input('password',array(
					'class' => 'form-control input_password',
					'placeholder' => 'password',
					'label' => array(
						'class' => 'label_pass'
					)
				));
				echo $this->Html->div('error2', 'Error.',array(
					'hidden' => 'true'
				));

				echo $this->Form->input('Login',array(
					'type' => 'submit',
					'class' => 'btn btn-primary btn-block submit',
					'value' => 'Login',
					'label' => ''
				));
				echo $this->Form->end();
			?>
			<div class="text-center mt-5">
				<?php  
					echo $this->Html->div('label_login', 'Not registered?');
					echo $this->Html->link('Create an account','regist',
						array('class' => 'button')
					);
				?>
			</div>
		</div>
		
	</div>
</div>
<?php echo $this->Html->script('login'); ?>

