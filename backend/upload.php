<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$targetDir = "uploads/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (isset($_FILES["gambar"])) {
    $fileName = time() . "_" . basename($_FILES["gambar"]["name"]);
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["gambar"]["tmp_name"], $targetFile)) {
        echo json_encode([
            "success" => true,
            "url" => "http://localhost/bakery-recipes-api/" . $targetFile
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal upload file"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Tidak ada file"]);
}
