<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>

<button>Get JSON data</button>

<div></div>
<script>
$(document).ready(function(){
    $("button").click(function(){
        jQuery.ajax({
			url: "mockmpc/js/json.js",
			type: "GET", 
			dataType: "json",
			async: true,
			success: function (data) {
				var myTable= "<table><tr><td style='width: 100px;' border = '1'></td>";
				myTable+="<tr><td style='width: 100px;'>" + data.Package +"</td>";
				myTable+="<td style='width: 100px; text-align: right;'>" + '£' + data.Basic + "</td>";
				myTable+="<td style='width: 100px; text-align: right;'>" + '£' + data.Sky_Movies + "</td></tr>";
				myTable+="</table>";

			document.write( myTable);
			obj = JSON.parse(JSON.stringify(data),true);
    }
	});
	});
	});

</script>
</body>
</html>