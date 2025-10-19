// Permulaan
audio = new Audio("" + linkmp3.src);
document.querySelector("#hal1").style = "transform:scale(0)";
document.querySelector(".circ").style = "display:none";
setTimeout(() => {
  document.querySelector("#hal1").style = "transform:scale(1)";
  document.querySelector(".circ").style = "";
  stiker1.style = "transform:scale(1)";
}, 1000);

// Elemen Background
const backgroundOverlay = document.querySelector(".background-overlay");
const bgImageUrl = backgroundOverlay.getAttribute("data-src");
backgroundOverlay.style.background = `url('${bgImageUrl}') no-repeat center center fixed`;
backgroundOverlay.style.backgroundSize = "cover";

// Animasi Kelopak Bunga
let animationFrameId; // Variabel global untuk menyimpan ID requestAnimationFrame
function mulaiKelopak(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return; // Cek apakah canvas ada
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const kelopak = Array.from({ length: 20 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 5 + 2,
    speed: Math.random() * 2 + 1,
  }));

  function gambarKelopak() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    kelopak.forEach((petal) => {
      ctx.beginPath();
      ctx.arc(petal.x, petal.y, petal.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#f87171";
      ctx.fill();
      petal.y += petal.speed;
      if (petal.y > canvas.height) petal.y = -petal.radius;
      petal.x += Math.sin(petal.y / 50) * 2;
    });
    animationFrameId = requestAnimationFrame(gambarKelopak); // Simpan ID animasi
  }
  gambarKelopak();
}

// Animasi Hati Jatuh
let intervalHati;
function hatiJatuh() {
  const hati = document.createElement("div");
  hati.className = "hati";
  hati.innerHTML = `<svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g transform='translate(2.550170, 3.550158)'><path d='M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z'></path><path d='M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842'></path></g></svg>`;
  hati.style.left = Math.random() * 100 + "vw";
  hati.addEventListener("animationend", () => hati.remove());
  document.body.appendChild(hati);
}

// Buka Envelope
function bukaEnvelope() {
  audio.play();
  const envelope = document.getElementById("envelope");
  envelope.classList.remove("close");
  envelope.classList.add("open");
  document.querySelector(".reset").style =
    "transform:scale(0);opacity:0;transition:all .7s ease";
  setTimeout(() => {
    document.querySelector("#envelope").style =
      "transform:scale(0);opacity:0;transition:all .7s ease";
    setTimeout(() => {
      pindahHal(3);
      envelope.classList.remove("open");
      envelope.classList.add("close");
    }, 600);
  }, 1200);
}

