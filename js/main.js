const heroLogo = document.getElementById("hero-logo-img");
const redEyeLeft = document.getElementById("red-eye-left");
const redEyeRight = document.getElementById("red-eye-right");
const owNight = document.getElementById("ow-night");
const now = new Date();
const hour = now.getHours();
const minute = now.getMinutes();

if (hour === 4 && minute >= 20 && minute < 30) {
  // 4:20〜4:29だけ赤目
  heroLogo.src = "images/logo_horizontal_green_asagara.png";
  redEyeLeft.style.display = "block";
  redEyeRight.style.display = "block";
  owNight.style.display = "block";
} else if (hour >= 0 && hour < 5) {
  // 深夜0:00〜4:59はOw登場
  heroLogo.src = "images/logo_horizontal_green_asagara.png";
  redEyeLeft.style.display = "none";
  redEyeRight.style.display = "none";
  owNight.style.display = "block";
} else {
  // 通常
  heroLogo.src = "images/logo_horizontal_green_asagara.png";
  redEyeLeft.style.display = "none";
  redEyeRight.style.display = "none";
  owNight.style.display = "none";
}
// =========================
// Autumn Leaf
// =========================

function createAutumnLeaf() {
  const leaf = document.createElement("span");
  leaf.classList.add("autumn-leaf");

  const leaves = ["🍁", "🍂"];
  leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];

  // 横位置をランダムに
  leaf.style.left = `${10 + Math.random() * 80}%`;

  document.body.appendChild(leaf);

  // 落下終了後に削除
  setTimeout(() => {
    leaf.remove();
  }, 12000);
}

// 最初の1枚
setTimeout(createAutumnLeaf, 2000);

// その後、約15秒ごとに1枚
setInterval(createAutumnLeaf, 25000);