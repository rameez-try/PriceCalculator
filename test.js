var cacheVer = 'mps_v1';
basket.require
	(
		{ url: 'js/jquery-2.1.1.js',key:'jqueryLib',unique: cacheVer },
		{ url: 'js/modernizr.js',key:'modernizr',unique: cacheVer },
		{ url: 'js/foundation.min.js',key:'foundation',unique: cacheVer },
		{ url: 'js/foundation/foundation.equalizer.js',key:'equlizr',unique: cacheVer },
		{ url: 'js/jquery.ui.core.js',key:'core',unique: cacheVer },
		{ url: 'js/jquery.ui.widget.js',key:'widgt',unique: cacheVer },
		{ url: 'js/jquery-ui-1.12.0.custom/jquery-ui.min.js',key:'JqUI',unique: cacheVer }
	) .then(function()
		{
			
$(document).ready(function(){
	$("button").click(function(){
		$.get("getData.php", function(data, status){
			alert(data);
		});
	});
});
}