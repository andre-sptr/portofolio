# Plan Redesain — Skeuomorphism Light Theme

> Status: PLAN (belum ada perubahan kode). Dibuat 2 Jul 2026.

## 1. Review UI saat ini

Identitas sekarang: **"dark command center"** — dark-only design tokens, glassmorphism, glow neon indigo/cyan, grid overlay, Three.js scene, grain noise, font Clash Display + Satoshi.

### Kekuatan (dipertahankan)
- Token warna terpusat di `src/index.css` sebagai CSS variables + utility classes — fondasi retheming sudah bagus.
- Struktur komponen bersih, konten terpisah di `src/data/*.ts`.
- Disiplin motion: `prefers-reduced-motion` dihormati, ada mobile fallback (`AboutMobile`, `mobile-bg-gradient`), lazy loading per section.
- Konsep naratif kuat (Signal online, SYS-01, Featured systems) — cocok dengan identitas network/IoT engineer. Konsep ini **diterjemahkan**, bukan dibuang.

### Temuan yang memengaruhi redesign
1. **Dark-only**: `:root` = dark, `.dark` alias identik, `ThemeProvider defaultTheme="dark"`. Tidak ada light tokens sama sekali — semuanya dibangun baru.
2. **Hardcoded dark assumptions tersebar di komponen** (bukan lewat token): `border-white/10`, `bg-white/[0.035]`, `text-[var(--warm-white)]`, overlay `rgba(10,10,15,…)` di Hero, `WebkitTextStroke: rgba(99,102,241,0.06)` di About, teks tombol Live `#0a0a0f` di Projects. Ganti token saja tidak cukup — perlu sweep per komponen.
3. **Accent per-project** (`#818cf8`, `#22d3ee`, `#34d399`, `#f59e0b` di `data/projects.ts` & `Experience.tsx`) dituning untuk latar gelap — kontrasnya gagal di latar terang.
4. `--font-mono` mendeklarasikan JetBrains Mono tapi **tidak pernah di-import** (Fontshare hanya memuat Clash Display & Satoshi) → jatuh ke system mono.
5. **Tiga bahasa visual paralel** — glassmorphism (`.glass-card`), command-center (`.command-center-shell` + grid), dan flat cards — sudah mulai inkonsisten. Redesign adalah momen menyatukannya.
6. Hero menumpuk banyak efek dekoratif (Three.js + grid + grain + gradient overlay + glow) yang semuanya dark-dependent dan berat.

## 2. Konsep: "The Workbench" — command center digital → panel instrumen fisik

Skeuomorphism paling kuat kalau metafora materialnya nyambung dengan identitas. Untuk engineer telekom/IoT, terjemahannya natural:

| Elemen sekarang | Padanan skeuomorphic |
|---|---|
| Command-center shell (glass gelap) | Panel instrumen aluminium — label engraved, sekrup di sudut |
| Glow neon / "Signal online" ping | LED fisik kecil dengan lensa & pendar halus |
| Glass card | Kartu kertas/panel emboss dengan shadow berlapis |
| Grid overlay | Kertas blueprint / graph paper |
| Grain gelap | Tekstur kertas/linen terang |
| Profile card | Kartu ID laminasi / badge pegawai |
| BrowserFrame di Projects | Sudah skeuo-adjacent — dipertegas jadi frame monitor/perangkat |

**Aturan cahaya** (kunci konsistensi skeuo): satu sumber cahaya dari atas. Setiap permukaan raised = highlight 1px di tepi atas + shadow lembut ke bawah. Permukaan inset (input, well) = inner shadow di atas. Depth dari shadow berlapis, **bukan** dari transparency/backdrop-blur.

## 3. Design tokens baru (`src/index.css`)

Palet "workshop: paper + ink + brass":

