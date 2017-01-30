<!DOCTYPE HTML>  
<html>
<head>
<style>
.error {color: #FF0000;}
</style>
</head>
<body>  

<?php
// define variables and set to empty values
$nameErr = "";
$name = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
  }
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>

<h2>CSV To Oracle Converter</h2>
<p><span class="error">* required field.</span></p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
  File Path: <input type="text" name="name" value="<?php echo $name;?>">
  <span class="error">* <?php echo $nameErr;?></span>
  <br><br>
  <input type="submit" name="submit" value="Submit">  
</form>

<?php
if (isset($_POST['submit'])) {
include_once("..\..\..\lib\php\Classes\database.class.php");

	$debugModeEnabled = true;

class KeyedArrayIterator extends IteratorIterator
{
    private $keys;

    public function rewind()
    {
        parent::rewind();
        $this->keys = parent::current();
        parent::next();
    }

    public function current()
    {
        return array_combine($this->keys, parent::current());
    }

    public function getKeys()
    {
        return $this->keys;
    }
}

	/*##############################################################
	#
	#	Function Stuff
	#
	###############################################################*/
	
	
	

function do_all($directories, $f, $files, $filename) {

	$file = new SplFileObject($files);

		$file->setFlags($file::READ_CSV);

	foreach ($directories as $dir) {
		$csv = new KeyedArrayIterator($file);
		foreach ($csv as $line) {
			$linearray[] = $line;
			$otherArray = array($filename=>$linearray);
			$finalArray = array($dir=>$otherArray);
		}
		return $finalArray;
	}
}

function remove_unwanted_array_elements($array, $dir) {
		$otherArray = array(".", "..", "Archive");
		$result = array_diff($array, $otherArray);
		read_rows($result, $dir);
	}

	function read_rows($result, $dir) {
		foreach($result as $values) {
			$file = "".$dir."/".$values;
			$csv = array_map('str_getcsv', file($file));
			array_shift($csv);
			add_array($csv);
		}
	}

	function add_array($csv) {
		global $array;
		array_push($array, $csv);
	}

	function purge_tables($app){
		global $conn;
		
		$sql = "SELECT * FROM TOOLS_APPLICATION TA WHERE TA.TOOL_NAME = '$app'";
		$results = $conn->getResults($sql);
		$tool_id = get_col_values($results, 'TOOL_ID');
		
		if(count($tool_id)>0){	
			$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE TAT WHERE TAT.APPLICATION_ID IN (".implode(',', $tool_id).")";
			$results = $conn->getResults($sql);
			$tables = get_col_values($results, 'TABLE_ID');
			
			$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE_ROW TATR WHERE TATR.TABLE_ID IN (".implode(',', $tables).")";
			$results = $conn->getResults($sql);
			$rows = get_col_values($results, 'ROW_ID');

			$sql = "SELECT * FROM TOOLS_APPLICATION_TABLE_FIELD TATF WHERE TATF.TABLE_ID IN (".implode(',', $tables).")";
			$results = $conn->getResults($sql);
			$field = get_col_values($results, 'FIELD_ID');

			
			
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
	//I added this part in - Rameez
	global $conn;
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
	
	function debug($title, $text=""){
		global $debugText;
		
		if(is_array($text))
				$text = json_encode($text);
		
		$debugText .= "<tr><td>".$title."</td><td>".$text."</td></tr>";
	}
	
	function debug_output(){
		global $debugText, $debugModeEnabled;
		
		if($debugModeEnabled){
			echo "<table class=\"debug\">";
				echo $debugText;
			echo "</table>";
		}
	}
$directories = array("data/p1", "data/p2");
$f = $name;
$files = $f;
$filename = str_replace('.csv', '', $files);
$filenames = array($files);
//$array = array();
$fullArray = do_all($directories, $f, $files, $filename);

$app = "PriceCalculator";

//this is a test to iterate though $fa so we can identify the correct levels to pass to the import functions. 
$direc = get_keys($fullArray);
//$direc is the directory


//$tables = array("Statements", "Logic");
	
	$xml = simplexml_load_file("..\..\..\config\oraconnect.xml");
	$conn = setDBType("Oracle");
	
	$tns = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=".$xml->HOST.")(PORT=".$xml->PORT."))(CONNECT_DATA=(SID=".$xml->SID.")))";
	$conn->open($tns, $xml->USERID, $xml->PASSWORD);
	
	//Purge the tables of their current values
	purge_tables($app);

		
			
				//get the contents of the table
			
		debug("fullArray",$fullArray);
		foreach($fullArray as $filekey) {
			$filenamekey = get_keys($filekey);
			debug("FileKey",$filekey);
			//$filenamekey is the filename
			foreach($filekey as $na) {
				debug("NA",$na);
				
					
				//this level returns the column headers
					$col = get_keys($na[0]);
					debug("col",$col);
					//print_r($col);
					//$col is the column header
					
					

						//$rows is the row content
						$contents = array($direc[0]."_".$filenamekey[0]);
						debug("contents",$contents);
						$keys = $col;
						
						
						//If the app doesn't exist then lets insert it and get the key
						$app_entry = create_app($conn, $app);
						//returns $result
						
						//If the table doesn't exist then lets create the table
						$table_entry = create_table($conn, $app_entry, $contents[0]);
						
						
						//OK so we have the table, lets create the columns
						$columns = add_table_columns($conn, $table_entry, $keys);
						
						//now start creating rows
						$table_rows = fill_table($conn, $table_entry, $keys, $na);
						
				
			}
		}
				


	$conn->close();

	debug_output();

	//Don't need to touch anything else below this


}
?>

</body>
</html>