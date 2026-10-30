// ==========================================================================
// TYPE.E — TYPING ENGINE (typing-engine.js)
// Robust single-source-of-truth typing processor & passage library
// ==========================================================================

const PASSAGES = {
  easy: [
    "The morning sunlight poured through the open kitchen window while fresh coffee brewed quietly on the counter. A gentle breeze stirred the green curtains as birds sang in the garden trees.",
    "Reading a good book in a quiet corner of the library helps calm the mind after a busy week. You can discover distant galaxies, ancient kingdoms, and memorable characters within every chapter.",
    "The small wooden boat drifted slowly across the calm blue lake. Tall pine trees lined the rocky shoreline, reflecting perfectly against the still surface of the cool mountain water.",
    "Baking warm sourdough bread requires simple ingredients and steady patience. Mixing flour, water, and salt creates a soft dough that rises slowly overnight before baking to a golden crust.",
    "Walking along the sandy beach at sunset is one of the most relaxing experiences in summer. The rhythmic sound of ocean waves washes away daily stress while seagulls glide in the evening sky.",
    "Learning to play an acoustic guitar takes daily practice and finger strength. Strumming simple chords like major G and minor E brings cheerful melodies to life inside any cozy room.",
    "A friendly golden retriever ran across the open park chasing a bright red ball. He brought it back happily with a wagging tail, eager for another throw across the fresh green lawn.",
    "The old clock on the wooden mantelpiece ticked with steady rhythm through the quiet afternoon. Outside, gentle raindrops tapped softly against the glass windows of the study.",
    "Planting colorful flowers in the spring brings vibrant butterflies and busy honeybees into the yard. Bright yellow sunflowers and purple lavender grow taller with every sunny afternoon.",
    "Riding a bicycle along the quiet river trail is a wonderful way to enjoy fresh air. You pass wooden bridges, grazing horses, and peaceful fishermen resting beneath willow branches.",
    "Making homemade pizza with family is both fun and delicious. Everyone rolls out their own crust, spreads sweet tomato sauce, and tops it with melting mozzarella and fresh basil leaves.",
    "The astronomer set up a brass telescope on the roof to observe the silver moon. Craters, mountain ridges, and vast volcanic plains appeared clearly in the sharp night lens.",
    "Autumn leaves turned vibrant shades of amber, gold, and scarlet before falling to the forest path. A crisp autumn wind rustled the high oak branches as squirrels gathered winter acorns.",
    "A cup of warm green tea with a spoonful of honey provides comfort on chilly mornings. Holding the ceramic mug warms your hands while steam rises gently into the brisk room.",
    "Visiting a bustling farmers market is a delight for all the senses. Stalls overflow with ripe strawberries, crisp carrots, fragrant herbs, and freshly baked blueberry muffins.",
    "The painter mixed cobalt blue and titanium white on a wooden palette to capture the sky. Broad brushstrokes created billowy clouds floating above a field of blooming golden poppies.",
    "Camping under a clear starlit sky makes you appreciate the vast beauty of nature. The crackle of the campfire and the smell of toasted pine wood create memories that last forever.",
    "A tiny hummingbird hovered near a bright crimson blossom, flapping its wings at incredible speed. It sipped sweet nectar for a fleeting moment before darting away into the hedge.",
    "The city park was filled with children laughing near the stone fountain. Parents sat on park benches reading newspapers while ducks swam peacefully across the reflective pond.",
    "Cooking a hearty vegetable soup filled the house with the rich aroma of roasted garlic and thyme. Carrots, potatoes, and green beans simmered gently together in a heavy copper pot.",
    "Writing letters with a fountain pen adds personal charm to simple thoughts. Watching dark ink glide smoothly across heavy paper feels thoughtful in our fast digital world.",
    "A curious gray cat curled up on a soft velvet armchair near the glowing fireplace. She purred softly as she watched drifting snowflakes melt against the warm window pane.",
    "The mountain railway climbed slowly along steep cliffs and through dark tunnels. Passengers gazed out at snowcapped peaks and deep emerald valleys glistening under the morning sun.",
    "Listening to classical piano music in the evening creates a peaceful atmosphere. Gentle notes drift through the quiet house, bringing calm after a long day of focused work.",
    "Fresh oranges and sweet lemons hung heavy from green branches in the sunny grove. The sweet citrus scent filled the warm afternoon air as farm workers gathered the harvest."
  ],
  medium: [
    "Modern architectural design balances aesthetic beauty with environmental sustainability. Engineers utilize passive solar heating, green rooftop gardens, and recycled timber to construct living spaces that harmonize with their natural surroundings while minimizing net energy consumption.",
    "Deep ocean exploration continues to uncover remarkable bioluminescent organisms thriving thousands of meters below the surface. These deep-sea creatures generate their own cold light through intricate chemical reactions, navigating pitch-black volcanic trenches under crushing hydrostatic pressure.",
    "The transition toward renewable energy demands significant advancements in grid-scale battery storage. Lithium-iron-phosphate chemistry and emerging flow batteries offer durable alternatives, allowing electrical grids to smooth out fluctuations from solar farms and offshore wind installations.",
    "Specialty coffee roasting is an intricate craft combining organic chemistry and thermal physics. Master roasters carefully regulate airflow, drum temperature, and roast duration to develop delicate notes of jasmine, bergamot, and chocolate locked inside high-altitude Arabica beans.",
    "The invention of movable metal type by Johannes Gutenberg in the fifteenth century revolutionized the dissemination of knowledge across Europe. Suddenly, scientific treatises and classical philosophy could be reproduced reliably, sparking widespread literacy and educational reform.",
    "Alpine mountaineering demands meticulous route planning, physical endurance, and unwavering psychological resilience. Climbers must read changing weather patterns, navigate treacherous crevasse fields, and manage biological acclimatization before attempting the summit ridge.",
    "Urban transit planners around the world are redesigning public transportation networks around multimodal mobility hubs. By integrating light rail lines, protected bicycle lanes, and electric bus corridors, modern cities reduce carbon emissions and ease chronic traffic congestion.",
    "Biological neural networks possess an extraordinary capability known as synaptic plasticity, allowing the brain to rewire connections in response to novel experiences. This dynamic adaptability underpins human memory consolidation, sensory processing, and lifelong cognitive development.",
    "Satellite constellations orbiting in low Earth orbits deliver low-latency broadband internet to isolated rural communities and maritime vessels. Phased-array ground antennas track moving satellites autonomously across the sky, maintaining high-speed links across thousands of kilometers.",
    "The James Webb Space Telescope utilizes an enormous gold-plated beryllium primary mirror and a multi-layered sunshield to observe the universe in infrared light. It captures unprecedented views of early galaxy formation and analyzes the atmospheric chemistry of distant exoplanets.",
    "Traditional wooden watchmaking exemplifies the pinnacle of mechanical precision and artistic patience. Tiny balance wheels, hairsprings, and ruby jewel bearings operate in seamless harmony without electricity, keeping time through the steady unwinding of a coiled mainspring.",
    "Global ocean currents act as a planetary conveyor belt, transporting warm tropical waters toward polar regions and regulating terrestrial climates. Melting ice sheets and shifting salinity gradients present complex challenges for meteorologists modeling future weather stability.",
    "Digital camera sensors have evolved from early charge-coupled devices to modern backside-illuminated CMOS architectures. Specialized photodiodes capture millions of photons per pixel with extraordinary dynamic range, rendering clean shadows and vivid highlights even in twilight.",
    "Modern bridges, like cable-stayed and suspension spans, are marvels of civil engineering that conquer treacherous waterways. High-tensile steel cables distribute massive vehicular weight into reinforced concrete anchorages, engineered to endure hurricane-force winds and earthquakes.",
    "Forest ecologies rely on intricate underground fungal networks known as mycorrhizae. Trees share sugars, water, and warning signals through this subterranean communication system, demonstrating that healthy forests function as cooperative communities rather than isolated competitors.",
    "Sound design in modern filmmaking creates emotional resonance and spatial immersion that pictures alone cannot achieve. Foley artists construct auditory layers using surprising everyday objects, amplifying footsteps, fabric rustles, and distant thunder with cinematic fidelity.",
    "The study of ancient linguistics reveals fascinating genealogies connecting distant modern languages. By comparing grammatical structures and phonetic shifts across Indo-European tongues, historical researchers reconstruct forgotten proto-languages spoken thousands of years ago.",
    "Desalination technology provides essential fresh drinking water to arid coastal regions around the globe. Advanced reverse osmosis membranes filter out dissolved salts and minerals under tremendous pressure, transforming ocean seawater into clean municipal tap water.",
    "The art of ceramic pottery requires deep intuition of clay hydration, throwing technique, and kiln firing atmosphere. As mineral glazes melt at twelve hundred degrees Celsius, vibrant colors emerge from chemical transformations between silica, iron oxides, and feldspar.",
    "High-speed rail corridors link metropolitan centers with extraordinary efficiency, reaching cruising speeds of over three hundred kilometers per hour. Aerodynamic nose cones and magnetic eddy-current braking systems ensure whisper-quiet rides with remarkable energy conservation.",
    "Human sleep architecture consists of alternating cycles between rapid eye movement and slow-wave stages. During deep slumber, the brain flushes out metabolic waste, stabilizes hormonal balances, and transforms fleeting daily perceptions into durable long-term memories.",
    "Modern glassmaking integrates automated robotic shears with precision tin flotation baths to produce flawless architectural float glass. Low-emissivity coatings reflect solar radiation while admitting natural daylight, significantly reducing indoor heating and cooling demands.",
    "Bird migration represents one of the most astonishing navigational feats in the natural world. Species like the Arctic tern travel thousands of miles between polar regions twice every year, orienting themselves by the stars, the sun, and the geomagnetic field of the Earth.",
    "Bicycle frame builders carefully blend lightweight aerospace alloys with customized carbon layups to optimize torsional rigidity and road compliance. The result is a responsive machine that converts every watt of rider pedaling into effortless forward acceleration.",
    "Volcanic soil enrichment fosters some of the most fertile agricultural regions across our planet. Weathered basaltic rock releases vital potassium, magnesium, and phosphorus into the loam, supporting lush terraced vineyards and bountiful fruit orchards along mountain slopes."
  ],
  hard: [
    "In distributed consensus protocols (e.g., Raft & Paxos), state machines achieve total replication via append-only write logs; term-epoch counters ensure that stale leader nodes cannot commit conflicting state partitions during network splits [split-brain mitigation]!",
    "Modern optimizing compilers transform AST structures into static single assignment [SSA] form: dead-code elimination, phi-node insertion, and loop-invariant hoisting reduce instruction cycle counts by ~28.4% across SIMD vector extensions (AVX-512 & ARM Neon).",
    "The cryptographic hash SHA-256 processes 512-bit message blocks through 64 rounds of non-linear bitwise operations: Maj(x, y, z) := (x & y) ^ (x & z) ^ (y & z), combined with modular 2^32 arithmetic to ensure collision resistance against brute-force pre-image attacks.",
    "Database isolation levels [ANSI/ISO SQL-92]: Read Committed, Repeatable Read, and Serializable mitigate dirty reads, non-repeatable reads, and phantom tuples; however, multi-version concurrency control (MVCC) introduces vacuuming overhead for tombstoned dead rows.",
    "Asynchronous I/O event loops (such as Linux epoll, FreeBSD kqueue, and Windows IOCP) handle 100,000+ concurrent TCP socket connections via edge-triggered polling; non-blocking system calls eliminate thread-context-switch overhead: latency < 1.25 ms @ p99.9!",
    "Microcontroller peripherals interface via synchronous SPI (MOSI/MISO/SCK/CS) and multi-master I2C protocols (SDA/SCL lines with 4.7kΩ pull-up resistors); specifically, start-condition bits trigger 7-bit addressing frames at clock frequencies reaching 3.4 MHz (High-Speed Mode).",
    "Quantum error correction utilizes surface codes on 2D arrays of physical superconducting transmons; syndrome measurements detect bit-flip (X-gate) and phase-flip (Z-gate) faults continuously without collapsing the entangled logical qubit wavefunction: F >= 99.85%!",
    "The TCP congestion-control algorithm (BBR v2) measures both round-trip bottleneck bandwidth (BtlBw) and minimum one-way delay (RTprop); by operating at the exact inflection point of Kleinrock's queueing model, packet loss drops by 94.2% on bufferbloated cellular links.",
    "Relational query optimizers generate cost estimates using cardinality heuristics: C_total = (N_io * Cost_page) + (N_tuples * Cost_cpu); hash joins outpace nested-loop evaluations when build-side hash tables fit entirely within designated work_mem allocations.",
    "Zero-knowledge proofs (zk-SNARKs & zk-STARKs) allow a prover to establish mathematical validity of statement 'S' without revealing private witness 'w'; elliptic-curve pairings (e.g., BN-254 or BLS12-381) compute polynomial commitments with O(1) proof verification time!",
    "Kernel virtual memory managers coordinate four-level hierarchical page tables (PML4 -> PDPT -> PD -> PT); Translation Lookaside Buffers [TLBs] cache virtual-to-physical address mappings, mitigating multi-cycle page-table walks across 64-bit architecture address spaces.",
    "Signal processing via Fast Fourier Transform (Cooley-Tukey FFT): decomposes an N-point discrete time-domain sequence into O(N log N) frequency bins; butterfly arithmetic units compute complex twiddle factors: W_N^k = e^(-j*2*pi*k/N) across interleaved radix-2 stages.",
    "Modern high-frequency trading engines enforce zero-allocation C++ memory pools; cache-line aligned ring buffers (64-byte padding to prevent false sharing) consume raw NASDAQ ITCH binary market-feed packets with median tick-to-trade latency under 450 nanoseconds!",
    "Liquid chromatography-tandem mass spectrometry (LC-MS/MS) isolates peptide ions by mass-to-charge ratios (m/z); high-energy collision-induced dissociation (CID) fragments amide bonds along the polypeptide backbone, resolving b-ion and y-ion series with < 2 ppm mass accuracy.",
    "The Git object storage architecture implements a directed acyclic graph (DAG) of content-addressable blobs, trees, and commit objects; zlib compression and delta-encoding packfiles minimize disk footprint while ensuring cryptographic immutability via 160-bit SHA-1 hashes.",
    "Graphics rendering pipelines process vertex shaders, rasterization, and fragment lighting calculations; depth-stencil buffers prevent overdraw via early-Z testing: FragColor = ambient + diffuse * max(dot(N, L), 0.0) + specular * pow(max(dot(R, V), 0.0), shininess).",
    "Cellular telecommunication standards (5G NR Release 16): utilize orthogonal frequency-division multiplexing (OFDM) across sub-6 GHz and millimeter-wave bands (28 GHz); beamforming antenna arrays adjust phase shifts electronically to deliver multi-gigabit throughput.",
    "Thread synchronization primitives: mutexes, read-write spinlocks, and lock-free CAS (compare-and-swap) atomics prevent data races on shared memory regions; memory barrier instructions ('mfence' & 'dmb') prevent out-of-order CPU instruction reordering across cache lines.",
    "The Linux Virtual Filesystem (VFS) abstracts block-device operations across ext4, Btrfs, and XFS; inode metadata stores file permissions, link counts, and extents pointers, while the directory entry cache (dcache) accelerates path lookups: lookup_fast() -> dget().",
    "Neural network transformer architectures compute scaled dot-product attention: Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V; multi-head projections allow models to jointly attend to contextual representations from diverse subspace representations simultaneously.",
    "Automated flight management systems execute triple-redundant fly-by-wire voting logic; pitch, roll, and yaw accelerometers sample state matrices at 400 Hz, applying Kalman filter corrections to neutralize atmospheric turbulence and aerodynamic crosswinds.",
    "Optical coherence tomography (OCT) measures low-coherence interferometry across biological tissue; superluminescent diodes emit near-infrared light (840–1310 nm), achieving micrometer-scale axial resolution to visualize retinal layers and corneal cross-sections in real time.",
    "Public-key cryptography via RSA depends on the computational hardness of factoring large semiprime integers: n = p * q; modular exponentiation: c = m^e (mod n) encrypts cleartext, while Euler's totient phi(n) = (p-1)*(q-1) generates the private decryptor key 'd'.",
    "Real-time operating systems (RTOS) schedule periodic deterministic tasks using Rate-Monotonic (RMS) or Earliest-Deadline-First (EDF) algorithms; priority inheritance protocols neutralize priority inversions when high-priority tasks block on shared mutex semaphores.",
    "Semiconductor lithography utilizes extreme ultraviolet light (EUV: lambda = 13.5 nm) generated by pulsing molten tin droplets with high-power CO2 lasers; numerical aperture optics project multi-patterned masks onto silicon wafers with sub-2 nm gate tolerances."
  ]
};