```css
:root {
  --background: 40 30% 94%;        /* warm paper */
  --foreground: 30 10% 16%;        /* ink */
  --card: 42 35% 97%;
  --card-foreground: 30 10% 16%;
  --primary: 226 55% 40%;          /* ink blue — pewaris "electric" */
  --primary-foreground: 0 0% 100%;
  --secondary: 27 60% 42%;         /* copper/brass */
  --muted: 40 18% 88%;
  --muted-foreground: 30 8% 38%;   /* dijaga ≥ 4.5:1 di atas paper */
  --border: 38 16% 78%;
  --input: 38 16% 74%;
  --ring: 226 55% 40%;
  --radius: 10px;

  /* Surfaces */
  --surface-0: #EFEBE2;  /* paper dasar   */
  --surface-1: #F7F4EC;  /* panel raised  */
  --surface-2: #E6E1D6;  /* well inset    */
  --ink: hsl(226 55% 40%);          /* pengganti --electric */

  /* Shadow system (menggantikan glow) */
  --shadow-raised:
    inset 0 1px 0 hsl(0 0% 100% / .85),
    0 1px 2px hsl(30 20% 20% / .10),
    0 4px 12px hsl(30 20% 20% / .08);
  --shadow-raised-hover:
    inset 0 1px 0 hsl(0 0% 100% / .9),
    0 2px 4px hsl(30 20% 20% / .12),
    0 10px 24px hsl(30 20% 20% / .10);
  --shadow-pressed:
    inset 0 2px 4px hsl(30 20% 20% / .18),
    inset 0 1px 2px hsl(30 20% 20% / .12);
}
```

### Utility classes baru (mengganti yang lama)

| Hapus | Ganti dengan |
|---|---|
| `.glass`, `.glass-card` | `.panel-raised` (gradient permukaan tipis + `--shadow-raised`) |
| `.glow-hover`, `glow-*` | `.led`, `.led-green`, `.led-amber` (dot + box-shadow pendar kecil) |
| `.text-gradient(-animated)` | `.text-engraved` (`text-shadow: 0 1px 0 hsl(0 0% 100%/.8)`) atau warna ink solid |
| `.command-center-shell/grid/row` | `.panel-metal` (brushed aluminium: repeating-linear-gradient halus) + `.label-plate` + `.screw` (pseudo-element sudut) |
| `.gradient-border` | `.stitched` (border dashed offset — jahitan) untuk elemen "leather/fabric" |
| `.grain` (gelap) | `.texture-paper` (SVG noise yang sama, di-tune untuk terang, opacity lebih rendah) |
| — | `.well-inset` (input, area kode, track) dengan `--shadow-pressed` |
| — | `.btn-tactile` (raised; `:active` → translateY(1px) + `--shadow-pressed`) |

### Typography
- **Pertahankan** Clash Display (heading) + Satoshi (body) — hemat scope; rasa skeuo datang dari treatment engraved/emboss, bukan ganti font.
- **Perbaiki**: import JetBrains Mono (Google Fonts) supaya `--font-mono` benar-benar bekerja — label teknis (SYS-01, section-label) adalah bagian penting bahasa "instrumen".

## 4. Rencana per komponen

