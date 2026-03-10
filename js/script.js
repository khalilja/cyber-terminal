// ============================================================
// MATRIX RAIN EFFECT
// ============================================================
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");
const font_size = 10;
let drops = [];

function initDrops() {
  const columns = Math.floor(canvas.width / font_size);
  drops = Array.from({length: columns}, () => 1);
}
initDrops();

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
  ctx.font = font_size + 'px JetBrains Mono';
  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, i * font_size, drops[i] * font_size);
    if (drops[i] * font_size > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initDrops();
});

// ============================================================
// MD5 PURE-JS IMPLEMENTATION (public domain algorithm)
// ============================================================
function md5(str) {
  function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    return ((x >> 16) + (y >> 16) + (lsw >> 16)) << 16 | (lsw & 0xffff);
  }
  function rol(n, c) { return (n << c) | (n >>> (32 - c)); }
  function cmn(q, a, b, x, s, t) { return safeAdd(rol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
  function ff(a,b,c,d,x,s,t){ return cmn((b&c)|(~b&d),a,b,x,s,t); }
  function gg(a,b,c,d,x,s,t){ return cmn((b&d)|(c&~d),a,b,x,s,t); }
  function hh(a,b,c,d,x,s,t){ return cmn(b^c^d,a,b,x,s,t); }
  function ii(a,b,c,d,x,s,t){ return cmn(c^(b|~d),a,b,x,s,t); }
  function core(m, l) {
    m[l >> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < m.length; i += 16) {
      const oa=a, ob=b, oc=c, od=d;
      a=ff(a,b,c,d,m[i],7,-680876936);    d=ff(d,a,b,c,m[i+1],12,-389564586);
      c=ff(c,d,a,b,m[i+2],17,606105819);  b=ff(b,c,d,a,m[i+3],22,-1044525330);
      a=ff(a,b,c,d,m[i+4],7,-176418897);  d=ff(d,a,b,c,m[i+5],12,1200080426);
      c=ff(c,d,a,b,m[i+6],17,-1473231341);b=ff(b,c,d,a,m[i+7],22,-45705983);
      a=ff(a,b,c,d,m[i+8],7,1770035416);  d=ff(d,a,b,c,m[i+9],12,-1958414417);
      c=ff(c,d,a,b,m[i+10],17,-42063);    b=ff(b,c,d,a,m[i+11],22,-1990404162);
      a=ff(a,b,c,d,m[i+12],7,1804603682); d=ff(d,a,b,c,m[i+13],12,-40341101);
      c=ff(c,d,a,b,m[i+14],17,-1502002290);b=ff(b,c,d,a,m[i+15],22,1236535329);
      a=gg(a,b,c,d,m[i+1],5,-165796510);  d=gg(d,a,b,c,m[i+6],9,-1069501632);
      c=gg(c,d,a,b,m[i+11],14,643717713); b=gg(b,c,d,a,m[i],20,-373897302);
      a=gg(a,b,c,d,m[i+5],5,-701558691);  d=gg(d,a,b,c,m[i+10],9,38016083);
      c=gg(c,d,a,b,m[i+15],14,-660478335);b=gg(b,c,d,a,m[i+4],20,-405537848);
      a=gg(a,b,c,d,m[i+9],5,568446438);   d=gg(d,a,b,c,m[i+14],9,-1019803690);
      c=gg(c,d,a,b,m[i+3],14,-187363961); b=gg(b,c,d,a,m[i+8],20,1163531501);
      a=gg(a,b,c,d,m[i+13],5,-1444681467);d=gg(d,a,b,c,m[i+2],9,-51403784);
      c=gg(c,d,a,b,m[i+7],14,1735328473); b=gg(b,c,d,a,m[i+12],20,-1926607734);
      a=hh(a,b,c,d,m[i+5],4,-378558);     d=hh(d,a,b,c,m[i+8],11,-2022574463);
      c=hh(c,d,a,b,m[i+11],16,1839030562);b=hh(b,c,d,a,m[i+14],23,-35309556);
      a=hh(a,b,c,d,m[i+1],4,-1530992060); d=hh(d,a,b,c,m[i+4],11,1272893353);
      c=hh(c,d,a,b,m[i+7],16,-155497632); b=hh(b,c,d,a,m[i+10],23,-1094730640);
      a=hh(a,b,c,d,m[i+13],4,681279174);  d=hh(d,a,b,c,m[i],11,-358537222);
      c=hh(c,d,a,b,m[i+3],16,-722521979); b=hh(b,c,d,a,m[i+6],23,76029189);
      a=hh(a,b,c,d,m[i+9],4,-640364487);  d=hh(d,a,b,c,m[i+12],11,-421815835);
      c=hh(c,d,a,b,m[i+15],16,530742520); b=hh(b,c,d,a,m[i+2],23,-995338651);
      a=ii(a,b,c,d,m[i],6,-198630844);    d=ii(d,a,b,c,m[i+7],10,1126891415);
      c=ii(c,d,a,b,m[i+14],15,-1416354905);b=ii(b,c,d,a,m[i+5],21,-57434055);
      a=ii(a,b,c,d,m[i+12],6,1700485571); d=ii(d,a,b,c,m[i+3],10,-1894986606);
      c=ii(c,d,a,b,m[i+10],15,-1051523);  b=ii(b,c,d,a,m[i+1],21,-2054922799);
      a=ii(a,b,c,d,m[i+8],6,1873313359);  d=ii(d,a,b,c,m[i+15],10,-30611744);
      c=ii(c,d,a,b,m[i+6],15,-1560198380);b=ii(b,c,d,a,m[i+13],21,1309151649);
      a=ii(a,b,c,d,m[i+4],6,-145523070);  d=ii(d,a,b,c,m[i+11],10,-1120210379);
      c=ii(c,d,a,b,m[i+2],15,718787259);  b=ii(b,c,d,a,m[i+9],21,-343485551);
      a=safeAdd(a,oa); b=safeAdd(b,ob); c=safeAdd(c,oc); d=safeAdd(d,od);
    }
    return [a, b, c, d];
  }
  function str2binl(s) {
    const bin = [];
    for (let i = 0; i < s.length * 8; i += 8)
      bin[i >> 5] = (bin[i >> 5] || 0) | (s.charCodeAt(i / 8) & 0xff) << (i % 32);
    return bin;
  }
  function binl2hex(arr) {
    const h = '0123456789abcdef';
    let s = '';
    for (let i = 0; i < arr.length * 4; i++)
      s += h[(arr[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf] + h[(arr[i >> 2] >> ((i % 4) * 8)) & 0xf];
    return s;
  }
  const utf8 = unescape(encodeURIComponent(str));
  return binl2hex(core(str2binl(utf8), utf8.length * 8));
}

// ============================================================
// CRC32
// ============================================================
const crcTable = (() => {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c;
  }
  return table;
})();

function crc32(str) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < str.length; i++)
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
  return ((crc ^ (-1)) >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

// ============================================================
// ADLER-32
// ============================================================
function adler32(str) {
  let a = 1, b = 0;
  const MOD = 65521;
  for (let i = 0; i < str.length; i++) {
    a = (a + str.charCodeAt(i)) % MOD;
    b = (b + a) % MOD;
  }
  return (((b << 16) | a) >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

// ============================================================
// WEB CRYPTO HELPERS
// ============================================================
async function webCryptoHash(algo, str) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest(algo, enc.encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hmacSha256(key, str) {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey('raw', enc.encode(key),
    {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', k, enc.encode(str));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================================
// MORSE CODE TABLE
// ============================================================
const MORSE = {
  A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',
  K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',
  U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
  '6':'-....','7':'--...','8':'---..','9':'----.','.':'.-.-.-',',':'--..--',
  '?':'..--..','!':'-.-.--','/':'-..-.','-':'-....-',' ':'/'
};
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));

// ============================================================
// OPERATIONS LIBRARY
// ============================================================
const OPERATIONS = [
  // ---- ENCODING ----
  {
    name: 'To Base64', category: 'encoding', desc: 'Encode data using Base64',
    args: [{name:'alphabet',label:'Alphabet',type:'select',options:['standard','url-safe'],default:'standard'}],
    fn: async (input, args) => {
      const b64 = btoa(unescape(encodeURIComponent(input)));
      return (args.alphabet === 'url-safe')
        ? b64.replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'')
        : b64;
    }
  },
  {
    name: 'From Base64', category: 'encoding', desc: 'Decode Base64 encoded data',
    args: [{name:'alphabet',label:'Alphabet',type:'select',options:['standard','url-safe'],default:'standard'}],
    fn: async (input, args) => {
      let s = input.trim();
      if (args.alphabet === 'url-safe') s = s.replace(/-/g,'+').replace(/_/g,'/');
      while (s.length % 4) s += '=';
      try { return decodeURIComponent(escape(atob(s))); }
      catch { throw new Error('Invalid Base64 input'); }
    }
  },
  {
    name: 'To Hex', category: 'encoding', desc: 'Convert text to hexadecimal',
    args: [{name:'delimiter',label:'Delimiter',type:'select',options:['space','colon','none'],default:'space'}],
    fn: async (input, args) => {
      const sep = args.delimiter === 'space' ? ' ' : args.delimiter === 'colon' ? ':' : '';
      return Array.from(input, c => c.charCodeAt(0).toString(16).padStart(2,'0')).join(sep);
    }
  },
  {
    name: 'From Hex', category: 'encoding', desc: 'Convert hexadecimal to text',
    args: [{name:'delimiter',label:'Delimiter',type:'select',options:['auto','space','colon','none'],default:'auto'}],
    fn: async (input, args) => {
      let hex = input.trim();
      if (args.delimiter === 'auto' || args.delimiter === 'space') hex = hex.replace(/[\s:]/g,'');
      else if (args.delimiter === 'colon') hex = hex.replace(/:/g,'');
      if (hex.length % 2 !== 0) throw new Error('Odd-length hex string');
      return hex.match(/.{2}/g).map(h => String.fromCharCode(parseInt(h,16))).join('');
    }
  },
  {
    name: 'URL Encode', category: 'encoding', desc: 'Percent-encode URL components',
    args: [{name:'encodeAll',label:'Encode all chars',type:'checkbox',default:false}],
    fn: async (input, args) => {
      if (args.encodeAll === true || args.encodeAll === 'true') {
        return Array.from(input).map(c => '%' + c.charCodeAt(0).toString(16).padStart(2,'0').toUpperCase()).join('');
      }
      return encodeURIComponent(input);
    }
  },
  {
    name: 'URL Decode', category: 'encoding', desc: 'Decode percent-encoded URLs',
    args: [],
    fn: async (input) => {
      try { return decodeURIComponent(input); }
      catch { throw new Error('Invalid URL encoding'); }
    }
  },
  {
    name: 'HTML Encode', category: 'encoding', desc: 'Encode HTML special characters',
    args: [],
    fn: async (input) => input.replace(/[&<>"'`]/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'})[c])
  },
  {
    name: 'HTML Decode', category: 'encoding', desc: 'Decode HTML entities',
    args: [],
    fn: async (input) => {
      const el = document.createElement('textarea');
      el.innerHTML = input;
      return el.value;
    }
  },
  {
    name: 'To Binary', category: 'encoding', desc: 'Convert text to 8-bit binary representation',
    args: [],
    fn: async (input) =>
      Array.from(input).map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ')
  },
  {
    name: 'From Binary', category: 'encoding', desc: 'Convert 8-bit binary to text',
    args: [],
    fn: async (input) =>
      input.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b,2))).join('')
  },
  {
    name: 'To Decimal', category: 'encoding', desc: 'Convert text to decimal char codes',
    args: [],
    fn: async (input) => Array.from(input).map(c => c.charCodeAt(0)).join(' ')
  },
  {
    name: 'From Decimal', category: 'encoding', desc: 'Convert decimal codes to text',
    args: [],
    fn: async (input) =>
      input.trim().split(/\s+/).map(n => String.fromCharCode(parseInt(n,10))).join('')
  },
  {
    name: 'To Octal', category: 'encoding', desc: 'Convert text to octal representation',
    args: [],
    fn: async (input) =>
      Array.from(input).map(c => c.charCodeAt(0).toString(8).padStart(3,'0')).join(' ')
  },
  {
    name: 'From Octal', category: 'encoding', desc: 'Convert octal to text',
    args: [],
    fn: async (input) =>
      input.trim().split(/\s+/).map(o => String.fromCharCode(parseInt(o,8))).join('')
  },
  {
    name: 'To Charcode', category: 'encoding', desc: 'Show decimal char codes per character',
    args: [],
    fn: async (input) =>
      Array.from(input).map(c => `${c} -> ${c.charCodeAt(0)}`).join('\n')
  },
  {
    name: 'From Charcode', category: 'encoding', desc: 'Convert decimal char codes to text',
    args: [],
    fn: async (input) =>
      input.trim().split(/\s+/).map(n => String.fromCharCode(parseInt(n,10))).join('')
  },
  {
    name: 'To UTF-8 Bytes', category: 'encoding', desc: 'Show hex-encoded UTF-8 byte values',
    args: [],
    fn: async (input) => {
      const bytes = new TextEncoder().encode(input);
      return Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join(' ');
    }
  },
  {
    name: 'Escape String', category: 'encoding', desc: 'JS/JSON-style string escaping',
    args: [],
    fn: async (input) => input
      .replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n')
      .replace(/\r/g,'\\r').replace(/\t/g,'\\t')
      .replace(/[\x00-\x1f]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4,'0'))
  },
  {
    name: 'Unescape String', category: 'encoding', desc: 'Unescape JS/JSON escape sequences',
    args: [],
    fn: async (input) => {
      try { return JSON.parse('"' + input.replace(/(?<!\\)"/g,'\\"') + '"'); }
      catch { throw new Error('Invalid escape sequences'); }
    }
  },
  // ---- HASHING ----
  {
    name: 'MD5', category: 'hashing', desc: 'Generate MD5 hash digest (pure-JS)',
    args: [],
    fn: async (input) => md5(input)
  },
  {
    name: 'SHA-1', category: 'hashing', desc: 'Generate SHA-1 hash (Web Crypto)',
    args: [],
    fn: async (input) => webCryptoHash('SHA-1', input)
  },
  {
    name: 'SHA-256', category: 'hashing', desc: 'Generate SHA-256 hash (Web Crypto)',
    args: [],
    fn: async (input) => webCryptoHash('SHA-256', input)
  },
  {
    name: 'SHA-512', category: 'hashing', desc: 'Generate SHA-512 hash (Web Crypto)',
    args: [],
    fn: async (input) => webCryptoHash('SHA-512', input)
  },
  {
    name: 'CRC32', category: 'hashing', desc: 'Calculate CRC-32 checksum',
    args: [],
    fn: async (input) => crc32(input)
  },
  {
    name: 'HMAC-SHA256', category: 'hashing', desc: 'HMAC-SHA256 message authentication code',
    args: [{name:'key',label:'Key',type:'text',default:'secret'}],
    fn: async (input, args) => hmacSha256(args.key || 'secret', input)
  },
  {
    name: 'Adler-32', category: 'hashing', desc: 'Calculate Adler-32 checksum',
    args: [],
    fn: async (input) => adler32(input)
  },

  // ---- CRYPTO ----
  {
    name: 'ROT13', category: 'crypto', desc: 'Rotate letters by 13 positions',
    args: [],
    fn: async (input) => input.replace(/[A-Za-z]/g, c => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
    })
  },
  {
    name: 'ROT47', category: 'crypto', desc: 'Rotate printable ASCII by 47 positions',
    args: [],
    fn: async (input) => input.replace(/[!-~]/g, c =>
      String.fromCharCode(((c.charCodeAt(0) - 33 + 47) % 94) + 33))
  },
  {
    name: 'Caesar Cipher', category: 'crypto', desc: 'Classical shift cipher',
    args: [
      {name:'shift',label:'Shift',type:'number',default:3,min:1,max:25},
      {name:'direction',label:'Direction',type:'select',options:['encode','decode'],default:'encode'}
    ],
    fn: async (input, args) => {
      const rawShift = parseInt(args.shift) || 3;
      const s = args.direction === 'decode' ? (26 - rawShift % 26) : rawShift;
      return input.replace(/[A-Za-z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + s) % 26 + base);
      });
    }
  },
  {
    name: 'XOR', category: 'crypto', desc: 'XOR each character with key',
    args: [
      {name:'key',label:'Key',type:'text',default:'key'},
      {name:'encoding',label:'Key encoding',type:'select',options:['utf8','hex'],default:'utf8'}
    ],
    fn: async (input, args) => {
      let keyBytes;
      if (args.encoding === 'hex') {
        const h = (args.key || '').replace(/\s/g,'');
        if (!h) throw new Error('XOR key cannot be empty');
        keyBytes = h.match(/.{1,2}/g).map(b => parseInt(b,16));
      } else {
        const k = args.key || 'k';
        keyBytes = Array.from(k, c => c.charCodeAt(0));
      }
      if (!keyBytes.length) throw new Error('XOR key cannot be empty');
      return Array.from(input, (c, i) =>
        String.fromCharCode(c.charCodeAt(0) ^ keyBytes[i % keyBytes.length])).join('');
    }
  },
  {
    name: 'Vigenere Encode', category: 'crypto', desc: 'Vigenere cipher encryption',
    args: [{name:'key',label:'Key',type:'text',default:'key'}],
    fn: async (input, args) => {
      const key = (args.key || 'key').toUpperCase().replace(/[^A-Z]/g,'');
      if (!key) throw new Error('Key must contain letters');
      let j = 0;
      return input.replace(/[A-Za-z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        const shift = key.charCodeAt(j++ % key.length) - 65;
        return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
      });
    }
  },
  {
    name: 'Vigenere Decode', category: 'crypto', desc: 'Vigenere cipher decryption',
    args: [{name:'key',label:'Key',type:'text',default:'key'}],
    fn: async (input, args) => {
      const key = (args.key || 'key').toUpperCase().replace(/[^A-Z]/g,'');
      if (!key) throw new Error('Key must contain letters');
      let j = 0;
      return input.replace(/[A-Za-z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        const shift = key.charCodeAt(j++ % key.length) - 65;
        return String.fromCharCode((c.charCodeAt(0) - base - shift + 26) % 26 + base);
      });
    }
  },
  {
    name: 'Atbash Cipher', category: 'crypto', desc: 'Reverse-alphabet substitution cipher',
    args: [],
    fn: async (input) => input.replace(/[A-Za-z]/g, c => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(base + 25 - (c.charCodeAt(0) - base));
    })
  },
  {
    name: 'A1Z26 Encode', category: 'crypto', desc: 'Encode letters as numbers (A=1, B=2...)',
    args: [],
    fn: async (input) => {
      return Array.from(input).map(c => {
        if (/[A-Za-z]/.test(c)) return c.toUpperCase().charCodeAt(0) - 64;
        return c === ' ' ? ' ' : c;
      }).join('-').replace(/-([^0-9])/g,'$1').replace(/([^0-9])-/g,'$1');
    }
  },
  {
    name: 'A1Z26 Decode', category: 'crypto', desc: 'Decode numbers to letters (1=A)',
    args: [],
    fn: async (input) => input.trim().split(/[-\s]+/).map(t => {
      const n = parseInt(t);
      return (!isNaN(n) && n >= 1 && n <= 26) ? String.fromCharCode(n + 64) : t;
    }).join('')
  },
  {
    name: 'Morse Code Encode', category: 'crypto', desc: 'Encode text to Morse code',
    args: [],
    fn: async (input) => {
      return input.toUpperCase().split('').map(c => MORSE[c] || '').filter(s => s !== '').join(' ');
    }
  },
  {
    name: 'Morse Code Decode', category: 'crypto', desc: 'Decode Morse code to text',
    args: [],
    fn: async (input) => {
      return input.trim().split(' / ').map(word =>
        word.split(' ').map(sym => MORSE_REV[sym] || '?').join('')
      ).join(' ');
    }
  },
  // ---- TRANSFORM ----
  {
    name: 'To Upper Case', category: 'transform', desc: 'Convert text to uppercase',
    args: [],
    fn: async (input) => input.toUpperCase()
  },
  {
    name: 'To Lower Case', category: 'transform', desc: 'Convert text to lowercase',
    args: [],
    fn: async (input) => input.toLowerCase()
  },
  {
    name: 'To Title Case', category: 'transform', desc: 'Capitalize each word',
    args: [],
    fn: async (input) => input.replace(/\w\S*/g, t =>
      t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())
  },
  {
    name: 'Reverse', category: 'transform', desc: 'Reverse string character order',
    args: [],
    fn: async (input) => [...input].reverse().join('')
  },
  {
    name: 'Remove Whitespace', category: 'transform', desc: 'Strip whitespace characters',
    args: [
      {name:'spaces',label:'Spaces',type:'checkbox',default:true},
      {name:'tabs',label:'Tabs',type:'checkbox',default:true},
      {name:'newlines',label:'Newlines',type:'checkbox',default:true}
    ],
    fn: async (input, args) => {
      let out = input;
      if (args.spaces === true || args.spaces === 'true') out = out.replace(/ /g,'');
      if (args.tabs === true || args.tabs === 'true') out = out.replace(/\t/g,'');
      if (args.newlines === true || args.newlines === 'true') out = out.replace(/[\r\n]/g,'');
      return out;
    }
  },
  {
    name: 'Remove Null Bytes', category: 'transform', desc: 'Remove null (0x00) bytes',
    args: [],
    fn: async (input) => input.replace(/\x00/g,'')
  },
  {
    name: 'Trim', category: 'transform', desc: 'Trim leading and trailing whitespace',
    args: [],
    fn: async (input) => input.trim()
  },
  {
    name: 'Pad', category: 'transform', desc: 'Pad string to a given length',
    args: [
      {name:'length',label:'Length',type:'number',default:20,min:0},
      {name:'char',label:'Pad char',type:'text',default:'0'},
      {name:'direction',label:'Direction',type:'select',options:['left','right'],default:'left'}
    ],
    fn: async (input, args) => {
      const len = parseInt(args.length) || 20;
      const ch = ((args.char || '0') + '0')[0];
      return args.direction === 'right' ? input.padEnd(len, ch) : input.padStart(len, ch);
    }
  },
  {
    name: 'Repeat', category: 'transform', desc: 'Repeat the input N times',
    args: [{name:'times',label:'Times',type:'number',default:2,min:1}],
    fn: async (input, args) => input.repeat(Math.max(1, parseInt(args.times) || 2))
  },
  {
    name: 'Split', category: 'transform', desc: 'Split by delimiter and rejoin',
    args: [
      {name:'delimiter',label:'Split on',type:'text',default:','},
      {name:'join',label:'Join with',type:'text',default:'\\n'}
    ],
    fn: async (input, args) => {
      const sep = args.delimiter || ',';
      const joiner = (args.join || '\\n').replace(/\\n/g,'\n').replace(/\\t/g,'\t');
      return input.split(sep).join(joiner);
    }
  },
  {
    name: 'Count', category: 'transform', desc: 'Count characters, words, and lines',
    args: [],
    fn: async (input) => {
      const chars = input.length;
      const words = input.trim() ? input.trim().split(/\s+/).length : 0;
      const lines = input.split('\n').length;
      const bytes = new TextEncoder().encode(input).length;
      return `Characters: ${chars}\nWords:      ${words}\nLines:      ${lines}\nBytes:      ${bytes}`;
    }
  },
  {
    name: 'Unique Lines', category: 'transform', desc: 'Remove duplicate lines',
    args: [],
    fn: async (input) => [...new Set(input.split('\n'))].join('\n')
  },
  {
    name: 'Sort Lines', category: 'transform', desc: 'Sort lines alphabetically',
    args: [{name:'direction',label:'Direction',type:'select',options:['asc','desc'],default:'asc'}],
    fn: async (input, args) => {
      const lines = input.split('\n');
      lines.sort();
      if (args.direction === 'desc') lines.reverse();
      return lines.join('\n');
    }
  },

  // ---- FORMAT ----
  {
    name: 'JSON Pretty Print', category: 'format', desc: 'Format JSON with indentation',
    args: [{name:'indent',label:'Indent spaces',type:'number',default:2,min:0,max:8}],
    fn: async (input, args) => {
      try { return JSON.stringify(JSON.parse(input), null, parseInt(args.indent) || 2); }
      catch (e) { throw new Error('Invalid JSON: ' + e.message); }
    }
  },
  {
    name: 'JSON Minify', category: 'format', desc: 'Compress JSON to minimal form',
    args: [],
    fn: async (input) => {
      try { return JSON.stringify(JSON.parse(input)); }
      catch (e) { throw new Error('Invalid JSON: ' + e.message); }
    }
  },
  {
    name: 'XML Pretty Print', category: 'format', desc: 'Format XML with indentation',
    args: [],
    fn: async (input) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input.trim(), 'application/xml');
      if (doc.querySelector('parsererror')) throw new Error('Invalid XML');
      const ser = new XMLSerializer().serializeToString(doc);
      let indent = 0, out = '';
      ser.replace(/></g,'>>\n<<').split('\n').forEach(raw => {
        const line = raw.trim();
        if (!line) return;
        if (line.startsWith('</')) indent = Math.max(0, indent - 1);
        out += '  '.repeat(indent) + line + '\n';
        if (line.startsWith('<') && !line.startsWith('</') && !line.endsWith('/>') && !line.includes('</')) indent++;
      });
      return out.trim();
    }
  },
  {
    name: 'XML Minify', category: 'format', desc: 'Compress XML to minimal form',
    args: [],
    fn: async (input) => {
      const p = new DOMParser();
      const doc = p.parseFromString(input, 'application/xml');
      if (doc.querySelector('parsererror')) throw new Error('Invalid XML');
      return new XMLSerializer().serializeToString(doc).replace(/>\s+</g,'><');
    }
  },
  {
    name: 'CSV to JSON', category: 'format', desc: 'Convert CSV table to JSON array',
    args: [],
    fn: async (input) => {
      const lines = input.trim().split('\n');
      if (lines.length < 2) throw new Error('CSV needs at least a header row and one data row');
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g,''));
      const rows = lines.slice(1).map(line => {
        const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g,''));
        return Object.fromEntries(headers.map((h,i) => [h, vals[i] ?? '']));
      });
      return JSON.stringify(rows, null, 2);
    }
  },
  {
    name: 'JSON to CSV', category: 'format', desc: 'Convert JSON array to CSV table',
    args: [],
    fn: async (input) => {
      let data;
      try { data = JSON.parse(input); } catch (e) { throw new Error('Invalid JSON'); }
      if (!Array.isArray(data) || !data.length) throw new Error('JSON must be a non-empty array');
      const headers = Object.keys(data[0]);
      const esc = v => {
        const s = String(v ?? '');
        return (s.includes(',') || s.includes('"') || s.includes('\n'))
          ? '"' + s.replace(/"/g,'""') + '"' : s;
      };
      return [headers.join(','), ...data.map(row => headers.map(h => esc(row[h])).join(','))].join('\n');
    }
  },

  // ---- ANALYSIS ----
  {
    name: 'Entropy', category: 'analysis', desc: 'Calculate Shannon entropy of input',
    args: [],
    fn: async (input) => {
      if (!input) return 'Entropy: 0.0000 bits/byte';
      const freq = {};
      for (const c of input) freq[c] = (freq[c] || 0) + 1;
      const len = input.length;
      const entropy = -Object.values(freq).reduce((s,n) => {
        const p = n / len; return s + p * Math.log2(p);
      }, 0);
      return [
        `Entropy: ${entropy.toFixed(4)} bits/byte`,
        `Length:  ${len} chars`,
        `Unique:  ${Object.keys(freq).length} symbols`,
        `Ideal:   ${Math.log2(Object.keys(freq).length).toFixed(4)} bits/byte`
      ].join('\n');
    }
  },
  {
    name: 'Frequency Analysis', category: 'analysis', desc: 'Character frequency table',
    args: [],
    fn: async (input) => {
      const freq = {};
      for (const c of input) freq[c] = (freq[c] || 0) + 1;
      const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,30);
      if (!sorted.length) return 'No data';
      const max = sorted[0][1];
      return sorted.map(([c,n]) => {
        const bar = '|'.repeat(Math.round(n/max*20));
        const label = c === ' ' ? 'SPC' : c === '\n' ? 'LF' : c === '\t' ? 'TAB' : c;
        return `${label.padEnd(4)}${String(n).padStart(6)}  ${bar}`;
      }).join('\n');
    }
  },
  {
    name: 'Detect File Type', category: 'analysis', desc: 'Detect file type from magic bytes',
    args: [],
    fn: async (input) => {
      const sig = Array.from(input.slice(0,8)).map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join('');
      const sigs = [
        ['89504e47','PNG image'],['ffd8ff','JPEG image'],['47494638','GIF image'],
        ['25504446','PDF document'],['504b0304','ZIP archive'],['7f454c46','ELF binary'],
        ['d0cf11e0','MS Office (OLE)'],['3c3f786d','XML/SVG'],['3c68746d','HTML'],
        ['1f8b08','GZIP archive'],['425a68','BZIP2 archive'],
        ['377abcaf','7-Zip archive'],['cafebabe','Java class file']
      ];
      for (const [magic,name] of sigs) {
        if (sig.startsWith(magic)) return `Detected: ${name}\nMagic bytes: 0x${sig.slice(0,magic.length)}`;
      }
      const isPrintable = input.split('').every(c => c.charCodeAt(0) >= 0x09);
      return `Detected: ${isPrintable ? 'Text / Unknown' : 'Binary data'}\nMagic bytes: 0x${sig.slice(0,16)}`;
    }
  },
  {
    name: 'String Length', category: 'analysis', desc: 'Show string length in multiple units',
    args: [],
    fn: async (input) => {
      const bytes = new TextEncoder().encode(input).length;
      return `Characters: ${input.length}\nBytes (UTF-8): ${bytes}\nCode points: ${[...input].length}`;
    }
  },
  {
    name: 'Word Count', category: 'analysis', desc: 'Count words in the input text',
    args: [],
    fn: async (input) => {
      const count = input.trim() ? input.trim().split(/\s+/).length : 0;
      return `${count} word${count !== 1 ? 's' : ''}`;
    }
  },
  {
    name: 'Line Count', category: 'analysis', desc: 'Count lines in the input text',
    args: [],
    fn: async (input) => {
      const count = input.split('\n').length;
      return `${count} line${count !== 1 ? 's' : ''}`;
    }
  },
  {
    name: 'Byte Count', category: 'analysis', desc: 'Count bytes in UTF-8 encoding',
    args: [],
    fn: async (input) => {
      const count = new TextEncoder().encode(input).length;
      return `${count} byte${count !== 1 ? 's' : ''}`;
    }
  },
  {
    name: 'Character Code', category: 'analysis', desc: 'Show Unicode code point per character',
    args: [],
    fn: async (input) => [...input.slice(0,200)].map(c =>
      `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')}  dec:${c.charCodeAt(0).toString().padStart(5)}  ${JSON.stringify(c)}`
    ).join('\n')
  },

  // ---- NETWORK ----
  {
    name: 'IP to Decimal', category: 'network', desc: 'Convert IPv4 address to decimal',
    args: [],
    fn: async (input) => {
      const ip = input.trim();
      if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) throw new Error('Invalid IPv4 address');
      const parts = ip.split('.').map(Number);
      if (parts.some(p => p > 255)) throw new Error('Octet out of range (0-255)');
      return String(parts.reduce((acc,p) => (acc * 256) + p, 0));
    }
  },
  {
    name: 'Decimal to IP', category: 'network', desc: 'Convert decimal to IPv4 address',
    args: [],
    fn: async (input) => {
      const n = parseInt(input.trim(), 10);
      if (isNaN(n) || n < 0 || n > 4294967295) throw new Error('Value out of IPv4 range (0-4294967295)');
      return [(n>>>24)&255, (n>>>16)&255, (n>>>8)&255, n&255].join('.');
    }
  },
  {
    name: 'Parse IPv6', category: 'network', desc: 'Expand and parse an IPv6 address',
    args: [],
    fn: async (input) => {
      const addr = input.trim();
      let expanded = addr;
      if (addr.includes('::')) {
        const [left, right] = addr.split('::');
        const lParts = left ? left.split(':') : [];
        const rParts = right ? right.split(':') : [];
        const fill = Array(8 - lParts.length - rParts.length).fill('0');
        expanded = [...lParts, ...fill, ...rParts].join(':');
      }
      const groups = expanded.split(':').map(g => g.padStart(4,'0'));
      if (groups.length !== 8) throw new Error('Invalid IPv6 address');
      return [
        `Full:       ${groups.join(':')}`,
        `Compressed: ${addr}`,
        ...groups.map((g,i) => `Group[${i}]:  ${g} = ${parseInt(g,16)}`)
      ].join('\n');
    }
  },
  {
    name: 'MAC Address Format', category: 'network', desc: 'Reformat a MAC address',
    args: [{name:'format',label:'Format',type:'select',options:['colon','dash','dot','plain'],default:'colon'}],
    fn: async (input, args) => {
      const hex = input.trim().replace(/[:\-\.\s]/g,'').toLowerCase();
      if (!/^[0-9a-f]{12}$/.test(hex)) throw new Error('Invalid MAC address (need 12 hex chars)');
      const pairs = hex.match(/.{2}/g);
      if (args.format === 'colon') return pairs.join(':');
      if (args.format === 'dash') return pairs.join('-');
      if (args.format === 'dot') return hex.match(/.{4}/g).join('.');
      return hex;
    }
  },
  {
    name: 'URL Parser', category: 'network', desc: 'Break a URL into its components',
    args: [],
    fn: async (input) => {
      try {
        const u = new URL(input.trim());
        const params = [...u.searchParams.entries()].map(([k,v]) => `  ${k}=${v}`).join('\n');
        return [
          `Protocol:   ${u.protocol}`,
          `Host:       ${u.host}`,
          `Hostname:   ${u.hostname}`,
          `Port:       ${u.port || '(default)'}`,
          `Path:       ${u.pathname}`,
          `Query:      ${u.search || '(none)'}`,
          params ? `Params:\n${params}` : '',
          `Fragment:   ${u.hash || '(none)'}`,
          `Username:   ${u.username || '(none)'}`,
          `Password:   ${u.password || '(none)'}`,
        ].filter(Boolean).join('\n');
      } catch { throw new Error('Invalid URL - must include protocol (e.g. https://)'); }
    }
  },
  {
    name: 'Format IPv4 CIDR', category: 'network', desc: 'Parse CIDR notation details',
    args: [],
    fn: async (input) => {
      const m = input.trim().match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/);
      if (!m) throw new Error('Expected format: x.x.x.x/prefix (e.g. 192.168.1.0/24)');
      const parts = m[1].split('.').map(Number);
      const prefix = parseInt(m[2]);
      if (parts.some(p => p > 255) || prefix > 32) throw new Error('Invalid CIDR values');
      const ip = parts.reduce((a,p) => (a*256)+p, 0);
      const mask = prefix ? (~((1 << (32-prefix))-1)) >>> 0 : 0;
      const net = (ip & mask) >>> 0;
      const bcast = (net | (~mask >>> 0)) >>> 0;
      const toIP = n => [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
      const hosts = prefix < 31 ? Math.max(0, bcast - net - 1) : (prefix === 31 ? 2 : 1);
      return [
        `Network:    ${toIP(net)}/${prefix}`,
        `Mask:       ${toIP(mask)}`,
        `Broadcast:  ${toIP(bcast)}`,
        `First Host: ${toIP(net+1)}`,
        `Last Host:  ${toIP(bcast-1)}`,
        `Host Count: ${hosts}`
      ].join('\n');
    }
  },

  // ---- BINARY ----
  {
    name: 'AND', category: 'binary', desc: 'Bitwise AND each byte with operand',
    args: [{name:'operand',label:'Operand (hex)',type:'text',default:'ff'}],
    fn: async (input, args) => {
      const op = parseInt(args.operand || 'ff', 16) & 0xff;
      return Array.from(input).map(c => String.fromCharCode(c.charCodeAt(0) & op)).join('');
    }
  },
  {
    name: 'OR', category: 'binary', desc: 'Bitwise OR each byte with operand',
    args: [{name:'operand',label:'Operand (hex)',type:'text',default:'00'}],
    fn: async (input, args) => {
      const op = parseInt(args.operand || '00', 16) & 0xff;
      return Array.from(input).map(c => String.fromCharCode(c.charCodeAt(0) | op)).join('');
    }
  },
  {
    name: 'XOR Bytes', category: 'binary', desc: 'XOR each byte with operand value',
    args: [{name:'operand',label:'Operand (hex)',type:'text',default:'aa'}],
    fn: async (input, args) => {
      const op = parseInt(args.operand || 'aa', 16) & 0xff;
      return Array.from(input).map(c => String.fromCharCode(c.charCodeAt(0) ^ op)).join('');
    }
  },
  {
    name: 'NOT', category: 'binary', desc: 'Bitwise NOT (invert) each byte',
    args: [],
    fn: async (input) =>
      Array.from(input).map(c => String.fromCharCode((~c.charCodeAt(0)) & 0xff)).join('')
  },
  {
    name: 'Left Shift', category: 'binary', desc: 'Left-shift each byte by N bits',
    args: [{name:'amount',label:'Shift amount',type:'number',default:1,min:1,max:7}],
    fn: async (input, args) => {
      const n = parseInt(args.amount) || 1;
      return Array.from(input).map(c => String.fromCharCode((c.charCodeAt(0) << n) & 0xff)).join('');
    }
  },
  {
    name: 'Right Shift', category: 'binary', desc: 'Right-shift each byte by N bits',
    args: [{name:'amount',label:'Shift amount',type:'number',default:1,min:1,max:7}],
    fn: async (input, args) => {
      const n = parseInt(args.amount) || 1;
      return Array.from(input).map(c => String.fromCharCode((c.charCodeAt(0) >>> n) & 0xff)).join('');
    }
  },
  {
    name: 'Swap Endianness', category: 'binary', desc: 'Reverse byte order in 4-byte words',
    args: [],
    fn: async (input) => {
      const hex = Array.from(input).map(c => c.charCodeAt(0).toString(16).padStart(2,'0')).join('');
      const words = hex.match(/.{1,8}/g) || [];
      const swapped = words.map(w => (w.match(/.{2}/g) || [w]).reverse().join('')).join('');
      return swapped.match(/.{2}/g).map(h => String.fromCharCode(parseInt(h,16))).join('');
    }
  }
];