class TypingEngine {
  constructor() {
    this.status = "READY"; // 'READY' | 'RUNNING' | 'FINISHED'
    this.passageText = "";
    this.chars = [];
    this.currentIndex = 0;
    this.startTime = null;
    this.timerId = null;
    this.timeRemaining = 60;
    this.totalDuration = 60;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.totalAttempted = 0;
    this.liveWPM = 0;
    this.liveAccuracy = 100;
    this.recordedTimeline = [];
    this.inputEl = null;
    this.displayEl = null;
    this.lastInputLength = 0;
    this.lastPassageIndices = { easy: -1, medium: -1, hard: -1 };
  }

  init(inputSelector = "#typing-input", displaySelector = "#passage-display") {
    this.inputEl = document.querySelector(inputSelector);
    this.displayEl = document.querySelector(displaySelector);

    if (this.inputEl) {
      this.inputEl.value = "";
      this.inputEl.oninput = (e) => this.handleSingleSourceInput(e);
      this.inputEl.onkeydown = (e) => this.handleAuxiliaryKeyDown(e);
      this.inputEl.onkeyup = (e) => this.handleAuxiliaryKeyUp(e);
    }

    if (this.displayEl) {
      this.displayEl.onclick = () => {
        if (this.inputEl) this.inputEl.focus();
      };
    }
  }

