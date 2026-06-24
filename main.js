// ===== Anno corrente nel footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Live clock, Rome timezone =====
const heroClock = document.getElementById('hero-clock');
if (heroClock){
  function updateClock(){
    const now = new Date();
    const time = now.toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Rome',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    heroClock.textContent = `Italy — ${time}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
}

// ===== Audio di sottofondo: mute / unmute =====
const bgAudio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');

function muteSiteAudio(){
  if (!bgAudio || !audioToggle) return;
  bgAudio.pause();
  audioToggle.setAttribute('aria-pressed', 'false');
  audioToggle.setAttribute('aria-label', 'Turn audio on');
}

// silenzia tutti i video della galleria extra di un progetto (es. le scansioni Lidar), se presenti
function muteGalleryAudio(){
  if (!videoGalleryEl) return;
  videoGalleryEl.querySelectorAll('video').forEach(v => { v.muted = true; });
  videoGalleryEl.querySelectorAll('.gallery-audio-toggle').forEach(b => {
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', 'Turn video audio on');
  });
}

// silenzia l'eventuale video extra singolo (es. il backstage video), se presente
function muteExtraVideoAudio(){
  if (!extraVideoEl) return;
  const v = extraVideoEl.querySelector('video');
  const btn = extraVideoEl.querySelector('.extra-video-audio-toggle');
  if (v) v.muted = true;
  if (btn){
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Turn video audio on');
  }
}

if (bgAudio && audioToggle){
  audioToggle.addEventListener('click', () => {
    const isPlaying = audioToggle.getAttribute('aria-pressed') === 'true';

    if (isPlaying){
      muteSiteAudio();
    } else {
      // spegne l'audio di un eventuale video di progetto e della galleria extra, per evitare sovrapposizioni
      muteVideoAudio();
      muteGalleryAudio();
      muteExtraVideoAudio();
      // play() richiede un'interazione utente: siamo dentro un click, quindi è permesso dai browser
      bgAudio.play().catch(() => {
        // se il browser blocca comunque la riproduzione, lo stato resta muto
      });
      audioToggle.setAttribute('aria-pressed', 'true');
      audioToggle.setAttribute('aria-label', 'Turn audio off');
    }
  });

  // se l'audio finisce di colpo per un errore, rimetti l'icona su "muto"
  bgAudio.addEventListener('pause', () => {
    if (!bgAudio.ended) return;
    audioToggle.setAttribute('aria-pressed', 'false');
    audioToggle.setAttribute('aria-label', 'Turn audio on');
  });
}

// ===== Generate the project list from PROJECTS (projects.js) =====
const listEl = document.getElementById('project-list');
const countEl = document.getElementById('project-count');
const detailEl = document.getElementById('project-detail');
const backBtn = document.getElementById('project-back');
const detailImg = document.getElementById('project-detail-img');
const detailVideo = document.getElementById('project-detail-video');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselIndicator = document.getElementById('carousel-indicator');
const videoAudioToggle = document.getElementById('video-audio-toggle');
const detailYear = document.getElementById('project-detail-year');
const detailTitle = document.getElementById('project-detail-title');
const detailRole = document.getElementById('project-detail-role');
const detailCredits = document.getElementById('project-detail-credits');
const videoGalleryEl = document.getElementById('project-video-gallery');
const extraVideoEl = document.getElementById('project-extra-video');
const imageGalleryEl = document.getElementById('project-image-gallery');

function pad(n){ return String(n).padStart(2, '0'); }

PROJECTS.forEach((p, i) => {
  const li = document.createElement('li');
  li.className = 'project-row';

  li.innerHTML = `
    <a href="#" data-index="${i}">
      <span class="project-year">${p.year}</span>
      <span class="project-name">${p.title.replace(/O/g, '0')}</span>
      <span class="project-role">${p.role}</span>
      <span class="project-arrow" aria-hidden="true">↗</span>
      <img class="project-thumb-mobile" src="${p.image}" alt="" loading="lazy" style="aspect-ratio: ${p.ratio || '4/5'};">
    </a>
  `;
  listEl.appendChild(li);
});

countEl.textContent = `${pad(PROJECTS.length)} projects`;

// ===== Project detail view: opens inline instead of a new tab =====
function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// silenzia l'audio del video di progetto, se presente — usata anche quando si riattiva l'audio del sito
function muteVideoAudio(){
  if (!detailVideo) return;
  detailVideo.muted = true;
  if (videoAudioToggle){
    videoAudioToggle.setAttribute('aria-pressed', 'false');
    videoAudioToggle.setAttribute('aria-label', 'Turn video audio on');
  }
}

if (videoAudioToggle){
  videoAudioToggle.addEventListener('click', () => {
    const isOn = videoAudioToggle.getAttribute('aria-pressed') === 'true';

    if (isOn){
      muteVideoAudio();
    } else {
      // spegne l'audio di sottofondo del sito e quello della galleria extra, per evitare sovrapposizioni
      muteSiteAudio();
      muteGalleryAudio();
      muteExtraVideoAudio();
      detailVideo.muted = false;
      videoAudioToggle.setAttribute('aria-pressed', 'true');
      videoAudioToggle.setAttribute('aria-label', 'Turn video audio off');
    }
  });
}

function openProjectDetail(index){
  const p = PROJECTS[index];
  if (!p) return;

  detailImg.closest('.project-detail-media').style.aspectRatio = p.ratio || '4/5';
  const detailBodyEl = document.querySelector('.project-detail-body');
  if (detailBodyEl){
    detailBodyEl.classList.toggle('project-detail-body--stacked', p.layout === 'stacked');
  }

  if (p.video){
    detailVideo.src = p.video;
    detailVideo.style.display = 'block';
    detailImg.style.display = 'none';
    detailVideo.currentTime = 0;
    detailVideo.muted = true; // resetta sempre muto all'apertura, l'utente lo attiva se vuole
    detailVideo.play().catch(() => {});

    if (videoAudioToggle){
      videoAudioToggle.hidden = false;
      videoAudioToggle.setAttribute('aria-pressed', 'false');
      videoAudioToggle.setAttribute('aria-label', 'Turn video audio on');
    }
    // i controlli del carosello immagini non sono pertinenti su un video, vanno sempre nascosti qui
    carouselPrev.hidden = true;
    carouselNext.hidden = true;
    carouselIndicator.hidden = true;
  } else {
    detailVideo.pause();
    detailVideo.removeAttribute('src');
    detailVideo.style.display = 'none';
    detailImg.style.display = 'block';
    if (videoAudioToggle) videoAudioToggle.hidden = true;

    if (p.images && p.images.length > 1){
      // carosello: più immagini per lo stesso progetto, navigabili con i bottoni
      if (videoAudioToggle) videoAudioToggle.hidden = true;
      let currentImageIndex = 0;
      const showImage = (i) => {
        // niente wrap: l'indice resta nei limiti, così le frecce si nascondono ai due estremi
        currentImageIndex = Math.max(0, Math.min(i, p.images.length - 1));
        detailImg.src = p.images[currentImageIndex];
        detailImg.alt = p.title;
        carouselIndicator.textContent = `${currentImageIndex + 1} / ${p.images.length}`;
        carouselPrev.hidden = currentImageIndex === 0;
        carouselNext.hidden = currentImageIndex === p.images.length - 1;
      };
      showImage(0);
      carouselIndicator.hidden = false;
      carouselPrev.onclick = () => showImage(currentImageIndex - 1);
      carouselNext.onclick = () => showImage(currentImageIndex + 1);
    } else {
      detailImg.src = p.images ? p.images[0] : p.image;
      detailImg.alt = p.title;
      carouselPrev.hidden = true;
      carouselNext.hidden = true;
      carouselIndicator.hidden = true;
    }
  }

  detailYear.textContent = p.year;
  detailTitle.textContent = p.title;
  detailRole.textContent = p.role;

  let html = '';
  if (p.description){
    html += `<p class="project-detail-note">${escapeHtml(p.description)}</p>`;
  }
  if (p.note){
    html += `<p class="project-detail-note">${escapeHtml(p.note)}</p>`;
  }
  if (p.credits && p.credits.length){
    html += '<dl>';
    p.credits.forEach(c => {
      const extraStyle = c.spacer ? ' style="margin-bottom: 16px;"' : '';
      html += `<div class="credit-row"${extraStyle}><dt>${escapeHtml(c.role)}</dt><dd>${escapeHtml(c.name)}</dd></div>`;
    });
    html += '</dl>';
  }
  if (p.moreCredits && p.moreCredits.length){
    html += '<dl style="margin-top: 24px;">';
    p.moreCredits.forEach(c => {
      html += `<div class="credit-row"><dt>${escapeHtml(c.role)}</dt><dd>${escapeHtml(c.name)}</dd></div>`;
    });
    html += '</dl>';
  }
  if (p.extras){
    html += `
      <div class="project-detail-extras">
        <span class="project-detail-extras-label">Full cast / Extras</span>
        <p class="project-detail-extras-names">${escapeHtml(p.extras)}</p>
      </div>
    `;
  }
  if (p.watch){
    let label = p.watchLabel;
    if (!label){
      if (p.watch.includes('youtube') || p.watch.includes('youtu.be')) label = 'Watch on YouTube';
      else if (p.watch.includes('instagram')) label = 'Watch on Instagram';
      else if (p.watch.includes('vimeo')) label = 'Watch on Vimeo';
      else label = 'Watch the video';
    }
    html += `<a class="project-watch-link" href="${p.watch}" target="_blank" rel="noopener">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
  }
  detailCredits.innerHTML = html;

  if (p.videoGallery && videoGalleryEl){
    const g = p.videoGallery;
    let galleryHtml = `<h4 class="project-video-gallery-title">${escapeHtml(g.title)}</h4>`;
    if (g.intro){
      galleryHtml += `<p class="project-video-gallery-intro">${escapeHtml(g.intro)}</p>`;
    }
    g.items.forEach((item, i) => {
      galleryHtml += `
        <div class="video-gallery-item">
          <div class="video-gallery-video-wrap">
            <video src="${item.video}" muted loop playsinline autoplay data-gallery-index="${i}"></video>
            <button type="button" class="video-audio-toggle gallery-audio-toggle" data-gallery-index="${i}" aria-pressed="false" aria-label="Turn video audio on">
              <svg class="icon-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>
                <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
              <svg class="icon-unmuted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>
                <path d="M16.5 8.5a5 5 0 010 7M19 6a8 8 0 010 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>
              </svg>
            </button>
          </div>
          <p class="video-gallery-caption">${escapeHtml(item.caption)}</p>
        </div>
      `;
    });
    videoGalleryEl.innerHTML = galleryHtml;
    videoGalleryEl.hidden = false;

    // collega ciascun bottone al proprio video, con la stessa logica di esclusione reciproca
    // usata per audio del sito e video principale: solo una fonte sonora attiva alla volta
    videoGalleryEl.querySelectorAll('.gallery-audio-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.galleryIndex;
        const video = videoGalleryEl.querySelector(`video[data-gallery-index="${idx}"]`);
        const isOn = btn.getAttribute('aria-pressed') === 'true';

        // spegne sempre prima tutte le altre fonti audio (sito, video principale, altri video della galleria)
        muteSiteAudio();
        muteVideoAudio();
        muteExtraVideoAudio();
        videoGalleryEl.querySelectorAll('video').forEach(v => { v.muted = true; });
        videoGalleryEl.querySelectorAll('.gallery-audio-toggle').forEach(b => {
          b.setAttribute('aria-pressed', 'false');
          b.setAttribute('aria-label', 'Turn video audio on');
        });

        if (!isOn){
          video.muted = false;
          btn.setAttribute('aria-pressed', 'true');
          btn.setAttribute('aria-label', 'Turn video audio off');
        }
      });
    });
  } else if (videoGalleryEl){
    videoGalleryEl.innerHTML = '';
    videoGalleryEl.hidden = true;
  }

  if (p.extraVideo && extraVideoEl){
    const ev = p.extraVideo;
    let extraHtml = `<h4 class="project-extra-video-title">${escapeHtml(ev.title)}</h4>`;
    if (ev.description){
      extraHtml += `<p class="project-extra-video-description">${escapeHtml(ev.description)}</p>`;
    }
    extraHtml += `
      <div class="project-extra-video-wrap">
        <video src="${ev.video}" muted loop playsinline autoplay style="aspect-ratio: ${ev.videoRatio || '16/9'};"></video>
        <button type="button" class="video-audio-toggle extra-video-audio-toggle" aria-pressed="false" aria-label="Turn video audio on">
          <svg class="icon-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>
            <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          <svg class="icon-unmuted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>
            <path d="M16.5 8.5a5 5 0 010 7M19 6a8 8 0 010 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>
          </svg>
        </button>
      </div>
    `;
    if (ev.watch){
      const label = ev.watchLabel || 'Watch the video';
      extraHtml += `<a class="project-watch-link" href="${ev.watch}" target="_blank" rel="noopener">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
    }
    extraVideoEl.innerHTML = extraHtml;
    extraVideoEl.hidden = false;

    // stesso sistema di esclusione reciproca usato per le altre fonti audio del sito
    const extraVideoTag = extraVideoEl.querySelector('video');
    const extraToggle = extraVideoEl.querySelector('.extra-video-audio-toggle');
    extraToggle.addEventListener('click', () => {
      const isOn = extraToggle.getAttribute('aria-pressed') === 'true';

      muteSiteAudio();
      muteVideoAudio();
      muteGalleryAudio();
      extraVideoTag.muted = true;
      extraToggle.setAttribute('aria-pressed', 'false');
      extraToggle.setAttribute('aria-label', 'Turn video audio on');

      if (!isOn){
        extraVideoTag.muted = false;
        extraToggle.setAttribute('aria-pressed', 'true');
        extraToggle.setAttribute('aria-label', 'Turn video audio off');
      }
    });
  } else if (extraVideoEl){
    extraVideoEl.innerHTML = '';
    extraVideoEl.hidden = true;
  }

  if (p.imageGallery && imageGalleryEl){
    const ig = p.imageGallery;
    let imgHtml = '<div class="image-gallery-grid">';
    ig.items.forEach(item => {
      imgHtml += `
        <div class="image-gallery-item">
          <img src="${item.image}" alt="">
        </div>
      `;
    });
    imgHtml += '</div>';
    imageGalleryEl.innerHTML = imgHtml;
    imageGalleryEl.hidden = false;
  } else if (imageGalleryEl){
    imageGalleryEl.innerHTML = '';
    imageGalleryEl.hidden = true;
  }

  listEl.hidden = true;
  detailEl.hidden = false;
  detailEl.scrollIntoView({ block: 'start', behavior: 'auto' });
}

