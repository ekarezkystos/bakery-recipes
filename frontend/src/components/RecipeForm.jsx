import { useState } from "react";

function RecipeForm() {
  const [form, setForm] = useState({
    nama_resep: "",
    kategori: "",
    alat: "",
    bahan: "",
    langkah: "",
    gambar: "",
    tingkat_kesulitan: "Mudah",
    waktu: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/bakery-recipes/backend/resep.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({
          nama_resep: "",
          kategori: "",
          alat: "",
          bahan: "",
          langkah: "",
          gambar: "",
          tingkat_kesulitan: "Mudah",
          waktu: ""
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow max-w-lg mx-auto"
    >
      <input
        name="nama_resep"
        value={form.nama_resep}
        onChange={handleChange}
        placeholder="Nama Resep"
        className="w-full border p-2"
        required
      />
      <input
        name="kategori"
        value={form.kategori}
        onChange={handleChange}
        placeholder="Kategori"
        className="w-full border p-2"
        required
      />
      <textarea
        name="alat"
        value={form.alat}
        onChange={handleChange}
        placeholder="Alat"
        className="w-full border p-2"
        required
      />
      <textarea
        name="bahan"
        value={form.bahan}
        onChange={handleChange}
        placeholder="Bahan"
        className="w-full border p-2"
        required
      />
      <textarea
        name="langkah"
        value={form.langkah}
        onChange={handleChange}
        placeholder="Langkah"
        className="w-full border p-2"
        required
      />
      <input
        name="gambar"
        value={form.gambar}
        onChange={handleChange}
        placeholder="URL gambar (contoh: http://localhost/bakery-recipes-api/uploads/cake.jpg)"
        className="w-full border p-2"
      />
      <select
        name="tingkat_kesulitan"
        value={form.tingkat_kesulitan}
        onChange={handleChange}
        className="w-full border p-2"
      >
        <option value="Mudah">Mudah</option>
        <option value="Sedang">Sedang</option>
        <option value="Sulit">Sulit</option>
      </select>
      <input
        name="waktu"
        value={form.waktu}
        onChange={handleChange}
        placeholder="Waktu (contoh: 45 menit)"
        className="w-full border p-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Tambah Resep
      </button>
    </form>
  );
}

export default RecipeForm;