  setupTest(customText = null) {
    this.stopTimer();
    const state = window.TypeEStorage.get();
    this.status = "READY";
    this.totalDuration = state.duration || 60;
    this.timeRemaining = this.totalDuration;
    this.startTime = null;
    this.recordedTimeline = [];
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.totalAttempted = 0;
    this.liveWPM = 0;
    this.liveAccuracy = 100;
    this.lastInputLength = 0;

    // Choice logic: Default prompts always pick predefined; Custom text picks custom
    if (customText) {
      this.passageText = customText.trim();
    } else if (state.promptChoice === "custom" && state.customPassage && state.customPassage.trim().length > 0) {
      this.passageText = state.customPassage.trim();
    } else {
      const diffKey = state.difficulty === "custom" ? "medium" : (state.difficulty || "medium");
      const pool = PASSAGES[diffKey] || PASSAGES.medium;
      let idx = Math.floor(Math.random() * pool.length);
      if (pool.length > 1 && idx === this.lastPassageIndices[diffKey]) {
        idx = (idx + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
      }
      this.lastPassageIndices[diffKey] = idx;
      this.passageText = pool[idx];
    }

    this.chars = this.passageText.split("");
    this.currentIndex = 0;

    if (this.inputEl) {
      this.inputEl.value = "";
      this.inputEl.disabled = false;
      this.inputEl.focus();
    }

    this.renderPassageSpans();
    this.updateTelemetryUI();
    this.updateStatusUI("READY");
    if (window.TypeERace) {
      window.TypeERace.resetRace();
    }
  }

  renderPassageSpans() {
    if (!this.displayEl) return;
    this.displayEl.innerHTML = "";
    const frag = document.createDocumentFragment();

    for (let i = 0; i < this.chars.length; i++) {
      const span = document.createElement("span");
      span.className = "char";
      span.id = `char-${i}`;
      span.textContent = this.chars[i];
      if (i === 0) span.classList.add("char-current");
      frag.appendChild(span);
    }

    this.displayEl.appendChild(frag);
    this.updateProgressBar(0);
  }

  handleSingleSourceInput(e) {
    if (this.status === "FINISHED") {
      this.inputEl.value = this.inputEl.value.slice(0, this.chars.length);
      return;
    }

    const currentVal = this.inputEl.value;
    const currentLen = currentVal.length;

    // Start timer on first keystroke
    if (this.status === "READY" && currentLen > 0) {
      this.startTest();
    }

    // Process new keystrokes vs backspace
    const diff = currentLen - this.lastInputLength;
    if (diff > 0) {
      for (let i = this.lastInputLength; i < currentLen && i < this.chars.length; i++) {
        const typedChar = currentVal[i];
        const expectedChar = this.chars[i];
        const isMatch = (typedChar === expectedChar);

        this.totalAttempted++;
        const targetKey = expectedChar.toLowerCase();

        if (isMatch) {
          this.correctChars++;
          this.trackKey(targetKey, true);
          if (window.TypeESettings) window.TypeESettings.synth.playKey(true);
        } else {
          this.incorrectChars++;
          this.trackKey(targetKey, false);
          if (window.TypeESettings) window.TypeESettings.synth.playKey(false);
        }
      }
    } else if (diff < 0) {
      this.recalculateAccurateCounts(currentVal);
    }

    this.lastInputLength = currentLen;
    this.currentIndex = Math.min(currentLen, this.chars.length);

    this.updateHighlights(currentVal);
    this.calcStats();
    this.updateTelemetryUI();
    this.sampleRaceProgress();

    // Check completion
    if (currentLen >= this.chars.length) {
      this.completeTest();
    }
  }

  recalculateAccurateCounts(currentVal) {
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < currentVal.length && i < this.chars.length; i++) {
      if (currentVal[i] === this.chars[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }
    this.correctChars = correct;
    this.incorrectChars = incorrect;
  }

  updateHighlights(currentVal) {
    if (!this.displayEl) return;
    const spans = this.displayEl.children;
    if (!spans || spans.length === 0) return;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      span.className = "char";

      if (i < currentVal.length) {
        if (currentVal[i] === this.chars[i]) {
          span.classList.add("char-correct");
          if (this.chars[i] === " ") span.textContent = " ";
        } else {
          if (this.chars[i] === " ") {
            span.classList.add("char-space-incorrect");
            span.textContent = "␣";
          } else {
            span.classList.add("char-incorrect");
          }
        }
      } else if (i === currentVal.length) {
        span.classList.add("char-current");
        if (this.chars[i] === " ") span.textContent = " ";
      } else {
        if (this.chars[i] === " ") span.textContent = " ";
      }
    }

    const active = spans[currentVal.length];
    if (active) {
      active.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    const pct = Math.min(100, Math.round((currentVal.length / this.chars.length) * 100));
    this.updateProgressBar(pct);
  }

  updateProgressBar(pct) {
    const bar = document.querySelector("#passage-progress-fill");
    const label = document.querySelector("#passage-progress-text");
    if (bar) bar.style.width = `${pct}%`;
    if (label) label.textContent = `${pct}% (${this.currentIndex}/${this.chars.length})`;
  }

  handleAuxiliaryKeyDown(e) {
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.highlightKey(e.key, true);
    }
  }

  handleAuxiliaryKeyUp(e) {
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.highlightKey(e.key, false);
    }
  }