// ============================================================
// APPLICATION STATE
// ============================================================
let recipe = [];
let currentTheme = 'dark';
let autoBake = true;
let bakeTimer = null;
let activeCategory = 'all';

// ============================================================
// INIT
// ============================================================
function initApp() {
  document.getElementById('ops-count').textContent = OPERATIONS.length;
  document.getElementById('ops-count-bar').textContent = OPERATIONS.length;
  renderCategories();
  renderOperations(OPERATIONS);
  setupEventHandlers();
  updateConnectionStatus();
}

// ============================================================
// THEME
// ============================================================
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', currentTheme);
  document.getElementById('theme-text').textContent =
    currentTheme === 'dark' ? '\u25d0 LIGHT MODE' : '\u25d1 DARK MODE';
}

// ============================================================
// CATEGORIES + OPERATIONS LIST
// ============================================================
const CATEGORIES = {
  all:'ALL', encoding:'ENCODE', hashing:'HASH', crypto:'CRYPTO',
  transform:'TRANSFORM', format:'FORMAT', analysis:'ANALYSIS',
  network:'NETWORK', binary:'BINARY'
};

function renderCategories() {
  const container = document.getElementById('categories');
  container.innerHTML = '';
  Object.entries(CATEGORIES).forEach(([key, label]) => {
    const count = key === 'all' ? OPERATIONS.length : OPERATIONS.filter(o => o.category === key).length;
    if (!count) return;
    const chip = document.createElement('div');
    chip.className = 'category-chip' + (key === activeCategory ? ' active' : '');
    chip.textContent = label + ' (' + count + ')';
    chip.onclick = () => { activeCategory = key; renderCategories(); filterAndRender(); };
    container.appendChild(chip);
  });
}

