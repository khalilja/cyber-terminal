// Matrix rain effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");
const font_size = 10;
const columns = canvas.width / font_size;
const drops = Array.from({length: Math.floor(columns)}, () => 1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary');
  ctx.font = font_size + 'px JetBrains Mono';

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Application state
let allOperations = [];
let selectedOperation = null;
let currentTheme = 'dark';

// Enhanced operations list
const operations = [
  {name: 'To Base64', category: 'encoding', desc: 'Encode data using Base64'},
  {name: 'From Base64', category: 'encoding', desc: 'Decode Base64 encoded data'},
  {name: 'URL Encode', category: 'encoding', desc: 'Percent-encode URL components'},
  {name: 'URL Decode', category: 'encoding', desc: 'Decode percent-encoded URLs'},
  {name: 'To Hex', category: 'encoding', desc: 'Convert data to hexadecimal'},
  {name: 'From Hex', category: 'encoding', desc: 'Convert hexadecimal to ASCII'},
  {name: 'HTML Encode', category: 'encoding', desc: 'Encode HTML entities'},
  {name: 'HTML Decode', category: 'encoding', desc: 'Decode HTML entities'},
  {name: 'MD5', category: 'hashing', desc: 'Generate MD5 hash digest'},
  {name: 'SHA256', category: 'hashing', desc: 'Generate SHA-256 hash'},
  {name: 'CRC32', category: 'hashing', desc: 'Calculate CRC-32 checksum'},
  {name: 'Caesar Cipher', category: 'crypto', desc: 'Classical substitution cipher'},
  {name: 'ROT13', category: 'crypto', desc: 'Simple letter substitution'},
  {name: 'XOR Cipher', category: 'crypto', desc: 'XOR encryption with key'},
  {name: 'Reverse', category: 'transform', desc: 'Reverse string order'},
  {name: 'To Upper', category: 'transform', desc: 'Convert to uppercase'},
  {name: 'To Lower', category: 'transform', desc: 'Convert to lowercase'},
  {name: 'Remove Spaces', category: 'transform', desc: 'Strip whitespace'},
  {name: 'JSON Pretty', category: 'format', desc: 'Format JSON with indentation'},
  {name: 'JSON Minify', category: 'format', desc: 'Compress JSON structure'}
];

const categories = {
  'all': 'ALL',
  'encoding': 'ENCODE',
  'hashing': 'HASH',
  'crypto': 'CRYPTO',
  'transform': 'TRANSFORM',
  'format': 'FORMAT'
};

function initApp() {
  allOperations = operations;
  renderCategories();
  renderOperations(allOperations);
  setupEventHandlers();
  updateConnectionStatus();
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', currentTheme);
  document.getElementById('theme-text').textContent = 
    currentTheme === 'dark' ? '◐ LIGHT MODE' : '◑ DARK MODE';
}

function renderCategories() {
  const container = document.getElementById('categories');
  container.innerHTML = '';

  Object.entries(categories).forEach(([key, label]) => {
    const count = key === 'all' ? allOperations.length : 
                  allOperations.filter(op => op.category === key).length;
    
    if (count > 0) {
      const chip = document.createElement('div');
      chip.className = 'category-chip';
      chip.textContent = `${label} (${count})`;
      chip.onclick = () => filterOperations(key);
      if (key === 'all') chip.classList.add('active');
      container.appendChild(chip);
    }
  });
}

function filterOperations(category) {
  document.querySelectorAll('.category-chip').forEach(chip => 
    chip.classList.remove('active'));
  event.target.classList.add('active');

  const filtered = category === 'all' ? allOperations : 
                  allOperations.filter(op => op.category === category);
  renderOperations(filtered);
}

function renderOperations(ops) {
  const container = document.getElementById('operations-list');
  container.innerHTML = '';

  ops.forEach(op => {
    const item = document.createElement('div');
    item.className = 'operation-item';
    item.innerHTML = `
      <div class="operation-name">${op.name}</div>
      <div class="operation-desc">${op.desc}</div>
    `;
    item.onclick = () => selectOperation(op, item);
    container.appendChild(item);
  });
}

function selectOperation(op, element) {
  document.querySelectorAll('.operation-item').forEach(item => 
    item.classList.remove('selected'));
  element.classList.add('selected');
  selectedOperation = op;
  document.getElementById('selected-op').textContent = op.name.toUpperCase();
  showStatus(`Operation selected: ${op.name}`, 'success');
}

function setupEventHandlers() {
  // Search functionality
  document.getElementById('search-ops').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allOperations.filter(op => 
      op.name.toLowerCase().includes(query) || 
      op.desc.toLowerCase().includes(query)
    );
    renderOperations(filtered);
  });

  // File handling
  const fileInput = document.getElementById('file-input');
  const dropZone = document.querySelector('.file-drop-zone');

  fileInput.addEventListener('change', handleFileSelect);
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-over'));
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-over'));
  });

  dropZone.addEventListener('drop', handleDrop);
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDrop(e) {
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function handleFileSelect(e) {
  if (e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('input-data').value = e.target.result;
    showStatus(`File loaded: ${file.name} (${file.size} bytes)`, 'success');
  };
  reader.readAsText(file);
}

function executeOperation() {
  if (!selectedOperation) {
    showStatus('ERROR: No operation selected', 'error');
    document.querySelector('.operations-list').classList.add('glitch');
    setTimeout(() => document.querySelector('.operations-list').classList.remove('glitch'), 500);
    return;
  }

  const input = document.getElementById('input-data').value;
  if (!input.trim()) {
    showStatus('ERROR: No input data provided', 'error');
    document.getElementById('input-data').classList.add('glitch');
    setTimeout(() => document.getElementById('input-data').classList.remove('glitch'), 500);
    return;
  }

  try {
    const result = performOperation(selectedOperation.name, input);
    document.getElementById('output-data').value = result;
    document.getElementById('output-status').textContent = '[SUCCESS]';
    showStatus(`Operation completed: ${selectedOperation.name}`, 'success');
  } catch (error) {
    document.getElementById('output-data').value = `ERROR: ${error.message}`;
    document.getElementById('output-status').textContent = '[ERROR]';
    showStatus(`Operation failed: ${error.message}`, 'error');
  }
}

function performOperation(opName, input) {
  switch (opName) {
    case 'To Base64':
      return btoa(unescape(encodeURIComponent(input)));
    
    case 'From Base64':
      try {
        return decodeURIComponent(escape(atob(input)));
      } catch {
        throw new Error('Invalid Base64 input');
      }
    
    case 'URL Encode':
      return encodeURIComponent(input);
    
    case 'URL Decode':
      return decodeURIComponent(input);
    
    case 'To Hex':
      return Array.from(input, c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    
    case 'From Hex':
      return input.split(/\s+/).map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
    
    case 'HTML Encode':
      return input.replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[m]);
    
    case 'HTML Decode':
      return input.replace(/&(amp|lt|gt|quot|#39);/g, m => ({
        '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'"
      })[m]);
    
    case 'MD5':
      return simpleHash(input, 'md5');
    
    case 'SHA256':
      return simpleHash(input, 'sha256');
    
    case 'CRC32':
      return crc32(input).toString(16).toUpperCase();
    
    case 'Caesar Cipher':
      return caesarCipher(input, 3);
    
    case 'ROT13':
      return input.replace(/[A-Za-z]/g, c => 
        String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
    
    case 'XOR Cipher':
      const key = 'XrooT';
      return Array.from(input, (c, i) => 
        String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join('');
    
    case 'Reverse':
      return input.split('').reverse().join('');
    
    case 'To Upper':
      return input.toUpperCase();
    
    case 'To Lower':
      return input.toLowerCase();
    
    case 'Remove Spaces':
      return input.replace(/\s+/g, '');
    
    case 'JSON Pretty':
      return JSON.stringify(JSON.parse(input), null, 2);
    
    case 'JSON Minify':
      return JSON.stringify(JSON.parse(input));
    
    default:
      throw new Error(`Operation "${opName}" not implemented`);
  }
}

// Helper functions
function simpleHash(str, type) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(type === 'sha256' ? 16 : 8, '0');
}

function crc32(str) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

const crcTable = (() => {
  let c, table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }
  return table;
})();