  insertCharFromVirtualKey(char) {
    if (!this.inputEl || this.status === "FINISHED") return;
    this.inputEl.focus();

    if (char === "Backspace") {
      this.inputEl.value = this.inputEl.value.slice(0, -1);
    } else if (char === "Space") {
      this.inputEl.value += " ";
    } else if (char.length === 1) {
      this.inputEl.value += char;
    }

    this.inputEl.dispatchEvent(new Event("input", { bubbles: true }));
  }

  trackKey(key, isCorrect) {
    const state = window.TypeEStorage.get();
    if (!state.keyStatistics[key]) {
      state.keyStatistics[key] = { attempts: 0, errors: 0 };
    }
    state.keyStatistics[key].attempts++;
    if (!isCorrect) {
      state.keyStatistics[key].errors++;
    }
    window.TypeEStorage.save();
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.updateKeyHeatmap(key);
    }
  }

  startTest() {
    this.status = "RUNNING";
    this.startTime = Date.now();
    this.updateStatusUI("RUNNING");
    if (window.TypeESettings) window.TypeESettings.synth.playCountdown(true);

    this.stopTimer();
    this.sampleRaceProgress();

    this.timerId = setInterval(() => {
      this.timeRemaining--;
      this.calcStats();
      this.updateTelemetryUI();
      this.sampleRaceProgress();

      if (this.timeRemaining <= 0) {
        this.completeTest();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  calcStats() {
    const elapsedMs = this.startTime ? (Date.now() - this.startTime) : 0;
    const elapsedMins = Math.max(0.001, elapsedMs / 60000);
    this.liveWPM = Math.round((this.correctChars / 5) / elapsedMins);

    if (this.totalAttempted > 0) {
      this.liveAccuracy = Math.round((this.correctChars / this.totalAttempted) * 1000) / 10;
    } else {
      this.liveAccuracy = 100;
    }
  }

  sampleRaceProgress() {
    if (!this.startTime) return;
    const elapsedSec = parseFloat(((Date.now() - this.startTime) / 1000).toFixed(2));
    const progress = parseFloat((this.currentIndex / Math.max(1, this.chars.length)).toFixed(3));

    this.recordedTimeline.push({
      time: elapsedSec,
      progress: Math.min(1, progress),
      wpm: this.liveWPM
    });

    if (window.TypeERace) {
      window.TypeERace.updateLiveRace(progress, this.liveWPM, elapsedSec);
    }
  }

  completeTest() {
    this.stopTimer();
    this.status = "FINISHED";
    if (this.inputEl) this.inputEl.disabled = true;

    this.calcStats();
    this.updateStatusUI("FINISHED");
    this.updateTelemetryUI();
    this.sampleRaceProgress();

    if (window.TypeERace) {
      window.TypeERace.onRaceComplete(this.recordedTimeline, this.liveWPM, this.liveAccuracy, this.correctChars, this.incorrectChars, this.totalDuration - this.timeRemaining);
    }
  }

  updateTelemetryUI() {
    const setTxt = (id, val) => {
      const el = document.querySelector(id);
      if (el) el.textContent = val;
    };

    setTxt("#stat-wpm", this.liveWPM);
    setTxt("#stat-accuracy", `${this.liveAccuracy}%`);
    setTxt("#stat-timer", `${this.timeRemaining}s`);
    setTxt("#stat-total-chars", this.totalAttempted);
    setTxt("#stat-correct-chars", this.correctChars);
    setTxt("#stat-incorrect-chars", this.incorrectChars);
  }

  updateStatusUI(st) {
    const pill = document.querySelector("#test-status-pill");
    if (!pill) return;
    pill.className = "status-pill";
    if (st === "READY") {
      pill.classList.add("status-ready");
      pill.innerHTML = `🏁 READY TO RACE`;
    } else if (st === "RUNNING") {
      pill.classList.add("status-running");
      pill.innerHTML = `⚡ RACING LIVE`;
    } else if (st === "FINISHED") {
      pill.classList.add("status-finished");
      pill.innerHTML = `🏆 SPRINT FINISHED`;
    }
  }
}

window.TypeETyping = new TypingEngine();
