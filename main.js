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

// silenzia il carosello video (es. i live di un progetto), se presente
function muteVideoCarouselAudio(){
  if (!videoCarouselVideo) return;
  videoCarouselVideo.muted = true;
  if (videoCarouselAudioToggle){
    videoCarouselAudioToggle.setAttribute('aria-pressed', 'false');
    videoCarouselAudioToggle.setAttribute('aria-label', 'Turn video audio on');
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
      muteVideoCarouselAudio();
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
const mediaWatchLink = document.getElementById('project-media-watch');
const videoAudioToggle = document.getElementById('video-audio-toggle');
const detailYear = document.getElementById('project-detail-year');
const detailTitle = document.getElementById('project-detail-title');
const detailRole = document.getElementById('project-detail-role');
const detailCredits = document.getElementById('project-detail-credits');
const videoGalleryEl = document.getElementById('project-video-gallery');
const extraVideoEl = document.getElementById('project-extra-video');
const imageGalleryEl = document.getElementById('project-image-gallery');
const photoCreditEl = document.getElementById('project-photo-credit');
const extraCarouselEl = document.getElementById('project-extra-carousel');
const extraCarouselImg = document.getElementById('project-extra-carousel-img');
const extraCarouselPrev = document.getElementById('extra-carousel-prev');
const extraCarouselNext = document.getElementById('extra-carousel-next');
const extraCarouselIndicator = document.getElementById('extra-carousel-indicator');
const extraCarouselCreditEl = document.getElementById('project-extra-carousel-credit');
const videoCarouselEl = document.getElementById('project-video-carousel');
const videoCarouselCaption = document.getElementById('project-video-carousel-caption');
const videoCarouselVideo = document.getElementById('project-video-carousel-video');
const videoCarouselPrev = document.getElementById('video-carousel-prev');
const videoCarouselNext = document.getElementById('video-carousel-next');
const videoCarouselIndicator = document.getElementById('video-carousel-indicator');
const videoCarouselAudioToggle = document.getElementById('video-carousel-audio-toggle');

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
      muteVideoCarouselAudio();
      detailVideo.muted = false;
      videoAudioToggle.setAttribute('aria-pressed', 'true');
      videoAudioToggle.setAttribute('aria-label', 'Turn video audio off');
    }
  });
}

