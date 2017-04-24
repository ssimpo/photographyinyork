<?php
	function piy_add_query_param($url, $key, $value) {
		$query = parse_url($url, PHP_URL_QUERY);
		$url .= ($query?'&':'?');
		return $url . $key.'='.$value;
	}
?>