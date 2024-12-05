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
let searchInput = document.getElementById("search");
let sortSelect = document.getElementById("sort");
let penyakitForm = document.getElementById("penyakit-form");
let namaInput = document.getElementById("nama");
let deskripsiInput = document.getElementById("deskripsi");
let gejalaInput = document.getElementById("gejala");
let pengobatanInput = document.getElementById("pengobatan");
let gambarInput = document.getElementById("gambar");
let tingkatInput = document.getElementById("tingkat");
let saveButton = document.getElementById("save-button");

// Functions
function renderPenyakitList() {
  let penyakitListContainer = document.getElementById("penyakit-list");
  // console.log(penyakitListContainer);

  penyakitListContainer.innerHTML = "";
  let filteredList = filterAndSortPenyakit();
  // console.log(filteredList);

  if (filteredList.length === 0) {
    penyakitListContainer.innerHTML = `<p class="text-center text-danger">Tidak ditemukan hasil pencarian.</p>`;
    return;
  }

  filteredList.forEach((penyakit) => {
    let penyakitCard = document.createElement("div");
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

function filterAndSortPenyakit() {
  let searchValue = searchInput.value.toLowerCase();
  let sortValue = sortSelect.value;

  let filteredList = penyakitList.filter((penyakit) => penyakit.nama.toLowerCase().includes(searchValue) || penyakit.gejala.some((gejala) => gejala.toLowerCase().includes(searchValue)));

  filteredList.sort((a, b) => (sortValue === "asc" ? a.nama.localeCompare(b.nama) : b.nama.localeCompare(a.nama)));

  return filteredList;
}

function savePenyakit() {
  if (!validateForm()) {
    alert("Harap lengkapi semua data sebelum menyimpan.");
    return;
  }

  let newPenyakit = {
    id: editingId || Date.now(),
    nama: namaInput.value,
    deskripsi: deskripsiInput.value,
    gejala: gejalaInput.value.split(",").map((item) => item.trim()),
    pengobatan: pengobatanInput.value.split(",").map((item) => item.trim()),
    gambar: gambarInput.value,
    tingkatPenyakit: tingkatInput.value,
  };

  if (editingId) {
    let index = penyakitList.findIndex((penyakit) => penyakit.id === editingId);
    penyakitList[index] = newPenyakit;
  } else {
    penyakitList.push(newPenyakit);
  }

  resetForm();
  renderPenyakitList();
}

function editPenyakit(id) {
  let penyakit = penyakitList.find((p) => p.id === id);
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
  renderPenyakitList();
}

function resetForm() {
  editingId = null;
  namaInput.value = "";
  deskripsiInput.value = "";
  gejalaInput.value = "Rendah";
  pengobatanInput.value = "";
  gambarInput.value = "";
  tingkatInput.value = "";
  saveButton.textContent = "Simpan";
}

function validateForm() {
  return namaInput.value.trim() !== "" && deskripsiInput.value.trim() !== "" && gejalaInput.value.trim() !== "" && pengobatanInput.value.trim() !== "" && gambarInput.value.trim() !== "" && tingkatInput.value.trim() !== "";
}

// Event Listeners
searchInput.addEventListener("input", renderPenyakitList);
sortSelect.addEventListener("change", renderPenyakitList);
saveButton.addEventListener("click", savePenyakit);

// Initial Render
renderPenyakitList();