| Komponen | Perubahan |
|---|---|
| `Navigation.tsx` | Toolbar `panel-metal` menempel atas; pill aktif → `well-inset` (bukan pill transparan); scroll progress → garis "gauge" tembaga tipis; logo → badge emboss. Magnetic hover dipertahankan. |
| `Hero.tsx` | **Three.js diganti** latar `texture-paper` + blueprint grid terang. Command panel → panel instrumen metal (LED "Live stack", label engraved, screw corners). Profile card → kartu ID laminasi. CTA → `btn-tactile` (primary ink blue raised, secondary paper raised). Hapus overlay `rgba(10,10,15,…)`. GSAP intro timeline dipertahankan. |
| `TrustBar.tsx` | Nama organisasi → nameplate engraved (`text-engraved`). |
| `About.tsx` | Watermark stroke → blind-emboss (double text-shadow, tanpa warna). Stats → panel counter ala odometer (`well-inset` + mono). Journey cards → kartu arsip/index card raised. Orbit rings tetap, restyle jadi dial engraved di kertas (garis ring → `--border`, chip → token raised kecil). |
| `Projects.tsx` + `BrowserFrame.tsx` | BrowserFrame dipertegas: chrome jendela dengan gradient metal + traffic light 3D kecil. Kartu → `panel-raised`. Chip kategori → stiker label. Tombol Live: teks `#0a0a0f` → putih/ink sesuai accent baru. |
| `data/projects.ts` | Tambah/ganti accent versi light-safe (mis. `#4f46e5`, `#0e7490`, `#047857`, `#b45309`) — kontras ≥ 4.5:1 di paper. |
| `NowBlock.tsx` | Jadikan notepad: ruled lines (`divide-y` warna pensil), label mono engraved, LED kecil pengganti ping. |
| `Experience.tsx` | Spine SVG → rel metal/jahitan benang (gradient tembaga); node → kepala sekrup/rivet; kartu → catatan kertas raised. Accent per-entry ikut dipetakan ke versi gelap. |
| `FreeTools.tsx` | Bento → laci toolbox: tiap kartu punya handle inset + label plate. |
| `Contact.tsx` | Input/textarea → `well-inset`; submit → `btn-tactile` besar; tombol sosial → enamel pin raised bulat. |
| `Footer.tsx` | Strip kraft paper/leather lebih gelap dari `--surface-0`, jahitan `.stitched` di border atas. |
| `ChatWidget`, `NetworkStatus`, `Signature`, `ScrollToTop`, toaster | Sweep token: pastikan tidak ada `white/…` hardcode; toast → panel raised. |
| `pages/ProjectDetail.tsx`, `NotFound.tsx` | Ikut token baru + panel/well yang sama. |
| `pages/Lab.tsx` + `components/lab/*` | **Keputusan**: rekomendasi tetap dark sebagai kontras yang disengaja ("masuk ke lab" = ruangan gelap eksperimen). `.dark` scope dipasang di route Lab. Alternatif: ikut light — effort besar karena eksperimen Three.js dituning gelap. |
| `src/components/ui/*` | **Tidak diedit** (aturan CLAUDE.md) — styling lewat token + utility dari luar. |
| `public/` + `index.html` | OG image & favicon diperbarui menyesuaikan tema terang; `<meta name="theme-color">` → warna paper (mis. `#EFEBE2`) (tahap akhir). |

## 5. Fase implementasi

1. **Fase 0 — Fondasi** (± 1 hari): tokens + utilities baru di `index.css`, import JetBrains Mono, `ThemeProvider defaultTheme="light"`, body/scrollbar/selection, hapus utilities lama. *Site akan tampak "rusak" sebagian sampai Fase 3 — kerjakan di branch (mis. `redesign/skeuo-light`), jangan merge sebelum Fase 4 selesai.*
2. **Fase 1 — Shell** (± 0.5–1 hari): Navigation, Footer, gaya tombol global (`btn-tactile`).
3. **Fase 2 — Hero + TrustBar** (± 1–2 hari): dampak visual terbesar; eksekusi keputusan Three.js.
4. **Fase 3 — Konten** (± 2–3 hari): About, Projects (+BrowserFrame, data accents), NowBlock, Experience.
5. **Fase 4 — Pendukung** (± 1 hari): FreeTools, Contact, ChatWidget, NetworkStatus, Signature, toaster.
6. **Fase 5 — Sub-pages + QA** (± 1 hari): ProjectDetail, NotFound, scoping Lab; audit kontras WCAG AA, cek mobile & reduced-motion, `npm run lint` + `npm run build`, update OG/favicon/theme-color.

Total estimasi: **± 6–9 hari kerja**. Tiap fase diakhiri QA visual di browser (`npm run dev`) dan build tetap hijau.

## 6. Risiko & mitigasi

- **Kontras**: skeuo light rawan teks abu terlalu terang — `--muted-foreground` dikunci ≥ 4.5:1; semua accent per-project diaudit.
- **"Plastik murahan"**: skeuo gagal kalau shadow berlebihan. Aturan: satu arah cahaya, maksimal 2–3 lapis shadow per elemen, tekstur opacity ≤ 4%.
- **Performa**: menghapus Three.js di Hero + backdrop-blur → LCP/scroll membaik; shadow berlapis jauh lebih murah dari blur.
- **Konsistensi hardcode**: sweep `white/`, `--warm-white`, `--electric`, `rgba(10,10,15` di seluruh `src/` sebagai checklist akhir Fase 3–4.

## 7. Keputusan terbuka (dengan rekomendasi)

1. **Three.js Hero** — ganti latar statis paper/blueprint (rekomendasi) vs restyle scene terang.
2. **Lab page** — tetap dark sebagai identitas terpisah (rekomendasi) vs ikut light.
3. **Font display** — pertahankan Clash Display + treatment engraved (rekomendasi) vs ganti serif/slab untuk rasa skeuo lebih klasik.
