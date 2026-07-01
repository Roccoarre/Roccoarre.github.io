/* =========================================================
   PROJECTS — to add a new project, copy a block { ... } and
   edit the values. Place it at the top of the array if you
   want it to appear first in the list.

   Fields:
   - year:        project year (e.g. "2024")
   - title:       project title
   - role:        your role (e.g. "Video editing", "Backstage & edit")
   - description: OPTIONAL — a short paragraph about the project, shown under the role
   - image:       path to the preview image (assets/...)
   - video:       OPTIONAL — path to a short video (assets/...), played on loop
                  inside the project preview frame instead of the static image.
                  Keep it short and lightweight (a few MB, muted, looping).
   - ratio:       OPTIONAL — image aspect ratio, e.g. "4/5" (default) or "16/9"
                  use "16/9" for wide images (like a 1920x1080 poster) so they
                  show in full, without being cropped into a tall frame
   - link:        project page or URL (can be "#" if you don't have one yet)
   - watch:       OPTIONAL — URL to the video (YouTube, Instagram, Vimeo...), shown as a button at the bottom of the detail view
   - watchLabel:  OPTIONAL — custom text for the watch button (e.g. "Watch on Instagram").
                  If omitted, the label is guessed automatically from the URL.
   - credits:     OPTIONAL — array of { role, name, spacer }, shown first in the detail view.
                  Add spacer: true on an entry to add a little extra space below that row.
   - moreCredits: OPTIONAL — array of { role, name }, shown below the main credits
   - extras:      OPTIONAL — string with the full cast/extras list
   - note:        OPTIONAL — short line shown above the credits (e.g. an award mention)
   - photoCredit: OPTIONAL — { name, url } photographer credit, shown as a small link under the main carousel
   - extraCarousel: OPTIONAL — { ratio, images }, a second independent navigable carousel
                  shown below the description (use ratio: "16/9" for a wide/horizontal format)
   - videoCarousel: OPTIONAL — { ratio, videos }, a navigable carousel that plays one video
                  at a time (muted, with an audio toggle) instead of loading them all at once
   ========================================================= */

