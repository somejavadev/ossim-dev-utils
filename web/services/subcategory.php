<?php include 'header.php';?>
<?php
$sql =  "SELECT id, name, cat_id FROM subcategory";
$result = $conn->query($sql);
$json = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {

        $object = (object) [
            'id' => $row["id"],
            'name' => $row["name"],
            'catId' => $row["cat_id"]
        ];

        array_push($json, $object);
    }
}

echo json_encode($json);
?>
<?php include 'footer.php';?>