function caesarCipher(text, shift) {
  return text.replace(/[A-Za-z]/g, c => {
    const start = c <= 'Z' ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - start + shift) % 26 + start);
  });
}

function copyOutput() {
  const output = document.getElementById('output-data');
  if (!output.value.trim()) {
    showStatus('ERROR: No output to copy', 'error');
    return;
  }
  
  output.select();
  document.execCommand('copy');
  showStatus('Output copied to clipboard', 'success');
}

function downloadOutput() {
  const output = document.getElementById('output-data').value;
  if (!output.trim()) {
    showStatus('ERROR: No output to download', 'error');
    return;
  }

  const blob = new Blob([output], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `xroot_output_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showStatus('Output downloaded successfully', 'success');
}

function clearAll() {
  document.getElementById('input-data').value = '';
  document.getElementById('output-data').value = '';
  document.getElementById('output-status').textContent = '[EMPTY]';
  selectedOperation = null;
  document.getElementById('selected-op').textContent = 'NONE';
  document.querySelectorAll('.operation-item').forEach(item => 
    item.classList.remove('selected'));
  showStatus('All data cleared', 'success');
}

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.innerHTML = `
    <span class="status-icon">${type === 'success' ? '✓' : '✗'}</span>
    <span>${message}</span>
  `;
  status.className = `status-display show ${type}`;
  
  setTimeout(() => {
    status.classList.remove('show');
  }, 3000);
}

function updateConnectionStatus() {
  const status = document.getElementById('connection-status');
  const states = ['● ONLINE', '◐ SYNC', '◑ PROC', '◒ READY'];
  let index = 0;
  
  setInterval(() => {
    status.textContent = states[index];
    index = (index + 1) % states.length;
  }, 2000);
}

// Initialize application
initApp();

// Auto-scroll operations list
setInterval(() => {
  const list = document.getElementById('operations-list');
  if (list.scrollTop === 0) {
    list.scrollTop = 1;
  }
}, 100);