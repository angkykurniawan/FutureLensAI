# 1. Implementation Plan
Implementation Plan - FutureLens AI Simulator
FutureLens AI is a premium, interactive decision simulation web application designed to help users visualize the potential short-term and long-term consequences of their major life decisions. The application features a stunning futuristic, glassmorphic sci-fi aesthetic, complete with dynamic timeline visualizations, score dashboards, decision alternative comparisons, and a "time capsule" message from the user's future self.

User Review Required
IMPORTANT

Preset vs Custom Decisions: To make the app fully functional client-side without requiring a backend AI API key, we will implement:
Premium Presets: 4 fully-detailed, high-quality simulation scenarios (Career, Finance, Education, Business) with rich content.
Dynamic Custom Generator: A smart, keyword-based client-side generation engine that crafts realistic simulation reports based on user inputs, simulating a complex "quantum prediction" computation.
Aesthetics: The theme will be a futuristic neon dark mode (Deep Slate + Neon Cyan, Violet, and Emerald accents) featuring glassmorphism, floating particles, and retro-futuristic UI elements.
Proposed Changes
We will create the project inside C:\Users\ANG-PC\.gemini\antigravity\scratch\futurelens-ai.

[Component Name] FutureLens AI Web Application
[NEW] 
index.html
Main HTML structure.
Imports Outfit and Inter Google Fonts, Font Awesome icons, and Lucide icons.
Includes:
Futuristic floating-particle background.
Header with animated logo and taglines.
Interactive "Decision Input Deck" containing:
Pre-made scenarios selector (for instant demonstration).
Custom Form: Category (Karir, Finansial, Pendidikan, Hubungan, Bisnis, Kesehatan), Decision Textarea, Additional Info Textarea.
Cosmic/AI Loading overlay with progressive terminal logs ("Mapping cognitive nodes...", "Simulating timeline branches...", "Measuring financial divergence...").
"Simulation Matrix" (Dashboard) showing:
Header Summary Card: Overview of the decision and category with high-tech badge design.
Timeline Simulator: Interactive vertical or horizontal tabs (1 Bulan, 6 Bulan, 1 Tahun) with animated progress/satisfaction bar, glowing bulleted list of conditions, advantages, and risks.
Alternate Timeline Nexus: Cards displaying 2 alternative paths side-by-side with pros/cons.
Summary Dashboard: Score widgets using glowing circular SVG gauges for Future Happiness, Future Regret, Financial Impact, and Risk Score, alongside brief contextual descriptions.
Future Message Interface: An interactive "Time Capsule" envelope. Clicking it triggers a holographic popup displaying a typewriter-animated message from the future.
Control center: Buttons to edit the decision, restart, or export/print the timeline report.
[NEW] 
styles.css
Custom CSS design system.
Colors: Custom dark palette with slate-950 (#080b11), slate-900 (#0e1524), cyan-400 (#00f0ff), fuchsia-500 (#d946ef), emerald-400 (#10b981), rose-500 (#f43f5e), amber-400 (#f59e0b).
Layout: Modern grid and flexbox, fully responsive down to mobile.
Glassmorphism: Custom blur effects, border gradients, and soft neon box-shadows.
Animations:
Particle drift for background.
Hologram scanlines effect.
Pulse and glowing animations for tabs and gauges.
Smooth slider animations for timelines.
Envelope opening and typewriter effects.
[NEW] 
app.js
Core JavaScript file managing UI interactions and simulation engine.
Contains:
Initial particle background generator.
Data structure for the Premium Preset Scenarios (Indonesian language, matching user's prompt format):
Preset 1 (Career): Switching from corporate job to full-time tech startup.
Preset 2 (Finance): Buying an apartment using a mortgage (KPR) vs renting.
Preset 3 (Education): Studying Masters (S2) abroad vs staying at current job.
Preset 4 (Business): Starting a side-hustle food business.
Dynamic Simulator Engine: Parses custom decisions, determines positive/negative keywords, and dynamically generates realistic simulation text blocks, alternatives, and scores (Happiness, Regret, Financial, Risk) utilizing pre-designed narrative templates.
Loading Sequence Animator: Delays the rendering of the simulation dashboard to show an authentic retro hacker/AI computation log.
Tab Switcher Logic: Animates transitions between 1 Month, 6 Months, and 1 Year.
Gauge Render Logic: Animates SVG dashboard meters on load.
Time Capsule Controller: Controls the holographic future message envelope and typing animation.
PDF/Print handler to generate a beautifully styled printout.
Verification Plan
Automated/Manual Verification
We will run a local server (python -m http.server 8000 or similar tool) and test the application interface.
Validate:
Form validation: ensures inputs are filled.
Loading animation triggers and displays retro-futuristic logs.
Custom scenarios correctly parse keywords (e.g. money, family, study, resign) and generate customized simulation text.
Gauge charts animate smoothly to their values.
Responsive design works on simulated mobile viewports.
Print/PDF output styles are formatted correctly.





# 2. Prompt
Anda adalah FutureLens AI, sebuah sistem simulasi keputusan yang membantu pengguna mengeksplorasi kemungkinan konsekuensi dari suatu keputusan.

Tugas Anda BUKAN memprediksi masa depan secara pasti, melainkan membuat simulasi realistis berdasarkan informasi yang diberikan.

DATA PENGGUNA

Kategori:
{category}

Keputusan:
{decision}

Informasi Pendukung:
{additional_information}

ATURAN ANALISIS

1. Bersikap objektif dan realistis.
2. Jangan menghakimi keputusan pengguna.
3. Jelaskan kemungkinan terbaik dan kemungkinan terburuk.
4. Gunakan logika praktis, finansial, karier, pendidikan, atau bisnis sesuai konteks.
5. Hindari klaim pasti tentang masa depan.
6. Fokus pada kemungkinan, risiko, peluang, dan konsekuensi.

Buat simulasi berikut:

# 1 BULAN KEMUDIAN

Jelaskan:
- Kondisi yang mungkin terjadi
- Keuntungan yang dirasakan
- Risiko yang muncul
- Tingkat kepuasan

# 6 BULAN KEMUDIAN

Jelaskan:
- Kondisi yang mungkin terjadi
- Keuntungan yang dirasakan
- Risiko yang muncul
- Tingkat kepuasan

# 1 TAHUN KEMUDIAN

Jelaskan:
- Kondisi yang mungkin terjadi
- Keuntungan yang dirasakan
- Risiko yang muncul
- Tingkat kepuasan

# ALTERNATIF KEPUTUSAN
Berikan 2 alternatif keputusan yang masuk akal selain keputusan utama.

Untuk setiap alternatif jelaskan:
- Potensi keuntungan
- Potensi risiko

# RINGKASAN

Berikan skor berikut dalam rentang 0-100:

Future Happiness Score: (0-100)
Future Regret Score: (0-100)
Financial Impact Score: (0-100)
Risk Score: (0-100)

Berikan alasan singkat untuk setiap skor.

# FUTURE MESSAGE
Tuliskan satu pesan singkat seolah berasal dari "versi masa depan pengguna" yang telah mengalami konsekuensi keputusan tersebut.
Maksimal 2 kalimat.





# 3. Command Deploy
1. Ekstraksi File: unzip futurelens-ai.zip -d futurelens-ai
2. Pindah Direktori: cd futurelens-ai
3. Membuat Bucket Baru: gcloud storage buckets create gs://futurelens-byak-8890 --location=asia-southeast2
4. Unggah File ke Google Cloud
5. Copy File: gcloud storage cp -r * gs://futurelens-byak-8890/
6. Buka Akses Public ke Website: gcloud storage buckets add-iam-policy-binding gs://futurelens-byak-8890 --member=allUsers --role=roles/storage.objectViewer
7. Aktifkan Hosting: gcloud storage buckets update gs://futurelens-byak-8890 --web-main-page-suffix=index.html


# 4. Test Case
1. Kategori: Karir / Hubungan
Keputusan Utama:
Menerima tawaran pekerjaan baru di kota Balikpapan dan pindah dari Jakarta, meskipun harus menjalani hubungan jarak jauh (LDR) dengan keluarga

Informasi Pendukung:
Gaji ditawarkan naik 50%, difasilitasi rumah dinas, namun hubungan pacaran baru berjalan 1 tahun dan belum ada rencana menikah dalam waktu dekat.

2. Kategori: Finansial / Investasi
Keputusan Utama:
Menginvestasikan 40% dari seluruh uang tabungan ke aset cryptocurrency (Bitcoin & Ethereum) untuk disimpan jangka panjang (HODL).

Informasi Pendukung:
Pasar kripto sedang dalam tren turun (bear market), saya memiliki dana darurat terpisah yang cukup untuk 3 bulan hidup, dan memiliki pemahaman dasar tentang cara kerja blockchain.

3. Kategori: Pendidikan / Karir
Keputusan Utama:
Mengikuti bootcamp pemrograman intensif selama 6 bulan untuk pindah karir dari staf administrasi menjadi Junior Cloud Engineer.

Informasi Pendukung:
Belajar menggunakan sistem bayar setelah bekerja (Income Share Agreement), tidak memiliki latar belakang IT, siap mendedikasikan waktu 8 jam sehari untuk belajar secara penuh.

4. Kategori: Hubungan/Personal
Keputusan Utama:
Memutuskan menunda pernikahan selama 1,5 tahun ke depan untuk fokus menabung secara mandiri, daripada memaksakan menikah tahun ini menggunakan dana pinjaman (utang).

Informasi Pendukung:
Keluarga besar mendesak agar pernikahan diadakan tahun ini. Namun, tabungan kami berdua saat ini baru mencapai 40% dari estimasi biaya minimal, dan kami tidak ingin memulai rumah tangga dengan beban utang cicilan.

5. Kategori: Bisnis / Usaha
Keputusan Utama:
Menyewa ruko kecil di dekat area kampus untuk membuka kedai kopi susu kekinian dengan modal patungan bersama dua orang teman.

Informasi Pendukung:
Modal patungan sebesar Rp50 juta per orang, sudah memiliki konsep menu yang unik, namun di sekitar ruko tersebut sudah terdapat 3 kedai kopi lain yang cukup ramai.

6. Kategori: Kesehatan / Gaya Hidup
Keputusan Utama:
Berkomitmen penuh menjalani gaya hidup vegetarian (tidak mengonsumsi daging) dan rutin berolahraga lari 3 kali seminggu.

Informasi Pendukung:
Hasil tes medis menunjukkan kolesterol tinggi, lingkungan keluarga saya adalah pemakan daging aktif, dan saya harus mulai belajar memasak makanan sehat sendiri setiap hari.