function filterAndRender() {
  const query = document.getElementById('search-ops').value.toLowerCase();
  let ops = activeCategory === 'all' ? OPERATIONS : OPERATIONS.filter(o => o.category === activeCategory);
  if (query) ops = ops.filter(o => o.name.toLowerCase().includes(query) || o.desc.toLowerCase().includes(query));
  renderOperations(ops);
}

function renderOperations(ops) {
  const container = document.getElementById('operations-list');
  container.innerHTML = '';
  ops.forEach(op => {
    const item = document.createElement('div');
    item.className = 'operation-item';
    item.innerHTML =
      '<div class="operation-name">' + op.name + '</div>' +
      '<div class="operation-desc">' + op.desc + '</div>' +
      '<span class="add-indicator">[+]</span>';
    item.onclick = () => addToRecipe(op.name);
    container.appendChild(item);
  });
}

// ============================================================
// RECIPE MANAGEMENT
// ============================================================
function addToRecipe(opName) {
  const op = OPERATIONS.find(o => o.name === opName);
  if (!op) return;
  const defaultArgs = {};
  (op.args || []).forEach(a => { defaultArgs[a.name] = a.default; });
  recipe.push({ name: opName, args: defaultArgs, enabled: true, error: null });
  renderRecipe();
  scheduleBake();
  showStatus('Added: ' + opName, 'success');
}