if (videoCarouselAudioToggle){
  videoCarouselAudioToggle.addEventListener('click', () => {
    const isOn = videoCarouselAudioToggle.getAttribute('aria-pressed') === 'true';

    if (isOn){
      muteVideoCarouselAudio();
    } else {
      muteSiteAudio();
      muteVideoAudio();
      muteGalleryAudio();
      muteExtraVideoAudio();
      videoCarouselVideo.muted = false;
      videoCarouselAudioToggle.setAttribute('aria-pressed', 'true');
      videoCarouselAudioToggle.setAttribute('aria-label', 'Turn video audio off');
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

  if (photoCreditEl){
    if (p.photoCredit){
      photoCreditEl.innerHTML = `Photo by <a href="${p.photoCredit.url}" target="_blank" rel="noopener">${escapeHtml(p.photoCredit.name)}</a>`;
      photoCreditEl.hidden = false;
    } else {
      photoCreditEl.hidden = true;
      photoCreditEl.innerHTML = '';
    }
  }

  detailYear.textContent = p.year;
  detailTitle.textContent = p.title;
  detailRole.textContent = p.role;

  const descriptionHtml = p.description ? `<p class="project-detail-note">${escapeHtml(p.description)}</p>` : '';
  // a differenza di description, note può contenere markup di fiducia (es. un link), quindi non va in escapeHtml
  const noteHtml = p.note ? `<p class="project-detail-note">${p.note}</p>` : '';
  const descriptionInGallery = !!(p.imageGallery && p.imageGallery.items.some(i => i.description));
  const noteInGallery = !!(p.imageGallery && p.imageGallery.items.some(i => i.note));

  let html = descriptionInGallery ? '' : descriptionHtml;
  html += noteInGallery ? '' : noteHtml;
  if (p.socialLinks && p.socialLinks.length){
    html += '<div class="project-social-links">';
    p.socialLinks.forEach(s => {
      html += `<a class="project-watch-link" href="${s.url}" target="_blank" rel="noopener">${escapeHtml(s.label)} <span aria-hidden="true">↗</span></a>`;
    });
    html += '</div>';
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
  let watchLinkHtml = '';
  let watchInnerHtml = '';
  if (p.watch){
    let label = p.watchLabel;
    if (!label){
      if (p.watch.includes('youtube') || p.watch.includes('youtu.be')) label = 'Watch on YouTube';
      else if (p.watch.includes('instagram')) label = 'Watch on Instagram';
      else if (p.watch.includes('vimeo')) label = 'Watch on Vimeo';
      else label = 'Watch the video';
    }
    watchInnerHtml = `${escapeHtml(label)} <span aria-hidden="true">↗</span>`;
    watchLinkHtml = `<a class="project-watch-link" href="${p.watch}" target="_blank" rel="noopener">${watchInnerHtml}</a>`;
  }
  const watchInGallery = !!(p.imageGallery && p.imageGallery.items.some(i => i.watch));
  if (mediaWatchLink){
    if (p.watch && p.watchUnderMedia){
      mediaWatchLink.href = p.watch;
      mediaWatchLink.innerHTML = watchInnerHtml;
      mediaWatchLink.hidden = false;
    } else {
      mediaWatchLink.hidden = true;
      mediaWatchLink.innerHTML = '';
    }
  }
  html += (watchInGallery || p.watchUnderMedia) ? '' : watchLinkHtml;
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
        muteVideoCarouselAudio();
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
    let extraHtml = ev.title ? `<h4 class="project-extra-video-title">${escapeHtml(ev.title)}</h4>` : '';
    if (ev.description){
      extraHtml += `<p class="project-extra-video-description">${escapeHtml(ev.description)}</p>`;
    }
    extraHtml += `
      <div class="project-extra-video-wrap" style="${ev.videoMaxWidth ? `max-width: ${ev.videoMaxWidth};` : ''}">
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
    if (ev.caption){
      extraHtml += `<p class="project-extra-video-caption">${escapeHtml(ev.caption)}</p>`;
    }
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
      muteVideoCarouselAudio();
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

  if (p.extraCarousel && extraCarouselEl){
    const ec = p.extraCarousel;
    extraCarouselEl.querySelector('.project-extra-carousel-media').style.aspectRatio = ec.ratio || '16/9';
    let extraIndex = 0;
    const showExtraImage = (i) => {
      extraIndex = Math.max(0, Math.min(i, ec.images.length - 1));
      extraCarouselImg.src = ec.images[extraIndex];
      extraCarouselImg.alt = p.title;
      extraCarouselIndicator.textContent = `${extraIndex + 1} / ${ec.images.length}`;
      extraCarouselPrev.hidden = extraIndex === 0;
      extraCarouselNext.hidden = extraIndex === ec.images.length - 1;
    };
    showExtraImage(0);
    extraCarouselIndicator.hidden = ec.images.length <= 1;
    extraCarouselPrev.onclick = () => showExtraImage(extraIndex - 1);
    extraCarouselNext.onclick = () => showExtraImage(extraIndex + 1);
    extraCarouselEl.hidden = false;
    if (extraCarouselCreditEl){
      if (ec.photoCredit){
        extraCarouselCreditEl.innerHTML = `Photo by <a href="${ec.photoCredit.url}" target="_blank" rel="noopener">${escapeHtml(ec.photoCredit.name)}</a>`;
        extraCarouselCreditEl.hidden = false;
      } else {
        extraCarouselCreditEl.hidden = true;
        extraCarouselCreditEl.innerHTML = '';
      }
    }
  } else if (extraCarouselEl){
    extraCarouselEl.hidden = true;
    if (extraCarouselCreditEl){
      extraCarouselCreditEl.hidden = true;
      extraCarouselCreditEl.innerHTML = '';
    }
  }

  if (p.videoCarousel && videoCarouselEl){
    const vc = p.videoCarousel;
    videoCarouselEl.querySelector('.project-video-carousel-media').style.aspectRatio = vc.ratio || '16/9';
    let videoIndex = 0;
    const showVideo = (i) => {
      videoIndex = Math.max(0, Math.min(i, vc.videos.length - 1));
      videoCarouselVideo.src = vc.videos[videoIndex];
      videoCarouselVideo.muted = true; // resetta sempre muto al cambio video, l'utente lo attiva se vuole
      videoCarouselVideo.currentTime = 0;
      videoCarouselVideo.play().catch(() => {});
      if (videoCarouselAudioToggle){
        videoCarouselAudioToggle.setAttribute('aria-pressed', 'false');
        videoCarouselAudioToggle.setAttribute('aria-label', 'Turn video audio on');
      }
      videoCarouselIndicator.textContent = `${videoIndex + 1} / ${vc.videos.length}`;
      videoCarouselPrev.hidden = videoIndex === 0;
      videoCarouselNext.hidden = videoIndex === vc.videos.length - 1;
      if (videoCarouselCaption){
        const text = vc.captions ? vc.captions[videoIndex] : vc.caption;
        videoCarouselCaption.textContent = text || '';
        videoCarouselCaption.hidden = !text;
      }
    };
    showVideo(0);
    videoCarouselIndicator.hidden = vc.videos.length <= 1;
    videoCarouselPrev.onclick = () => showVideo(videoIndex - 1);
    videoCarouselNext.onclick = () => showVideo(videoIndex + 1);
    videoCarouselEl.hidden = false;
  } else if (videoCarouselEl){
    videoCarouselVideo.pause();
    videoCarouselVideo.removeAttribute('src');
    videoCarouselEl.hidden = true;
  }

  let bioMovedToGallery = false;
  if (p.imageGallery && imageGalleryEl){
    const ig = p.imageGallery;
    const singleClass = (ig.items.length === 1 || ig.layout === 'stacked') ? ' image-gallery-grid--single' : '';
    const widthStyle = ig.maxWidth ? ` style="max-width: ${ig.maxWidth};"` : '';
    let imgHtml = `<div class="image-gallery-grid${singleClass}"${widthStyle}>`;
    ig.items.forEach((item, itemIdx) => {
      const fullClass = item.full ? ' image-gallery-item--full' : '';
      let media;
      if (item.description){
        media = `<div class="image-gallery-bio">${descriptionHtml}</div>`;
      } else if (item.note){
        media = `<div class="image-gallery-bio">${noteHtml}</div>`;
      } else if (item.bio){
        media = `<div class="image-gallery-bio">${html}</div>`;
        bioMovedToGallery = true;
      } else if (item.video){
        media = `<video src="${item.video}" autoplay muted loop playsinline></video>`;
        if (item.watch) media += `<div class="image-gallery-video-watch">${watchLinkHtml}</div>`;
      } else if (item.carousel){
        const ci = item.carousel.images;
        const indHidden = ci.length <= 1 ? ' hidden' : '';
        media = `
          <div class="image-gallery-carousel" data-gallery-carousel="${itemIdx}">
            <img src="${ci[0]}" alt="">
            <button type="button" class="carousel-nav carousel-prev" aria-label="Previous image" hidden><span aria-hidden="true">←</span></button>
            <button type="button" class="carousel-nav carousel-next" aria-label="Next image"${ci.length <= 1 ? ' hidden' : ''}><span aria-hidden="true">→</span></button>
            <span class="carousel-indicator"${indHidden}>1 / ${ci.length}</span>
          </div>
        `;
      } else {
        media = `<img src="${item.image}" alt="">`;
        if (item.credit){
          media += `<p class="image-gallery-caption">Photo by <a href="${item.credit.url}" target="_blank" rel="noopener">${escapeHtml(item.credit.name)}</a></p>`;
        }
      }
      const itemStyle = item.maxWidth ? ` style="max-width: ${item.maxWidth}; margin: 0 auto;"` : '';
      imgHtml += `
        <div class="image-gallery-item${fullClass}"${itemStyle}>
          ${media}
        </div>
      `;
    });
    imgHtml += '</div>';
    imageGalleryEl.innerHTML = imgHtml;
    imageGalleryEl.hidden = false;

    ig.items.forEach((item, itemIdx) => {
      if (!item.carousel) return;
      const wrap = imageGalleryEl.querySelector(`.image-gallery-carousel[data-gallery-carousel="${itemIdx}"]`);
      if (!wrap) return;
      const images = item.carousel.images;
      const img = wrap.querySelector('img');
      const prevBtn = wrap.querySelector('.carousel-prev');
      const nextBtn = wrap.querySelector('.carousel-next');
      const indicator = wrap.querySelector('.carousel-indicator');
      let cIdx = 0;
      const showImg = (i) => {
        cIdx = Math.max(0, Math.min(i, images.length - 1));
        img.src = images[cIdx];
        indicator.textContent = `${cIdx + 1} / ${images.length}`;
        prevBtn.hidden = cIdx === 0;
        nextBtn.hidden = cIdx === images.length - 1;
      };
      prevBtn.onclick = () => showImg(cIdx - 1);
      nextBtn.onclick = () => showImg(cIdx + 1);
    });
  } else if (imageGalleryEl){
    imageGalleryEl.innerHTML = '';
    imageGalleryEl.hidden = true;
  }
  detailCredits.innerHTML = bioMovedToGallery ? '' : html;

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
  if (videoCarouselVideo) videoCarouselVideo.pause();
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