function closeProjectDetail(){
  detailEl.hidden = true;
  listEl.hidden = false;
  detailVideo.pause();
  if (videoAudioToggle) videoAudioToggle.hidden = true;
  if (videoGalleryEl){
    videoGalleryEl.querySelectorAll('video').forEach(v => v.pause());
    videoGalleryEl.innerHTML = '';
    videoGalleryEl.hidden = true;
  }
}

listEl.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-index]');
  if (!link) return;
  e.preventDefault();
  openProjectDetail(Number(link.dataset.index));
});

backBtn.addEventListener('click', closeProjectDetail);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !detailEl.hidden){
    closeProjectDetail();
  }
});

// ===== Cursor-following note (desktop) =====
const noteCursor = document.getElementById('note-cursor');

const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (!isTouch){
  document.addEventListener('mousemove', (e) => {
    if (noteCursor){
      noteCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      noteCursor.classList.add('is-visible');
    }
  });

  document.addEventListener('mouseleave', () => {
    if (noteCursor) noteCursor.classList.remove('is-visible');
  });
}

// ===== Evidenzia link nav attivo in base alla sezione visibile =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(s => observer.observe(s));

// ===== Reveal animato delle righe progetto al passaggio dello scroll =====
const projectRows = document.querySelectorAll('.project-row');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting){
      // piccolo ritardo progressivo tra le righe, per un effetto a cascata
      const index = Array.from(projectRows).indexOf(entry.target);
      const delay = Math.max(0, index) * 80;
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// piccolo ritardo prima di iniziare a osservare: garantisce che l'animazione sia
// visibile anche per le righe già in vista al caricamento della pagina
setTimeout(() => {
  projectRows.forEach(row => revealObserver.observe(row));
}, 100);


