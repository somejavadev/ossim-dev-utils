<?php include 'header.php';?>
<?php
$catId = $_GET['catid'];

$sql =  "SELECT id, name, cat_id FROM subcategory";

if (is_numeric($catId)) {
    $sql = $sql . " where cat_id = " . $catId;
}

$sql = $sql . " ORDER BY name;";

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