// Animasi Kembang Api
function mulaiKembangApi(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  const fireworks = [];
  const colors = ["#ff6f91", "#ffd1dc", "#ffffff", "#f87171"]; // Warna tema romantis

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particles = [];

    for (let i = 0; i < 22; i++) {
      // Tetap 30 partikel untuk performa
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2; // Kecepatan maksimum naik ke 4 dari 3
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1,
        color: color,
        life: 100,
        alpha: 1,
      });
    }
    fireworks.push({ particles });
  }

  let lastFrameTime = 0;
  const frameInterval = 1000 / 60; // Tetap target 30 FPS

  function drawFireworks(timestamp) {
    if (timestamp - lastFrameTime < frameInterval) {
      requestAnimationFrame(drawFireworks);
      return;
    }
    lastFrameTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
      firework.particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(
          particle.color.slice(1, 3),
          16
        )}, ${parseInt(particle.color.slice(3, 5), 16)}, ${parseInt(
          particle.color.slice(5, 7),
          16
        )}, ${particle.alpha})`;
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05; // Gravitasi naik dari 0.03 ke 0.04
        particle.alpha -= 0.01; // Pemudaran naik dari 0.008 ke 0.009
        particle.life--;

        if (particle.life <= 0) {
          particle.alpha = 0;
        }
      });

      firework.particles = firework.particles.filter((p) => p.life > 0);
      if (firework.particles.length === 0) {
        fireworks.splice(index, 1);
      }
    });

    if (Math.random() < 0.065) createFirework(); // Frekuensi naik dari 0.05 ke 0.07
    requestAnimationFrame(drawFireworks);
  }

  //createFirework();
  requestAnimationFrame(drawFireworks);
}

// Halaman 3: Pesan Akhir
function mulaiHal3() {
  const stiker3 = document.getElementById("stiker3");
  const stiker3a = document.getElementById("stiker3a");
  const stiker3b = document.getElementById("stiker3b");
  stiker3.style = "transform:scale(1)";
  const usiaKamu = 30;

  const txtAwalan =
    "<b>Hey Arinda</b>, yes you! 🫵<br><br>Try looking at the top left corner<br>of the screen 🫣";
  const speedText = 27;

  const txtSembunyiSatu = teksSembunyi1.innerHTML;
  teksSembunyi1.innerHTML = "";
  const txtSembunyiDua = teksSembunyi2.innerHTML;
  teksSembunyi2.innerHTML = "";

  const canvas = document.getElementById("fireworks-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  mulaiKelopak("game-canvas");

  new TypeIt("#teksAwalan", {
    strings: txtAwalan,
    speed: speedText,
    startDelay: 200,
    afterComplete: function () {
      document.querySelector("#teksAwalan .ti-cursor").style.display = "none";
      setTimeout(() => {
        teksSembunyi1.style = "opacity:1";
        new TypeIt("#teksSembunyi1", {
          strings: txtSembunyiSatu,
          speed: speedText,
          startDelay: 100,
          afterComplete: function () {
            document.querySelector("#teksSembunyi1 .ti-cursor").style.display =
              "none";
            setTimeout(() => {
              teksSembunyi2.style = "opacity:1";
              new TypeIt("#teksSembunyi2", {
                strings: txtSembunyiDua,
                speed: speedText,
                startDelay: 100,
                afterComplete: function () {
                  document.querySelector(
                    "#teksSembunyi2 .ti-cursor"
                  ).style.display = "none";
                  setTimeout(() => {
                    tombolLanjut.style =
                      "position:relative;transform:scale(1);opacity:1";
                  }, 500);
                },
              }).go();
            }, 700);
          },
        }).go();
      }, 700);
    },
  }).go();
}

function nextHal3() {
  document.getElementById(`hal3`).style = "transform:scale(0)";
  teksSembunyi1.style = "opacity:0";
  teksSembunyi2.style = "opacity:0";
  stiker3.style = "transform:scale(0)";

  setTimeout(() => {
    tombolLanjut.style = "display:none";
    teksAwalan.innerHTML = "";
    teksAwalan.style = "display:none";
    document.getElementById(`hal3`).style =
      "transform:scale(1);margin-top:130px";

    stiker3a.src = stiker3b.src;
    setTimeout(() => {
      stiker3.style = "transform:scale(1)";
      lanjutAkhir();
    }, 200);
  }, 500);
}

function lanjutAkhir() {
  const txtDoa = `Why do I prefer<br><span style='color:pink'>I love you</span> more? 🌹🩷`;
  const txtPesanAkhir =
    "Because... I love you more than I said,<br>I love you more than you know,<br>I love you more when your<br>day didn't go so well,<br>I love you more when you cried,<br>I love you more at your lowest,<br>and I love you in every situation ᡣ𐭩<br>😍💐🌹💖❤️";
  const speedText = 24;

  new TypeIt("#teksCinta", {
    strings: txtDoa,
    speed: speedText,
    startDelay: 100,
    afterComplete: function () {
      document.querySelector("#teksCinta .ti-cursor").style.display = "none";
      new TypeIt("#pesanAkhir", {
        strings: txtPesanAkhir,
        speed: speedText,
        startDelay: 700,
        waitUntilVisible: true,
        afterComplete: function () {
          document.querySelector("#pesanAkhir .ti-cursor").style.display =
            "none";
          intervalHati = setInterval(hatiJatuh, 200);
          document.querySelector(".tombol").style =
            "transform:scale(1);opacity:1;";
          setTimeout(() => {
            stiker3.style = "transform:scale(0)";
            setTimeout(() => {
              stiker3a.src = stiker3c.src;
              stiker3.style = "transform:scale(1)";
              clearInterval(scrollInterval);
            }, 300);
            // Hentikan animasi kelopak
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null; // Reset ID
            }
            // Hapus canvas
            const canvas = document.getElementById("game-canvas");
            if (canvas) {
              canvas.remove();
            }
          }, 50);
          setTimeout(() => {
            mulaiKembangApi("fireworks-canvas");
          }, 50);
        },
      }).go();
    },
  }).go();

  const hal3 = document.getElementById("hal3");
  const to_folowers = document.querySelector(".to_folowers");

  setTimeout(() => {
    to_folowers.style =
      "transform: scale(1) !important; opacity:1 !important; position: relative !important;";
  }, 13000);
}

// Navigasi Halaman
function pindahHal(hal) {
  for (let i = 1; i <= 3; i++) {
    if (hal < 3 && i !== 1)
      document.getElementById(`hal${i}`).classList.add("sembunyi");
  }
  if (hal < 3)
    document.getElementById(`hal${hal}`).classList.remove("sembunyi");

  setTimeout(() => {
    if (hal === 2) {
      document.getElementById(`hal${hal - 1}`).style = "transform:scale(0)";
      setTimeout(() => {
        document.getElementById(`hal${hal - 1}`).classList.add("sembunyi");
        document.getElementById(`hal${hal}`).classList.remove("sembunyi");
        setTimeout(() => {
          document.getElementById(`hal${hal}`).style =
            "transform:scale(1);transition:all .7s ease";
        }, 100);
      }, 700);
    } else if (hal === 3) {
      document.getElementById(`hal${hal - 1}`).style =
        "transform:scale(0);transition:all .7s ease";
      setTimeout(() => {
        document.getElementById(`hal${hal - 1}`).classList.add("sembunyi");
        document.getElementById(`hal${hal}`).classList.remove("sembunyi");
        setTimeout(() => {
          document.getElementById(`hal${hal}`).style =
            "transform:scale(1);transition:all .7s ease";
        }, 100);
        setTimeout(() => {
          mulaiHal3();
        }, 150);
      }, 50);
    }
  }, 50);
}

const container = document.querySelector(".textOverlay");
function autoScroll() {
  container.scrollTop += 10;
}
const scrollInterval = setInterval(autoScroll, 50);

// Share ke WhatsApp
function balasWa() {
  const url = window.location.href;
  const text = "";
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

// Preloader
const preloader = document.querySelector(".preloader");
const main_content = document.querySelector(".main_content");
window.addEventListener("load", () => {
  preloader.classList.add("disapear");
  main_content.classList.add("appear");
  main_content.classList.remove("disapear");
  console.log("Done.....");
});

const date_pass = document.getElementById("date_pass");
const startButton = document.getElementById("start_btn");
const hal1_1 = document.querySelector("#hal1.kotak1");
const hal1_2 = document.querySelector("#hal1.kotak2");

const start_fn = () => {
  if (date_pass.value.toLowerCase() === "27thjuly2025") {
    // alert("Correct pass! Welcome!");
    hal1_1.style =
      "transform:scale(0) !important;opacity:0;transition:all .7s ease; display:none !important";
    hal1_2.style =
      "transform:scale(1) !important;opacity:1;transition:all .7s ease; display:block !important";

    date_pass.value = "";
  } else {
    date_pass.classList.add("wrong_pass");
    setTimeout(() => {
      date_pass.classList.remove("wrong_pass");
    }, 500);
    setTimeout(() => {
      //   date_pass.classList.remove("wrong_pass");
      date_pass.value = "";
    }, 700);
    // clear the input
    // alert("Incorrect pass. Please try again.");
  }
};

const remove_h2 = () => {
  hal1_2.style =
    "transform:scale(0) !important;opacity:0;transition:all .7s ease; display:none !important";
};

startButton.addEventListener("click", start_fn);

window.onload = function () {
  // Check if a flag exists in sessionStorage
  if (!sessionStorage.getItem("isReloaded")) {
    // This is the first load in the session
    sessionStorage.setItem("isReloaded", "true");
    console.log("This is a fresh page load.");
  } else {
    // This is a page refresh
    console.log("This page has been reloaded.");
  }
};
