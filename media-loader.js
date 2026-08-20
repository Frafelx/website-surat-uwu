/**
 * Coba tampilkan video. Kalau video nggak ada / gagal load,
 * otomatis fallback ke gambar sticker. Kalau gambar juga nggak ada,
 * fallback ke emoji.
 *
 * Cara pakai (taruh di HTML surat, setelah <div id="media"></div>):
 * <script src="../media-loader.js"></script>
 * <script>
 *   loadMedia('media', '../videos/video-seneng.mp4', '../images/sticker-seneng.png', '😊');
 * </script>
 */
function loadMedia(containerId, videoSrc, imgSrc, fallbackEmoji) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function showImage() {
    container.innerHTML = "";
    const img = new Image();
    img.className = "letter-sticker";
    img.alt = "";
    img.onerror = () => {
      container.innerHTML = `<div class="letter-sticker-fallback">${fallbackEmoji}</div>`;
    };
    img.src = imgSrc;
    container.appendChild(img);
  }

  if (!videoSrc) {
    showImage();
    return;
  }

  const video = document.createElement("video");
  video.className = "letter-media";
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = true;
  video.addEventListener("error", showImage);
  video.src = videoSrc;

  container.innerHTML = "";
  container.appendChild(video);
}

/**
 * Sembunyikan elemen kalau gagal load (foto/video belum ada / rusak).
 * Dipakai lewat: onerror="hideOnError(this)"
 * Aman dari masalah escaping quote karena nggak perlu bikin string HTML.
 */
function hideOnError(el) {
  el.style.display = "none";
}