function removeFromRecipe(index) {
  recipe.splice(index, 1);
  renderRecipe();
  scheduleBake();
}

function moveStep(index, direction) {
  const newIdx = index + direction;
  if (newIdx < 0 || newIdx >= recipe.length) return;
  const tmp = recipe[index];
  recipe[index] = recipe[newIdx];
  recipe[newIdx] = tmp;
  renderRecipe();
  scheduleBake();
}

function toggleStep(index) {
  recipe[index].enabled = !recipe[index].enabled;
  renderRecipe();
  scheduleBake();
}

function clearRecipe() {
  recipe = [];
  renderRecipe();
  document.getElementById('output-data').value = '';
  updateOutputMeta('');
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderRecipe() {
  const lane = document.getElementById('recipe-lane');
  const empty = document.getElementById('recipe-empty');
  document.getElementById('recipe-count').textContent = recipe.length;

  lane.querySelectorAll('.recipe-step').forEach(el => el.remove());

  if (recipe.length === 0) {
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  recipe.forEach((step, i) => {
    const op = OPERATIONS.find(o => o.name === step.name);
    const card = document.createElement('div');
    const stateClass = step.error ? ' step-error' : (step.enabled ? ' step-enabled' : ' step-disabled');
    card.className = 'recipe-step' + stateClass;

    let argsHtml = '';
    if (op && op.args && op.args.length > 0) {
      argsHtml = '<div class="step-args">' + op.args.map(arg => {
        const val = (step.args[arg.name] !== undefined) ? step.args[arg.name] : arg.default;
        const dataAttrs = ' data-step="' + i + '" data-arg="' + escapeHtml(arg.name) + '"';
        if (arg.type === 'select') {
          const opts = arg.options.map(o =>
            '<option value="' + escapeHtml(o) + '"' + (o == val ? ' selected' : '') + '>' + escapeHtml(o) + '</option>'
          ).join('');
          return '<label class="arg-label">' + escapeHtml(arg.label) +
            ': <select class="arg-control"' + dataAttrs + '>' + opts + '</select></label>';
        } else if (arg.type === 'checkbox') {
          const checked = (val === true || val === 'true') ? ' checked' : '';
          return '<label class="arg-label"><input type="checkbox" class="arg-checkbox"' + checked +
            dataAttrs + '> ' + escapeHtml(arg.label) + '</label>';
        } else {
          const numAttrs = arg.type === 'number'
            ? ' type="number"' + (arg.min !== undefined ? ' min="' + arg.min + '"' : '') + (arg.max !== undefined ? ' max="' + arg.max + '"' : '')
            : ' type="text"';
          return '<label class="arg-label">' + escapeHtml(arg.label) +
            ': <input' + numAttrs + ' class="arg-control" value="' + escapeHtml(String(val)) +
            '"' + dataAttrs + '></label>';
        }
      }).join('') + '</div>';
    }

    const errorHtml = step.error
      ? '<div class="step-error-msg">\u2717 ' + escapeHtml(step.error) + '</div>' : '';

    card.innerHTML =
      '<div class="step-header">' +
        '<span class="step-badge">' + (i+1) + '</span>' +
        '<span class="step-name">' + escapeHtml(step.name) + '</span>' +
        '<div class="step-controls">' +
          '<label class="step-toggle" title="' + (step.enabled ? 'Disable' : 'Enable') + '">' +
            '<input type="checkbox"' + (step.enabled ? ' checked' : '') + ' onchange="toggleStep(' + i + ')">' +
            '<span class="toggle-slider"></span>' +
          '</label>' +
          '<button class="step-btn" onclick="moveStep(' + i + ',-1)" title="Move up"' + (i===0?' disabled':'') + '>\u25b2</button>' +
          '<button class="step-btn" onclick="moveStep(' + i + ',1)" title="Move down"' + (i===recipe.length-1?' disabled':'') + '>\u25bc</button>' +
          '<button class="step-btn danger" onclick="removeFromRecipe(' + i + ')" title="Remove">\u2716</button>' +
        '</div>' +
      '</div>' +
      argsHtml + errorHtml;

    lane.appendChild(card);
  });
}

function updateArg(stepIndex, argName, value) {
  if (recipe[stepIndex]) {
    recipe[stepIndex].args[argName] = value;
    scheduleBake();
  }
}

// ============================================================
// SAVE / LOAD RECIPE
// ============================================================
function saveRecipe() {
  const data = JSON.stringify(recipe.map(s => ({name:s.name, args:s.args, enabled:s.enabled})), null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'recipe_' + Date.now() + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showStatus('Recipe saved', 'success');
}

function loadRecipeFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('Expected JSON array');
      recipe = data.map(s => ({
        name: s.name,
        args: s.args || {},
        enabled: s.enabled !== false,
        error: null
      }));
      renderRecipe();
      scheduleBake();
      showStatus('Recipe loaded: ' + recipe.length + ' steps', 'success');
    } catch (err) {
      showStatus('Failed to load recipe: ' + err.message, 'error');
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}

// ============================================================
// BAKE ENGINE
// ============================================================
async function bake(input, recipeSteps) {
  let current = input;
  for (let i = 0; i < recipeSteps.length; i++) {
    const step = recipeSteps[i];
    if (!step.enabled) continue;
    const op = OPERATIONS.find(o => o.name === step.name);
    if (!op) continue;
    try {
      current = await op.fn(current, step.args || {});
      step.error = null;
    } catch (e) {
      step.error = e.message;
      renderRecipe();
      throw e;
    }
  }
  return current;
}

async function bakeNow() {
  const input = document.getElementById('input-data').value;
  const outputEl = document.getElementById('output-data');
  const outputStatus = document.getElementById('output-status');

  recipe.forEach(s => { s.error = null; });
  renderRecipe();

  if (recipe.filter(s => s.enabled).length === 0) {
    outputEl.value = input;
    outputStatus.textContent = '[PASSTHROUGH]';
    updateOutputMeta(input);
    return;
  }

  try {
    const result = await bake(input, recipe);
    outputEl.value = result;
    outputStatus.textContent = '[SUCCESS]';
    updateOutputMeta(result);
    showStatus('Baked successfully', 'success');
  } catch (e) {
    outputEl.value = '// ERROR: ' + e.message;
    outputStatus.textContent = '[ERROR]';
    updateOutputMeta('');
    showStatus('Bake error: ' + e.message, 'error');
  }
}

function scheduleBake() {
  if (!autoBake) return;
  clearTimeout(bakeTimer);
  bakeTimer = setTimeout(bakeNow, 300);
}

// ============================================================
// FORMAT DETECTION
// ============================================================
function detectFormat(str) {
  if (!str || str.trim().length === 0) return 'EMPTY';
  const t = str.trim();
  if (/^[01\s]+$/.test(t) && t.replace(/\s/g,'').length > 0 && t.replace(/\s/g,'').length % 8 === 0) return 'BINARY';
  if (/^[0-9a-fA-F][\s:0-9a-fA-F]+$/.test(t) && t.replace(/[\s:]/g,'').length % 2 === 0 && t.length > 4) return 'HEX';
  if (/^[A-Za-z0-9+/]+=*$/.test(t) && t.length % 4 === 0 && t.length >= 4) return 'BASE64';
  if (t.startsWith('{') || t.startsWith('[')) {
    try { JSON.parse(t); return 'JSON'; } catch { /* not JSON */ }
  }
  if (t.startsWith('<')) return 'XML/HTML';
  return 'TEXT';
}

function updateOutputMeta(str) {
  const bytes = new TextEncoder().encode(str).length;
  document.getElementById('output-byte-count').textContent = bytes + ' bytes';
  document.getElementById('output-char-count').textContent = str.length + ' chars';
  document.getElementById('output-info').textContent = bytes + ' bytes';
  document.getElementById('output-format-label').textContent = detectFormat(str);
}

function updateInputMeta(str) {
  document.getElementById('input-format-label').textContent = detectFormat(str);
}

// ============================================================
// UI ACTIONS
// ============================================================
function copyOutput() {
  const output = document.getElementById('output-data');
  if (!output.value.trim()) { showStatus('Nothing to copy', 'error'); return; }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(output.value)
      .then(() => showStatus('Copied to clipboard', 'success'))
      .catch(() => { output.select(); document.execCommand('copy'); showStatus('Copied', 'success'); });
  } else {
    output.select(); document.execCommand('copy'); showStatus('Copied', 'success');
  }
}

function downloadOutput() {
  const output = document.getElementById('output-data').value;
  if (!output.trim()) { showStatus('Nothing to download', 'error'); return; }
  const blob = new Blob([output], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'xroot_output_' + Date.now() + '.txt';
  a.click();
  URL.revokeObjectURL(url);
  showStatus('Output downloaded', 'success');
}

function useAsInput() {
  const output = document.getElementById('output-data').value;
  if (!output) { showStatus('No output to use as input', 'error'); return; }
  document.getElementById('input-data').value = output;
  updateInputMeta(output);
  scheduleBake();
  showStatus('Output piped to input', 'success');
}

function clearAll() {
  document.getElementById('input-data').value = '';
  document.getElementById('output-data').value = '';
  document.getElementById('output-status').textContent = '[EMPTY]';
  updateOutputMeta('');
  updateInputMeta('');
  showStatus('Cleared', 'success');
}

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.innerHTML = '<span>' + (type === 'success' ? '\u2713' : '\u2717') + '</span><span>' + message + '</span>';
  status.className = 'status-display show ' + type;
  clearTimeout(status._timer);
  status._timer = setTimeout(() => status.classList.remove('show'), 3000);
}

// ============================================================
// EVENT HANDLERS
// ============================================================
function setupEventHandlers() {
  document.getElementById('search-ops').addEventListener('input', filterAndRender);
  document.getElementById('auto-bake').addEventListener('change', e => {
    autoBake = e.target.checked;
    if (autoBake) scheduleBake();
  });
  document.getElementById('input-data').addEventListener('input', e => {
    updateInputMeta(e.target.value);
    scheduleBake();
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); bakeNow(); }
  });

  // Event delegation for recipe arg controls (select, input, checkbox)
  document.getElementById('recipe-lane').addEventListener('change', e => {
    const el = e.target;
    if (!el.dataset.step || !el.dataset.arg) return;
    const idx = parseInt(el.dataset.step);
    const argName = el.dataset.arg;
    const value = el.type === 'checkbox' ? el.checked : el.value;
    updateArg(idx, argName, value);
  });
  document.getElementById('recipe-lane').addEventListener('input', e => {
    const el = e.target;
    if (!el.dataset.step || !el.dataset.arg || el.type === 'checkbox') return;
    const idx = parseInt(el.dataset.step);
    const argName = el.dataset.arg;
    updateArg(idx, argName, el.value);
  });

  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  fileInput.addEventListener('change', e => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
  });
  ['dragenter','dragover','dragleave','drop'].forEach(ev => {
    dropZone.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); });
  });
  ['dragenter','dragover'].forEach(ev =>
    dropZone.addEventListener(ev, () => dropZone.classList.add('drag-over')));
  ['dragleave','drop'].forEach(ev =>
    dropZone.addEventListener(ev, () => dropZone.classList.remove('drag-over')));
  dropZone.addEventListener('drop', e => {
    if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('input-data').value = e.target.result;
    updateInputMeta(e.target.result);
    scheduleBake();
    showStatus('Loaded: ' + file.name + ' (' + file.size + ' bytes)', 'success');
  };
  reader.readAsText(file);
}

// ============================================================
// CONNECTION STATUS
// ============================================================
function updateConnectionStatus() {
  const el = document.getElementById('connection-status');
  const states = ['\u25cf ONLINE', '\u25d0 SYNC', '\u25d1 PROC', '\u25d2 READY'];
  let i = 0;
  setInterval(() => { el.textContent = states[i]; i = (i+1) % states.length; }, 2000);
}

// ============================================================
// BOOT
// ============================================================
initApp();
