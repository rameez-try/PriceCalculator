<?php

	include_once("..\..\..\lib\php\Classes\database.class.php");
	
	$xml = simplexml_load_file("..\..\..\config\oraconnect.xml");
	$conn = setDBType("Oracle");
	
	$tns = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=".$xml->HOST.")(PORT=".$xml->PORT."))(CONNECT_DATA=(SID=".$xml->SID.")))";
	$conn->open($tns, $xml->USERID, $xml->PASSWORD);


	$tool = "PriceCalculator";
	$tables = array("data/p1_UK_TalkPrices");
	
	foreach($tables as $table ){
	
		//echo "<h3>".$table."</h3>";
		
		$sql = get_fields($tool, $table);
		$results = $conn->getResults($sql);
		
		$fields = implode(",", get_keys($results));
		$sql = get_table_values($fields, $tool, $table);
		
		$results = $conn->getResults($sql);
			
	}
echo(json_encode($results));

	function get_fields($tool, $table){
		
		$sql = "SELECT TF.FIELD_NAME FROM 
				  TOOLS_APPLICATION_TABLE_FIELD TF, 
				  TOOLS_APPLICATION TA, 
				  TOOLS_APPLICATION_TABLE TT 
				WHERE 
				  TA.TOOL_ID = TT.APPLICATION_ID 
				  AND TT.TABLE_ID = TF.TABLE_ID 
				  AND TA.TOOL_NAME = '".$tool."' 
				  AND TT.TABLE_NAME = '".$table."'
				ORDER BY TF.FIELD_ID  
				";
		
		return $sql;
	}
	
	function get_table_values($fields, $tool, $table){
		
		$sql = "WITH TBL_FIELDS AS 
				(SELECT TA.TOOL_NAME, TAB.TABLE_NAME, TAF.FIELD_ID, TAF.FIELD_NAME FROM 
					   TOOLS_APPLICATION TA, 
					   TOOLS_APPLICATION_TABLE TAB, 
					   TOOLS_APPLICATION_TABLE_FIELD TAF 
				WHERE  TA.TOOL_ID = TAB.APPLICATION_ID 
				AND    TAB.TABLE_ID = TAF.TABLE_ID) 
				SELECT p.* FROM ( 
				   SELECT 
					  VAL.ROW_ID, TF.TOOL_NAME, TF.TABLE_NAME, TF.FIELD_NAME, VAL.FIELD_VALUE FROM 
					  TOOLS_APPLICATION_FIELD_VALUE VAL, 
					  TBL_FIELDS TF 
				   WHERE VAL.FIELD_ID IN ( SELECT TBL_FIELDS.FIELD_ID FROM TBL_FIELDS ) 
					  AND VAL.FIELD_ID = TF.FIELD_ID 
				   ) 
				   PIVOT( 
					  MAX(FIELD_VALUE) 
					  FOR FIELD_NAME IN ( ".$fields." )
				   )p 
				   WHERE 
					 TOOL_NAME = '".$tool."' 
					 AND TABLE_NAME = '".$table."'
				";
		return $sql;
	}
	
	function get_keys($arr){
		$tmp = array();
		for($a=0;$a<count($arr);$a++){
			$tmp[] = "'".$arr[$a][0]."'";
		}
		
		return $tmp;
	}
	
?>