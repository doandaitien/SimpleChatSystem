<?php  
class tFeed extends Model{
	public $useTable = 't_feed';
	public $belongsTo = array(
		'User' => array(
			'className' => 'tUser',
			'foreignKey' => 'user_id'
		)
	);

	public function getFeed()
	{
		$feed = $this->find('all',
			array(
				'order' => 'tFeed.id ASC'
			)
		);
		foreach ($feed as $key => $value) {
			$date = date_create($value['tFeed']['update_at']);
			$feed[$key]['tFeed']['update_at'] = date_format($date,"d/m/Y H:i:s");
		}
		return $feed;
	}
}
?>