const PROJECTS = [
  {
    year: "2026",
    title: "I'm about to crash",
    role: "Music production & live performance",
    description: "“I’m about to crash” is a performance born from the dialogue between Emanuele Argentieri and Rocco Arreghini. A sonic ecosystem that stages improvisation as a catalyst for tension and friction. The violin and its live manipulation don't follow a linear script, but a dramaturgy of the unforeseen. Sound is treated as a living entity, a body whose processes of decay become signs of a life that resists.",
    image: "assets/I'm about to crash cover.png",
    ratio: "1/1",
    note: "Our latest performance took place June 13th at Nusca Festival, an independent festival dedicated to cinema and publishing in Venice.",
    watch: "https://www.instagram.com/nuscafestival/reel/DYxIrd4MceL/",
    link: "#",
    videoCarousel: {
      ratio: "16/9",
      videos: [
        "assets/CLIP 0.mp4",
        "assets/CLIP 1.mp4",
        "assets/CLIP 2.mp4",
        "assets/CLIP 3.mp4",
        "assets/CLIP 4.mp4"
      ],
      captions: [
        "A first gesture on the violin, still searching for its shape.",
        "The manipulation takes over, pulling the sound out of tune.",
        "Tension builds as the instrument starts to resist.",
        "A moment of near-silence before the next attack.",
        "The closing fragment, sound left to decay on its own."
      ]
    }
  },
  {
    year: "2026",
    title: "CORE",
    role: "Bachelor's thesis",
    description: "CORE is my Bachelor's thesis project for the degree in Fashion Design at Iuav University of Venice, Communication and New Fashion Media curriculum. The thesis looks at the contemporary evolution of the \"-core\" suffix, examining its aesthetic and cultural implications within the digital media ecosystem: it starts by mapping today's cultural landscape, then moves on to propose some tools for approaching it. The full title, \"CORE — Coreanthology\", builds on a coined second word that merges three semantic fields: the \"-core\" suffix itself, the notion of hauntology as developed by Mark Fisher, and the word anthology.",
    images: ["assets/project-7-new0.jpg", "assets/project-7-new1.jpg", "assets/project-7-new2.jpg", "assets/project-7-new3.jpg", "assets/project-7-new4.jpg"],
    ratio: "16/9",
    layout: "stacked",
    link: "#"
  },
  {
    year: "2025",
    title: "Padre n0str0",
    role: "Music production & art direction",
    image: "assets/project-4.jpg",
    video: "assets/project-4-video.mp4",
    ratio: "16/9",
    link: "#",
    watch: "https://www.youtube.com/watch?v=ZW6weJZ5uBk",
    watchUnderMedia: true,
    note: "\u201CPadre Nostro\u201D by MDGN — Candidate for Best Italian Low-Budget Music Video 2026, Videoclip Italia Awards (Official Selection)",
    credits: [
      { role: "Track Written by", name: "Rocco Arreghini, Lorenzo Gabor, Daniele Midena" },
      { role: "Track Produced by", name: "Rocco Arreghini", spacer: true },
      { role: "Produced by", name: "Niccolò Mariconda" }
    ],
    moreCredits: [
      { role: "Directed by", name: "Camilla Francini" },
      { role: "DOP & Colorist", name: "Davide Zanon" },
      { role: "Starring", name: "Nasser Samad, Joshua Maser" },
      { role: "1AD", name: "Nicolò Francini" },
      { role: "1AC", name: "Simone Magri" },
      { role: "Gaffer", name: "Marco Panini" },
      { role: "Scenography", name: "Bianca Girardi" },
      { role: "Ass. Scenography", name: "Claudia Pollet" },
      { role: "Casting", name: "Aurora Gerini, Emanuele Argentieri" },
      { role: "Creative director", name: "Rocco Arreghini" },
      { role: "Title design", name: "Daniele Midena" },
      { role: "PA", name: "Martina Menoncello" },
      { role: "Continuity", name: "Eleonora Macchion" }
    ],
    extras: "Angelica Ardengo, Laura Cappellotto, Antonio Femia, Matteo Favero, Anna Frezza, Elia Introvigne, Francesco Lava, Simone Liberali, Enrico Marcon, Colomba Pellegrino, Beatrice Pizzol, Bianca Scavezzon, Elisa Solinas, Niccolò Verni, Linda Zaghis",
    imageGallery: {
      items: [
        { image: "assets/project-4-photo.jpeg" }
      ]
    }
  },
  {
    year: "2024",
    title: "Vent0core",
    role: "Event organization & art direction",
    description: "Venetocore is a series of events and a collective, founded in May 2024, dedicated to championing the underground music scene of the Veneto region. Working directly within the local area to give space and a voice to local musicians and artists, the project stays away from commercial circuits to offer a radical alternative to the conventional night out, aiming to turn local venues into shared listening ecosystems.",
    note: "More than just an event, it's a community: connecting people through music, bringing together new generations, and giving visibility to digital electronic niches and emerging local talent. The visual identity of each poster — where photography and graphic design merge with regional iconography — is at the aesthetic core of the project, shaping an identity that's both local and global.",
    images: [
      "assets/@loraw-23.jpg",
      "assets/@loraw-20.jpg"
    ],
    ratio: "4/5",
    link: "#",
    photoCredit: { name: "Lorenzo Vai", url: "https://www.instagram.com/loraw._/" },
    socialLinks: [
      { label: "Instagram", url: "https://www.instagram.com/venetocore/" }
    ],
    extraCarousel: {
      ratio: "16/9",
      images: [
        "assets/Venetocore x Siamounmagazine.jpg",
        "assets/DSC00995.JPG",
        "assets/pc.jpeg",
        "assets/WhatsApp Image 2026-06-29 at 23.31.26 (1).jpeg"
      ],
      photoCredit: { name: "Emanuele Argentieri", url: "https://www.instagram.com/feb.21.2002/" }
    },
    extraVideo: {
      video: "assets/REEL 2 VENETOCORE def.mp4",
      videoRatio: "16/9",
      caption: "I worked on the art direction and sound design for this video."
    },
    imageGallery: {
      items: [
        { carousel: { images: ["assets/IPHONE.png", "assets/six-seven.jpg"] } }
      ]
    }
  },
  {
    year: "2023",
    title: "IT SEEMS N0B0DY WANTS T0 W0RK THESE DAYS",
    role: "Sound design & art direction",
    note: "I took part in the final exhibition of the art direction workshop led by Rossana Passalacqua and Francesco Valtolina. The exhibition showcased installations featuring the best works developed during the course, themed around the work world and articulated into four visions that coexist within the space. I took part in a working group that created a video installation called “Il mestiere è il mio piacere 69”.<br><br>Relocated to the “<a href=\"https://www.spaziopunch.com/\" target=\"_blank\" rel=\"noopener\" style=\"text-decoration: underline;\">Spazio Punch</a>” cultural venue, where I managed both the installation and communication aspects and delivered a musical performance during the inauguration.",
    watch: "https://www.youtube.com/watch?v=qxDdySCl0iQ",
    watchLabel: "Watch the full video on YouTube",
    credits: [
      { role: "A project by", name: "Emanuele Argentieri, Rocco Arreghini, Eleonora Franchi, Elisa Gasparini, Francesca Parolin, Tommaso Tobio" },
      { role: "Supervised by", name: "Rossana Passalacqua, Francesco Valtolina", spacer: true }
    ],
    moreCredits: [
      { role: "Make-Up", name: "Emma Cisotto" },
      { role: "Hair", name: "Gabriela Isabel Pizzol" },
      { role: "Starring", name: "Giovanni Biscarini, Sofia Della Vecchia, Anita Ferrari, Andrea Paolo Onorati, Jacopo Ronchese, Valeria Segna, Elisa Tran, Leonardo Trentin, Lauren" },
      { role: "Thanks to", name: "Luca Molinari, Silvia Pellizzeri, Silvia Carraro, M9 Museum, and all the technicians and staff" }
    ],
    images: [
      "assets/exhibition-comms-card.jpg",
      "assets/exhibition-comms-69.jpg"
    ],
    ratio: "2/3",
    link: "#",
    extraVideo: {
      title: "Exhibition Communication Video",
      video: "assets/exhibition-comms-video.mp4",
      videoRatio: "1/1",
      description: "I was responsible for the social and printed communication of the exhibition, and I conceived and created the posters and videos used for it, working with various AI tools to generate and blend images together; I also manipulated the audio from a famous quote in a video interview with Kim Kardashian, from which the exhibition takes its name",
      watch: "https://www.instagram.com/p/Ct9lFMxvimH/",
      watchLabel: "Watch on Instagram"
    },
    imageGallery: {
      maxWidth: "960px",
      items: [
        { note: true, full: true },
        { image: "assets/exhibition-backstage.jpeg", full: true },
        { video: "assets/loop.mp4", full: true, watch: true },
        { bio: true, full: true },
        { image: "assets/SCHERMO1.png", full: true }
      ]
    }
  },
  {
    year: "2022",
    title: "Fashi0n at Iuav 2022",
    role: "Web & social content, sound design, art direction",
    description: "The annual fashion show of Iuav University of Venice, celebrating the graduating students' work. The 2022 edition took place on July 1st at the Pier Luigi Penzo Stadium in Venice, in collaboration with Venezia FC and powered by Xiaomi, featuring graduates from the Bachelor's in Fashion Design and Multimedia Arts and the Master's in Visual Arts and Fashion. The show's social communication was developed together with second-year students of the \"Communication and New Fashion Media\" course; I contributed to the web and social content, art direction and sound design.",
    image: "assets/project-1.jpg",
    video: "assets/project-1-video.mp4",
    note: "\"Smisurata\" trailer, video and audio by me, graphic design by Prof. Alessandro Gori, photography by Alessandro Timpanaro. The visuals use an AI-driven morphing effect between images.",
    link: "#",
    videoGallery: {
      title: "3D Scan for Sponsors",
      intro: "Video editing and animation of models obtained with Lidar scanning of some final collections. I worked on the sound design and on the Lidar scanning technology used to create these videos, together with Francesca Parolin and Tommaso Tobio.",
      items: [
        {
          video: "assets/project-1d-video.mp4",
          caption: "For \"Bonotto S.p.A.\": Alberto Cornolò (MA), Matilde Dal Bianco (MA), Angelo Pennella (MA)."
        },
        {
          video: "assets/project-1b-video.mp4",
          caption: "For \"Stoll Italia\": Matilde Dal Bianco (MA), Angelo Pennella (MA), Elisa Rota (MA), Matteo Zoppi (BA)."
        },
        {
          video: "assets/project-1c-video.mp4",
          caption: "For \"Tessuti di Sondrio\": Gianni Mattarucco (BA), Francesco Sanson (BA)."
        }
      ]
    },
    extraVideo: {
      title: "Backstage Video",
      video: "assets/project-1e-video.mp4",
      videoRatio: "16/9",
      description: "The video shows one look made by each undergraduate fashion design student. It was filmed at Stadio Penzo (Venezia F.C. Stadium), the location of the fashion show. I worked on this video with Gaia La Fisca Sarullo: she filmed and edited the video, I worked on the audio.",
      watch: "https://www.instagram.com/tv/CgULIhmFC2f/?utm_source=ig_web_copy_link",
      watchLabel: "Watch the full video on Instagram"
    }
  },
  {
    year: "2022",
    title: "Acqua Magica",
    role: "Event organization, sound design, art direction",
    description: "Acqua Magica is an independent mini-festival aiming to bring value to the Veneto countryside around the Piave river. It first took place in the summer of 2022, during one of the driest seasons on record: the event reflected on that socio-ecological theme while celebrating natural spaces in the area. I worked on it together with Daniele Midena.",
    images: ["assets/project-6.jpg", "assets/project-6d.jpg"],
    ratio: "999/1400",
    link: "#",
    extraVideo: {
      video: "assets/project-6-video.mp4",
      videoRatio: "480/848",
      videoMaxWidth: "360px"
    },
    imageGallery: {
      title: "Acqua Magica — gallery",
      description: "The \"Acqua Magica\" logo and a photo from the event.",
      items: [
        { image: "assets/project-6b.jpg" },
        { image: "assets/project-6c.jpg" }
      ]
    }
  },
  {
    year: "2021",
    title: "MDGN",
    role: "Music production & art direction",
    description: "MDGN is an independent music project born in 2021 in the province of Treviso. Its sound identity is built around a blend of electronic music and avant-pop atmospheres, with a strong focus on experimentation and timbral research. The visual side is an integral part of the band's identity, curated with the same care as the songwriting and music production, with the goal of creating a coherent and recognizable imagery.",
    images: [
      "assets/P1000962-HDR.jpg",
      "assets/1-43.jpg",
      "assets/POS2.jpg",
      "assets/1-68.jpg",
      "assets/P1001039-HDR-Modifica.jpg"
    ],
    ratio: "2/3",
    link: "#",
    photoCredit: { name: "Elia Introvigne", url: "https://www.instagram.com/eliopsoas/" },
    socialLinks: [
      { label: "Instagram", url: "https://www.instagram.com/mdgn4life" },
      { label: "Spotify", url: "https://open.spotify.com/intl-it/artist/1tZ8de1mFvlEzhjD2pzAde?si=-xUGIPbiT1yWpH8WR5ToLg" },
      { label: "Apple Music", url: "https://music.apple.com/it/artist/mdgn/1754056037" }
    ],
    imageGallery: {
      items: [
        { image: "assets/schiena.JPG", full: true, credit: { name: "Emanuele Argentieri", url: "https://www.instagram.com/feb.21.2002/" } }
      ]
    },
    videoCarousel: {
      ratio: "16/9",
      caption: "Videos extracted from our live performances.",
      videos: [
        "assets/VIDEO 1 (7).mp4",
        "assets/VIDEO 1 (2).mp4",
        "assets/VIDEO 1 (3).mp4",
        "assets/VIDEO 1 (4).mp4",
        "assets/VIDEO 1 (6).mp4"
      ]
    }
  }
];
