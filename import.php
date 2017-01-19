<?php
	
	include_once("..\lib\php\Classes\database.class.php");
	
	$access_conn = setDBType("Access");
	$access_conn->open("..\KBContent\KBTools\iKnow2\KeyFacts2015\db\KeyFacts.mdb", null, "KnowHow");

	//what apps do we have
	$apps = array("ROI", "UK");
	$tables = array("Statements", "Logic");
	echo "<pre>";
	
	$xml = simplexml_load_file("..\config\oraconnect.xml");
	$conn = setDBType("Oracle");
	
	$tns = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=".$xml->HOST.")(PORT=".$xml->PORT."))(CONNECT_DATA=(SID=".$xml->SID.")))";
	$conn->open($tns, $xml->USERID, $xml->PASSWORD);
	
	//get the contents of the table
	foreach($apps as $app){
		
		//Purge the tables of their current values
		purge_tables($app);

	show_count('TOOLS_APPLICATION');
	show_count('TOOLS_APPLICATION_TABLE');
	show_count('TOOLS_APPLICATION_TABLE_FIELD');
	show_count('TOOLS_APPLICATION_TABLE_ROW');
	show_count('TOOLS_APPLICATION_FIELD_VALUE');
	
		foreach($tables as $table){
			
				$contents = get_table_contents($access_conn, $app."_".$table);
				$keys = get_keys($contents[0]);
				
				//If the app doesn't exist then lets insert it and get the key
				$app_entry = create_app($conn, $app);
				
				//If the table doesn't exist then lets create the table
				$table_entry = create_table($conn, $app_entry, $table);
				
				//OK so we have the table, lets create the columns
				$columns = add_table_columns($conn, $table_entry, $keys);
				
				//now start creating rows
				$table_rows = fill_table($conn, $table_entry, $keys, $contents);
		}


	}
				
	show_count('TOOLS_APPLICATION');
	show_count('TOOLS_APPLICATION_TABLE');
	show_count('TOOLS_APPLICATION_TABLE_FIELD');
	show_count('TOOLS_APPLICATION_TABLE_ROW');
	show_count('TOOLS_APPLICATION_FIELD_VALUE');
	
	$access_conn->close();

	function purge_tables($app){
		global $conn;
		
		$sql = "SELECT * FROM TOOLS_APPLICATION TA WHERE TA.TOOL_NAME = '$app'";
		//echo $sql."<br />";
		$results = $conn->getResults($sql);
		//print_r($results);
		$tool_id = get_col_values($results, 'TOOL_ID');
		//print_r($tool_id);
		
		if(count($tool_id)>0){	
			$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE TAT WHERE TAT.APPLICATION_ID IN (".implode(',', $tool_id).")";
			//echo $sql;
			$results = $conn->getResults($sql);
			//print_r($results);
			$tables = get_col_values($results, 'TABLE_ID');
			
			$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE_ROW TATR WHERE TATR.TABLE_ID IN (".implode(',', $tables).")";
			$results = $conn->getResults($sql);
			$rows = get_col_values($results, 'ROW_ID');

			$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE_FIELD TATF WHERE TATF.TABLE_ID IN (".implode(',', $tables).")";
			$results = $conn->getResults($sql);
			$field = get_col_values($results, 'FIELD_ID');
			
			//$sql = "SELECT * FROM TOOLS_APPLICATION_FIELD_VALUE TAFV WHERE TAFV.ROW_ID IN (".implode(',', $rows).")";
			//$results = $conn->getResults($sql);
			//$vals = get_col_values($results, 'VALUE_ID');
			
			
			//now work backwards
			if(count($rows)>0){
				$sql = "DELETE FROM TOOLS_APPLICATION_FIELD_VALUE WHERE ROW_ID IN (".implode(',', $rows).")";
				$conn->execute($sql);
			}

			if(count($tables)>0){
				$sql = "DELETE FROM TOOLS_APPLICATION_TABLE_FIELD WHERE TABLE_ID IN (".implode(',', $tables).")";
				$conn->execute($sql);

				$sql = "DELETE FROM TOOLS_APPLICATION_TABLE_ROW WHERE TABLE_ID IN (".implode(',', $tables).")";
				$conn->execute($sql);
			
				$sql = "DELETE FROM TOOLS_APPLICATION_TABLE WHERE TABLE_ID IN (".implode(',',$tables).")";
				//echo $sql;
				$conn->execute($sql);
			}
			
			if(count($tool_id)>0){
				$sql = "DELETE FROM TOOLS_APPLICATION TA WHERE TA.TOOL_ID IN (".implode(",",$tool_id).")";
				$conn->execute($sql);
			}	
		}
	}
	
	function get_col_values($results, $col){
		$temp = array();
		for($i=0;$i<count($results);$i++){
			$temp[] = $results[$i][$col];
		}
		
		return $temp;
	}
	
	function show_count($table){
		global $conn;
		$sql = "SELECT COUNT(*) AS COUNT FROM $table";
		$result = $conn->getResults($sql);
		echo "<br />".$table." : ".$result[0]['COUNT'];
	}
	
	function fill_table($conn, $table, $keys, $contents){
		//echo $table." : ".count($contents)."<br />";
		
		for($i=0;$i<count($contents);$i++){
			//so each of these is a row
			//insert a row first
			$sql = "INSERT INTO TOOLS_APPLICATION_TABLE_ROW (TABLE_ID) VALUES ($table)";
			$conn->execute($sql);
			$sql = "SELECT TOOLS_ROW_SEQ.CURRVAL FROM DUAL";
			$result = $conn->getResults($sql);
			$currVal = $result[0]['CURRVAL'];
		
			foreach($keys as $key){
				//first get the field ID
				$sql = "SELECT FIELD_ID FROM TOOLS_APPLICATION_TABLE_FIELD WHERE TABLE_ID = $table AND FIELD_NAME = '$key'";
				$result = $conn->getResults($sql);
				$id = $result[0]['FIELD_ID'];
				
				$sql = "INSERT INTO TOOLS_APPLICATION_FIELD_VALUE (ROW_ID,FIELD_ID,FIELD_VALUE) VALUES ($currVal, $id,'".sql_safe($contents[$i][$key])."')";
				//echo $sql."<br />";
				$conn->execute($sql);
			}
		}
		
	}
	
	function sql_safe($val){
		$val = convert_smart_quotes($val);
		return str_replace("'", "''", $val);
	}
	
	function convert_smart_quotes($string) 
	{ 
		$search = array(chr(145), 
						chr(146), 
						chr(147), 
						chr(148), 
						chr(150),
						chr(151)); 

		$replace = array("'", 
						 "'", 
						 '"', 
						 '"', 
						 "-",
						 '-'); 

		return str_replace($search, $replace, $string); 
	}
	
	function add_table_columns($conn, $table, $keys){
		foreach($keys as $key){
			$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE_FIELD Where TABLE_ID = $table AND FIELD_NAME = '$key'";
			$result = $conn->getResults($sql);

			if(!$result){
				$sql = "INSERT INTO TOOLS_APPLICATION_TABLE_FIELD (TABLE_ID, FIELD_NAME) VALUES ($table, '$key')";
				$conn->execute($sql);				
			}
		}
	}
	function create_table($conn, $app, $table){
		$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE Where Application_ID = $app AND TABLE_NAME = '$table'";
		$result = $conn->getResults($sql);

		if(!$result){
			$sql = "INSERT INTO TOOLS_APPLICATION_TABLE (APPLICATION_ID, TABLE_NAME) VALUES ($app, '$table')";
			$conn->execute($sql);
			
			//now get the inserted ID
			$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE Where Application_ID = $app AND TABLE_NAME = '$table'";
			$result = $conn->getResults($sql);			
		}
		
		return $result[0]['TABLE_ID'];
	}
	
	function create_app($conn, $app){
		$sql = "SELECT * FROM Tools_Application WHERE TOOL_NAME = '$app'";
		$result = $conn->getResults($sql);
		
		if(!$result){
			$sql = "INSERT INTO Tools_Application (TOOL_NAME) VALUES ('$app')";
			$conn->execute($sql);
			
			//now get the inserted ID
			$sql = "SELECT * FROM Tools_Application WHERE TOOL_NAME = '$app'";
			$result = $conn->getResults($sql);
		}
		
		return $result[0]['TOOL_ID'];
	}
	
	function get_table_contents($conn, $table){
		$sql = "SELECT * FROM $table";
		return $conn->getResults($sql);
	}
	
	function get_keys($array){
		$keys = array_keys($array);
		$tmp = array();
		foreach($keys as $key){
			if(!is_numeric($key)){
				$tmp[] = $key;
			}
		}
		
		return $tmp;
	}
?>