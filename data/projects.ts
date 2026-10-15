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

export interface ProjectTabSection {
  title: string;
  subtitle: string;
  content: string;
  bullets?: string[];
}

export interface ProjectCaseStudy {
  overview: {
    headline: string;
    annotation: string;
    summary: string;
    keyFeatures: string[];
    myRole: string;
    roleTags: string[];
    imageCaption?: string;
  };
  problem: ProjectTabSection;
  solution: ProjectTabSection;
  architecture: ProjectTabSection;
  techStack: {
    title: string;
    subtitle: string;
    description: string;
    categories: { name: string; items: string[] }[];
  };
  results: ProjectTabSection;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  tagsLine: string;
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

  // Visual Assets & Editorial Metadata
  heroImage: string;
  detectionImage?: string;
  detailImage?: string;
  thumbnailImage: string;
  actionVerbs: string[];
  handwrittenAnnotation?: string;
  caseStudy: ProjectCaseStudy;
}

export const projectsData: Project[] = [
  {
    id: "aeris",
    index: "01",
    title: "AERIS",
    subtitle: "Autonomous Edge Rescue & Intelligence System",
    category: "AI & Autonomous Systems",
    tagsLine: "DRONES / COMPUTER VISION / REAL-TIME SYSTEMS",
    year: "2025",
    role: "Lead System Architect & Developer",
    timeline: "Sep 2024 — Present",
    shortDescription:
      "A drone-based disaster response system for real-time situational awareness, victim detection and environmental monitoring using AI and computer vision.",
    longDescription:
      "AERIS is an autonomous aerial edge computing framework engineered for disaster response and search-and-rescue (SAR) operations. In catastrophe zones where cellular and internet infrastructures are degraded or destroyed, AERIS runs real-time computer vision inference directly on edge hardware mounted to a UAV. Telemetry, GPS coordinates, hazard bounding boxes, and compressed situational keyframes are transmitted across an ad-hoc RF link to a responsive ground command station, rendering live survivor heatmaps and flight path overlays.",
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
      { label: "Edge Inference", value: "< 38ms Latency" },
      { label: "Telemetry Stream", value: "20Hz Synchronous" },
      { label: "Bandwidth Savings", value: "98% vs Raw 4K" },
      { label: "Deployment", value: "Edge UAV + Web Ground" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/AERIS",
    liveUrl: "https://aeris-rescue.vercel.app",
    schematicType: "aeris-drone",

    // Visual assets
    heroImage: "/projects/aeris-hero.jpg",
    detectionImage: "/projects/aeris-detection.jpg",
    detailImage: "/projects/aeris-flight.jpg",
    thumbnailImage: "/projects/aeris-hero.jpg",
    actionVerbs: ["DETECT", "MAP", "RESCUE"],
    handwrittenAnnotation: "Built for a Safer Tomorrow.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ From Drones to Real Impact.",
        summary:
          "AERIS is an autonomous edge system designed for disaster response and search-and-rescue operations. It combines drones, computer vision, and real-time telemetry to detect survivors, analyze environments, and provide actionable insights through an intuitive command center dashboard.",
        imageCaption: "EXPLORING HOW TECHNOLOGY CAN HELP SAVE LIVES.",
        keyFeatures: [
          "Real-time object and person detection",
          "Live drone telemetry and mapping",
          "Interactive command center dashboard",
          "Edge-based inference for low-latency operation",
        ],
        myRole:
          "Designed and developed core computer vision modules, integrated real-time telemetry, and built the dashboard for visualization and control.",
        roleTags: [
          "Computer Vision",
          "Drones",
          "Realtime",
          "Web Dashboard",
          "Edge AI",
          "Mapping",
        ],
      },
      problem: {
        title: "The Problem",
        subtitle: "Zero Connectivity in Catastrophic Disaster Zones",
        content:
          "In the immediate aftermath of major catastrophes like earthquakes and landslides, critical municipal power and cellular infrastructure are often severed. Search-and-rescue teams face degraded RF lines, dangerous terrain, and complete loss of cloud services. Traditional cloud-based AI vision architectures fail completely when there is no internet connection.",
        bullets: [
          "Zero cellular and internet availability across affected disaster perimeters.",
          "High latency and packet loss when streaming raw video feeds over long-range radio.",
          "First responders require immediate local situational awareness without waiting for remote server roundtrips.",
          "Strict payload power and thermal limits on drone companion hardware.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Edge-First Aerial Intelligence & Local Command Relay",
        content:
          "AERIS shifts heavy compute directly onto the UAV using an onboard edge companion computer. Optical and thermal video feeds are processed locally in real time. Instead of saturating bandwidth with high-resolution video streams, AERIS transmits lightweight binary telemetry frames containing GPS coordinates, survivor bounding boxes, and flight state vectors at 20Hz over an ad-hoc RF link to a local ground command station.",
        bullets: [
          "Onboard edge neural inference running directly on companion hardware.",
          "Ultra-compact binary telemetry serialization reducing required bandwidth by over 95%.",
          "Offline-first Next.js ground station with local GIS map caching and survivor heatmap overlays.",
          "Resilient ad-hoc radio link ensuring continuous operation even during total network blackouts.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "End-to-End Edge-to-Ground Pipeline",
        content:
          "AERIS is built as a decoupled, multi-tier system that separates high-frequency edge sensor ingestion from ground visualization. The UAV companion computer handles camera frame acquisition, model inferencing, and serial packet serialization. The ground station receives and validates telemetry packets, rendering spatial coordinates onto a 60FPS canvas HUD.",
        bullets: [
          "Sensor Ingestion: 60FPS optical gimbal sensor with hardware NVMM memory pipeline.",
          "Inference Engine: TensorRT-accelerated YOLOv8 with FP16 precision for low thermal overhead.",
          "Telemetry Protocol: Custom binary serialization packaging GPS, altitude, heading, and detections.",
          "Ground HUD: High-performance canvas-based dashboard with coordinate mapping and survivor logs.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Engineered with Modern Edge & Web Stacks",
        description:
          "A carefully chosen set of low-overhead edge computing libraries and type-safe web frameworks designed for reliability under mission-critical conditions.",
        categories: [
          {
            name: "Edge & Computer Vision",
            items: ["Python", "YOLOv8", "OpenCV", "TensorRT", "Jetson Edge SoC"],
          },
          {
            name: "Telemetry & Networking",
            items: ["WebSockets", "RF Serial Protocol", "Asynchronous Event Loops"],
          },
          {
            name: "Ground Command Interface",
            items: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API", "Leaflet"],
          },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Real-World Field Validation & Systems Resilience",
        content:
          "AERIS proved that moving AI intelligence to the edge transforms search and rescue speed. By eliminating the cloud dependency, the system demonstrated reliable survivor detection with low latency over long-range radio links. Building AERIS provided deep lessons in embedded hardware thermals, telemetry serialization under packet loss, and designing tactical user interfaces for high-stress operational environments.",
        bullets: [
          "Demonstrated reliable survivor detection under simulated disaster rubble and low-light conditions.",
          "Maintained responsive 20Hz telemetry synchronization over constrained RF channels.",
          "Validated offline-first client architecture with instant map render and persistent detection logs.",
          "Highlighted the critical balance between edge compute power draw and UAV flight endurance.",
        ],
      },
    },
  },
  {
    id: "project-drishti",
    index: "02",
    title: "Project Drishti",
    subtitle: "AI Situational Awareness & Computer Vision Mapping",
    category: "AI / Computer Vision",
    tagsLine: "AI / COMPUTER VISION / GEOSPATIAL",
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
      "Variable environmental lighting causing false positives: applied CLAHE preprocessing dynamically across low-light zones.",
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

    heroImage: "/projects/drishti-surveillance.jpg",
    thumbnailImage: "/projects/drishti-surveillance.jpg",
    actionVerbs: ["DETECT", "MAP", "ANALYZE"],
    handwrittenAnnotation: "Turning video into spatial insight.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ From 2D Pixels to Real Coordinates.",
        summary:
          "Project Drishti transforms standard RTSP surveillance feeds into a unified 2D geospatial map. By pairing deep-learning object detection with camera homography calibration, detections are translated from image coordinates into precise real-world ground positions in real time.",
        imageCaption: "AUTOMATED SPATIAL PERIMETER TRACKING.",
        keyFeatures: [
          "Multi-stream RTSP feed ingestion",
          "Homography planar coordinate mapping",
          "DeepSORT persistent target tracking",
          "Real-time GIS floorplan hazard overlay",
        ],
        myRole:
          "Designed camera matrix calibration scripts, integrated DeepSORT tracking, and built the spatial projection pipeline.",
        roleTags: ["OpenCV", "PyTorch", "DeepSORT", "Homography", "GIS Mapping"],
      },
      problem: {
        title: "The Problem",
        subtitle: "Cognitive Overload in Multi-Camera Monitoring",
        content:
          "Operators monitoring multiple video feeds struggle to establish spatial relationships between cameras, causing blind spots during security events.",
        bullets: [
          "Fragmented monitor walls cause delayed responses to incidents.",
          "Lack of unified coordinate frames across overlapping camera angles.",
          "Severe perspective distortion making speed and distance estimations impossible.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Planar Perspective Projection & Real-Time Tracking",
        content:
          "Calibrating each camera using a 3x3 homography matrix projects detection ground contact points directly onto an interactive 2D facility blueprint.",
        bullets: [
          "Unified coordinate framework mapping all cameras to one master map.",
          "Persistent tracking across temporary occlusions using Kalman filtering.",
          "Instant boundary violation alerts with precise meter-level ground coordinates.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "Parallel RTSP Ingestion & Spatial Transform",
        content:
          "A multi-threaded Python service pulls RTSP streams, runs batched YOLOv8 inferencing, passes detection coordinates to the homography mapper, and broadcasts GeoJSON points via WebSockets.",
        bullets: [
          "Video Thread: Dedicated OpenCV capture worker with ring buffer.",
          "Inference Worker: YOLOv8 PyTorch model executing batch detections.",
          "Coordinate Projector: Matrix dot product mapping pixel (x, y) to world (X, Y).",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Built with Modern Visual Computing Libraries",
        description: "Specialized machine learning and geospatial libraries.",
        categories: [
          { name: "Computer Vision", items: ["Python", "OpenCV", "PyTorch", "DeepSORT"] },
          { name: "Backend & Streaming", items: ["FastAPI", "WebSockets", "NumPy"] },
          { name: "Geospatial", items: ["GeoJSON", "GIS Mapbox", "Leaflet"] },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "High Accuracy Perimeter Surveillance",
        content:
          "Achieved ±0.4m positioning accuracy on calibrated surfaces and validated multi-camera tracking handover with minimal ID switching.",
        bullets: [
          "Demonstrated seamless 4-camera concurrent ingestion at 30 FPS.",
          "Maintained 94.2% tracking ID retention through partial occlusions.",
        ],
      },
    },
  },
  {
    id: "marketmood-ai",
    index: "03",
    title: "MarketMood AI",
    subtitle: "Economic Sentiment Analysis & Financial News Intelligence",
    category: "NLP & FinTech",
    tagsLine: "NLP / FINANCE / MACHINE LEARNING",
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

    heroImage: "/projects/marketmood-terminal.jpg",
    thumbnailImage: "/projects/marketmood-terminal.jpg",
    actionVerbs: ["SENTIMENT", "PREDICT", "VISUALIZE"],
    handwrittenAnnotation: "Decoding the pulse of the market.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ News to Predictive Alpha.",
        summary:
          "MarketMood AI bridges the gap between breaking financial news commentary and intraday market prices. By running domain-specific FinBERT models across wire releases, it visualizes rolling sentiment polarity versus asset price action.",
        imageCaption: "REAL-TIME MARKET SENTIMENT TERMINAL.",
        keyFeatures: [
          "FinBERT financial polarity scoring",
          "Automated wire news ingestion & deduplication",
          "Rolling sentiment volatility indices",
          "Divergence visualization between sentiment and price",
        ],
        myRole:
          "Tuned FinBERT inference pipeline, built deduplication filters, and developed the Next.js dark-mode terminal.",
        roleTags: ["FinBERT", "Hugging Face", "FastAPI", "Redis", "Next.js", "TypeScript"],
      },
      problem: {
        title: "The Problem",
        subtitle: "Information Overload & Lexical Ambiguity",
        content:
          "Financial syntax is unique: phrases like 'bearish breakout' or 'rate cut' require deep economic context that generic sentiment models misclassify.",
        bullets: [
          "Syndicated wire reprints distort volume weighting.",
          "Generic LLMs are too slow for real-time news burst analysis.",
          "Lack of temporal alignment between article timestamps and stock price ticks.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "GPU-Accelerated FinBERT & Redis TimeSeries",
        content:
          "A streaming pipeline that deduplicates articles within 50ms, evaluates sentiment polarity in 200ms, and updates live divergence graphs.",
        bullets: [
          "Domain-specialized transformer fine-tuned on financial transcripts.",
          "Rolling 12-hour exponential moving sentiment averages.",
          "Interactive correlation charts revealing sentiment-led price movements.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "Event-Driven Ingestion to Reactive UI",
        content:
          "Crawlers push raw articles to Redis streams; background Celery workers run FinBERT inference; aggregates are pushed to the frontend via WebSockets.",
        bullets: [
          "Crawler: Async HTTP scraping of RSS and SEC press releases.",
          "Worker: PyTorch FinBERT batch tokenizer and classifier.",
          "Frontend: Next.js with SVG interactive time-series canvas.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Modern FinTech & NLP Architecture",
        description: "High-throughput asynchronous Python and reactive TypeScript frontend.",
        categories: [
          { name: "NLP & AI", items: ["Python", "FinBERT", "Hugging Face", "PyTorch"] },
          { name: "Data & Caching", items: ["Redis TimeSeries", "Celery", "PostgreSQL"] },
          { name: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Demonstrated Sentiment Correlation",
        content:
          "Achieved 88.6% classification accuracy on benchmark financial datasets and handled opening bell volume bursts without dropped packets.",
        bullets: [
          "Indexed over 5,000 headlines daily with zero latency bottlenecks.",
          "Identified actionable sentiment divergence leads across key tech sector stocks.",
        ],
      },
    },
  },
  {
    id: "filesense",
    index: "04",
    title: "FileSense",
    subtitle: "AI-Powered Document Understanding & Knowledge Retrieval",
    category: "AI & Semantic Search",
    tagsLine: "AI / KNOWLEDGE / SEMANTIC SEARCH",
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

    heroImage: "/projects/filesense-document.jpg",
    thumbnailImage: "/projects/filesense-document.jpg",
    actionVerbs: ["UNDERSTAND", "SEARCH", "ORGANIZE"],
    handwrittenAnnotation: "Zero-hallucination semantic citations.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ Provable Ground Truth.",
        summary:
          "FileSense is a privacy-first document exploration system that enables users to query complex technical manuals, PDFs, and scientific papers with natural language. Every generated answer includes direct clickable references to exact document pages and highlighted sentences.",
        imageCaption: "LOCAL-FIRST SEMANTIC CITATION ENGINE.",
        keyFeatures: [
          "Hybrid dense vector + sparse BM25 retrieval",
          "Layout-aware multi-column PDF parser",
          "Deterministic page citation linking",
          "Air-gapped local execution with zero cloud egress",
        ],
        myRole:
          "Engineered the hybrid retrieval pipeline, built layout extraction algorithms, and designed the citation viewer interface.",
        roleTags: ["FAISS", "LangChain", "FastAPI", "PDF.js", "Next.js", "TypeScript"],
      },
      problem: {
        title: "The Problem",
        subtitle: "Document Hallucination & Security Leaks",
        content:
          "Public cloud LLMs frequently hallucinate facts and violate compliance when processing proprietary or confidential internal documents.",
        bullets: [
          "Engineers spend hours hunting for specific part codes and tolerances in 500-page manuals.",
          "Dense tables and multi-column layouts get mangled by basic text scrapers.",
          "Enterprises cannot upload confidential engineering specs to public LLM endpoints.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Air-Gapped Hybrid Retrieval with Grounded References",
        content:
          "FileSense parses documents locally, generates quantized embeddings stored in FAISS, and verifies answer spans with cross-encoders before display.",
        bullets: [
          "Hybrid search ensuring exact part code recall alongside semantic concepts.",
          "Every claim is highlighted directly on the rendered PDF canvas.",
          "Runs 100% locally on standard workstation hardware.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "Local Document Pipeline to Visual Verification",
        content:
          "PDF pages are converted into structured markdown blocks; indexed into FAISS and BM25; queried using local quantized LLM inference.",
        bullets: [
          "Ingestion: Layout-aware spatial text tokenizer preserving headers and tables.",
          "Retrieval: Reciprocal Rank Fusion (RRF) combining dense and sparse results.",
          "Viewer: PDF.js canvas with coordinate bounding box highlights.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Lightweight, Privacy-Focused AI Stack",
        description: "Modern local vector search and type-safe frontend components.",
        categories: [
          { name: "Vector & Search", items: ["Python", "FAISS", "BM25", "LangChain"] },
          { name: "Backend", items: ["FastAPI", "Uvicorn", "PDFMiner"] },
          { name: "Frontend", items: ["Next.js", "TypeScript", "PDF.js", "Tailwind CSS"] },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Accurate Retrieval with Low Memory Footprint",
        content:
          "Reduced document search times by 80% while keeping memory consumption under 500MB on local developer laptops.",
        bullets: [
          "Achieved 100% provable citation attribution on technical test corpora.",
          "Preserved table alignment across complex academic two-column papers.",
        ],
      },
    },
  },
  {
    id: "personal-finance-tracker",
    index: "05",
    title: "Personal Finance",
    subtitle: "Granular Wealth Analytics & Cashflow Visualization",
    category: "Full Stack & FinTech",
    tagsLine: "FULL STACK / SECURITY / DATA SYSTEMS",
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

    heroImage: "/projects/finance-tracker.jpg",
    thumbnailImage: "/projects/finance-tracker.jpg",
    actionVerbs: ["TRACK", "VISUALIZE", "PLAN"],
    handwrittenAnnotation: "Privacy-first financial clarity.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ Honest Personal Wealth Tracking.",
        summary:
          "A tactile, editorial wealth management web dashboard built for individuals who demand complete financial privacy. Offers interactive expenditure velocity graphs, recurring subscription auditing, and predictive savings trajectories without external trackers or cloud databases.",
        imageCaption: "CLIENT-ENCRYPTED WEALTH ANALYTICS.",
        keyFeatures: [
          "Zero cloud data egress with client-side AES-256-GCM encryption",
          "Handcrafted SVG data charts with zero heavy library overhead",
          "Automated bank statement CSV column normalizer",
          "Predictive financial runway and burn-rate modeling",
        ],
        myRole:
          "Built full-stack architecture, encrypted client storage vault, and bespoke SVG charting modules.",
        roleTags: ["React", "Next.js", "TypeScript", "IndexedDB", "WebCrypto", "SVG"],
      },
      problem: {
        title: "The Problem",
        subtitle: "Monetized User Data & Bloated Banking Apps",
        content:
          "Mainstream financial applications demand linked banking credentials, sell aggregated transaction metrics to advertisers, and suffer from sluggish, ad-laden interfaces.",
        bullets: [
          "Commercial apps harvest user spending habits for targeted credit card marketing.",
          "Heavy charting libraries introduce significant page bloat and lag.",
          "Rigid category structures make custom expenditure auditing frustrating.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Local-First Cryptographic Vault & Native SVG Curves",
        content:
          "All financial transactions are stored exclusively inside the browser's IndexedDB, secured via PBKDF2-derived encryption keys. Bespoke SVG rendering provides instant 60FPS interactivity.",
        bullets: [
          "User maintains 100% sovereignty over personal financial records.",
          "Instantaneous load times with zero third-party telemetry scripts.",
          "Customizable budgeting envelope allocations with visual runway meters.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "Client-Side Cryptographic Data Flow",
        content:
          "Transaction CSVs are normalized in-memory; encrypted with Web Crypto API; persisted into IndexedDB; fed into memoized SVG curves.",
        bullets: [
          "Parser: Client-side CSV tokenizer with auto-detect regex rules.",
          "Security: PBKDF2 key derivation and AES-GCM 256-bit encryption.",
          "Visuals: React SVG path generators computing Bezier splines dynamically.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Lean, Secure Client-Side Architecture",
        description: "Type-safe modern web technologies with native browser cryptographic primitives.",
        categories: [
          { name: "Frontend Core", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
          { name: "Security & Storage", items: ["Web Cryptography API", "IndexedDB", "AES-256-GCM"] },
          { name: "Visualization", items: ["Native SVG", "Bezier Math", "Virtualized Lists"] },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Butter-Smooth 60FPS Performance",
        content:
          "Successfully created a robust replacement for commercial budgeting apps, achieving instant render times and complete user privacy.",
        bullets: [
          "Zero bundle bloat from commercial charting libraries (saved 140KB).",
          "Virtualized tables effortlessly rendering 10,000+ historical transactions.",
        ],
      },
    },
  },
  {
    id: "school-erp",
    index: "06",
    title: "School ERP",
    subtitle: "Academic Administration & Student Information Platform",
    category: "EdTech & Enterprise",
    tagsLine: "EDTECH / ENTERPRISE / FULL STACK",
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

    heroImage: "/projects/school-erp.jpg",
    thumbnailImage: "/projects/school-erp.jpg",
    actionVerbs: ["MANAGE", "SIMPLIFY", "EMPOWER"],
    handwrittenAnnotation: "Unifying institutional workflows.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ Cohesive Academic Infrastructure.",
        summary:
          "A modular academic ERP consolidating student enrollments, faculty timetable assignments, attendance registers, and dynamic grade report generation into a unified, secure web platform.",
        imageCaption: "COMPREHENSIVE ACADEMIC ADMINISTRATION PLATFORM.",
        keyFeatures: [
          "Deterministic Role-Based Access Control (RBAC)",
          "Atomic financial fee ledger with row-level database locks",
          "Automated on-demand PDF report card compiler",
          "Algorithmic timetable conflict resolution scheduler",
        ],
        myRole:
          "Engineered PostgreSQL database schema, RBAC authentication middleware, and server-side PDF document generation pipelines.",
        roleTags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
      },
      problem: {
        title: "The Problem",
        subtitle: "Fragmented Legacy Spreadsheets & Human Error",
        content:
          "Secondary institutions struggle with disjointed paper registers, disconnected accounting ledgers, and chaotic manual report card compilation.",
        bullets: [
          "Manual grade calculations prone to calculation and transcription errors.",
          "Double-booked classrooms and teacher schedule conflicts.",
          "Slow manual generation of official transcripts and student receipts.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Normalized Relational Core with Automated Document Synthesis",
        content:
          "A unified PostgreSQL schema with role-isolated portals. Teachers enter grades once; transcripts and report cards are generated with pixel precision on demand.",
        bullets: [
          "Strict separation of concerns between Admin, Faculty, Student, and Billing roles.",
          "Instant printable PDF transcripts with cryptographically verifiable serial numbers.",
          "Automated attendance rollups and automated absence notifications.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "Multi-Tier Relational Application",
        content:
          "Next.js App Router API routes communicating with PostgreSQL via Prisma ORM; document generation offloaded to dedicated worker microservices.",
        bullets: [
          "Auth Gate: Iron-session / JWT validating deterministic permission scopes.",
          "Data Layer: Normalized PostgreSQL schema with transactional rollbacks.",
          "Document Service: PDFKit rendering official academic layouts dynamically.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Enterprise-Grade Full Stack",
        description: "Proven relational database tools and type-safe backend frameworks.",
        categories: [
          { name: "Full Stack Web", items: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"] },
          { name: "Database & ORM", items: ["PostgreSQL", "Prisma ORM", "Connection Pooling"] },
          { name: "Document Generation", items: ["PDFKit", "Headless Chrome", "Vector SVGs"] },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Streamlined Administrative Operations",
        content:
          "Eliminated administrative grade calculation discrepancies and cut end-of-term transcript compilation time from 3 weeks to 10 seconds.",
        bullets: [
          "Zero scheduling conflicts achieved via backtracking constraint engine.",
          "Handled peak semester result publish traffic without server downtime.",
        ],
      },
    },
  },
];
