<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "SELECT * FROM recipes WHERE id = $id";
            $result = $conn->query($sql);
            if ($result && $result->num_rows > 0) {
                echo json_encode($result->fetch_assoc());
            } else {
                echo json_encode(["error" => "Resep tidak ditemukan"]);
            }
        } else {
            $sql = "SELECT * FROM recipes";
            $result = $conn->query($sql);
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        }
        break;

    case "POST":
        $input = json_decode(file_get_contents("php://input"), true);
        $nama     = $input['nama_resep'] ?? null;
        $kategori = $input['kategori'] ?? null;
        $alat     = $input['alat'] ?? null;
        $bahan    = $input['bahan'] ?? null;
        $langkah  = $input['langkah'] ?? null;
        $gambar   = $input['gambar'] ?? ''; // boleh kosong
        $tingkat  = $input['tingkat_kesulitan'] ?? null;
        $waktu    = $input['waktu'] ?? null;

        if (!$nama || !$kategori || !$alat || !$bahan || !$langkah || !$tingkat || !$waktu) {
            echo json_encode(["error" => "Data tidak lengkap"]);
            exit;
        }

        $sql = "INSERT INTO recipes (nama_resep, kategori, alat, bahan, langkah, gambar, tingkat_kesulitan, waktu)
                VALUES ('$nama','$kategori','$alat','$bahan','$langkah','$gambar','$tingkat','$waktu')";
        if ($conn->query($sql)) {
            echo json_encode(["message" => "Resep berhasil ditambahkan"]);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
        break;

    case "PUT":
        $input = json_decode(file_get_contents("php://input"), true);
        $id       = $input['id'] ?? null;
        $nama     = $input['nama_resep'] ?? null;
        $kategori = $input['kategori'] ?? null;
        $alat     = $input['alat'] ?? null;
        $bahan    = $input['bahan'] ?? null;
        $langkah  = $input['langkah'] ?? null;
        $gambar   = $input['gambar'] ?? '';
        $tingkat  = $input['tingkat_kesulitan'] ?? null;
        $waktu    = $input['waktu'] ?? null;

        if (!$id || !$nama || !$kategori || !$alat || !$bahan || !$langkah || !$tingkat || !$waktu) {
            echo json_encode(["error" => "Data tidak lengkap"]);
            exit;
        }

        $sql = "UPDATE recipes SET 
                nama_resep='$nama', kategori='$kategori', alat='$alat', bahan='$bahan', langkah='$langkah', 
                gambar='$gambar', tingkat_kesulitan='$tingkat', waktu='$waktu'
                WHERE id=$id";

        if ($conn->query($sql)) {
            echo json_encode(["message" => "Resep berhasil diupdate"]);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
        break;

    case "DELETE":
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(["error" => "ID tidak diberikan"]);
            exit;
        }
        $sql = "DELETE FROM recipes WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(["message" => "Resep berhasil dihapus"]);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
        break;
}
?>
