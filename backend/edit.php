<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php";

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$data = json_decode(file_get_contents("php://input"), true);

if (!$id || !$data) {
  echo json_encode(["success" => false, "message" => "ID atau data kosong"]);
  exit;
}

$nama     = mysqli_real_escape_string($conn, $data['nama_resep']);
$kategori = mysqli_real_escape_string($conn, $data['kategori']);
$alat     = mysqli_real_escape_string($conn, $data['alat']);
$bahan    = mysqli_real_escape_string($conn, $data['bahan']);
$langkah  = mysqli_real_escape_string($conn, $data['langkah']);
$tingkat  = mysqli_real_escape_string($conn, $data['tingkat_kesulitan']);
$gambar   = isset($data['gambar']) ? mysqli_real_escape_string($conn, $data['gambar']) : '';
$waktu    = isset($data['waktu']) ? mysqli_real_escape_string($conn, $data['waktu']) : '';

$sql = "UPDATE recipes SET 
          nama_resep='$nama',
          kategori='$kategori',
          alat='$alat',
          bahan='$bahan',
          langkah='$langkah',
          tingkat_kesulitan='$tingkat',
          gambar='$gambar',
          waktu='$waktu'
        WHERE id=$id";

if (mysqli_query($conn, $sql)) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "message" => mysqli_error($conn)]);
}
