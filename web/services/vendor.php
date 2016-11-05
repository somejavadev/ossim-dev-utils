<?php include 'header.php';?>
<?php
$sql =  "select DISTINCT (vendor) from plugin WHERE vendor IS NOT NULL ORDER BY vendor;";
$result = $conn->query($sql);
$json = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {

        $object = (object) [
            'vendor' => $row["vendor"],
        ];
        array_push($json, $object);
    }
}
echo json_encode($json);
?>
<?php include 'footer.php';?>