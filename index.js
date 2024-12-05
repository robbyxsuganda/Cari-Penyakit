let penyakitList = [
  {
    id: 1,
    nama: "Demam Berdarah Dengue (DBD)",
    deskripsi: "Penyakit yang disebabkan oleh virus dengue melalui gigitan nyamuk Aedes aegypti.",
    gejala: ["Demam tinggi mendadak", "Sakit kepala parah", "Nyeri di belakang mata", "Ruam kulit"],
    pengobatan: ["Istirahat cukup", "Minum banyak cairan", "Kompres demam", "Konsultasi dokter"],
    gambar: "https://unair.ac.id/wp-content/uploads/2021/07/Ilustrasi-oleh-Merdeka-comm.jpg",
    tingkatPenyakit: "Tinggi",
  },
  {
    id: 2,
    nama: "Flu Biasa",
    deskripsi: "Penyakit pernapasan ringan yang disebabkan oleh virus.",
    gejala: ["Hidung tersumbat", "Demam ringan", "Bersin", "Batuk"],
    pengobatan: ["Istirahat", "Minum air hangat", "Obat flu bebas"],
    gambar: "https://prodiaohi.sgp1.digitaloceanspaces.com/app/assets/2014/05/06201928/flu.jpg",
    tingkatPenyakit: "Rendah",
  },
  {
    id: 3,
    nama: "Malaria",
    deskripsi: "Penyakit akibat gigitan nyamuk Anopheles yang terinfeksi parasit plasmodium.",
    gejala: ["Demam berkala", "Menggigil", "Nyeri otot", "Mual"],
    pengobatan: ["Obat antimalaria", "Konsultasi dokter"],
    gambar: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2021/12/24072402/Gejala-Malaria-yang-Tidak-Boleh-Dianggap-Sepele-03.jpg",
    tingkatPenyakit: "Tinggi",
  },
  {
    id: 4,
    nama: "Asma",
    deskripsi: "Penyakit kronis yang memengaruhi saluran pernapasan.",
    gejala: ["Sesak napas", "Batuk malam hari", "Mengi"],
    pengobatan: ["Inhaler", "Kontrol lingkungan", "Obat antiinflamasi"],
    gambar: "https://unair.ac.id/wp-content/uploads/2021/11/Foto-by-IDN-Times.jpg",
    tingkatPenyakit: "Sedang",
  },
  {
    id: 5,
    nama: "Cacar Air",
    deskripsi: "Infeksi virus yang menyebabkan ruam kulit dengan lepuhan kecil yang gatal.",
    gejala: ["Demam ringan", "Ruam kulit", "Lepuhan berisi cairan"],
    pengobatan: ["Kompres dingin", "Losion kalamin", "Istirahat cukup"],
    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCbKApzg0Mt3DEAw8JW8yC1TVDfdAy9PMiLg&s",
    tingkatPenyakit: "Sedang",
  },
  {
    id: 6,
    nama: "Hipertensi",
    deskripsi: "Tekanan darah tinggi yang dapat meningkatkan risiko penyakit kardiovaskular.",
    gejala: ["Sakit kepala", "Pusing", "Detak jantung tidak teratur"],
    pengobatan: ["Diet sehat", "Olahraga rutin", "Obat antihipertensi"],
    gambar: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2021/06/10090833/Hipertensi.jpg",
    tingkatPenyakit: "Tinggi",
  },
];

// console.log(penyakitList);

let editingId = null;

// DOM Elements

let penyakitListContainer = document.getElementById("penyakit-list");
// console.log(penyakitListContainer);
let searchInput = document.getElementById("search");
// console.log(searchInput);
let sortSelect = document.getElementById("sort");
// console.log(sortSelect);
let penyakitForm = document.getElementById("penyakit-form");
// console.log(penyakitForm);
let namaInput = document.getElementById("nama");
// console.log(namaInput);
let deskripsiInput = document.getElementById("deskripsi");
// console.log(deskripsiInput);
let gejalaInput = document.getElementById("gejala");
// console.log(gejalaInput);
let pengobatanInput = document.getElementById("pengobatan");
// console.log(pengobatanInput);
let gambarInput = document.getElementById("gambar");
// console.log(gambarInput);
let tingkatInput = document.getElementById("tingkat");
// console.log(tingkatInput);
let saveButton = document.getElementById("save-button");
// console.log(saveButton);
let warna = document.getElementById("warna");
// console.log(warna);
let body = document.querySelector(".body");
// console.log(body);

console.log(warna.value);


// Functions
function renderPenyakitList() {
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
  gejalaInput.value = "";
  pengobatanInput.value = "";
  gambarInput.value = "";
  tingkatInput.value = "Rendah";
  saveButton.textContent = "Simpan";
}

function validateForm() {
  return namaInput.value.trim() !== "" && deskripsiInput.value.trim() !== "" && gejalaInput.value.trim() !== "" && pengobatanInput.value.trim() !== "" && gambarInput.value.trim() !== "" && tingkatInput.value.trim() !== "";
}

// Ganti Background
warna.addEventListener("input", function () {
  body.style.backgroundColor = warna.value;
});


// Event Listeners
searchInput.addEventListener("input", renderPenyakitList);
sortSelect.addEventListener("change", renderPenyakitList);
saveButton.addEventListener("click", savePenyakit);

// Initial Render
renderPenyakitList();
