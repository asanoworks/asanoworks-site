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