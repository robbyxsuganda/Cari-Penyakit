let penyakitList = [
  {
    id: 1,
    nama: "Demam Berdarah Dengue (DBD)",
    deskripsi: "Penyakit yang disebabkan oleh virus dengue melalui gigitan nyamuk Aedes aegypti.",
    gejala: ["Demam tinggi mendadak", "Sakit kepala parah", "Nyeri di belakang mata", "Ruam kulit"],
    pengobatan: ["Istirahat cukup", "Minum banyak cairan", "Kompres demam", "Konsultasi dokter"],
    gambar: "https://student-activity.binus.ac.id/tfi/wp-content/uploads/sites/41/2023/11/bahaya-depresi.jpeg",
    tingkatPenyakit: "Tinggi",
  },
  {
    id: 2,
    nama: "Flu Biasa",
    deskripsi: "Penyakit pernapasan ringan yang disebabkan oleh virus.",
    gejala: ["Hidung tersumbat", "Demam ringan", "Bersin", "Batuk"],
    pengobatan: ["Istirahat", "Minum air hangat", "Obat flu bebas"],
    gambar: "https://student-activity.binus.ac.id/tfi/wp-content/uploads/sites/41/2023/11/bahaya-depresi.jpeg",
    tingkatPenyakit: "Rendah",
  },
  {
    id: 3,
    nama: "Malaria",
    deskripsi: "Penyakit akibat gigitan nyamuk Anopheles yang terinfeksi parasit plasmodium.",
    gejala: ["Demam berkala", "Menggigil", "Nyeri otot", "Mual"],
    pengobatan: ["Obat antimalaria", "Konsultasi dokter"],
    gambar: "https://student-activity.binus.ac.id/tfi/wp-content/uploads/sites/41/2023/11/bahaya-depresi.jpeg",
    tingkatPenyakit: "Tinggi",
  },
  {
    id: 4,
    nama: "Asma",
    deskripsi: "Penyakit kronis yang memengaruhi saluran pernapasan.",
    gejala: ["Sesak napas", "Batuk malam hari", "Mengi"],
    pengobatan: ["Inhaler", "Kontrol lingkungan", "Obat antiinflamasi"],
    gambar: "https://student-activity.binus.ac.id/tfi/wp-content/uploads/sites/41/2023/11/bahaya-depresi.jpeg",
    tingkatPenyakit: "Sedang",
  },
  {
    id: 5,
    nama: "Cacar Air",
    deskripsi: "Infeksi virus yang menyebabkan ruam kulit dengan lepuhan kecil yang gatal.",
    gejala: ["Demam ringan", "Ruam kulit", "Lepuhan berisi cairan"],
    pengobatan: ["Kompres dingin", "Losion kalamin", "Istirahat cukup"],
    gambar: "https://student-activity.binus.ac.id/tfi/wp-content/uploads/sites/41/2023/11/bahaya-depresi.jpeg",
    tingkatPenyakit: "Sedang",
  },
  {
    id: 6,
    nama: "Hipertensi",
    deskripsi: "Tekanan darah tinggi yang dapat meningkatkan risiko penyakit kardiovaskular.",
    gejala: ["Sakit kepala", "Pusing", "Detak jantung tidak teratur"],
    pengobatan: ["Diet sehat", "Olahraga rutin", "Obat antihipertensi"],
    gambar: "https://student-activity.binus.ac.id/tfi/wp-content/uploads/sites/41/2023/11/bahaya-depresi.jpeg",
    tingkatPenyakit: "Tinggi",
  },
];

// console.log(penyakitList);

let editingId = null;

// DOM Elements
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const penyakitForm = document.getElementById("penyakit-form");
const namaInput = document.getElementById("nama");
const deskripsiInput = document.getElementById("deskripsi");
const gejalaInput = document.getElementById("gejala");
const pengobatanInput = document.getElementById("pengobatan");
const gambarInput = document.getElementById("gambar");
const tingkatInput = document.getElementById("tingkat");
const penyakitListContainer = document.getElementById("penyakit-list");
const saveButton = document.getElementById("save-button");

function renderPenyakitList() {
  penyakitListContainer.innerHTML = "";

  penyakitList.forEach((penyakit) => {
    const penyakitCard = document.createElement("div");
    penyakitCard.className = "card";
    penyakitCard.innerHTML = `
      <img src="${penyakit.gambar}" alt="${penyakit.nama}" />
      <div class="card-body">
        <h3>${penyakit.nama}</h3>
        <p><strong>Deskripsi:</strong> ${penyakit.deskripsi}</p>
        <p><strong>Gejala:</strong> ${penyakit.gejala.join(", ")}</p>
        <p><strong>Pengobatan:</strong> ${penyakit.pengobatan.join(", ")}</p>
        <p><strong>Tingkat Penyakit:</strong> ${penyakit.tingkatPenyakit}</p>
        <button class="btn btn-warning" onclick="editPenyakit(${penyakit.id})">Ubah</button>
        <button class="btn btn-danger" onclick="deletePenyakit(${penyakit.id})">Hapus</button>
      </div>
    `;
    penyakitListContainer.appendChild(penyakitCard);
  });
}

function editPenyakit(id) {
  const penyakit = penyakitList.find((p) => p.id === id);
  // console.log(penyakit);

  editingId = penyakit.id;
  namaInput.value = penyakit.nama;
  deskripsiInput.value = penyakit.deskripsi;
  gejalaInput.value = penyakit.gejala.join(", ");
  pengobatanInput.value = penyakit.pengobatan.join(", ");
  gambarInput.value = penyakit.gambar;
  tingkatInput.value = penyakit.tingkatPenyakit;
  saveButton.textContent = "Update";
}

function deletePenyakit(id) {
  penyakitList = penyakitList.filter((penyakit) => penyakit.id !== id);
  console.log(penyakitList);

  renderPenyakitList();
}

renderPenyakitList();
