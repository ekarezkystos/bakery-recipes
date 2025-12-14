import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama_resep: "",
    kategori: "",
    alat: "",
    bahan: "",
    langkah: "",
    tingkat_kesulitan: "",
    waktu: "",
    gambar: ""
  });

  useEffect(() => {
    fetch(`http://localhost/bakery-recipes/backend/resep.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error("Gagal load resep:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost/bakery-recipes/backend/resep.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          alert("Resep berhasil diupdate!");
          navigate("/");
        } else {
          alert("Gagal update resep: " + result.error);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Gagal koneksi ke server");
      });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-yellow-50 shadow-md rounded-xl p-6 w-full max-w-md transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Edit Resep</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nama Resep" name="nama_resep" value={form.nama_resep} onChange={handleChange} required />
          <Input label="Kategori" name="kategori" value={form.kategori} onChange={handleChange} placeholder="Bread / Cake / ..." required />
          <Input label="Alat" name="alat" value={form.alat} onChange={handleChange} placeholder="Pisau, Oven, Mixer..." required />
          <Textarea label="Bahan" name="bahan" value={form.bahan} onChange={handleChange} placeholder="500g tepung, 300ml air..." required />
          <Textarea label="Langkah" name="langkah" value={form.langkah} onChange={handleChange} placeholder="1. Campur bahan\n2. Uleni..." required />

          {/* Waktu & Tingkat Kesulitan sejajar */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Waktu" name="waktu" value={form.waktu} onChange={handleChange} placeholder="contoh: 2 jam" required />
            <Input label="Tingkat Kesulitan" name="tingkat_kesulitan" value={form.tingkat_kesulitan} onChange={handleChange} placeholder="Mudah / Sedang / Sulit" required />
          </div>

          {/* URL Gambar + Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
            <input
              type="text"
              name="gambar"
              value={form.gambar}
              onChange={handleChange}
              placeholder="http://..."
              className="mt-1 block w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            {form.gambar && (
              <div className="mt-3 flex justify-center">
                <img
                  src={form.gambar}
                  alt={form.nama_resep || "Preview"}
                  className="w-full max-w-xs h-auto object-cover rounded border shadow"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x150?text=No+Image";
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 transition font-semibold"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({ label, name, value, onChange, placeholder = "", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:border-blue-300"
        required={required}
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, placeholder = "", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="mt-1 block w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:border-blue-300"
        required={required}
      />
    </div>
  );
}

export default EditRecipe;
