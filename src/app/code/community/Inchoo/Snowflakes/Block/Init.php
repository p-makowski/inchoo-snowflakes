<?php

class Inchoo_Snowflakes_Block_Init extends Mage_Core_Block_Template
{
	public function getJsonOptions()
	{
		$options = new stdClass();
		$options->flakes = Mage::getStoreConfig('snowflakes/snowflakes_group/snowflakes_number');
		$options->color = explode(',', Mage::getStoreConfig('snowflakes/snowflakes_group/snowflakes_colors'));
		$options->text = Mage::getStoreConfig('snowflakes/snowflakes_group/snowflakes_text');
		$options->speed = Mage::getStoreConfig('snowflakes/snowflakes_group/snowflakes_speed');
		$options->size = (object) array(
				'min' => Mage::getStoreConfig('snowflakes/snowflakes_group/snowflakes_minsize'),
				'max' => Mage::getStoreConfig('snowflakes/snowflakes_group/snowflakes_maxsize')
		);

		return json_encode($options);
	}
}