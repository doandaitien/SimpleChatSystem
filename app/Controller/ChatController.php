<?php
	class ChatController extends AppController
	{
		public $uses = array('tFeed','tUser');
		public $helpers = array('Html','Form');
		
		public function feed()
		{
			if(!$this->Session->check('user.id'))
			{
				return $this->redirect(
					array(
						'controller' => 'user',
						'action' => 'login'
					)
				);
			}
			
			$this->set("feed",$this->tFeed->getFeed());
		}

		public function ajaxFeed()
		{
			if($this->request->is('post'))
			{
				$this->autoRender = false;
				$unique_name_file = '';
				if(!empty($_FILES['file']))
				{
					if($_FILES['file']['error'] == 0)
					{
						$unique_name_file = $this->saveFileWithUniqueName($_FILES,$this->request->data('email'));
					}
				}
				$this->tFeed->set(array(
					'media_file_name' => $unique_name_file,
					'name' => $this->request->data('name'),
					'user_id' => $this->request->data('user_id'),
					'message' => $this->request->data('message'),
					'update_at' => $this->request->data('update_at'),
					'create_at' => $this->request->data('create_at')
					)
				);
				$this->tFeed->save();
				header('Content-Type: application/json; charset=UTF-8');
				echo json_encode($this->tFeed->getFeed());
			}
		}

		public function ajaxEditFeed()
		{
			$this->autoRender = false;
			if($this->request->is('post'))
			{
				$this->log($_FILES);
				if(!empty($_FILES['file']))
				{
					if($_FILES['file']['error'] == 0)
					{
						$unique_name_file = $this->saveFileWithUniqueName($_FILES,$this->request->data('email'));
					}
					$this->tFeed->set(array(
						'message' => $this->request->data('message'),
						'update_at' => $this->request->data('update_at'),
						'media_file_name' => $unique_name_file
					));
				}
				elseif($this->request->data('image_file_name') == 'remove')
				{
					$unique_name_file = '';
					if($this->request->data('message') == '')
					{
						$this->tFeed->delete($this->request->data('id'));
					}
					else
					{
						$this->tFeed->set(array(
							'message' => $this->request->data('message'),
							'update_at' => $this->request->data('update_at'),
							'media_file_name' => $unique_name_file
						));
					}
				}
				else
				{
					if($this->request->data('message') == '')
					{
						$this->tFeed->delete($this->request->data('id'));
					}
					else
					{
						$this->tFeed->set(array(
							'message' => $this->request->data('message'),
							'update_at' => $this->request->data('update_at') 
						));
					}
				}
				$this->tFeed->id = $this->request->data('id');
				$this->tFeed->save();
				header('Content-Type: application/json; charset=UTF-8');
				echo json_encode($this->tFeed->getFeed());
			}
		}

		public function ajaxDeleteFeed()
		{
			$this->autoRender = false;
			if($this->request->is('post'))
			{
				$this->tFeed->delete($this->request->data('id'));
				header('Content-Type: application/json; charset=UTF-8');
				echo json_encode($this->tFeed->getFeed());
			}
		}

		public function saveFileWithUniqueName($file,$email)
		{
			$type = explode('/', $file['file']['type']);
			$type = end($type);
			$unique_name_file = substr(md5(time()),0,10).substr(md5($email),5,10).".".$type;
			if($file['file']['type'] == 'video/mp4')
			{
				move_uploaded_file($file['file']['tmp_name'], WWW_ROOT.'/video/upload/'. $unique_name_file);
			}
			else
			{
				move_uploaded_file($file['file']['tmp_name'], WWW_ROOT.'/img/upload/'. $unique_name_file);
			}
			return $unique_name_file;
		}
	}
?>