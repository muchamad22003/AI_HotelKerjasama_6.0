// === GANTI DENGAN URL WEB APP GOOGLE SCRIPT ===
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwq6bnDyQ3_pw3CbCocK192kRVXRO6_EBs4TNCXqNsPnqNCvgSmfnP9bF_0bI4s6abf9w/exec';

const form = document.getElementById('dataForm');
const timestamp = document.getElementById('timestamp');
const statusEl = document.getElementById('status');

// === UPDATE TIMESTAMP OTOMATIS ===
function updateTime() {
  const now = new Date();
  timestamp.value = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
}
setInterval(updateTime, 1000);
updateTime();

// === ANIMASI STATUS ===
function showStatus(message, type) {
  statusEl.innerHTML = message;
  statusEl.className = type + ' show';
}

function showLoading() {
  showStatus('<span class="loader"></span> Mengirim data...', 'loading');
}

// === KIRIM DATA KE GOOGLE SHEET ===
form.addEventListener('submit', e => {
  e.preventDefault();
  showLoading();

  const data = {
    timestamp: timestamp.value,
    nama: document.getElementById('nama').value,
    hotel: document.getElementById('hotel').value
  };

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    showStatus('✅ Data berhasil dikirim!', 'success');
    form.reset();
    updateTime();
  })
  .catch(() => {
    showStatus('❌ Gagal mengirim data.', 'error');
  });
});
