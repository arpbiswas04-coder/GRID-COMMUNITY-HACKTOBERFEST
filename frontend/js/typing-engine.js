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

// ==========================================================================
// AUTHENTIC PROGRAMMING PASSAGE LIBRARY
// Covering Python, JavaScript, C, C++, HTML, CSS, SQL across Beginner, Intermediate & Advanced
// ==========================================================================
const PROGRAMMING_PASSAGES = {
  javascript: {
    beginner: [
      'const userName = "Alice"; let score = 42; if (score >= 40) { console.log(`Winner: ${userName}`); }',
      'const fruits = ["apple", "banana", "orange"]; fruits.forEach((item, index) => { console.log(index + ": " + item); });',
      'function calculateArea(width, height) { return (width > 0 && height > 0) ? width * height : 0; }',
      'const user = { id: 101, role: "admin", active: true }; if (user.active && user.role === "admin") { grantAccess(); }',
      'let count = 0; while (count < 5) { count++; console.log("Iteration #" + count); }'
    ],
    intermediate: [
      'async function fetchUserData(userId) { try { const res = await fetch(`/api/users/${userId}`); if (!res.ok) throw new Error("HTTP " + res.status); return await res.json(); } catch (err) { console.error("Fetch failed:", err.message); return null; } }',
      'const debounce = (fn, delay = 300) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; };',
      'const processScores = (students) => { return students.filter(s => s.grade >= 75).map(s => ({ name: s.name, pct: (s.score / 100).toFixed(1) })).sort((a, b) => b.pct - a.pct); };',
      'class EventEmitter { constructor() { this.events = {}; } on(event, listener) { (this.events[event] = this.events[event] || []).push(listener); } emit(event, ...args) { (this.events[event] || []).forEach(fn => fn(...args)); } }',
      'const mergeObjects = (target, source) => { return Object.assign({}, target, source, { updatedAt: Date.now() }); };'
    ],
    advanced: [
      'function topologicalSort(numCourses, prerequisites) { const inDegree = new Array(numCourses).fill(0); const adj = new Map(); for (const [dest, src] of prerequisites) { if (!adj.has(src)) adj.set(src, []); adj.get(src).push(dest); inDegree[dest]++; } const queue = []; for (let i = 0; i < numCourses; i++) { if (inDegree[i] === 0) queue.push(i); } while (queue.length > 0) { const curr = queue.shift(); for (const next of (adj.get(curr) || [])) { if (--inDegree[next] === 0) queue.push(next); } } return inDegree.every(d => d === 0); }',
      'const deepClone = (obj, hash = new WeakMap()) => { if (Object(obj) !== obj || obj instanceof Function) return obj; if (hash.has(obj)) return hash.get(obj); const result = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj)); hash.set(obj, result); return Object.assign(result, ...Object.keys(obj).map(k => ({ [k]: deepClone(obj[k], hash) }))); };',
      'class LRUCache { constructor(capacity) { this.capacity = capacity; this.cache = new Map(); } get(key) { if (!this.cache.has(key)) return -1; const val = this.cache.get(key); this.cache.delete(key); this.cache.set(key, val); return val; } put(key, value) { this.cache.delete(key); if (this.cache.size >= this.capacity) { const oldest = this.cache.keys().next().value; this.cache.delete(oldest); } this.cache.set(key, value); } }',
      'const memoize = (fn) => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn(...args); cache.set(key, result); return result; }; };',
      'function promiseAllSettled(promises) { return Promise.all(promises.map(p => Promise.resolve(p).then(val => ({ status: "fulfilled", value: val }), err => ({ status: "rejected", reason: err })))); }'
    ]
  },
  python: {
    beginner: [
      'total = 0\nfor number in range(1, 11):\n    if number % 2 == 0:\n        total += number\nprint(f"Sum of evens: {total}")',
      'def greet_user(name, title="Guest"):\n    clean_name = name.strip().title()\n    return f"Welcome, {title} {clean_name}!"',
      'user_profiles = {"id": 42, "username": "codemaster", "is_active": True}\nif user_profiles.get("is_active"):\n    print(f"Logged in as {user_profiles[\'username\']}")',
      'temperatures = [68, 72, 75, 71, 69, 74]\naverage_temp = sum(temperatures) / len(temperatures)\nprint(f"Average: {average_temp:.2f} deg")',
      'colors = ["red", "green", "blue"]\nfor idx, col in enumerate(colors):\n    print(f"{idx + 1}: {col.upper()}")'
    ],
    intermediate: [
      'def find_primes(n):\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for p in range(2, int(n ** 0.5) + 1):\n        if is_prime[p]:\n            for i in range(p * p, n + 1, p):\n                is_prime[i] = False\n    return [i for i in range(n + 1) if is_prime[i]]',
      'import json\nfrom pathlib import Path\ndef load_config(filepath):\n    path = Path(filepath)\n    if not path.exists():\n        raise FileNotFoundError(f"Missing config: {path}")\n    with path.open("r", encoding="utf-8") as f:\n        return json.load(f)',
      'class BankAccount:\n    def __init__(self, owner, balance=0.0):\n        self.owner = owner\n        self._balance = max(0.0, balance)\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Deposit must be positive")\n        self._balance += amount\n        return self._balance',
      'words = ["apple", "banana", "cherry", "avocado", "blueberry"]\ngrouped = {}\nfor word in words:\n    key = word[0]\n    grouped.setdefault(key, []).append(word)',
      'squares = [x ** 2 for x in range(20) if x % 3 == 0]\nprint(f"Computed squares: {squares}")'
    ],
    advanced: [
      'import heapq\ndef dijkstra(graph, start):\n    distances = {node: float("inf") for node in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n    while pq:\n        curr_dist, u = heapq.heappop(pq)\n        if curr_dist > distances[u]:\n            continue\n        for v, weight in graph[u].items():\n            distance = curr_dist + weight\n            if distance < distances[v]:\n                distances[v] = distance\n                heapq.heappush(pq, (distance, v))\n    return distances',
      'def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    mid = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + mid + quicksort(right)',
      'from functools import wraps\nimport time\ndef timing_decorator(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = fn(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"[{fn.__name__}] took {elapsed * 1000:.3f} ms")\n        return result\n    return wrapper',
      'class Node:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\ndef invert_tree(root):\n    if not root:\n        return None\n    root.left, root.right = invert_tree(root.right), invert_tree(root.left)\n    return root',
      'import asyncio\nasync def worker(queue, worker_id):\n    while not queue.empty():\n        task = await queue.get()\n        print(f"Worker {worker_id} processing {task}")\n        await asyncio.sleep(0.05)\n        queue.task_done()'
    ]
  },
  c: {
    beginner: [
      '#include <stdio.h>\nint main(void) {\n    int count = 10;\n    float rate = 3.14f;\n    printf("Count: %d, Rate: %.2f\\n", count, rate);\n    return 0;\n}',
      'int sum_array(const int arr[], int len) {\n    int total = 0;\n    for (int i = 0; i < len; i++) {\n        total += arr[i];\n    }\n    return total;\n}',
      'int max_value(int a, int b) {\n    if (a > b) return a;\n    else return b;\n}',
      'char greeting[] = "Hello, C programmer!";\nfor (int i = 0; greeting[i] != \'\\0\'; i++) {\n    if (greeting[i] >= \'a\' && greeting[i] <= \'z\') greeting[i] -= 32;\n}',
      'int is_palindrome(int n) {\n    int rev = 0, orig = n;\n    while (n > 0) { rev = rev * 10 + n % 10; n /= 10; }\n    return (orig == rev);\n}'
    ],
    intermediate: [
      '#include <stdlib.h>\nint* create_buffer(size_t n) {\n    int* buf = (int*)malloc(n * sizeof(int));\n    if (!buf) return NULL;\n    for (size_t i = 0; i < n; i++) {\n        buf[i] = (int)(i * 2);\n    }\n    return buf;\n}',
      'typedef struct {\n    int id;\n    char name[32];\n    double score;\n} Student;\nvoid print_student(const Student* s) {\n    printf("Student #%d: %s (%.1f)\\n", s->id, s->name, s->score);\n}',
      'void swap(int* x, int* y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\nvoid reverse_array(int arr[], int n) {\n    for (int i = 0; i < n / 2; i++) swap(&arr[i], &arr[n - 1 - i]);\n}',
      'int binary_search(const int arr[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}',
      'size_t string_length(const char* str) {\n    const char* ptr = str;\n    while (*ptr) ptr++;\n    return (size_t)(ptr - str);\n}'
    ],
    advanced: [
      'typedef struct ListNode {\n    int val;\n    struct ListNode* next;\n} ListNode;\nListNode* reverse_list(ListNode* head) {\n    ListNode *prev = NULL, *curr = head;\n    while (curr) {\n        ListNode* next_temp = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next_temp;\n    }\n    return prev;\n}',
      'void merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1, n2 = r - m;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}',
      'unsigned int hash_djb2(const unsigned char *str) {\n    unsigned long hash = 5381;\n    int c;\n    while ((c = *str++)) hash = ((hash << 5) + hash) + c;\n    return (unsigned int)(hash % 10007);\n}',
      'typedef struct RingBuffer {\n    int *buffer;\n    size_t head;\n    size_t tail;\n    size_t max;\n    int full;\n} RingBuffer;\nint ring_push(RingBuffer *rb, int data) {\n    rb->buffer[rb->head] = data;\n    if (rb->full) rb->tail = (rb->tail + 1) % rb->max;\n    rb->head = (rb->head + 1) % rb->max;\n    rb->full = (rb->head == rb->tail);\n    return 0;\n}',
      '#include <pthread.h>\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\nint shared_counter = 0;\nvoid* increment(void* arg) {\n    pthread_mutex_lock(&lock);\n    shared_counter++;\n    pthread_mutex_unlock(&lock);\n    return NULL;\n}'
    ]
  },
  cpp: {
    beginner: [
      '#include <iostream>\n#include <string>\nint main() {\n    std::string title = "Type.e Racer";\n    int laps = 3;\n    std::cout << title << " | Laps: " << laps << std::endl;\n    return 0;\n}',
      'std::vector<int> numbers = {10, 20, 30, 40, 50};\nfor (const auto& num : numbers) {\n    if (num > 25) std::cout << "Value: " << num << "\\n";\n}',
      'int add_integers(int a, int b) {\n    return a + b;\n}\nbool is_even(int x) {\n    return (x % 2 == 0);\n}',
      'std::string format_player(const std::string& name, int rank) {\n    return "#" + std::to_string(rank) + " " + name;\n}',
      'int total = 0;\nfor (int i = 1; i <= 100; ++i) {\n    if (i % 5 == 0) total += i;\n}'
    ],
    intermediate: [
      'template<typename T>\nT clamp_val(T val, T min_v, T max_v) {\n    if (val < min_v) return min_v;\n    if (val > max_v) return max_v;\n    return val;\n}',
      '#include <algorithm>\n#include <vector>\nvoid filter_and_sort(std::vector<int>& vec) {\n    vec.erase(std::remove_if(vec.begin(), vec.end(), [](int n) { return n < 0; }), vec.end());\n    std::sort(vec.begin(), vec.end(), std::greater<int>());\n}',
      'class Vector2D {\npublic:\n    double x, y;\n    Vector2D(double x_ = 0, double y_ = 0) : x(x_), y(y_) {}\n    Vector2D operator+(const Vector2D& o) const { return Vector2D(x + o.x, y + o.y); }\n    double dot(const Vector2D& o) const { return x * o.x + y * o.y; }\n};',
      '#include <unordered_map>\nstd::unordered_map<std::string, int> count_frequencies(const std::vector<std::string>& words) {\n    std::unordered_map<std::string, int> freq;\n    for (const auto& w : words) freq[w]++;\n    return freq;\n}',
      'auto is_prime = [](int n) -> bool {\n    if (n <= 1) return false;\n    for (int i = 2; i * i <= n; ++i) if (n % i == 0) return false;\n    return true;\n};'
    ],
    advanced: [
      '#include <memory>\nclass CircuitNode {\npublic:\n    int id;\n    std::shared_ptr<CircuitNode> next;\n    CircuitNode(int id_) : id(id_), next(nullptr) {}\n    void connect(std::shared_ptr<CircuitNode> target) {\n        this->next = std::move(target);\n    }\n};',
      '#include <future>\n#include <thread>\nauto async_sum(const std::vector<int>& data) {\n    return std::async(std::launch::async, [&data]() {\n        long long sum = 0;\n        for (int v : data) sum += v;\n        return sum;\n    });\n}',
      'template<typename T, size_t N>\nclass FixedQueue {\n    T data[N];\n    size_t head = 0, tail = 0, count = 0;\npublic:\n    bool push(const T& item) {\n        if (count == N) return false;\n        data[tail] = item;\n        tail = (tail + 1) % N;\n        count++;\n        return true;\n    }\n};',
      'int max_subarray(const std::vector<int>& nums) {\n    int max_sum = nums[0], curr_sum = nums[0];\n    for (size_t i = 1; i < nums.size(); ++i) {\n        curr_sum = std::max(nums[i], curr_sum + nums[i]);\n        max_sum = std::max(max_sum, curr_sum);\n    }\n    return max_sum;\n}',
      'template<typename... Args>\nvoid print_all(Args&&... args) {\n    (std::cout << ... << std::forward<Args>(args)) << "\\n";\n}'
    ]
  },
  html: {
    beginner: [
      '<div class="profile-card">\n  <h2 class="user-title">Alex Johnson</h2>\n  <p class="user-bio">Frontend engineer &amp; UI enthusiast.</p>\n  <button type="button" class="btn-primary">Follow</button>\n</div>',
      '<nav class="navbar">\n  <a href="/" class="brand-link">SpeedRacer</a>\n  <ul class="nav-links">\n    <li><a href="#arena">Arena</a></li>\n    <li><a href="#stats">Telemetry</a></li>\n  </ul>\n</nav>',
      '<form action="/submit" method="POST">\n  <label for="email-input">Email Address</label>\n  <input type="email" id="email-input" name="email" required />\n  <button type="submit">Subscribe</button>\n</form>',
      '<table class="scores-table">\n  <thead>\n    <tr><th>Rank</th><th>Player</th><th>WPM</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td>Cipher</td><td>114</td></tr>\n  </tbody>\n</table>',
      '<header class="site-header">\n  <h1 class="logo-text">TYPE.<span class="brand-accent">E</span></h1>\n  <p class="tagline">Type Smarter. Improve Faster.</p>\n</header>'
    ],
    intermediate: [
      '<section class="telemetry-panel" id="telemetry" aria-label="Live Telemetry">\n  <header class="panel-header">\n    <h3>HUD METRICS</h3>\n    <span class="badge badge-success">ACTIVE</span>\n  </header>\n  <div class="metrics-grid">\n    <div class="metric-item">\n      <span class="label">SPEED</span>\n      <strong class="val" data-unit="wpm">88</strong>\n    </div>\n  </div>\n</section>',
      '<dialog id="race-modal" class="modal-dialog" aria-modal="true">\n  <div class="modal-content">\n    <h2 class="modal-title">Race Complete</h2>\n    <p id="winner-text">Player outpaced the personal best ghost!</p>\n    <button type="button" id="close-modal-btn">Continue</button>\n  </div>\n</dialog>',
      '<article class="article-preview" data-article-id="art-204">\n  <figure class="thumbnail-wrapper">\n    <img src="/assets/hero.webp" alt="Speed track at dusk" loading="lazy" />\n    <figcaption>Turn 4 - Apex Corner</figcaption>\n  </figure>\n  <div class="article-body">\n    <h2>Mastering Finger Dexterity</h2>\n  </div>\n</article>',
      '<fieldset class="config-fieldset">\n  <legend>Select Duration</legend>\n  <label class="radio-label">\n    <input type="radio" name="race_duration" value="30" />\n    <span>30 Seconds (Sprint)</span>\n  </label>\n  <label class="radio-label">\n    <input type="radio" name="race_duration" value="60" checked />\n    <span>60 Seconds (Circuit)</span>\n  </label>\n</fieldset>',
      '<div class="progress-bar-wrapper" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">\n  <div class="progress-fill" style="width: 75%;"></div>\n  <span class="sr-only">75% Complete</span>\n</div>'
    ],
    advanced: [
      '<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" class="circuit-canvas">\n  <defs>\n    <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">\n      <stop offset="0%" stop-color="#171717" />\n      <stop offset="100%" stop-color="#333333" />\n    </linearGradient>\n  </defs>\n  <path d="M 50,200 C 150,50 350,50 450,200 S 750,350 750,200" fill="none" stroke="url(#trackGrad)" stroke-width="24" stroke-linecap="round" />\n</svg>',
      '<main class="app-layout" role="main">\n  <aside class="sidebar-telemetry" aria-label="Controls">\n    <nav class="sub-nav">\n      <a href="#settings" aria-current="page">General</a>\n    </nav>\n  </aside>\n  <div class="stage-viewport" tabindex="-1" role="region">\n    <canvas id="stage-canvas" width="1280" height="720" aria-label="Interactive simulation"></canvas>\n  </div>\n</main>',
      '<template id="card-template">\n  <li class="result-card">\n    <div class="result-header">\n      <span class="user-slot"></span>\n      <span class="badge status-pill"></span>\n    </div>\n    <div class="speed-bar"><div class="fill-bar"></div></div>\n  </li>\n</template>',
      '<details class="faq-item" open>\n  <summary class="faq-trigger">\n    <span>How is Net WPM calculated?</span>\n    <span class="icon-toggle" aria-hidden="true">&plus;</span>\n  </summary>\n  <div class="faq-content">\n    <p>Net WPM = ((Total Characters / 5) - Uncorrected Errors) / Minutes Elapsed.</p>\n  </div>\n</details>',
      '<form id="form-upload" enctype="multipart/form-data" novalidate>\n  <input type="file" id="file-picker" accept=".json,.csv" multiple hidden />\n  <div id="drop-zone" tabindex="0" role="button">Drag &amp; drop session data here</div>\n</form>'
    ]
  },
  css: {
    beginner: [
      '.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 1rem 1.5rem;\n  box-sizing: border-box;\n}',
      '.btn-primary {\n  background-color: #FFE600;\n  color: #171717;\n  border: 3px solid #171717;\n  box-shadow: 4px 4px 0px #171717;\n  font-weight: 900;\n  cursor: pointer;\n}',
      '.card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 2px solid #000;\n  padding-bottom: 0.5rem;\n}',
      '.text-highlight {\n  font-family: \'JetBrains Mono\', monospace;\n  color: #32B366;\n  font-weight: 800;\n  text-decoration: underline;\n}',
      '.avatar-circle {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 2px solid #171717;\n  object-fit: cover;\n}'
    ],
    intermediate: [
      '@media (max-width: 768px) {\n  .grid-layout {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .nav-bar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}',
      '.keyboard-key {\n  flex: 1;\n  height: 42px;\n  background: #EAE5D9;\n  border: 2px solid #171717;\n  box-shadow: 2px 2px 0px #171717;\n  transition: transform 0.08s ease, background-color 0.1s ease;\n}\n.keyboard-key:active {\n  transform: translate(2px, 2px);\n  box-shadow: 0 0 0 transparent;\n}',
      '.progress-track {\n  position: relative;\n  width: 100%;\n  height: 12px;\n  background: #FAF7F0;\n  border: 2px solid #171717;\n  overflow: hidden;\n}\n.progress-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #FFE600, #00D2FF);\n  transition: width 0.15s cubic-bezier(0.16, 1, 0.3, 1);\n}',
      '.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(23, 23, 23, 0.65);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}',
      '.badge-status {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.2rem 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}'
    ],
    advanced: [
      '@keyframes pulse-glow {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(0, 210, 255, 0.7);\n    transform: scale(1);\n  }\n  50% {\n    box-shadow: 0 0 0 10px rgba(0, 210, 255, 0);\n    transform: scale(1.02);\n  }\n}',
      '.hud-container {\n  display: grid;\n  grid-template-columns: minmax(240px, 1fr) repeat(2, minmax(180px, 2fr));\n  grid-auto-rows: min-content;\n  gap: clamp(0.75rem, 1.5vw, 1.5rem);\n  align-items: start;\n}',
      '.glass-neo {\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(8px) saturate(180%);\n  border: 3px solid #171717;\n  box-shadow: 6px 6px 0px rgba(23, 23, 23, 1);\n  contain: content;\n}',
      ':is(.card, .panel):has(> input:focus-visible) {\n  outline: 3px dashed #FF3366;\n  outline-offset: 4px;\n  border-color: #171717;\n}',
      '.container-query-card {\n  container-type: inline-size;\n}\n@container (min-width: 480px) {\n  .card-inner { display: flex; flex-direction: row; }\n}'
    ]
  },
  sql: {
    beginner: [
      'SELECT id, username, email FROM users WHERE is_active = 1 ORDER BY created_at DESC LIMIT 10;',
      'INSERT INTO race_results (player_id, wpm, accuracy, duration) VALUES (42, 85.5, 98.2, 60);',
      'UPDATE racers SET highest_wpm = 94 WHERE racer_id = 101 AND highest_wpm < 94;',
      'DELETE FROM temporary_sessions WHERE expires_at < CURRENT_TIMESTAMP;',
      'SELECT COUNT(*) AS total_sprints FROM race_history WHERE duration = 60 AND wpm >= 70;'
    ],
    intermediate: [
      'SELECT u.username, COUNT(r.id) AS total_races, AVG(r.wpm) AS avg_speed, MAX(r.wpm) AS top_speed FROM users u INNER JOIN races r ON u.id = r.user_id WHERE r.accuracy >= 90 GROUP BY u.id, u.username HAVING COUNT(r.id) >= 5 ORDER BY top_speed DESC;',
      'SELECT r.id, r.wpm, r.created_at, RANK() OVER (ORDER BY r.wpm DESC) AS speed_rank FROM race_archives r WHERE r.duration = 60;',
      'CREATE TABLE sprint_records (\n  session_id VARCHAR(36) PRIMARY KEY,\n  player_name VARCHAR(64) NOT NULL,\n  wpm DECIMAL(5, 2) NOT NULL CHECK (wpm >= 0),\n  accuracy DECIMAL(5, 2) NOT NULL CHECK (accuracy BETWEEN 0 AND 100),\n  race_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);',
      'SELECT player_id, wpm, duration FROM race_history WHERE (duration, wpm) IN (SELECT duration, MAX(wpm) FROM race_history GROUP BY duration);',
      'SELECT DATE(created_at) AS sprint_day, COUNT(*) AS races_run, ROUND(AVG(wpm), 1) AS daily_avg FROM race_logs GROUP BY DATE(created_at) ORDER BY sprint_day DESC;'
    ],
    advanced: [
      'WITH RankedRaces AS (\n  SELECT user_id, wpm, accuracy, race_time,\n    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY wpm DESC, accuracy DESC) as rn\n  FROM race_sessions\n  WHERE race_time >= NOW() - INTERVAL \'30 days\'\n)\nSELECT u.username, rr.wpm, rr.accuracy\nFROM RankedRaces rr\nJOIN users u ON u.id = rr.user_id\nWHERE rr.rn = 1\nORDER BY rr.wpm DESC;',
      'EXPLAIN ANALYZE\nSELECT p.id, p.name, COALESCE(SUM(s.score), 0) AS total_points\nFROM players p\nLEFT JOIN scores s ON p.id = s.player_id AND s.created_at >= \'2026-01-01\'\nGROUP BY p.id, p.name\nORDER BY total_points DESC\nLIMIT 25;',
      'CREATE INDEX idx_races_user_duration_wpm ON race_records (user_id, duration, wpm DESC);\nSELECT * FROM race_records WHERE user_id = 458 AND duration = 60 ORDER BY wpm DESC LIMIT 5;',
      'MERGE INTO player_stats AS target\nUSING (SELECT 101 AS player_id, 92 AS new_wpm) AS src\nON target.player_id = src.player_id\nWHEN MATCHED AND src.new_wpm > target.peak_wpm THEN\n  UPDATE SET target.peak_wpm = src.new_wpm, target.updated_at = CURRENT_TIMESTAMP\nWHEN NOT MATCHED THEN\n  INSERT (player_id, peak_wpm) VALUES (src.player_id, src.new_wpm);',
      'SELECT id, wpm, LAG(wpm, 1) OVER (ORDER BY id) AS prev_wpm, wpm - LAG(wpm, 1) OVER (ORDER BY id) AS wpm_diff FROM race_sessions ORDER BY id;'
    ]
  }
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
    this.lastProgIndices = {};
    this.lastRandomProgLang = null;
    this.activeProgrammingLanguage = null;
    this.activeProgrammingDifficulty = null;
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

    // Choice logic: Custom text takes precedence if chosen
    if (customText) {
      this.passageText = customText.trim();
      this.activeProgrammingLanguage = null;
    } else if (state.promptChoice === "custom" && state.customPassage && state.customPassage.trim().length > 0) {
      this.passageText = state.customPassage.trim();
      this.activeProgrammingLanguage = null;
    } else if (state.difficulty === "programming") {
      // Dedicated Programming Mode passage generation
      let lang = (state.programmingLanguage || "javascript").toLowerCase();
      const validLangs = ["javascript", "python", "c", "cpp", "html", "css", "sql"];

      if (lang === "random" || !validLangs.includes(lang)) {
        let pool = validLangs;
        if (this.lastRandomProgLang && pool.length > 1) {
          pool = pool.filter(l => l !== this.lastRandomProgLang);
        }
        lang = pool[Math.floor(Math.random() * pool.length)];
        this.lastRandomProgLang = lang;
      }

      const pDiff = (state.programmingDifficulty || "intermediate").toLowerCase();
      const langGroup = PROGRAMMING_PASSAGES[lang] || PROGRAMMING_PASSAGES.javascript;
      const snippetPool = langGroup[pDiff] || langGroup.intermediate || langGroup.beginner;

      let pIdx = Math.floor(Math.random() * snippetPool.length);
      const progKey = `${lang}-${pDiff}`;
      if (!this.lastProgIndices) this.lastProgIndices = {};
      if (snippetPool.length > 1 && pIdx === this.lastProgIndices[progKey]) {
        pIdx = (pIdx + 1 + Math.floor(Math.random() * (snippetPool.length - 1))) % snippetPool.length;
      }
      this.lastProgIndices[progKey] = pIdx;
      this.passageText = snippetPool[pIdx];
      this.activeProgrammingLanguage = lang;
      this.activeProgrammingDifficulty = pDiff;
    } else {
      const diffKey = state.difficulty === "custom" ? "medium" : (state.difficulty || "medium");
      const pool = PASSAGES[diffKey] || PASSAGES.medium;
      let idx = Math.floor(Math.random() * pool.length);
      if (pool.length > 1 && idx === this.lastPassageIndices[diffKey]) {
        idx = (idx + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
      }
      this.lastPassageIndices[diffKey] = idx;
      this.passageText = pool[idx];
      this.activeProgrammingLanguage = null;
      this.activeProgrammingDifficulty = null;
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
      if (this.chars[i] === "\n") {
        span.textContent = "↵\n";
      } else {
        span.textContent = this.chars[i];
      }
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

        if (window.TypeEKeyboard) {
          window.TypeEKeyboard.flashKeyFeedback(typedChar, isMatch);
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
      const isNewline = (this.chars[i] === "\n");
      const isSpace = (this.chars[i] === " ");

      if (i < currentVal.length) {
        if (currentVal[i] === this.chars[i]) {
          span.classList.add("char-correct");
          span.textContent = isNewline ? "↵\n" : (isSpace ? " " : this.chars[i]);
        } else {
          if (isSpace) {
            span.classList.add("char-space-incorrect");
            span.textContent = "␣";
          } else if (isNewline) {
            span.classList.add("char-incorrect");
            span.textContent = "↵\n";
          } else {
            span.classList.add("char-incorrect");
            span.textContent = this.chars[i];
          }
        }
      } else if (i === currentVal.length) {
        span.classList.add("char-current");
        span.textContent = isNewline ? "↵\n" : (isSpace ? " " : this.chars[i]);
      } else {
        span.textContent = isNewline ? "↵\n" : (isSpace ? " " : this.chars[i]);
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

    // Allow Enter key to input newline in code snippets
    if (e.key === "Enter" && this.chars[this.currentIndex] === "\n" && this.inputEl) {
      e.preventDefault();
      this.inputEl.value += "\n";
      this.handleSingleSourceInput(e);
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
