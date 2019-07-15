<?php  
	class UserController extends AppController
	{
		public $uses = array('tFeed','tUser');
		public $helpers = array('Html','Form');

		public function login()
		{
			if($this->request->is('post'))
			{
				$this->autoRender = false;
				$user = $this->tUser->find('first',array(
					'conditions' => array(
						'password' => md5($this->request->data('password')),
						'e-mail' => $this->request->data('email')
					)
				));
				if(!empty($user))
				{
					$this->Session->write('user.id',$user['tUser']['id']);
					$this->Session->write('user.e-mail',$user['tUser']['e-mail']);
					$this->Session->write('user.name',$user['tUser']['name']);
					return 1;
				}
				else
				{
					return 0;
				}
			}
		}
		
		public function regist()
		{
			if($this->request->is('post'))
			{
				$this->autoRender = false;
				$email_exist = $this->tUser->find('count',array(
					'conditions' => array(
						'e-mail' => $this->request->data('e-mail')
					)
				));
				if($email_exist)
				{
					return 0;
				}
				else
				{
					$this->tUser->set(
						array(
							'name' => $this->request->data('name'),
							'e-mail' => $this->request->data('e-mail'),
							'password' => md5($this->request->data('password'))
						)
					);
					$this->tUser->save();
					return 1;
				}
			}
		}

		public function logout()
		{
			$this->Session->destroy();
			$this->redirect('login');
		}
	}
?>