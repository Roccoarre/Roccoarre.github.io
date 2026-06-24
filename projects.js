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
   ========================================================= */

const PROJECTS = [
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
    title: "Padre N0stro",
    role: "Music production & art direction",
    image: "assets/project-4.jpg",
    video: "assets/project-4-video.mp4",
    ratio: "16/9",
    link: "#",
    watch: "https://www.youtube.com/watch?v=ZW6weJZ5uBk",
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
    extras: "Angelica Ardengo, Laura Cappellotto, Antonio Femia, Matteo Favero, Anna Frezza, Elia Introvigne, Francesco Lava, Simone Liberali, Enrico Marcon, Colomba Pellegrino, Beatrice Pizzol, Bianca Scavezzon, Elisa Solinas, Niccolò Verni, Linda Zaghis"
  },
  {
    year: "2022",
    title: "Fashion at Iuav 2022",
    role: "Web & social content, art direction, sound design",
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
    year: "2021",
    title: "Y0ung M0nsters",
    role: "Art direction & sound design",
    description: "Young Monsters is an annual independent magazine born in Venice in 2021, a space for experimentation across fashion, contemporary culture and visual arts. Co-led the art direction of an eight-page story and the sound design for the accompanying videos.",
    image: "assets/project-2.jpg",
    link: "#"
  },
  {
    year: "2021",
    title: "Searching for Family",
    role: "Direction & video",
    description: "A university short film made for the \u201CDigital Materials for Fashion\u201D course, exploring how technology quietly replaces affection inside modern families through the metaphor of digital glitch and error.",
    image: "assets/project-3.jpg",
    link: "#"
  },
  {
    year: "2021",
    title: "Acqua Magica",
    role: "Event organization, art direction, sound design",
    description: "Acqua Magica is an independent mini-festival aiming to bring value to the Veneto countryside around the Piave river. It first took place in the summer of 2021, during one of the driest seasons on record: the event reflected on that socio-ecological theme while celebrating natural spaces in the area. I worked on it together with Daniele Midena.",
    images: ["assets/project-6.jpg", "assets/project-6d.jpg"],
    ratio: "999/1400",
    link: "#",
    extraVideo: {
      title: "Event video",
      video: "assets/project-6-video.mp4",
      videoRatio: "480/848"
    },
    imageGallery: {
      title: "Acqua Magica — gallery",
      description: "The \"Acqua Magica\" logo and a photo from the event.",
      items: [
        { image: "assets/project-6b.jpg" },
        { image: "assets/project-6c.jpg" }
      ]
    }
  }
];
