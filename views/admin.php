<?php
echo "in php";
$m = new MongoClient(); // connect
echo "Connected to db";
$db = $m->selectDB("test");
   $collection = $db->feedbacks;
    echo "Collection is :" + $collection;
$cursor = $collection->find(array(
    'createdDate' => -1));
    $cursor->limit(10);
    
    echo "values";
foreach ($cursor as $doc) {
    var_dump($doc);
}
?>
<html>
    <body>
        Hey
    </body>
</html>