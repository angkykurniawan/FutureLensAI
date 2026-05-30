// FutureLens AI - Core Simulation Engine & UI Controller

document.addEventListener('DOMContentLoaded', () => {
  // Initialize lucide icons if loaded
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- STATE ---
  let currentSimulationData = null;

  // --- PRESET SCENARIOS ---
  const presetScenarios = [
    {
      id: "preset-career-startup",
      category: "Karir",
      title: "Resign & Bikin Startup IT",
      decision: "Resign dari pekerjaan Senior Software Engineer di e-commerce besar untuk fokus membangun startup SaaS (Software as a Service) sendiri.",
      additional_information: "Memiliki tabungan darurat untuk 9 bulan hidup, sudah mengembangkan purwarupa produk (MVP), memiliki satu rekan pendiri (co-founder) non-teknis, namun belum memiliki pelanggan berbayar pertama.",
      timeline: {
        "1month": {
          satisfaction: 85,
          condition: "Bulan pertama dipenuhi dengan gelombang antusiasme tinggi. Kebebasan waktu membuat Anda sangat produktif. MVP produk mulai diperbaiki, dan Anda merasa berenergi karena tidak lagi dibebani rapat korporat yang membosankan.",
          best: [
            "Fokus penuh mempercepat pengembangan produk hingga 2x lipat.",
            "Kesehatan mental membaik secara signifikan karena tingkat stres kerja kantoran berkurang.",
            "Membangun personal branding di LinkedIn sebagai founder mendapat respons positif."
          ],
          worst: [
            "Mulai menyadari besarnya tanggung jawab operasional yang sebelumnya diurus divisi lain.",
            "Timbul kecemasan kecil saat melihat tidak ada gaji masuk di akhir bulan pertama.",
            "Kurangnya rutinitas harian yang terstruktur membuat jadwal tidur sedikit berantakan."
          ]
        },
        "6month": {
          satisfaction: 65,
          condition: "MVP telah diluncurkan, tetapi pertumbuhan pengguna berjalan sangat lambat. Dana tabungan darurat mulai menyusut setengahnya. Kenyataan pahit dalam memasarkan produk (marketing) mulai terasa jauh lebih sulit daripada menulis kode.",
          best: [
            "Mendapatkan 3 klien berbayar pertama skala UKM yang memberikan feedback berharga.",
            "Mendapat undangan pitching dari salah satu inkubator startup lokal.",
            "Fleksibilitas waktu memungkinkan Anda menghadiri acara keluarga penting di hari kerja."
          ],
          worst: [
            "Pendapatan masih jauh dari cukup untuk menutupi biaya operasional bulanan pribadi.",
            "Terjadi gesekan pendapat dengan co-founder mengenai strategi pemasaran dan pembagian saham.",
            "Adanya tekanan sosial dari keluarga yang mempertanyakan keputusan Anda keluar dari pekerjaan stabil."
          ]
        },
        "1year": {
          satisfaction: 55,
          condition: "Satu tahun berjalan. Tabungan darurat hampir habis. Startup Anda kini berada di persimpangan jalan: harus mencari pendanaan luar (investor), melakukan pivot model bisnis, atau bersiap mencari pekerjaan paruh waktu untuk bertahan hidup.",
          best: [
            "Produk mencapai Monthly Recurring Revenue (MRR) sebesar Rp15 juta, menunjukkan validasi pasar.",
            "Berhasil masuk ke program akselerator dengan pendanaan awal (seed funding) kecil.",
            "Kemampuan kepemimpinan dan bisnis Anda meningkat pesat melebihi apa yang dipelajari selama bertahun-tahun di korporasi."
          ],
          worst: [
            "Tingkat stres sangat tinggi karena ketidakpastian finansial yang kronis.",
            "Kesehatan fisik terabaikan akibat waktu kerja yang tidak teratur demi menekan biaya development.",
            "Jika gagal mendapat dana segar dalam 2 bulan, Anda terpaksa membekukan operasional startup."
          ]
        }
      },
      scores: {
        happiness: 70,
        regret: 30,
        financial: 45,
        risk: 80,
        reasons: {
          happiness: "Meskipun stres tinggi, kepuasan batin karena memiliki otonomi penuh atas hidup dan karya Anda sangat memuaskan.",
          regret: "Potensi penyesalan rendah karena Anda tahu jika tidak mencobanya sekarang, Anda akan selalu dihantui pertanyaan 'bagaimana jika'.",
          financial: "Dampak finansial jangka pendek cukup berat karena hilangnya pendapatan stabil dan habisnya tabungan darurat.",
          risk: "Tingkat risiko sangat tinggi mengingat tingkat kegagalan startup di tahun pertama mencapai lebih dari 80%."
        }
      },
      alternatives: [
        {
          title: "Membangun Startup sebagai Side-Hustle",
          desc: "Tetap bekerja sebagai Software Engineer dan mengembangkan startup di malam hari dan akhir pekan hingga memiliki pendapatan berbayar yang stabil.",
          pros: [
            "Stabilitas finansial tetap terjaga dengan gaji bulanan.",
            "Mengurangi tekanan mental karena tidak ada risiko kehabisan uang tabungan."
          ],
          cons: [
            "Proses pengembangan produk berjalan sangat lambat karena keterbatasan energi.",
            "Risiko kelelahan fisik dan mental ekstrem (burnout) karena bekerja ganda."
          ]
        },
        {
          title: "Bergabung dengan Startup Tahap Awal (Early-stage)",
          desc: "Keluar dari e-commerce dan bergabung dengan startup milik orang lain yang baru mendapat pendanaan sebagai lead engineer dengan pembagian kepemilikan saham (equity).",
          pros: [
            "Dapat merasakan dinamika membangun produk dari nol tanpa beban finansial operasional.",
            "Tetap mendapatkan gaji tetap meskipun di bawah standar e-commerce besar."
          ],
          cons: [
            "Tidak memiliki kontrol penuh atas arah perusahaan dan produk.",
            "Risiko pemutusan hubungan kerja (PHK) jika startup tersebut kehabisan dana."
          ]
        }
      ],
      futureMessage: "Hei diriku. Di sini, di masa depan, jalannya memang bergelombang dan tabungan kita sempat menyentuh angka kritis. Tapi ketahuilah, keberanian yang kamu tunjukkan hari ini telah mengubah mentalitas kita selamanya—kita bukan lagi sekadar pekerja, kita adalah pencipta."
    },
    {
      id: "preset-finance-kpr",
      category: "Finansial",
      title: "Beli Apartemen KPR vs Kontrak",
      decision: "Mengambil cicilan KPR apartemen tipe 2BR di area penyangga Jakarta dengan tenor 15 tahun, daripada terus mengontrak rumah petak dekat kantor.",
      additional_information: "Uang muka (DP) diambil dari 70% tabungan saat ini. Cicilan bulanan akan memakan sekitar 35% dari gaji bulanan bersih. Sisa tabungan digunakan untuk dana darurat mini.",
      timeline: {
        "1month": {
          satisfaction: 90,
          condition: "Proses serah terima kunci selesai. Anda sibuk membeli furnitur baru dan merancang tata letak ruangan. Rasa bangga memiliki 'rumah sendiri' memberikan kebahagiaan psikologis yang luar biasa besar di awal.",
          best: [
            "Rasa aman karena tidak perlu memikirkan kenaikan biaya sewa tahunan dari pemilik kontrakan.",
            "Fasilitas apartemen (gym, kolam renang, keamanan 24 jam) meningkatkan kenyamanan hidup.",
            "Motivasi kerja meningkat karena memiliki target keuangan yang sangat konkret."
          ],
          worst: [
            "Tabungan tunai menyusut tajam akibat biaya tak terduga (admin KPR, notaris, BPHTB).",
            "Waktu perjalanan ke kantor bertambah sekitar 30 menit karena lokasi apartemen yang lebih jauh.",
            "Stres akibat penyesuaian anggaran bulanan yang kini jauh lebih ketat."
          ]
        },
        "6month": {
          satisfaction: 70,
          condition: "Euforia kepemilikan apartemen mulai memudar menjadi rutinitas bulanan. Anda menyadari biaya IPL (Iuran Pengelolaan Lingkungan), parkir, air, dan listrik apartemen ternyata cukup menguras dompet di luar cicilan pokok.",
          best: [
            "Apartemen menjadi tempat berkumpul yang menyenangkan bagi teman-teman dekat.",
            "Manajemen apartemen berjalan profesional sehingga lingkungan bersih dan teratur.",
            "Anda mulai disiplin mencatat pengeluaran harian karena terdesak cicilan."
          ],
          worst: [
            "Porsi gaji untuk tabungan bebas/investasi saham berkurang drastis karena cicilan 35% + IPL.",
            "Terasa kejenuhan akibat ruang apartemen yang relatif sempit dibanding rumah tapak biasa.",
            "Sulit melakukan pengeluaran impulsif seperti liburan spontan atau upgrade gadget."
          ]
        },
        "1year": {
          satisfaction: 75,
          condition: "Satu tahun cicilan berjalan lancar. Nilai jual apartemen di area tersebut cenderung stagnan karena suplai yang tinggi, namun Anda mulai terbiasa dengan ritme keuangan baru dan menganggap apartemen ini sebagai jangkar stabilitas hidup.",
          best: [
            "Anda sukses melunasi utang-utang kecil dekorasi dan mulai membangun kembali dana darurat.",
            "Ada rasa bangga yang stabil karena berhasil mengalokasikan uang ke dalam aset properti daripada sewa habis.",
            "Lingkungan apartemen terbukti aman dari banjir dan gangguan keamanan eksternal."
          ],
          worst: [
            "Anda merasa terjebak di pekerjaan saat ini karena takut mengundurkan diri (takut tidak bisa bayar cicilan).",
            "Jika terjadi keadaan darurat medis, dana cadangan Anda saat ini masih dalam posisi rawan.",
            "Penyusutan nilai beberapa furnitur dan peralatan elektronik memerlukan biaya perbaikan mandiri."
          ]
        }
      },
      scores: {
        happiness: 75,
        regret: 20,
        financial: 60,
        risk: 50,
        reasons: {
          happiness: "Memiliki tempat tinggal sendiri memberikan ketenangan batin yang tinggi meskipun ada beban cicilan.",
          regret: "Penyesalan sangat rendah karena membeli properti dinilai sebagai langkah kedewasaan yang penting.",
          financial: "Secara finansial, likuiditas Anda menurun drastis karena uang tunai dikonversi menjadi aset tidak likuid (properti).",
          risk: "Risiko bersifat moderat, utamanya terkait risiko gagal bayar jika kehilangan pekerjaan di masa depan."
        }
      },
      alternatives: [
        {
          title: "Terus Mengontrak & Investasi Saham/Reksa Dana",
          desc: "Tetap tinggal di kontrakan dekat kantor untuk meminimalkan waktu transportasi dan mengalokasikan 35% gaji ke instrumen investasi pasar modal yang likuid.",
          pros: [
            "Likuiditas sangat tinggi, uang investasi mudah dicairkan jika ada darurat.",
            "Waktu perjalanan ke kantor tetap singkat (menghemat fisik dan biaya transportasi)."
          ],
          cons: [
            "Harga properti di masa depan terus naik sehingga makin sulit terjangkau.",
            "Tidak memiliki rasa kepemilikan fisik dan rentan diusir jika pemilik kontrakan tidak memperpanjang sewa."
          ]
        },
        {
          title: "Membeli Rumah Tapak Pinggiran (Bekas/Lelang)",
          desc: "Mencari rumah tapak bekas atau rumah lelang bank di daerah satelit yang harganya setara apartemen namun memiliki kepemilikan tanah penuh (SHM).",
          pros: [
            "Memiliki tanah utuh yang nilai investasinya naik lebih cepat dibanding apartemen.",
            "Biaya pemeliharaan bulanan (tanpa IPL tinggi) jauh lebih murah."
          ],
          cons: [
            "Kondisi bangunan kemungkinan membutuhkan renovasi awal yang mahal.",
            "Akses transportasi publik ke pusat kota biasanya lebih sulit dibandingkan apartemen."
          ]
        }
      ],
      futureMessage: "Ingatlah saat pertama kali kita memutar kunci pintu itu. Beban cicilan 15 tahun memang terasa lama, tapi apartemen ini telah menjadi tempat teraman kita untuk tumbuh dan belajar mandiri."
    },
    {
      id: "preset-education-s2",
      category: "Pendidikan",
      title: "Kuliah S2 Luar Negeri (Beasiswa)",
      decision: "Mengundurkan diri dari posisi Supervisor Pemasaran untuk melanjutkan studi Master (S2) bidang Digital Marketing di Inggris menggunakan beasiswa penuh.",
      additional_information: "Beasiswa mencakup biaya kuliah dan biaya hidup bulanan. Namun, Anda harus meninggalkan jenjang karir yang sedang naik daun dan berpisah jarak jauh (LDR) dengan tunangan selama 1 tahun.",
      timeline: {
        "1month": {
          satisfaction: 80,
          condition: "Bulan pertama di Inggris dipenuhi dengan gegar budaya (culture shock) dan keindahan musim gugur. Tugas-tugas akademis awal terasa sangat berat karena perbedaan sistem pendidikan, tetapi atmosfer internasional membuat Anda kagum.",
          best: [
            "Jaringan pertemanan global mulai terbentuk dari berbagai belahan dunia.",
            "Fasilitas perpustakaan dan riset universitas yang sangat modern memicu semangat belajar.",
            "Kemampuan komunikasi bahasa Inggris Anda meningkat secara natural."
          ],
          worst: [
            "Rasa rindu rumah (homesickness) yang berat terutama pada masakan rumah dan tunangan.",
            "Kelelahan beradaptasi dengan cuaca dingin, angin, dan waktu siang hari yang sangat singkat.",
            "Keharusan mengurus semua kebutuhan domestik sendiri (memasak, mencuci, belanja bulanan) di sela kuliah."
          ]
        },
        "6month": {
          satisfaction: 70,
          condition: "Ujian tengah semester selesai. Kehidupan akademis berada pada puncaknya dengan riset yang padat. Hubungan jarak jauh mulai menghadapi tantangan komunikasi akibat perbedaan zona waktu yang mencapai 6-7 jam.",
          best: [
            "Mulai terbiasa dengan metode diskusi kritis di kelas dan nilai tugas pertama memuaskan.",
            "Mendapatkan kesempatan magang paruh waktu di agensi kreatif lokal secara legal.",
            "Kemampuan manajemen waktu dan kemandirian Anda terbentuk dengan sangat kokoh."
          ],
          worst: [
            "Sering terjadi kesalahpahaman dengan tunangan karena jarangnya waktu komunikasi berkualitas.",
            "Kelelahan fisik akibat akumulasi kurang tidur menjelang tenggat waktu pengumpulan tesis.",
            "Mulai merasa cemas memikirkan prospek pekerjaan setelah lulus nanti di tengah ketidakpastian ekonomi."
          ]
        },
        "1year": {
          satisfaction: 90,
          condition: "Studi selesai dan Anda diwisuda dengan hasil memuaskan. Anda kembali ke Indonesia membawa gelar MSc. Tantangan berikutnya adalah masuk kembali ke pasar tenaga kerja dengan ekspektasi gaji yang kini jauh lebih tinggi.",
          best: [
            "Gelar master luar negeri menjadi nilai jual utama yang membedakan Anda di mata rekruter.",
            "Hubungan dengan tunangan berhasil melewati ujian jarak jauh dan bersiap untuk pernikahan.",
            "Pola pikir global dan jaringan alumni internasional membuka peluang proyek konsultasi independen."
          ],
          worst: [
            "Menyadari beberapa mantan rekan kerja yang dulu setara kini sudah naik jabatan di atas Anda.",
            "Proses rekrutmen perusahaan lokal kadang memakan waktu berbulan-bulan, menimbulkan masa menganggur sementara.",
            "Ekspektasi gaji Anda yang tinggi terkadang dianggap 'overqualified' oleh perusahaan lokal skala menengah."
          ]
        }
      },
      scores: {
        happiness: 80,
        regret: 10,
        financial: 75,
        risk: 40,
        reasons: {
          happiness: "Pengalaman hidup di luar negeri dan pencapaian akademis memberikan kepuasan eksistensial yang tak ternilai.",
          regret: "Hampir tidak ada penyesalan karena beasiswa penuh meminimalkan risiko utang pendidikan.",
          financial: "Potensi finansial jangka panjang sangat baik karena kualifikasi pendidikan Anda melompat tinggi.",
          risk: "Risiko moderat, terutama terkait hambatan hubungan personal (LDR) dan masa transisi mencari kerja pasca lulus."
        }
      },
      alternatives: [
        {
          title: "Kuliah S2 Online / Karyawan (Lokal)",
          desc: "Tetap bekerja penuh waktu dan mengambil program S2 eksekutif di universitas dalam negeri yang kelasnya diadakan malam hari atau akhir pekan.",
          pros: [
            "Gaji bulanan tetap mengalir dan jenjang karir di kantor saat ini tidak terputus.",
            "Tidak perlu melakukan LDR dengan tunangan."
          ],
          cons: [
            "Kehilangan total pengalaman hidup dan jaringan internasional di luar negeri.",
            "Beban kerja ganda (kantor + kuliah) yang berisiko merusak kesehatan mental."
          ]
        },
        {
          title: "Menolak Beasiswa & Fokus Naik Jabatan",
          desc: "Fokus 100% pada karir marketing saat ini untuk menargetkan promosi menjadi Manajer Pemasaran dalam 1-2 tahun ke depan tanpa melanjutkan studi.",
          pros: [
            "Stabilitas finansial meningkat lebih cepat melalui kenaikan jabatan nyata.",
            "Pengalaman praktis di industri tetap terakumulasi tanpa jeda akademis."
          ],
          cons: [
            "Di masa depan, pertumbuhan karir mungkin akan terbentur plafon syarat pendidikan formal.",
            "Kehilangan kesempatan emas untuk tinggal dan belajar di luar negeri secara gratis."
          ]
        }
      ],
      futureMessage: "Di hari wisuda itu, di bawah langit kota London, kamu akan menyadari bahwa keputusan berani meninggalkan zona nyaman setahun lalu adalah investasi terbaik yang pernah kita lakukan untuk masa depan."
    },
    {
      id: "preset-business-sidehustle",
      category: "Bisnis",
      title: "Bisnis Kuliner Franchise Sampingan",
      decision: "Membuka franchise minuman kekinian (boba/kopi susu) di dekat area sekolah menengah atas dengan mempekerjakan 2 orang karyawan paruh waktu, sementara Anda tetap bekerja kantoran.",
      additional_information: "Modal awal menggunakan 50% tabungan dingin. Anda hanya akan mengontrol bisnis ini pada malam hari dan akhir pekan. Manajemen operasional harian dipercayakan pada salah satu karyawan senior.",
      timeline: {
        "1month": {
          satisfaction: 75,
          condition: "Booth franchise resmi dibuka. Antusiasme awal cukup bagus karena diskon pembukaan. Anda merasa bersemangat memantau laporan penjualan harian dari aplikasi POS di sela-sela jam kerja kantor.",
          best: [
            "Omzet minggu pertama melampaui target awal akibat efek promosi peluncuran.",
            "Karyawan terbukti jujur dan mampu mengoperasikan mesin minuman dengan baik.",
            "Rasa bangga memiliki bisnis fisik pertama mulai terbentuk."
          ],
          worst: [
            "Kelelahan fisik mulai terasa karena setiap pulang kantor Anda harus mampir untuk mengecek stok bahan baku.",
            "Menyadari margin keuntungan bersih per cup ternyata lebih tipis dari perhitungan brosur franchise.",
            "Fokus kerja di kantor sedikit terganggu karena memikirkan operasional booth."
          ]
        },
        "6month": {
          satisfaction: 50,
          condition: "Efek kebaruan (novelty effect) telah hilang. Kompetitor sejenis mulai buka di area yang sama. Omzet harian menurun drastis hingga menyentuh titik impas (break-even). Salah satu karyawan tiba-tiba mengundurkan diri tanpa pemberitahuan.",
          best: [
            "Anda berhasil menegosiasikan penurunan biaya sewa tempat dengan pemilik lahan.",
            "Mengembangkan menu inovatif sendiri (di luar paket franchise resmi) yang disukai anak sekolah.",
            "Mendapatkan pemahaman mendalam tentang manajemen SDM tingkat dasar."
          ],
          worst: [
            "Anda terpaksa menjaga booth sendiri selepas kerja kantoran selama 1 minggu sebelum menemukan karyawan baru.",
            "Mengalami kerugian operasional kecil di bulan kelima karena mesin es batu sempat rusak.",
            "Waktu istirahat akhir pekan hilang sepenuhnya, memicu stres fisik yang mulai mempengaruhi kinerja kantor."
          ]
        },
        "1year": {
          satisfaction: 60,
          condition: "Satu tahun berjalan. Bisnis sampingan ini terbukti tidak memberikan kekayaan mendadak, melainkan aliran kas tambahan (cashflow) yang tipis namun stabil setelah Anda merombak strategi pemasaran digital lokal.",
          best: [
            "Bisnis akhirnya stabil menghasilkan profit bersih konstan Rp3-4 juta per bulan secara pasif.",
            "Karyawan baru terbukti loyal dan bisa dipercaya untuk mengurus harian sepenuhnya.",
            "Anda memiliki pemahaman bisnis riil yang matang untuk modal ekspansi bisnis lain."
          ],
          worst: [
            "Investasi modal awal baru akan kembali (BEP) sepenuhnya dalam waktu 6 bulan ke depan (total 1.5 tahun).",
            "Tren minuman kekinian mulai bergeser ke jenis produk baru, menuntut Anda melakukan inovasi cepat.",
            "Energi Anda cukup terkuras sehingga tidak memiliki waktu luang untuk hobi pribadi."
          ]
        }
      },
      scores: {
        happiness: 65,
        regret: 25,
        financial: 55,
        risk: 45,
        reasons: {
          happiness: "Ada kepuasan memiliki aset bisnis sendiri, meskipun kelelahan fisik menurunkan kenyamanan hidup sehari-hari.",
          regret: "Penyesalan rendah karena modal yang digunakan adalah uang dingin dan memberikan pelajaran bisnis praktis yang berharga.",
          financial: "Dampak finansial positif jangka panjang, meskipun keuntungan bulanan kecil dan pengembalian modal awal berjalan lambat.",
          risk: "Risiko moderat karena Anda tidak kehilangan pekerjaan utama, sehingga jaring pengaman finansial Anda tetap utuh."
        }
      },
      alternatives: [
        {
          title: "Bisnis Jasa Keahlian (Freelance Professional)",
          desc: "Menggunakan waktu luang selepas kantor untuk membuka jasa konsultasi/freelance sesuai keahlian utama Anda (misal: desain, penulisan, coding) daripada bisnis fisik.",
          pros: [
            "Modal awal hampir nol (hanya laptop dan internet).",
            "Margin keuntungan bersih mendekati 100% tanpa pusing memikirkan sewa tempat dan karyawan."
          ],
          cons: [
            "Waktu kerja berbanding lurus dengan pendapatan (tidak bisa menjadi pendapatan pasif seperti franchise).",
            "Sulit didelegasikan kepada orang lain jika Anda sibuk di kantor utama."
          ]
        },
        {
          title: "Investasi Pasif Penuh di Pasar Saham / Surat Berharga",
          desc: "Memasukkan 50% tabungan tersebut ke dalam reksa dana saham atau obligasi negara (SBR/ORI) yang memberikan dividen/kupon tanpa menyita waktu sama sekali.",
          pros: [
            "100% pasif, tidak menyita waktu, tenaga, dan pikiran Anda sedikit pun.",
            "Likuiditas jauh lebih tinggi daripada memiliki gerobak/booth franchise fisik."
          ],
          cons: [
            "Potensi return persentase per tahun umumnya lebih kecil dibandingkan bisnis franchise yang sukses besar.",
            "Tidak mendapat pembelajaran praktis tentang dunia kewirausahaan fisik."
          ]
        }
      ],
      futureMessage: "Menjaga booth minuman di malam hari setelah lelah bekerja seharian memang berat. Tapi dari sanalah mental wirausaha kita lahir, membuktikan bahwa kita bisa memimpin, bukan cuma dipimpin."
    }
  ];

  // --- PARTICLE BG GENERATOR ---
  function generateParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    container.innerHTML = '';
    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 10;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      // Random tint (cyan, purple, white)
      const tints = ['rgba(0, 240, 255, 0.4)', 'rgba(217, 70, 239, 0.4)', 'rgba(255, 255, 255, 0.3)'];
      particle.style.background = tints[Math.floor(Math.random() * tints.length)];
      particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;
      
      container.appendChild(particle);
    }
  }
  generateParticles();

  // --- DYNAMIC CUSTOM SIMULATOR HEURISTIC ENGINE ---
  // If the user inputs a custom decision, we generate realistic content based on heuristics.
  function generateCustomSimulation(category, decision, additionalInfo) {
    // Basic clean-up & keyword analysis
    const textToAnalyze = (decision + " " + additionalInfo).toLowerCase();
    
    // Scenarios heuristics variables
    let happiness = 60;
    let regret = 35;
    let financial = 50;
    let risk = 50;

    // Detect risk indicators
    if (textToAnalyze.includes("resign") || textToAnalyze.includes("keluar") || textToAnalyze.includes("pinjam") || textToAnalyze.includes("utang") || textToAnalyze.includes("hutang") || textToAnalyze.includes("gadai")) {
      risk += 25;
      financial -= 10;
      regret += 10;
    }
    if (textToAnalyze.includes("tabungan") || textToAnalyze.includes("investor") || textToAnalyze.includes("dana darurat")) {
      risk -= 10;
      financial += 5;
    }
    if (textToAnalyze.includes("hobi") || textToAnalyze.includes("passion") || textToAnalyze.includes("keluarga") || textToAnalyze.includes("nikah") || textToAnalyze.includes("senang")) {
      happiness += 15;
    }
    if (textToAnalyze.includes("kesehatan") || textToAnalyze.includes("sakit") || textToAnalyze.includes("stres") || textToAnalyze.includes("capek")) {
      risk += 10;
      happiness -= 10;
    }

    // Keep scores in 0-100 range
    happiness = Math.max(10, Math.min(95, happiness));
    regret = Math.max(5, Math.min(95, regret));
    financial = Math.max(10, Math.min(95, financial));
    risk = Math.max(10, Math.min(95, risk));

    // Dynamic text builder based on Category
    let timelines = {};
    let alts = [];
    let msg = "";
    
    // We create structural contents customized by category
    if (category === "Karir") {
      timelines = {
        "1month": {
          satisfaction: Math.round(happiness * 1.1),
          condition: `Memasuki babak baru dalam Karir Anda. Minggu-minggu awal berjalan dengan adaptasi intens terhadap lingkungan baru atau status baru Anda setelah memutuskan "${decision.substring(0, 60)}...". Anda merasakan adrenalin perubahan dan motivasi yang segar.`,
          best: [
            "Fokus energi terpusat sepenuhnya pada arah karir baru tanpa distraksi rutinitas lama.",
            "Mendapat apresiasi awal atau validasi dari jejaring terdekat atas keberanian Anda mengambil langkah ini.",
            "Waktu istirahat/pola kerja harian terasa lebih fleksibel dan bisa Anda atur sendiri."
          ],
          worst: [
            "Kebingungan menyusun rutinitas baru yang efektif di sela-sela masa transisi karir.",
            "Rasa cemas yang samar-samar muncul di malam hari mengenai stabilitas jangka panjang.",
            "Beberapa kendala birokrasi, administrasi, atau penyesuaian teknis awal memakan waktu lebih lama dari perkiraan."
          ]
        },
        "6month": {
          satisfaction: Math.round(happiness * 0.9),
          condition: "Setengah tahun berlalu. Fase bulan madu (euforia) keputusan telah berakhir sepenuhnya. Ritme kerja baru kini terasa sebagai rutinitas biasa. Hambatan-hambatan nyata di lapangan mulai bermunculan dan menguji konsistensi Anda.",
          best: [
            "Mulai menguasai pola kompetensi baru dan menunjukkan performa/karya yang diakui.",
            "Jejaring profesional baru yang relevan dengan keputusan ini mulai terbentuk kokoh.",
            "Adanya kepuasan batin karena Anda membuktikan diri mampu keluar dari zona nyaman lama."
          ],
          worst: [
            "Tingkat kelelahan mental atau burnout mulai mengintai jika Anda tidak menjaga batasan kerja.",
            "Tekanan keuangan pribadi mulai terasa jika karir baru ini belum menghasilkan cashflow sekuat pekerjaan lama.",
            "Ada keraguan sesekali saat melihat kemajuan rekan-rekan Anda yang menempuh jalan konvensional."
          ]
        },
        "1year": {
          satisfaction: Math.round(happiness),
          condition: "Satu tahun penuh perjalanan pasca keputusan karir ini. Anda kini telah bertransformasi menjadi versi baru. Dampak finansial dan profesional dari keputusan ini telah terpetakan dengan jelas, membawa Anda pada kedewasaan karir yang lebih matang.",
          best: [
            "Keahlian baru Anda terakreditasi secara organik melalui portofolio nyata yang telah Anda bangun.",
            "Pendapatan atau nilai tawar profesional Anda meningkat seiring dengan keunikan jalur yang Anda pilih.",
            "Kepercayaan diri Anda naik tajam karena berhasil melewati masa sulit transisi di tahun pertama."
          ],
          worst: [
            "Anda menyadari bahwa jalur ini membutuhkan komitmen seumur hidup dan tidak ada jalan kembali yang instan.",
            "Beberapa pengorbanan sosial atau waktu keluarga terpaksa dilakukan demi mempertahankan pencapaian karir ini.",
            "Kompetisi di bidang baru ini ternyata lebih padat daripada asumsi Anda di awal."
          ]
        }
      };

      alts = [
        {
          title: "Mengambil Jalur Karir Hybrid / Paruh Waktu",
          desc: "Menjalankan keputusan baru ini sebagai proyek sampingan (part-time) atau konsultan sambil mempertahankan sebagian stabilitas di bidang karir sebelumnya.",
          pros: ["Risiko finansial sangat minim karena ada jangkar pendapatan.", "Memiliki waktu untuk memvalidasi minat tanpa tekanan bertahan hidup."],
          cons: ["Progres kemajuan karir berjalan lambat karena fokus yang terbagi.", "Seringkali kelelahan fisik karena jam kerja menjadi sangat panjang."]
        },
        {
          title: "Menunda Keputusan 6-12 Bulan untuk Sertifikasi & Finansial",
          desc: "Tetap di posisi karir saat ini sambil mengumpulkan dana darurat 2x lipat dan menyelesaikan sertifikasi internasional yang relevan sebelum membuat keputusan.",
          pros: ["Kesiapan mental dan finansial jauh lebih matang saat transisi.", "Nilai tawar Anda di bidang baru langsung tinggi sejak hari pertama."],
          cons: ["Ada risiko kehilangan momentum atau semangat perubahan akibat terlalu lama menunda.", "Tekanan stres di lingkungan lama harus dihadapi lebih lama."]
        }
      ];

      msg = `Keputusan resign atau belok arah karir memang menakutkan di awal, tapi setahun kemudian kamu akan tersenyum bangga melihat portofolio baru yang berhasil kita bangun. Teruslah belajar, ketidakpastian ini adalah bahan bakar terbaik bagi pertumbuhan kita.`;
      
    } else if (category === "Finansial") {
      timelines = {
        "1month": {
          satisfaction: Math.round(happiness * 1.05),
          condition: `Simulasi sebulan pasca transaksi finansial "${decision.substring(0, 50)}...". Emosi Anda berfluktuasi antara kepuasan memiliki aset/investasi baru dan kecemasan melihat saldo rekening tunai (likuiditas) yang berkurang drastis.`,
          best: [
            "Kepemilikan aset baru memberikan kebanggaan psikologis dan rasa aman struktural.",
            "Harga aset atau prospek investasi menunjukkan tren awal yang stabil/positif.",
            "Anda langsung dipaksa membuat sistem budgeting pengeluaran baru yang lebih disiplin."
          ],
          worst: [
            "Adanya biaya-biaya admin, pajak, atau komisi tersembunyi yang muncul di luar estimasi awal.",
            "Likuiditas uang tunai Anda sangat mepet, membuat Anda sensitif terhadap pengeluaran darurat dadakan.",
            "Stres psikologis akibat penyesuaian gaya hidup instan yang harus dikurangi."
          ]
        },
        "6month": {
          satisfaction: Math.round(happiness * 0.85),
          condition: "Enam bulan berjalan. Pengeluaran rutin bulanan akibat keputusan finansial ini telah terintegrasi dalam hidup Anda. Anda mulai merasakan dampak nyata pembatasan anggaran (budget constraint) terhadap kebebasan bersenang-senang sehari-hari.",
          best: [
            "Aset finansial berjalan sesuai proyeksi atau memberikan manfaat fungsional nyata bagi Anda.",
            "Anda berhasil menemukan celah hemat baru dalam gaya hidup untuk menyeimbangkan neraca keuangan.",
            "Nilai aset mengalami kenaikan apresiasi nilai (capital gain) tipis."
          ],
          worst: [
            "Rasa bosan atau jenuh akibat pembatasan pengeluaran hiburan yang ketat mulai menumpuk.",
            "Biaya pemeliharaan aset atau depresiasi barang penunjang mulai menagih dana cadangan.",
            "Terjadi fluktuasi pasar atau inflasi lokal yang membuat cicilan/biaya hidup terasa lebih berat."
          ]
        },
        "1year": {
          satisfaction: Math.round(happiness * 0.95),
          condition: "Satu tahun berlalu. Struktur finansial Anda telah menyesuaikan diri sepenuhnya dengan keputusan setahun lalu. Kekayaan bersih (net worth) Anda mulai terdistribusi secara berbeda, dan pondasi investasi jangka panjang mulai terlihat polanya.",
          best: [
            "Ekuitas/aset Anda bertumbuh stabil dan dana darurat perlahan mulai terisi kembali.",
            "Disiplin keuangan yang terbentuk selama 12 bulan terakhir membuat Anda lebih bijak mengelola uang.",
            "Keputusan finansial ini terbukti menjadi jangkar penyelamat inflasi yang efektif."
          ],
          worst: [
            "Sebagian besar dana Anda terkunci pada aset tidak likuid, menyulitkan jika ada peluang investasi lain yang lebih cepat menghasilkan.",
            "Jika ada penurunan pendapatan tak terduga, struktur cicilan/pengeluaran baru ini akan sangat menekan psikologis.",
            "Nilai utilitas dari barang/aset yang dibeli mulai berkurang secara fungsional."
          ]
        }
      };

      alts = [
        {
          title: "Strategi Alokasi Bertahap (Dollar-Cost Averaging)",
          desc: "Membagi modal besar Anda menjadi 12 bagian kecil dan menginvestasikannya secara berkala setiap bulan daripada langsung mengeluarkan uang dalam jumlah besar di awal.",
          pros: ["Menjaga stabilitas likuiditas tunai Anda untuk kebutuhan darurat.", "Menghindari risiko membeli di harga puncak akibat fluktuasi pasar."],
          cons: ["Potensi keuntungan maksimal terlewatkan jika harga aset langsung naik tajam di awal.", "Membutuhkan kedisiplinan eksekusi bulanan yang konsisten."]
        },
        {
          title: "Menyewa / Meminjam Terlebih Dahulu (Sharing Economy)",
          desc: "Memilih menyewa properti/alat atau menggunakan sistem bagi hasil terlebih dahulu untuk menguji kegunaan sebelum melakukan pembelian permanen.",
          pros: ["Tidak ada ikatan hutang jangka panjang atau depresiasi aset cepat.", "Mudah berpindah atau berganti strategi jika preferensi Anda berubah."],
          cons: ["Biaya akumulasi sewa dalam jangka panjang bisa melebihi harga beli aset.", "Tidak ada akumulasi kepemilikan aset fisik di akhir periode."]
        }
      ];

      msg = `Mengurangi konsumsi hari ini memang berat, tapi lembar neraca keuangan kita setahun kemudian membuktikan bahwa disiplin ini menyelamatkan kita dari badai inflasi. Teruslah berhemat dengan cerdas.`;

    } else if (category === "Pendidikan") {
      timelines = {
        "1month": {
          satisfaction: Math.round(happiness * 1.05),
          condition: `Awal masa studi/akademis baru. Anda disibukkan dengan administrasi pendaftaran, perkenalan kampus, dan jadwal kuliah yang padat setelah memutuskan "${decision.substring(0, 50)}...". Pikiran Anda sangat terstimulasi oleh ilmu baru.`,
          best: [
            "Antusiasme belajar yang sangat tinggi dan ketertarikan mendalam pada topik bahasan baru.",
            "Mendapatkan teman belajar (study group) yang suportif dan cerdas.",
            "Dosen atau mentor memberikan impresi awal yang sangat membimbing."
          ],
          worst: [
            "Kewalahan mengatur waktu antara membaca literatur ilmiah yang tebal dan tugas harian.",
            "Timbul sindrom 'impostor' (merasa diri kurang pintar dibanding mahasiswa lain).",
            "Kurang tidur akibat penyesuaian beban kerja akademis yang mendadak melonjak."
          ]
        },
        "6month": {
          satisfaction: Math.round(happiness * 0.9),
          condition: "Ujian tengah semester dan proyek riset kelompok berada pada titik tersibuk. Teori-teori yang dipelajari mulai terasa kompleks, dan Anda dituntut memikirkan aplikasi praktis atau judul tesis/proyek akhir.",
          best: [
            "Mulai mampu menghubungkan konsep teoritis dengan studi kasus dunia nyata secara kritis.",
            "Mendapat nilai tugas pertengahan yang memuaskan dan feedback akademik positif.",
            "Memiliki akses ke jaringan profesional atau alumni melalui seminar kampus."
          ],
          worst: [
            "Mengalami kejenuhan belajar yang kronis akibat rutinitas membaca dan menulis yang padat.",
            "Kehidupan sosial/hiburan berkurang drastis demi mengejar tenggat waktu tugas.",
            "Timbul stres finansial ringan akibat biaya buku, riset, atau kurangnya waktu untuk bekerja sampingan."
          ]
        },
        "1year": {
          satisfaction: Math.round(happiness * 1.1),
          condition: "Tahun pertama studi berakhir. Anda telah menyelesaikan sebagian besar kurikulum atau bahkan lulus. Kapasitas intelektual, analisis, dan cara pandang Anda terhadap masalah telah bergeser menjadi jauh lebih metodologis.",
          best: [
            "Gelar atau kualifikasi akademis baru resmi diraih, meningkatkan kredibilitas resume Anda.",
            "Riset atau proyek akhir Anda berhasil diselesaikan dengan hasil yang membanggakan.",
            "Terbukanya peluang karir baru yang sebelumnya tertutup tanpa kualifikasi pendidikan ini."
          ],
          worst: [
            "Ada masa transisi mencari kerja kembali atau menyesuaikan diri dengan dunia kerja praktis pasca kuliah.",
            "Menyadari bahwa teori akademis terkadang memiliki gap/jarak dengan dinamika industri riil.",
            "Investasi biaya pendidikan memerlukan waktu pengembalian (ROI) yang tidak instan."
          ]
        }
      };

      alts = [
        {
          title: "Mengambil Kursus Mikro & Sertifikasi Profesional",
          desc: "Alih-alih kuliah formal berbiaya tinggi, mengambil 3-4 sertifikasi industri spesifik yang diakui global (seperti Google, AWS, CFA, dll.) secara mandiri.",
          pros: ["Biaya jauh lebih murah dan hemat waktu hingga 70%.", "Kurikulum sangat praktis dan langsung dicari oleh rekruter saat ini."],
          cons: ["Tidak mendapatkan gelar akademis formal (gelar sarjana/magister).", "Kurang mendapat pengakuan untuk posisi struktural di pemerintahan/BUMN."]
        },
        {
          title: "Program Magang / Kerja Praktik Terbimbing",
          desc: "Menunda pendidikan formal dan melamar magang di perusahaan multinasional demi mendapatkan bimbingan mentor praktis secara langsung di lapangan.",
          pros: ["Mendapat penghasilan riil sambil belajar langsung di industri nyata.", "Membangun portofolio kerja yang kuat sejak awal."],
          cons: ["Beban kerja kasar/rutin seringkali mendominasi dibanding pembelajaran konsep makro.", "Pendidikan formal tetap tertinggal dibanding rekan seangkatan."]
        }
      ];

      msg = `Gelar baru di belakang nama kita bukan cuma hiasan kertas, tapi bukti bahwa batas kemampuan otak kita jauh lebih luas dari yang pernah kita bayangkan sebelumnya. Terima kasih telah memilih untuk belajar lebih tinggi.`;

    } else { // Bisnis, Hubungan, Kesehatan, dll. Generic fallback
      timelines = {
        "1month": {
          satisfaction: Math.round(happiness * 1.02),
          condition: `Bulan pertama pasca implementasi keputusan "${decision.substring(0, 50)}...". Masa transisi awal yang membutuhkan fokus energi tinggi. Anda sedang giat-giatnya membangun pondasi atau kebiasaan baru.`,
          best: [
            "Adanya kepuasan batin karena berani mengeksekusi rencana yang selama ini tertunda.",
            "Hasil-hasil kecil positif mulai terlihat sebagai bukti awal keberhasilan.",
            "Mendapatkan dukungan dari orang-orang terdekat di sekitar Anda."
          ],
          worst: [
            "Beban kerja atau perubahan pola hidup membuat tubuh dan pikiran kelelahan fisik.",
            "Muncul gesekan kecil dengan pihak luar yang belum terbiasa dengan keputusan baru Anda.",
            "Pengeluaran awal tidak terduga untuk mendukung infrastruktur keputusan ini."
          ]
        },
        "6month": {
          satisfaction: Math.round(happiness * 0.88),
          condition: "Enam bulan perjalanan. Konsistensi Anda diuji pada titik terdalam. Tantangan-tantangan operasional harian menuntut komitmen waktu dan energi yang stabil. Euforia awal telah hilang diganti perjuangan rutin.",
          best: [
            "Pondasi sistem baru Anda sudah mulai berjalan secara otomatis (menjadi kebiasaan).",
            "Mulai memetik buah manis dari hasil konsistensi awal berupa efisiensi atau profit.",
            "Kekuatan mental Anda terlatih untuk menghadapi volatilitas harian."
          ],
          worst: [
            "Muncul kejenuhan psikologis akibat rutinitas yang monoton.",
            "Adanya gangguan eksternal (kompetisi, perubahan regulasi, atau dinamika sosial) yang mengganggu rencana.",
            "Pengorbanan waktu luang pribadi yang terasa semakin mahal harganya."
          ]
        },
        "1year": {
          satisfaction: Math.round(happiness * 0.98),
          condition: "Satu tahun berjalan penuh. Keputusan ini telah mendefinisikan babak baru dalam hidup Anda. Anda telah beradaptasi, berimprovisasi, dan mengatasi badai-badai kecil di sepanjang jalan, melahirkan pola hidup yang stabil.",
          best: [
            "Tujuan utama dari keputusan setahun lalu telah tercapai atau berada pada jalur pencapaian 80%.",
            "Anda memiliki pemahaman risiko yang sangat matang berdasarkan pengalaman nyata di lapangan.",
            "Kualitas hidup atau kemandirian Anda melonjak ke level berikutnya."
          ],
          worst: [
            "Anda menyadari bahwa jalan ini memiliki risiko jangka panjang yang harus terus dikelola aktif.",
            "Beberapa alternatif masa lalu yang Anda lewatkan terkadang masih terlintas di pikiran.",
            "Perlu investasi energi berkelanjutan untuk menjaga stabilitas hasil yang sudah dicapai."
          ]
        }
      };

      alts = [
        {
          title: "Pendekatan Iteratif / Uji Coba Skala Kecil",
          desc: "Mengeksekusi keputusan ini secara bertahap pada lingkup kecil (pilot project) selama 3 bulan sebelum berkomitmen penuh.",
          pros: ["Kerugian finansial/waktu sangat minimal jika ternyata proyek gagal.", "Mudah melakukan koreksi arah tanpa dampak sosial yang besar."],
          cons: ["Hasil simulasi kurang mewakili potensi penuh jika dilakukan secara maksimal.", "Butuh waktu lebih lama untuk mencapai skala pertumbuhan yang besar."]
        },
        {
          title: "Kemitraan Strategis / Kolaborasi Pihak Ketiga",
          desc: "Bekerja sama dengan partner atau menggunakan jasa pihak ketiga berpengalaman untuk membagi beban kerja dan risiko keputusan.",
          pros: ["Beban mental dan kerja terbagi sehingga mengurangi risiko stres berat.", "Memanfaatkan keahlian partner untuk mempercepat kesuksesan."],
          cons: ["Harus berbagi profit atau kendali keputusan secara adil.", "Risiko konflik interpersonal jika terjadi perbedaan visi jangka panjang."]
        }
      ];

      msg = `Setiap keringat dan malam tanpa tidur yang kita lalui setahun lalu terbayar lunas saat kita melihat sistem ini akhirnya berjalan mandiri. Keputusanmu hari ini adalah fondasi kesuksesan kita sekarang.`;
    }

    // Return full structured simulation dataset
    return {
      category: category,
      title: decision.length > 50 ? decision.substring(0, 47) + "..." : decision,
      decision: decision,
      additional_information: additionalInfo,
      timeline: timelines,
      scores: {
        happiness: happiness,
        regret: regret,
        financial: financial,
        risk: risk,
        reasons: {
          happiness: `Tingkat kepuasan emosional diperkirakan bernilai ${happiness}/100 berdasarkan otonomi diri dan pemenuhan ekspektasi psikologis keputusan ini.`,
          regret: `Skor penyesalan ${regret}/100 karena keputusan ini ${risk > 60 ? 'berisiko tinggi namun memberikan pelajaran hidup bernilai' : 'cukup terencana dengan jaring pengaman yang memadai'}.`,
          financial: `Dampak finansial bersih diproyeksikan berada di angka ${financial}/100 menyesuaikan rasio investasi modal awal dibanding potensi return.`,
          risk: `Tingkat ketidakpastian dinilai sebesar ${risk}/100 karena melibatkan ${risk > 65 ? 'perubahan radikal dari kebiasaan/pendapatan stabil Anda sebelumnya' : 'langkah-langkah mitigasi yang cukup terukur'}.`
        }
      },
      alternatives: alts,
      futureMessage: msg
    };
  }

  // --- RENDERING FUNCTIONS ---

  // Render Preset Cards
  function renderPresets() {
    const grid = document.getElementById('presets-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    presetScenarios.forEach(preset => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'preset-card';
      card.dataset.id = preset.id;
      card.innerHTML = `
        <div class="preset-title">${preset.title}</div>
        <div class="preset-desc">${preset.decision.substring(0, 85)}...</div>
        <div style="margin-top: 8px;"><span class="cyber-badge cyber-badge-cyan" style="font-size: 0.65rem; padding: 2px 8px;">${preset.category}</span></div>
      `;
      
      card.addEventListener('click', () => {
        // Load preset directly
        runLoadingSequence(preset);
      });
      grid.appendChild(card);
    });
  }
  renderPresets();

  // Run holographic terminal simulator
  function runLoadingSequence(simulationData) {
    const overlay = document.getElementById('loading-overlay');
    const logsContainer = document.getElementById('terminal-log');
    if (!overlay || !logsContainer) return;

    // Reset log content
    logsContainer.innerHTML = '';
    overlay.classList.add('active');

    // Hologram boot lines
    const logLines = [
      { text: "System Boot: FutureLens AI Quantum Predictor", class: "" },
      { text: "Connecting to temporal node matrices...", class: "" },
      { text: `Data Category recognized: ${simulationData.category}`, class: "success" },
      { text: "Parsing decision vectors...", class: "" },
      { text: "Running Monte Carlo timeline divergence model (n=10,000)...", class: "" },
      { text: "Simulating 1 Month timeline branch...", class: "success" },
      { text: "Simulating 6 Months timeline branch...", class: "success" },
      { text: "Simulating 1 Year timeline branch...", class: "success" },
      { text: "Calculating Happiness & Regret Index metrics...", class: "" },
      { text: "Drafting alternative choice options...", class: "" },
      { text: "Encoding Time Capsule text package...", class: "" },
      { text: "Timeline simulation completed. Outputting Hologram Deck.", class: "success" }
    ];

    let currentLine = 0;
    
    function printNextLine() {
      if (currentLine < logLines.length) {
        const line = document.createElement('div');
        line.className = `terminal-line ${logLines[currentLine].class}`;
        line.innerText = `> ${logLines[currentLine].text}`;
        logsContainer.appendChild(line);
        
        // Auto scroll to bottom
        logsContainer.scrollTop = logsContainer.scrollHeight;
        
        currentLine++;
        // Speed up the printing slightly to keep user engaged (150ms to 250ms per line)
        setTimeout(printNextLine, 120 + Math.random() * 100);
      } else {
        // Finished logs. Switch view
        setTimeout(() => {
          overlay.classList.remove('active');
          renderDashboard(simulationData);
        }, 600);
      }
    }

    setTimeout(printNextLine, 200);
  }

  // Render Simulation Dashboard content
  function renderDashboard(data) {
    currentSimulationData = data;
    
    // Hide setup view, show dashboard view
    document.getElementById('setup-view').style.display = 'none';
    const dbView = document.getElementById('dashboard-view');
    dbView.style.display = 'flex';
    dbView.classList.add('active');

    // Populate Headers
    document.getElementById('dash-badge-category').innerText = data.category;
    document.getElementById('dash-title-decision').innerText = data.decision;

    // Timeline Panels Loading
    // Month 1
    document.getElementById('satisfaction-val-1m').innerText = `${data.timeline["1month"].satisfaction}%`;
    document.getElementById('condition-1m').innerHTML = `<strong>Kondisi Umum:</strong> ${data.timeline["1month"].condition}`;
    populateBullets('best-list-1m', data.timeline["1month"].best);
    populateBullets('worst-list-1m', data.timeline["1month"].worst);

    // Month 6
    document.getElementById('satisfaction-val-6m').innerText = `${data.timeline["6month"].satisfaction}%`;
    document.getElementById('condition-6m').innerHTML = `<strong>Kondisi Umum:</strong> ${data.timeline["6month"].condition}`;
    populateBullets('best-list-6m', data.timeline["6month"].best);
    populateBullets('worst-list-6m', data.timeline["6month"].worst);

    // Year 1
    document.getElementById('satisfaction-val-1y').innerText = `${data.timeline["1year"].satisfaction}%`;
    document.getElementById('condition-1y').innerHTML = `<strong>Kondisi Umum:</strong> ${data.timeline["1year"].condition}`;
    populateBullets('best-list-1y', data.timeline["1year"].best);
    populateBullets('worst-list-1y', data.timeline["1year"].worst);

    // Reset timelines to 1m active tab
    switchTimelineTab('1month');

    // Animate Gauges
    animateGauge('gauge-happiness', 'val-happiness', data.scores.happiness);
    animateGauge('gauge-regret', 'val-regret', data.scores.regret);
    animateGauge('gauge-financial', 'val-financial', data.scores.financial);
    animateGauge('gauge-risk', 'val-risk', data.scores.risk);

    // Set Gauge descriptions
    document.getElementById('desc-happiness').innerText = data.scores.reasons.happiness;
    document.getElementById('desc-regret').innerText = data.scores.reasons.regret;
    document.getElementById('desc-financial').innerText = data.scores.reasons.financial;
    document.getElementById('desc-risk').innerText = data.scores.reasons.risk;

    // Render Alternatives
    renderAlternatives(data.alternatives);

    // Reset capsule hologram text
    document.getElementById('capsule-message-text').innerText = '';
    document.getElementById('capsule-message-text').classList.remove('cursor-typing');
  }

  // Utility to write lists
  function populateBullets(elementId, items) {
    const list = document.getElementById(elementId);
    if (!list) return;
    list.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerText = item;
      list.appendChild(li);
    });
  }

  // Render Alternatives Cards
  function renderAlternatives(alternatives) {
    const container = document.getElementById('alternatives-container');
    if (!container) return;
    container.innerHTML = '';

    alternatives.forEach((alt, idx) => {
      const card = document.createElement('div');
      card.className = 'alt-card glass-panel';
      
      let proBullets = '';
      alt.pros.forEach(p => proBullets += `<li>${p}</li>`);
      let conBullets = '';
      alt.cons.forEach(c => conBullets += `<li>${c}</li>`);

      card.innerHTML = `
        <div class="alt-card-header">
          <h4>Alternatif ${idx + 1}: ${alt.title}</h4>
          <span class="cyber-badge cyber-badge-fuchsia" style="font-size: 0.65rem; padding: 2px 8px;">ALT PATH</span>
        </div>
        <p class="alt-card-desc">${alt.desc}</p>
        <div class="alt-split">
          <div class="alt-column pro">
            <h5><i class="fa-solid fa-plus-circle"></i> Potensi Keuntungan</h5>
            <ul>${proBullets}</ul>
          </div>
          <div class="alt-column con">
            <h5><i class="fa-solid fa-minus-circle"></i> Potensi Risiko</h5>
            <ul>${conBullets}</ul>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // SVG Gauge Animation
  function animateGauge(gaugeId, valueId, targetValue) {
    const fill = document.getElementById(gaugeId);
    const textVal = document.getElementById(valueId);
    if (!fill || !textVal) return;

    // The circle length is 2 * PI * r = 2 * 3.1415 * 40 = 251.2
    const totalLength = 251.2;
    
    // Start from full empty
    fill.style.strokeDashoffset = totalLength;

    // Trigger animation frame delay
    setTimeout(() => {
      const offset = totalLength - (totalLength * targetValue / 100);
      fill.style.strokeDashoffset = offset;
    }, 150);

    // Number ticker animation
    let currentVal = 0;
    const duration = 1000; // 1s
    const stepTime = Math.abs(Math.floor(duration / targetValue));
    
    // Safety check for 0
    if (targetValue === 0) {
      textVal.innerText = '0';
      return;
    }

    const timer = setInterval(() => {
      currentVal++;
      textVal.innerText = currentVal;
      if (currentVal >= targetValue) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Timeline Tab Switcher
  function switchTimelineTab(tabName) {
    // Nav tabs styling
    const tabs = document.querySelectorAll('.timeline-tab');
    tabs.forEach(tab => {
      if (tab.dataset.timeline === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Content panels switching
    const panels = document.querySelectorAll('.timeline-content-panel');
    panels.forEach(panel => {
      if (panel.id === `panel-${tabName}`) {
        panel.classList.add('active');
        
        // Trigger satisfaction progress bar animation when panel is visible
        const barId = `satisfaction-bar-${tabName === '1month' ? '1m' : tabName === '6month' ? '6m' : '1y'}`;
        const barElement = document.getElementById(barId);
        if (barElement && currentSimulationData) {
          const satisfactionKey = tabName === '1month' ? '1month' : tabName === '6month' ? '6month' : '1year';
          const targetPercent = currentSimulationData.timeline[satisfactionKey].satisfaction;
          
          barElement.style.width = '0%';
          setTimeout(() => {
            barElement.style.width = `${targetPercent}%`;
          }, 50);
        }
      } else {
        panel.classList.remove('active');
      }
    });
  }

  // Hook Tab click events
  document.querySelectorAll('.timeline-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchTimelineTab(tab.dataset.timeline);
    });
  });

  // --- TIME CAPSULE TYPEWRITER EFFECT ---
  let isTyping = false;
  function triggerTypewriter(text, elementId) {
    const el = document.getElementById(elementId);
    if (!el || isTyping) return;

    isTyping = true;
    el.innerText = '';
    el.classList.add('cursor-typing');

    let index = 0;
    const speed = 40; // milliseconds per character

    function typeChar() {
      if (index < text.length) {
        el.innerText += text.charAt(index);
        index++;
        setTimeout(typeChar, speed);
      } else {
        el.classList.remove('cursor-typing');
        isTyping = false;
      }
    }
    typeChar();
  }

  // Open/Close Holographic Capsule Modal
  const openCapsuleBtn = document.getElementById('open-capsule-btn');
  const closeCapsuleBtn = document.getElementById('close-capsule-btn');
  const capsuleModal = document.getElementById('capsule-modal');

  if (openCapsuleBtn && capsuleModal) {
    openCapsuleBtn.addEventListener('click', () => {
      capsuleModal.classList.add('active');
      if (currentSimulationData) {
        // Start typing the dynamic message after modal pops up
        setTimeout(() => {
          triggerTypewriter(currentSimulationData.futureMessage, 'capsule-message-text');
        }, 400);
      }
    });
  }

  if (closeCapsuleBtn && capsuleModal) {
    closeCapsuleBtn.addEventListener('click', () => {
      capsuleModal.classList.remove('active');
      // Stop typing if modal is closed
      isTyping = false;
    });
  }

  // --- FORM SUBMIT ACTION ---
  const form = document.getElementById('decision-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const category = document.getElementById('category-select').value;
      const decision = document.getElementById('decision-text').value;
      const additionalInfo = document.getElementById('info-text').value;

      if (!category || !decision || !additionalInfo) {
        alert("Harap lengkapi semua parameter keputusan.");
        return;
      }

      // Generate the custom simulation dataset
      const customSimData = generateCustomSimulation(category, decision, additionalInfo);
      
      // Fire loader
      runLoadingSequence(customSimData);
    });
  }

  // Logo Reset click handler
  const logoBtn = document.getElementById('logo-btn');
  const backBtn = document.getElementById('back-btn');
  
  function resetToForm() {
    const dbView = document.getElementById('dashboard-view');
    dbView.style.display = 'none';
    dbView.classList.remove('active');
    
    const setupView = document.getElementById('setup-view');
    setupView.style.display = 'grid';
    
    // Clear forms only if desired, or keep to let user tweak
  }

  if (logoBtn) logoBtn.addEventListener('click', resetToForm);
  if (backBtn) backBtn.addEventListener('click', resetToForm);

  // Print/Export Report Handler
  const printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
