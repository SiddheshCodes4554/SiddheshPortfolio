export interface ProjectDecision {
  title: string;
  rationale: string;
}

export interface ProjectArchitectureNode {
  title: string;
  description: string;
}

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  shortDescription: string;
  longDescription: string;
  problemStatement: string;
  architectureSummary: string;
  architectureNodes: ProjectArchitectureNode[];
  keyDecisions: ProjectDecision[];
  challenges: string[];
  technologies: string[];
  metricsOrHighlights: ProjectHighlight[];
  githubUrl: string;
  liveUrl?: string;
  schematicType:
    | "aeris-drone"
    | "drishti-vision"
    | "market-sentiment"
    | "filesense-rag"
    | "finance-ledger"
    | "school-erp";
}

export const projectsData: Project[] = [
  {
    id: "aeris",
    index: "01",
    title: "AERIS",
    subtitle: "Autonomous Edge Rescue & Intelligence System",
    category: "Autonomous Systems & Edge CV",
    year: "2025",
    role: "Lead System Architect & Developer",
    timeline: "Sep 2024 — Present",
    shortDescription:
      "A drone-based disaster reconnaissance system pairing onboard edge computer vision with a low-latency telemetry command center for rapid situational awareness.",
    longDescription:
      "AERIS is an autonomous aerial edge computing framework engineered for disaster response and search-and-rescue (SAR) operations. In catastrophe zones where cellular and internet infrastructures are degraded or destroyed, AERIS runs real-time computer vision inference directly on edge hardware (Jetson companion computer) mounted to a UAV. Telemetry, GPS coordinates, hazard bounding boxes, and compressed situational keyframes are transmitted across an ad-hoc RF link to a responsive ground command station, rendering live survivor heatmaps and flight path overlays.",
    problemStatement:
      "During post-disaster reconnaissance (earthquakes, flash floods), search teams encounter severe radio frequency degradation and zero internet access. Traditional cloud-based CV pipelines fail immediately. First responders need low-power, edge-first survivor detection and autonomous flight telemetry that functions reliably over constrained, high-latency ad-hoc radio links.",
    architectureSummary:
      "Decoupled edge-to-ground telemetry topology. The drone payload runs an asynchronous inference loop utilizing YOLOv8 and OpenCV on hardware-accelerated TensorRT. Coordinate vectors are packaged into a binary telemetry frame transmitted via RF serial / WebSocket relay to a Next.js ground station with canvas-accelerated spatial rendering.",
    architectureNodes: [
      {
        title: "Edge Vision Sensor",
        description:
          "High-FPS gimbal optical sensor fed into hardware-accelerated YOLOv8 on Jetson edge board.",
      },
      {
        title: "Telemetry Serializer",
        description:
          "GPS, altitude, battery state, and detection vectors bundled into lightweight binary frames at 20Hz.",
      },
      {
        title: "Ad-Hoc Radio Relay",
        description:
          "Long-range RF / local 5.8GHz Wi-Fi link with automatic reconnect and message acknowledgment.",
      },
      {
        title: "Tactical Command UI",
        description:
          "Next.js ground station with geospatial coordinate mapping, live HUD, and survivor heatmap overlay.",
      },
    ],
    keyDecisions: [
      {
        title: "Edge-First Inference vs. Cloud Processing",
        rationale:
          "Running inference onboard eliminates dependencies on cloud connectivity in disaster zones and reduces transmission bandwidth by 98% (sending coordinate JSON rather than 4K video feeds).",
      },
      {
        title: "Binary Telemetry Frame Format",
        rationale:
          "Packed flight dynamics (pitch, roll, yaw, altitude, battery) and bounding box centroid coordinates into compact 64-byte binary packets to prevent packet loss over degraded RF.",
      },
      {
        title: "Client-Side Offline Map Tile Caching",
        rationale:
          "Pre-indexed satellite and elevation tiles stored in browser IndexedDB so operators maintain high-precision map navigation without active internet access.",
      },
    ],
    challenges: [
      "Compensating for camera jitter and sudden drone yaw changes in high winds: implemented affine motion compensation using optical flow vectors to stabilize detection bounding boxes across successive video frames.",
      "Thermal throttling on edge hardware during continuous high-FPS inference: engineered a dynamic duty-cycle scheduler that scales inference frequency between 15Hz and 30Hz based on edge SoC temperature thresholds.",
    ],
    technologies: [
      "Python",
      "YOLOv8",
      "OpenCV",
      "TensorRT",
      "Next.js",
      "TypeScript",
      "WebSockets",
      "Tailwind CSS",
      "Leaflet",
    ],
    metricsOrHighlights: [
      { label: "Inference Latency", value: "< 38ms on Edge" },
      { label: "Telemetry Rate", value: "20Hz Synchronous" },
      { label: "Bandwidth Savings", value: "98% vs Raw Video" },
      { label: "Deployment", value: "Edge UAV + Web Ground" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/AERIS",
    schematicType: "aeris-drone",
  },
  {
    id: "project-drishti",
    index: "02",
    title: "Project Drishti",
    subtitle: "AI Situational Awareness & Computer Vision Mapping",
    category: "Computer Vision & Geospatial Intelligence",
    year: "2024",
    role: "Computer Vision Developer",
    timeline: "May 2024 — Nov 2024",
    shortDescription:
      "Multi-stream video intelligence pipeline featuring automated object detection, spatial homography projection, and dynamic area hazard mapping.",
    longDescription:
      "Project Drishti provides intelligent situational awareness for surveillance and perimeter defense by turning passive surveillance video streams into an actionable spatial map. Utilizing deep learning object detection paired with camera matrix homography calibration, Drishti projects 2D video pixel detections directly onto a real-world GIS map layout, allowing security personnel to track individuals, vehicles, and perimeter breaches in real coordinates.",
    problemStatement:
      "Standard multi-camera surveillance forces human operators to monitor dozens of disconnected 2D monitor grids simultaneously, resulting in cognitive fatigue and delayed response to security breaches. Ground coordinates and spatial trajectories are lost across camera blind spots.",
    architectureSummary:
      "Parallel RTSP stream ingestion workers feeding YOLOv8 detection and DeepSORT tracking models. Extracted bounding box foot coordinates are passed through calibrated planar homography transforms to map camera pixels to unified 2D geospatial floor plans in real time.",
    architectureNodes: [
      {
        title: "Multi-RTSP Ingestion",
        description:
          "Asynchronous video decoder workers pulling multi-angle camera feeds without blocking inference.",
      },
      {
        title: "Object Detection & Tracking",
        description:
          "YOLOv8 neural network with DeepSORT association maintaining persistent object IDs across frames.",
      },
      {
        title: "Homography Transformation",
        description:
          "Planar camera projection matrix converting image coordinates (x, y) to spatial ground plane (X, Y).",
      },
      {
        title: "Unified Situational Map",
        description:
          "Vector floorplan rendering real-time object positions, velocity vectors, and boundary alerts.",
      },
    ],
    keyDecisions: [
      {
        title: "Homography Ground Plane Calibration",
        rationale:
          "Used 4-point ground calibration to project bounding box base coordinates to top-down GIS coordinates, eliminating camera angle perspective distortion.",
      },
      {
        title: "Decoupled Video Ingestion Threads",
        rationale:
          "Isolated RTSP decoding onto separate OS threads with a shared frame ring buffer to prevent RTSP buffer overflows when detection runs heavy batches.",
      },
    ],
    challenges: [
      "Overcoming occlusions when targets pass behind pillars or architectural structures: tuned DeepSORT Kalman filter covariance parameters to predict trajectories through occluded paths for up to 30 frames.",
      "Variable environmental lighting causing false positives: applied CLAHE (Contrast Limited Adaptive Histogram Equalization) preprocessing dynamically across low-light zones.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "DeepSORT",
      "FastAPI",
      "GeoJSON",
      "NumPy",
    ],
    metricsOrHighlights: [
      { label: "Stream Concurrency", value: "4 Simultaneous Feeds" },
      { label: "Projection Accuracy", value: "±0.4m Ground Error" },
      { label: "Tracking Retention", value: "94.2% ID Persistence" },
      { label: "Model Architecture", value: "YOLOv8 + DeepSORT" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/Project-Drishti",
    schematicType: "drishti-vision",
  },
  {
    id: "marketmood-ai",
    index: "03",
    title: "MarketMood AI",
    subtitle: "Economic Sentiment Analysis & Financial News Intelligence",
    category: "NLP & Financial Machine Intelligence",
    year: "2025",
    role: "Full-Stack & ML Engineer",
    timeline: "Jan 2025 — Apr 2025",
    shortDescription:
      "Real-time economic sentiment pipeline ingesting live financial news and regulatory filings, extracting contextual polarity against market ticker trends.",
    longDescription:
      "MarketMood AI is an automated sentiment intelligence platform for financial markets. It continuously scrapes, filters, and analyzes breaking headlines, earnings call transcripts, and macroeconomic indicators. Using FinBERT (a BERT model fine-tuned on financial language), it scores contextual bullish/bearish polarity, calculates rolling sentiment volatility indices, and visualizes sentiment shifts against intraday stock price movements.",
    problemStatement:
      "Retail and institutional traders struggle to filter through thousands of financial articles published every hour. Generic sentiment models fail on financial jargon—for example, treating 'interest rates dropped' or 'unemployment fell' with incorrect or reversed sentiment polarity.",
    architectureSummary:
      "Automated event-driven ingestion workers polling RSS feeds and financial news APIs. Articles are sanitized, deduplicated via MinHash, and routed through a GPU-accelerated FinBERT inference worker that assigns categorical confidence scores (-1.0 to +1.0) and persists them in a Redis time-series database for instant Next.js visualization.",
    architectureNodes: [
      {
        title: "News & Wire Aggregator",
        description:
          "Automated crawlers ingesting financial RSS feeds, SEC filings, and press releases with MinHash deduplication.",
      },
      {
        title: "NLP Sentiment Pipeline",
        description:
          "FinBERT transformer scoring positive, negative, and neutral sentiment polarity with financial context.",
      },
      {
        title: "Time-Series Aggregator",
        description:
          "Rolling exponential moving averages (1h, 12h, 24h) and ticker correlation indexing in Redis.",
      },
      {
        title: "Editorial Market Terminal",
        description:
          "Next.js dashboard with interactive divergence charts comparing price actions against sentiment shifts.",
      },
    ],
    keyDecisions: [
      {
        title: "FinBERT Domain Specialization",
        rationale:
          "Standard sentiment dictionaries like VADER misclassify financial vocabulary (e.g. 'crude', 'short', 'liabilities'); FinBERT provides 34% higher domain classification accuracy.",
      },
      {
        title: "MinHash Article Deduplication",
        rationale:
          "Wire syndication creates dozens of identical articles across outlets; MinHash prevents duplicate headlines from disproportionately skewing the sentiment score.",
      },
    ],
    challenges: [
      "High-volume headline bursts during opening bell hours: implemented a Celery worker queue with Redis caching to smooth out peak ingestion spikes without dropping real-time updates.",
      "Detecting nuance in management statements: added entity recognition (NER) to ensure sentiment was attributed specifically to the subject company rather than a competitor mentioned in the article.",
    ],
    technologies: [
      "Next.js",
      "Python",
      "FinBERT",
      "Hugging Face",
      "Redis",
      "FastAPI",
      "Tailwind CSS",
      "TypeScript",
    ],
    metricsOrHighlights: [
      { label: "NLP Accuracy", value: "88.6% Financial Polarity" },
      { label: "Processing Speed", value: "< 250ms per Article" },
      { label: "Ingestion Scale", value: "5,000+ Headlines/Day" },
      { label: "Deduplication", value: "MinHash Jaccard 0.8" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/MarketMood-AI",
    schematicType: "market-sentiment",
  },
  {
    id: "filesense",
    index: "04",
    title: "FileSense",
    subtitle: "Local-First Document Understanding & Knowledge Retrieval",
    category: "Applied AI & Semantic Search",
    year: "2024",
    role: "Developer & Systems Designer",
    timeline: "Aug 2024 — Dec 2024",
    shortDescription:
      "AI-driven document understanding and question-answering system providing ground-truth citation search across dense technical files and PDFs.",
    longDescription:
      "FileSense is a local-first semantic document exploration platform designed for researchers and technical teams. It ingests complex multi-page PDFs, research papers, and technical specifications, converting unstructured text and nested tables into semantic vector representations. Users can query their document corpus in natural language, receiving precise answers backed by exact page and sentence citations with zero data leakage to external clouds.",
    problemStatement:
      "Knowledge workers spend hours manually hunting for specific clauses, technical figures, and citations inside hundreds of pages of documentation. Standard keyword search fails when phrasing differs, while public LLMs create security compliance risks for confidential internal files.",
    architectureSummary:
      "Document parsing engine using layout-aware chunking heuristics. High-dimensional vector embeddings are stored in FAISS local vector indices. A hybrid retrieval pipeline combines dense vector similarity with sparse BM25 keyword matching, feeding a local quantized LLM for grounded contextual generation.",
    architectureNodes: [
      {
        title: "Layout-Aware Parser",
        description:
          "PDF text layer extraction with OCR fallback, preserving structural headers, lists, and tables.",
      },
      {
        title: "Hybrid Indexing Engine",
        description:
          "Dual-index architecture: FAISS vector embeddings for semantic search + BM25 for exact part numbers.",
      },
      {
        title: "Context Reranker",
        description:
          "Cross-encoder scoring retrieved text snippets to prioritize the top 5 most relevant document paragraphs.",
      },
      {
        title: "Grounded Q&A Interface",
        description:
          "Citation-first UI displaying exact document page previews, highlighted text spans, and confidence tags.",
      },
    ],
    keyDecisions: [
      {
        title: "Hybrid Search (Dense + Sparse BM25)",
        rationale:
          "Pure vector search misses specific alphanumeric serials and exact acronyms; hybrid retrieval guarantees 100% recall on technical part codes while retaining semantic understanding.",
      },
      {
        title: "Deterministic Citation Linking",
        rationale:
          "Every generated paragraph includes a direct clickable citation that scrolls the PDF viewer directly to the source page and bounding box.",
      },
    ],
    challenges: [
      "Preserving tabular integrity in complex multi-column layouts: created a custom table detection heuristic that translates PDF coordinate streams into clean markdown table representations before chunking.",
      "Constrained local RAM during vector lookups: quantized vector embeddings to 8-bit precision, reducing index memory consumption by 65% with negligible retrieval degradation.",
    ],
    technologies: [
      "Python",
      "LangChain",
      "FAISS",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PDF.js",
    ],
    metricsOrHighlights: [
      { label: "Retrieval Method", value: "Hybrid (BM25 + FAISS)" },
      { label: "Memory Footprint", value: "< 500MB Index RAM" },
      { label: "Citation Precision", value: "100% Grounded Spans" },
      { label: "Privacy Model", value: "Local-First / Zero Cloud" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/FileSense",
    schematicType: "filesense-rag",
  },
  {
    id: "personal-finance-tracker",
    index: "05",
    title: "Personal Finance Tracker",
    subtitle: "Granular Wealth Analytics & Cashflow Visualization",
    category: "Web Application & Data Systems",
    year: "2024",
    role: "Frontend & Full-Stack Engineer",
    timeline: "Mar 2024 — Jul 2024",
    shortDescription:
      "Privacy-focused financial dashboard with interactive cashflow breakdown, custom category budgeting, and predictive savings trajectories.",
    longDescription:
      "A minimalist, client-side encrypted personal finance tracker designed to replace bloated commercial financial apps. Features custom category allocation, monthly cashflow velocity charts, recurring subscription audits, and savings projections. Built with zero tracking cookies or external ad scripts, storing all financial entries securely in the user's browser using local cryptographic keys.",
    problemStatement:
      "Modern financial apps require users to link personal bank credentials to third-party data aggregators, sell user transaction histories, and clutter interfaces with credit card promotions. Users want a clean, honest, tactile tool to understand their spending habits with complete privacy.",
    architectureSummary:
      "Local-first client application with client-side AES-GCM encryption. Transaction datasets are indexed in browser IndexedDB. Lightweight custom SVG charting algorithms compute monthly rolling trends, expense categories, and runway simulations with instantaneous render speeds.",
    architectureNodes: [
      {
        title: "Local Crypto Vault",
        description:
          "Browser Web Cryptography API encrypting transaction stores with client-derived PBKDF2 keys.",
      },
      {
        title: "Statement Normalizer",
        description:
          "Heuristic CSV parser mapping disparate banking transaction formats into a normalized schema.",
      },
      {
        title: "Tactile Charting Engine",
        description:
          "Handcrafted SVG line curves and area fills with interactive hover scrubbers and zero library overhead.",
      },
      {
        title: "Predictive Runway Model",
        description:
          "Calculates variable burn rates, fixed subscription obligations, and projected year-end net savings.",
      },
    ],
    keyDecisions: [
      {
        title: "Zero Third-Party Charting Libraries",
        rationale:
          "Implemented native SVG data curves directly in React. Reduced bundle size by 140KB and achieved pixel-perfect alignment with the site's editorial hairline aesthetic.",
      },
      {
        title: "Client-Side IndexedDB Storage",
        rationale:
          "Financial records never leave the user's device, ensuring absolute confidentiality without recurring server hosting overhead.",
      },
    ],
    challenges: [
      "Inconsistent bank statement CSV exports: built an interactive column-mapping modal that intelligently predicts date, amount, vendor, and category fields with auto-learning regex rules.",
      "Smooth rendering of multi-year transaction timelines: created virtualized list scrolling with memoized aggregations, maintaining 60FPS fluid navigation across 10,000+ entries.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "IndexedDB",
      "Web Cryptography API",
      "SVG",
    ],
    metricsOrHighlights: [
      { label: "Bundle Size Overhead", value: "Zero Heavy Chart Libs" },
      { label: "Data Storage", value: "Local-First IndexedDB" },
      { label: "Encryption", value: "AES-256-GCM" },
      { label: "Performance", value: "60 FPS Virtualized" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/Personal-Finance-Tracker",
    schematicType: "finance-ledger",
  },
  {
    id: "school-erp",
    index: "06",
    title: "School ERP",
    subtitle: "Academic Administration & Student Information Platform",
    category: "Enterprise Architecture & Full-Stack Web",
    year: "2024",
    role: "Full-Stack Developer",
    timeline: "Nov 2023 — Mar 2024",
    shortDescription:
      "Modular enterprise platform for student admissions, timetable scheduling, attendance tracking, and examination grading.",
    longDescription:
      "A comprehensive institutional management system tailored for secondary schools and academic institutions. Streamlines administrative workflows by consolidating student admissions, faculty timetable schedules, attendance tracking, report card generation, and fee management into a unified, role-based web interface.",
    problemStatement:
      "Schools frequently rely on disconnected legacy spreadsheets, paper attendance registers, and disparate billing systems. Administrative staff lose countless hours reconciling grades, fee statuses, and parent communication across fragmented software tools.",
    architectureSummary:
      "Multi-tier relational architecture powered by Next.js, Node.js, and PostgreSQL. Strict Role-Based Access Control (RBAC) middleware guarantees security between student, teacher, accountant, and super-administrator portals with automated PDF document synthesis for transcripts and fee receipts.",
    architectureNodes: [
      {
        title: "Role-Based Auth Gate",
        description:
          "JWT session management with strict middleware permissions isolating student, teacher, and admin routes.",
      },
      {
        title: "Relational Data Core",
        description:
          "PostgreSQL schema with normalized tables for enrollments, courses, schedules, and financial ledgers.",
      },
      {
        title: "Document Generator",
        description:
          "Serverless PDF rendering engine compiling official grade report cards, certificates, and tax invoices.",
      },
      {
        title: "Administrative Console",
        description:
          "Real-time dashboard monitoring institutional attendance rates, fee collection metrics, and class quotas.",
      },
    ],
    keyDecisions: [
      {
        title: "Strict Database Transaction Boundaries",
        rationale:
          "Wrapped fee payment logging and enrollment capacity checks in atomic SQL transactions with row-level locks to prevent double-booking.",
      },
      {
        title: "Server-Side Dynamic Report Generation",
        rationale:
          "Engineered high-fidelity printable PDF report cards generated on-demand via headless Chrome workers, ensuring 100% formatting consistency on all printers.",
      },
    ],
    challenges: [
      "High peak concurrency during end-of-term grade announcements: separated read-heavy student grade queries into cached Edge routes, eliminating database connection pool exhaustion.",
      "Complex timetable scheduling conflicts: developed a backtracking constraint-satisfaction algorithm that validates teacher availability, classroom room capacity, and subject quotas.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "PDFKit",
    ],
    metricsOrHighlights: [
      { label: "User Roles", value: "Admin, Teacher, Student, Accounts" },
      { label: "Security Model", value: "Strict RBAC + Audit Logs" },
      { label: "Database Core", value: "Normalized PostgreSQL" },
      { label: "Document Engine", value: "Automated PDF Transcripts" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/School-ERP",
    schematicType: "school-erp",
  },
];
