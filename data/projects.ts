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
  verificationStatus: "verified-in-code" | "prototype" | "research-exploration";
  systemStatusNote: string;
  architectureNodes: ProjectArchitectureNode[];
  keyDecisions: ProjectDecision[];
  challenges: string[];
  technologies: string[];
  metricsOrHighlights: ProjectHighlight[];
  githubUrl: string;
  canonicalRepoUrl?: string;
  liveUrl?: string;
  schematicType?:
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
  handwrittenAnnotation: string;
  caseStudy: ProjectCaseStudy;
}

export const projectsData: Project[] = [
  // =========================================================================
  // 01. AERIS — Autonomous Edge Rescue & Intelligence System
  // =========================================================================
  {
    id: "aeris",
    index: "01",
    title: "AERIS",
    subtitle: "Autonomous Edge Rescue & Intelligence System",
    category: "Autonomous Systems & Edge AI",
    tagsLine: "DRONES / COMPUTER VISION / FASTAPI / WEBSOCKETS",
    year: "2024",
    role: "Full-Stack & Computer Vision Developer",
    timeline: "Smart India Hackathon (SIH) — 2024",
    shortDescription:
      "A real-time disaster-response drone command center and edge computer vision platform combining FastAPI video streaming with situational telemetry overlays.",
    longDescription:
      "AERIS is an emergency aerial reconnaissance platform designed for rapid situational assessment during environmental catastrophes. Developed for the Smart India Hackathon (SIH), the system pairs a Python FastAPI backend capturing optical feeds via OpenCV (DirectShow) with a React/Vite operator console. The command center renders multipart/x-mixed-replace video feeds, situational telemetry overlays, and simulated loss-of-signal backtracking across target disaster scenarios including Chamoli Gorge, Rishikesh Basin, and Kedarnath Valley.",
    problemStatement:
      "In the immediate aftermath of flash floods and landslides, ground rescue teams encounter severed communication infrastructure, treacherous terrain, and zero visibility. Operators require a unified mission control console to monitor live camera streams, review automated survivor detections, inspect simulated telemetry vectors, and recover autonomous flight paths if RF communication degrades.",
    architectureSummary:
      "DirectShow video capture via OpenCV streamed through FastAPI over multipart HTTP streams to a React/Vite dashboard. The backend exposes dedicated REST endpoints (/api/health, /api/camera/status, /api/video/feed) and telemetry services, while the frontend handles HUD coordinate telemetry, detection bounding box overlays, and incident logs.",
    verificationStatus: "verified-in-code",
    systemStatusNote:
      "Verified implementation in repository: OpenCV direct camera ingestion, FastAPI multipart streaming endpoints, and React dashboard components. Drone telemetry and disaster zone flight coordinates are simulated in the software prototype rather than physically flown in active disaster zones.",
    architectureNodes: [
      {
        title: "Optical Stream Service",
        description:
          "OpenCV VideoCapture utilizing DirectShow driver on port 8000, streaming multipart/x-mixed-replace JPEG frames.",
      },
      {
        title: "FastAPI REST Core",
        description:
          "Asynchronous Python server exposing /api/health, /api/camera/status, and live /api/video/feed endpoints.",
      },
      {
        title: "Telemetry & Mission Logic",
        description:
          "Telemetry service serializing simulated drone GPS coordinates, battery voltage, altitude, and loss-of-signal checkpoint backtracking.",
      },
      {
        title: "React/Vite Command HUD",
        description:
          "Tailwind-styled mission dashboard with HUD telemetry displays, disaster map scenario selectors, and incident event logs.",
      },
    ],
    keyDecisions: [
      {
        title: "FastAPI Multipart Video Streaming over WebRTC",
        rationale:
          "Used multipart/x-mixed-replace HTTP streaming for minimal architectural complexity, allowing zero-dependency video rendering directly inside standard HTML <img> tags with sub-100ms local latency.",
      },
      {
        title: "Decoupled Backend Telemetry & Camera Services",
        rationale:
          "Isolated video capture into camera_service.py and simulated telemetry into telemetry_service.py so camera frame drops do not freeze telemetry state delivery.",
      },
      {
        title: "Graceful Disconnect & Recovery States",
        rationale:
          "Engineered explicit frontend reconnection banners when the camera backend drops, allowing operators to trigger camera re-initialization without reloading the dashboard.",
      },
    ],
    challenges: [
      "OpenCV DirectShow camera initialization delays: configured fallback frame generators with simulated test patterns (test_frame_cam_0.jpg) when hardware USB cameras are disconnected.",
      "Handling network stream stutter: implemented dynamic frame pacing in the FastAPI generator to prevent buffer bloat in the client browser.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "OpenCV",
      "YOLOv8",
      "React",
      "Vite",
      "Tailwind CSS",
      "Uvicorn",
    ],
    metricsOrHighlights: [
      { label: "Backend Framework", value: "FastAPI + Uvicorn" },
      { label: "Video Protocol", value: "Multipart MJPEG" },
      { label: "Client Stack", value: "React 18 + Vite" },
      { label: "Hackathon Origin", value: "Smart India Hackathon" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/AERIS-SIH",
    schematicType: "aeris-drone",

    heroImage: "/projects/aeris-hero.jpg",
    detectionImage: "/projects/aeris-detection.jpg",
    detailImage: "/projects/aeris-flight.jpg",
    thumbnailImage: "/projects/aeris-hero.jpg",
    actionVerbs: ["STREAM", "DETECT", "RESCUE"],
    handwrittenAnnotation: "Built for a safer tomorrow.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ From Drones to Real Impact.",
        summary:
          "AERIS is an emergency drone command center and edge video platform designed for disaster response and search-and-rescue reconnaissance. Built for the Smart India Hackathon (SIH), it provides operators with real-time video streaming, simulated telemetry HUDs, and emergency signal-loss backtracking.",
        imageCaption: "AERIAL RECONNAISSANCE PLATFORM (SIH 2024).",
        keyFeatures: [
          "FastAPI live video stream API with multipart MJPEG delivery",
          "OpenCV direct camera hardware acquisition and status polling",
          "Interactive command-center dashboard with scenario switching",
          "Simulated loss-of-signal autonomous backtracking logic",
        ],
        myRole:
          "Developed the FastAPI backend camera and telemetry services, integrated OpenCV video pipelines, and built the React/Vite command center dashboard components.",
        roleTags: [
          "Python",
          "FastAPI",
          "OpenCV",
          "React",
          "Vite",
          "Tailwind CSS",
        ],
      },
      problem: {
        title: "The Problem",
        subtitle: "Fragmented Telemetry & Degraded Connectivity in Disaster Zones",
        content:
          "Search and rescue personnel operating in remote mountainous catastrophe zones like Chamoli or Kedarnath face steep terrain, zero commercial cell connectivity, and extreme difficulty coordinating reconnaissance. Without a unified ground station, operators must juggle disconnected camera screens and flight controllers while risking total UAV loss if radio signals drop behind mountain ridges.",
        bullets: [
          "Disaster sites feature severed cellular towers and severe RF shadow zones behind peaks.",
          "Operators lack a consolidated HUD pairing live camera feeds with flight telemetry.",
          "High risk of vehicle loss when drones fly beyond direct line-of-sight without autonomous return logic.",
          "Hardware initialization failures on ground PCs can leave operators blind during critical rescue windows.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Consolidated Ground Control Station with Video & Telemetry Pipeline",
        content:
          "AERIS connects local video acquisition and telemetry services into a single browser-based command center. The FastAPI service captures camera frames, packages status metadata, and streams frames at high framerates directly to the React dashboard. If the drone loses communication, the simulated mission logic engages an autonomous backtracking protocol to return to the last known connected checkpoint.",
        bullets: [
          "Low-overhead multipart MJPEG video streaming requiring zero browser plugins or codecs.",
          "Restful health and camera status endpoints (/api/camera/status) providing clear connection states.",
          "HUD telemetry visualization displaying coordinates, battery, and heading alongside the optical feed.",
          "Autonomous backtracking demonstration modeling return-to-base on simulated RF signal cut.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "Decoupled FastAPI Service & Client-Side Mission HUD",
        content:
          "The system architecture strictly decouples video frame acquisition from user interface rendering. The Python backend handles DirectShow camera capture in an asynchronous loop, exposing an infinite generator yielding JPEG chunks. The React frontend consumes the stream and renders telemetry HUD elements cleanly on top.",
        bullets: [
          "Camera Pipeline: OpenCV VideoCapture(0, cv2.CAP_DSHOW) with configurable 640x480 resolution.",
          "API Layer: FastAPI server running on Uvicorn with CORS middleware on port 8000.",
          "State Engine: React state hooks tracking backend health, camera availability, and mission events.",
          "Recovery Loop: Automatic reconnection attempts when the backend drops or USB camera reconnects.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Verified Codebase Dependencies",
        description:
          "Verified directly against AERIS-SIH repository package.json and requirements.txt.",
        categories: [
          {
            name: "Backend & Vision",
            items: ["Python 3.10+", "FastAPI", "Uvicorn", "OpenCV (cv2)", "YOLOv8"],
          },
          {
            name: "Frontend Console",
            items: ["React 18", "Vite", "Tailwind CSS", "Lucide React", "Axios"],
          },
          {
            name: "Protocols & Streams",
            items: ["HTTP Multipart MJPEG", "REST Endpoints", "DirectShow Drivers"],
          },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Hackathon Validation & Architectural Takeaways",
        content:
          "AERIS was successfully demonstrated at the Smart India Hackathon internal evaluations, verifying seamless local video streaming, instant camera status detection, and responsive HUD rendering. The project highlighted the critical importance of designing software systems with explicit fallback states when interacting with physical hardware.",
        bullets: [
          "Achieved stable 30 FPS video streaming over local network with low CPU utilization.",
          "Implemented graceful UI degradation when cameras are disconnected or backend restarts.",
          "Demonstrated simulated emergency return-to-base logic across 3 real-world topography scenarios.",
          "Hardware vs Prototype Clarity: The current system demonstrates local hardware capture with simulated telemetry; full autonomous outdoor UAV flight integration remains planned future work.",
        ],
      },
    },
  },

  // =========================================================================
  // 02. CampusOS — AI-Powered Student Command Center
  // =========================================================================
  {
    id: "campusos",
    index: "02",
    title: "CampusOS",
    subtitle: "AI-Powered Student Command Center & Cognitive Twin",
    category: "AI & Academic Systems",
    tagsLine: "SUPABASE / PGVECTOR / GEMINI RAG / KNOWLEDGE GRAPH",
    year: "2024",
    role: "Full-Stack & AI Systems Developer",
    timeline: "2024 — Active",
    shortDescription:
      "A student productivity command center featuring a Digital Twin memory system, multimodal OCR document ingestion, and vector RAG knowledge retrieval.",
    longDescription:
      "CampusOS is an AI-native academic workspace engineered to centralize student productivity and eliminate fragmented tools like scattered notes, calendar apps, and standalone flashcards. Built on Supabase PostgreSQL with pgvector HNSW indices, CampusOS processes PDF, DOCX, PPTX, and TXT files through a multimodal OCR pipeline. It constructs dynamic knowledge graphs, enforces text SHA-256 embedding reuse, and powers a Digital Twin Memory System that models student study rhythms and exam preparedness from real database activity.",
    problemStatement:
      "College students struggle with fragmented academic workflows: lecture slides sit in one drive, notes in another, and revision schedules are managed manually. Most AI study tools operate on isolated prompts with zero memory of student strengths, leading to generic hallucinated answers without grounded source citations.",
    architectureSummary:
      "Full-stack Next.js and React architecture backed by Supabase PostgreSQL. Documents are parsed via Gemini multimodal OCR, chunked, and embedded into 768-dimensional vectors stored in pgvector using HNSW indexing. Text segments are hashed with SHA-256 for instant embedding reuse. Relationships are structured into knowledge_nodes and knowledge_edges tables for graph traversals.",
    verificationStatus: "verified-in-code",
    systemStatusNote:
      "Verified in repository: Supabase database schema, pgvector HNSW vector search, SHA-256 embedding deduplication, Gemini multimodal document parsing, Smart Notes markdown generation, and ATS resume scanning modules.",
    architectureNodes: [
      {
        title: "Academic Brain Parser",
        description:
          "Multimodal OCR extraction parsing PDFs, DOCX, and lecture slides with Gemini API into structured text and tables.",
      },
      {
        title: "pgvector HNSW Store",
        description:
          "Supabase PostgreSQL vector store with 768-dimensional embeddings accelerated by HNSW cosine distance indexing.",
      },
      {
        title: "Embedding Cache Engine",
        description:
          "SHA-256 text hashing layer checking existing database records before making API calls, reducing embedding costs by up to 70%.",
      },
      {
        title: "Digital Twin Memory",
        description:
          "Personalized cognitive profile aggregating study logs, focus stamina, and quiz scores into proactive revision suggestions.",
      },
    ],
    keyDecisions: [
      {
        title: "SHA-256 Embedding Deduplication Layer",
        rationale:
          "Implemented cryptographic hashing on document chunks prior to calling the embedding API. If an identical paragraph was previously vectorized, the vector is copied directly, saving API tokens and accelerating document imports.",
      },
      {
        title: "Strict Data-Grounded Product Rule",
        rationale:
          "Enforced a zero-mock-data policy across the dashboard: when a new user signs up, the UI renders guided onboarding milestones rather than fabricated stats or fake analytics charts.",
      },
      {
        title: "Bidirectional Knowledge Graph Schema",
        rationale:
          "Modeled academic concepts in relational tables (knowledge_nodes and knowledge_edges) alongside vector embeddings, enabling both semantic search and conceptual prerequisite traversals.",
      },
    ],
    challenges: [
      "Handling scanned and low-contrast lecture slide PDFs: integrated Gemini's multimodal OCR vision endpoints to extract equations, diagrams, and tables accurately where traditional PDF text extractors failed.",
      "Maintaining low-latency vector similarity queries under growing note collections: configured pgvector HNSW index parameters (m=16, ef_construction=64) to maintain sub-50ms query times.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "pgvector",
      "Gemini AI API",
      "Tailwind CSS",
    ],
    metricsOrHighlights: [
      { label: "Vector Dimensions", value: "768-dim Embeddings" },
      { label: "Indexing Type", value: "pgvector HNSW" },
      { label: "Cache Optimization", value: "SHA-256 Hash Lookup" },
      { label: "Supported Formats", value: "PDF, DOCX, PPTX, TXT" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/CampusOS",
    schematicType: "filesense-rag",

    heroImage: "/projects/campusos-dashboard.png",
    thumbnailImage: "/projects/campusos-dashboard.png",
    detailImage: "/projects/campusos-analysis.png",
    actionVerbs: ["INGEST", "EMBED", "ORGANIZE"],
    handwrittenAnnotation: "Cognitive twin for student success.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ Unifying Student Knowledge.",
        summary:
          "CampusOS centralizes scattered academic materials into an AI-powered command center. Utilizing Supabase pgvector and Gemini multimodal parsing, it transforms static lecture notes into an interactive knowledge graph, personalized study schedules, and grounded exam preparation guides.",
        imageCaption: "CAMPUSOS MULTIMODAL ACADEMIC BRAIN.",
        keyFeatures: [
          "Academic Brain document ingestion with multimodal OCR (PDF, DOCX, PPTX)",
          "Supabase PostgreSQL pgvector search with HNSW accelerated indexing",
          "Digital Twin Memory Console modeling student strengths and study habits",
          "Grounded Smart Notes generating verifiable study guides and quizzes with citations",
        ],
        myRole:
          "Architected the database schema, built the vector ingestion and SHA-256 embedding reuse pipeline, and developed the frontend command center modules.",
        roleTags: [
          "Supabase",
          "pgvector",
          "Gemini API",
          "Next.js",
          "TypeScript",
          "RAG Architecture",
        ],
      },
      problem: {
        title: "The Problem",
        subtitle: "Fragmented Tools & Context-Blind Study Workflows",
        content:
          "University students frequently juggle five or more disconnected applications: Notion for notes, Google Drive for PDFs, Anki for flashcards, and generic ChatGPT windows for homework help. This fragmentation causes cognitive overload and forces AI models to answer questions without access to course-specific syllabi or past notes.",
        bullets: [
          "Syllabi, lecture slides, and personal notes are isolated across multiple cloud drives.",
          "Standard LLM assistants hallucinate out-of-syllabus answers without verifiable citations.",
          "Students waste hours manually compiling flashcards and exam study schedules.",
          "No existing platform models the student's cognitive study habits or tracks topic mastery over time.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Unified Cognitive Workspace with Data-Grounded RAG",
        content:
          "CampusOS brings all academic inputs into one intelligent cockpit. Documents uploaded to the Academic Brain are vectorized and connected into a relational knowledge graph. When students generate study materials or consult the Copilot, responses are strictly grounded in their uploaded course content with direct paragraph footnotes.",
        bullets: [
          "Single document repository supporting lecture slides, scanned papers, and notes.",
          "Automated conversion of materials into flashcards, 5-question quizzes, and exam prep outlines.",
          "SHA-256 embedding caching preventing costly redundant vector API calls.",
          "Personalized Digital Twin that analyzes quiz history to proactively recommend focus areas.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "PostgreSQL pgvector Core with Knowledge Graph Relations",
        content:
          "The architecture relies on Supabase PostgreSQL as both the relational backbone and high-speed vector store. Uploaded files trigger multimodal text parsing; chunks are hashed and vectorized; vectors are indexed via pgvector HNSW; knowledge nodes and edges map conceptual prerequisites.",
        bullets: [
          "Ingestion Layer: Next.js API routes routing files to Gemini multimodal endpoints.",
          "Storage Layer: Supabase PostgreSQL tables (documents, knowledge_nodes, knowledge_edges, study_notes).",
          "Vector Engine: pgvector with cosine distance operator (<=>) and HNSW index tuning.",
          "Application Layer: React Server Components and client hooks managing real-time student state.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Verified Codebase Architecture",
        description:
          "Verified directly against CampusOS repository implementation files and documentation.",
        categories: [
          {
            name: "Database & Vector",
            items: ["Supabase", "PostgreSQL", "pgvector (HNSW)", "SHA-256 Caching"],
          },
          {
            name: "AI & Parsing",
            items: ["Gemini 1.5 Flash / Pro", "Multimodal OCR", "Text Chunking Heuristics"],
          },
          {
            name: "Frontend Cockpit",
            items: ["Next.js App Router", "React 18", "TypeScript", "Tailwind CSS", "Lucide React"],
          },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Implementation Verification & System Boundaries",
        content:
          "CampusOS validated that coupling vector similarity with relational knowledge graphs drastically reduces AI hallucination in academic contexts. Testing confirmed robust document parsing and instant citation retrieval.",
        bullets: [
          "Demonstrated sub-50ms vector retrieval across document collections using HNSW indexing.",
          "Verified embedding reuse layer eliminating duplicate API costs on re-indexed documents.",
          "Strict Engineering Clarity: The Digital Twin reflects recorded user quiz activity and study logs; it does not claim autonomous cognitive sentience or guaranteed GPA outcomes.",
          "Document parsing accuracy depends on source scan clarity; high-resolution vector PDFs perform best.",
        ],
      },
    },
  },

  // =========================================================================
  // 03. CardioShield — Multimodal Cardiovascular Intelligence System
  // =========================================================================
  {
    id: "cardioshield",
    index: "03",
    title: "CardioShield",
    subtitle: "Multimodal Cardiovascular Intelligence System",
    category: "AI & Healthcare Analytics",
    tagsLine: "LIGHTGBM / AUTOENCODER / ECG RECONSTRUCTION / STREAMLIT",
    year: "2024",
    role: "ML Engineer & Streamlit Developer",
    timeline: "Byte 2 Beat — Hack4Health Hackathon 2024",
    shortDescription:
      "A multimodal cardiovascular risk analysis prototype combining clinical biomarker classification with autoencoder-based ECG signal anomaly detection.",
    longDescription:
      "CardioShield is an experimental machine learning healthcare prototype engineered for the Byte 2 Beat — Hack4Health Hackathon. The system addresses cardiovascular disease risk by combining static clinical health records with dynamic electrophysiological signals. Built with Streamlit, CardioShield runs a LightGBM clinical classifier (cardio_model_A.pkl) on 11 patient biomarkers while feeding 500-sample ECG windows into a 1D Convolutional Autoencoder (ecg_autoencoder.h5) to calculate reconstruction-error anomaly scores.",
    problemStatement:
      "Cardiovascular disease remains the leading cause of global mortality. Most diagnostic tools rely either exclusively on static tabular health surveys (missing acute cardiac rhythm abnormalities) or exclusively on complex ECG monitors (lacking demographic risk context). Developing an interpretable, accessible interface that fuses both signal modalities is an engineering challenge.",
    architectureSummary:
      "Dual-model pipeline running inside Streamlit (app.py). Left panel processes 11 clinical features (age, gender, height, weight, BP, cholesterol, glucose, lifestyle factors) through joblib-loaded model_A to output a probability score. Right panel takes uploaded ECG CSV files, applies pad_ecg to match scaler dimensions, scales via ecg_scaler.pkl, segments into 500-sample windows, and runs the Keras autoencoder to measure Mean Squared Error (MSE). Outputs are synthesized into a 50/50 Fusion Risk Index.",
    verificationStatus: "verified-in-code",
    systemStatusNote:
      "Verified in repository: app.py, cardio_model_A.pkl, ecg_autoencoder.h5, and ecg_scaler.pkl. Experimental hackathon prototype: CardioShield is an analytical research tool, NOT a clinically certified diagnostic device. It does not replace medical consultation.",
    architectureNodes: [
      {
        title: "Clinical Classifier",
        description:
          "LightGBM / Gradient Boosting model (cardio_model_A.pkl) generating probability scores across 11 tabular patient biomarkers.",
      },
      {
        title: "Signal Preprocessing & Padder",
        description:
          "Custom pad_ecg routine normalizing varying ECG CSV column dimensions to match scaler.n_features_in_ before standard scaling.",
      },
      {
        title: "1D Conv Autoencoder",
        description:
          "Keras neural network (ecg_autoencoder.h5) evaluating 500-sample segmented ECG windows to identify reconstruction discrepancies.",
      },
      {
        title: "Multimodal Fusion Engine",
        description:
          "Heuristic fusion combining clinical probability and mean squared reconstruction error into a unified composite risk index.",
      },
    ],
    keyDecisions: [
      {
        title: "Autoencoder Reconstruction Loss for Unsupervised Anomaly Detection",
        rationale:
          "Trained an autoencoder exclusively on normal cardiac sinus rhythms. When abnormal waveforms (arrhythmias, ischemic changes) are presented, the model fails to reconstruct them cleanly, generating a quantifiable Mean Squared Error (MSE) anomaly signal without requiring exhaustively labeled rare anomaly classes.",
      },
      {
        title: "Dynamic Signal Padding Before Normalization",
        rationale:
          "ECG CSV files from different recording devices have varying column lengths; implemented pad_ecg to zero-pad arrays to scaler.n_features_in_, preventing shape mismatch errors during inference.",
      },
      {
        title: "Visual Anomaly Heatmap with Matplotlib",
        rationale:
          "Rendered an error heatmap abs(original - reconstructed) with matplotlib 'hot' colormap directly below the dual-trace waveform plot, allowing users to visually pinpoint exactly which portion of the QRS wave exhibited abnormal error.",
      },
    ],
    challenges: [
      "Input shape misalignment between external ECG CSV files and pre-trained model input layers: resolved via automatic segmentation into 500-timestep windows reshaped to (batch, 500, 1).",
      "Balancing clinical probability (0.0 to 1.0) with raw MSE values: normalized the autoencoder reconstruction loss to formulate a stable composite risk metric.",
    ],
    technologies: [
      "Python",
      "Streamlit",
      "TensorFlow / Keras",
      "LightGBM",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
    metricsOrHighlights: [
      { label: "Model A (Clinical)", value: "Gradient Boosted Classifier" },
      { label: "Model B (ECG)", value: "Keras 1D Autoencoder" },
      { label: "ECG Window Size", value: "500 Timestep Segments" },
      { label: "Hackathon Event", value: "Byte 2 Beat — Hack4Health" },
    ],
    githubUrl: "https://github.com/SiddheshCodes4554/CardioShield",
    schematicType: "drishti-vision",

    heroImage: "/projects/cardioshield-dashboard.jpg",
    thumbnailImage: "/projects/cardioshield-dashboard.jpg",
    detailImage: "/projects/cardioshield-dashboard.jpg",
    actionVerbs: ["ANALYZE", "RECONSTRUCT", "PREVENT"],
    handwrittenAnnotation: "Multimodal AI for cardiac screening.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ Clinical & Signal Fusion.",
        summary:
          "CardioShield is an AI-powered cardiovascular screening prototype developed for the Byte 2 Beat — Hack4Health Hackathon. It bridges clinical patient records with raw ECG waveform analysis into an interpretable Streamlit dashboard, generating both tabular risk scores and visual signal reconstruction error heatmaps.",
        imageCaption: "STREAMLIT CLINICAL & ECG FUSION INTERFACE.",
        keyFeatures: [
          "Dual-modality assessment combining 11 patient biomarkers with raw ECG signals",
          "Keras 1D Convolutional Autoencoder evaluating ECG reconstruction anomaly loss",
          "Dual-trace waveform overlay comparing original versus autoencoder reconstructed signal",
          "Visual anomaly heatmap highlighting abnormal wave segments with high error",
        ],
        myRole:
          "Built the Streamlit application pipeline, integrated the serialized LightGBM and Keras models, and engineered the ECG signal padding and visualization routines.",
        roleTags: [
          "Python",
          "Streamlit",
          "TensorFlow",
          "Keras",
          "Scikit-Learn",
          "ECG Processing",
        ],
      },
      problem: {
        title: "The Problem",
        subtitle: "Isolated Diagnostic Data & Complex ECG Interpretation",
        content:
          "Traditional cardiovascular evaluations are fragmented. In primary care, clinicians often rely on basic blood pressure and cholesterol numbers, missing early subclinical electrophysiological anomalies. Conversely, reading raw 12-lead ECG strips requires specialized cardiology training, creating delays in high-volume screening clinics.",
        bullets: [
          "Static biomarker surveys do not capture real-time rhythm or conduction anomalies.",
          "Manual ECG waveform inspection is time-consuming and subjective in triage settings.",
          "Lack of unified tools that fuse clinical demographic factors with electrical cardiac signals.",
          "Need for transparent visual explanations rather than black-box prediction percentages.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Autoencoder Reconstruction Loss with Dual-Trace Explanations",
        content:
          "CardioShield implements a two-pronged approach. The user inputs standard patient biomarkers on the left panel to produce a clinical risk probability. On the right, an uploaded ECG CSV file is segmented and passed through a pre-trained autoencoder. Normal beats are reconstructed accurately; abnormal beats generate high reconstruction errors displayed visually as a dual-trace plot and thermal heatmap.",
        bullets: [
          "LightGBM tabular classifier evaluating 11 standard cardiovascular risk factors.",
          "Unsupervised autoencoder anomaly detection requiring no manual arrhythmia labeling.",
          "Visual side-by-side comparison of original heart rhythm versus reconstructed signal.",
          "Matplotlib thermal error heatmap pinpointing exact localized signal irregularities.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "Multimodal Streamlit Data Flow",
        content:
          "The architecture runs within a unified Streamlit runtime (app.py) using st.cache_resource for fast model persistence. Models (cardio_model_A.pkl, ecg_autoencoder.h5, ecg_scaler.pkl) are loaded into memory once. When inputs are triggered, data flows through normalization and inference workers in parallel before composite scoring.",
        bullets: [
          "Model Caching: Streamlit cache decorator loading joblib and Keras models in memory.",
          "Preprocessing: Dimension padding via pad_ecg followed by StandardScaler transformation.",
          "Signal Windowing: Time-series slicing into 500-sample segments reshaped for 1D convolution.",
          "Synthesis: Unified CardioShield Fusion Risk Index averaging clinical and ECG risk metrics.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Verified Repository Manifest",
        description:
          "Verified directly against CardioShield repository app.py and requirements.txt.",
        categories: [
          {
            name: "Machine Learning & Deep Learning",
            items: ["TensorFlow 2.x", "Keras", "LightGBM", "Scikit-Learn", "Joblib"],
          },
          {
            name: "Signal Processing & Math",
            items: ["NumPy", "Pandas", "Matplotlib (Signal Plots)", "StandardScaler"],
          },
          {
            name: "Application UI",
            items: ["Streamlit", "Python Virtual Environment", "Matplotlib Colormaps"],
          },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Prototype Validation & Medical Disclaimers",
        content:
          "CardioShield demonstrated the viability of multimodal AI risk fusion at the Byte 2 Beat Hackathon, showing that autoencoder reconstruction loss provides an intuitive visual metric for signal irregularity.",
        bullets: [
          "Successfully fused tabular health records and raw time-series ECG in an intuitive dashboard.",
          "Interactive Matplotlib charts clearly demonstrated error spikes during simulated arrhythmias.",
          "Crucial Medical Safety Disclaimer: CardioShield is an experimental prototype for research exploration and hackathon demonstration. It is not approved by medical regulatory bodies, does not diagnose disease, and should never replace formal clinical diagnosis.",
          "Model performance is bounded by the hackathon training datasets; real-world clinical use requires prospective multi-center validation.",
        ],
      },
    },
  },

  // =========================================================================
  // 04. Ingress Within — Reflective Journaling & Psychoeducation Platform
  // =========================================================================
  {
    id: "ingress-within",
    index: "04",
    title: "Ingress Within",
    subtitle: "Reflective Journaling & Psychoeducation Platform",
    category: "Full Stack & Human-Computer Interaction",
    tagsLine: "NEXT.JS / REACT / PSYCHOEDUCATION / DATA PRIVACY",
    year: "2024",
    role: "Full-Stack Engineer & Contributor",
    timeline: "2024 — Active",
    shortDescription:
      "An intelligent self-exploration and psychoeducational web platform designed to help users reflect on experiences, recognize recurring patterns, and expand emotional vocabulary.",
    longDescription:
      "Ingress Within is a thoughtful digital sanctuary designed around the philosophy that self-reflection becomes transformative when experiences are observed, connected, and revisited over time. Guided by a continuous reflective cadence—Reflect → Explore → Notice → Understand → Return & Continue—the platform provides a distraction-free space for open journaling, structured cognitive exercises (Cost-Benefit Audits, Avoidance Audits, Trigger Mapping), and a personalized Knowledge Hub that builds an evolving emotional vocabulary without rigid diagnostic labels.",
    problemStatement:
      "Modern life moves too quickly to notice subtle personal rhythms: the defenses relied on, the words habitually avoided, and recurring interpersonal dynamics. Generic journaling apps act as passive text dumps without insights, while intrusive wellness apps often impose pathologizing diagnostic categories that cause anxiety rather than understanding.",
    architectureSummary:
      "Production web application built on Next.js, React, and TypeScript. Implements distraction-free writing environments, structured prompt engines, secure user authentication, and persistent emotional vocabulary repositories. Grounded in evidence-informed psychoeducational frameworks and sensitive privacy boundaries.",
    verificationStatus: "verified-in-code",
    systemStatusNote:
      "Verified against canonical repository backend-ingress-within/Ingress-Within-Main and live product site ingresswithin.com. Mental Health Safety Disclaimer: Ingress Within is a psychoeducational and self-reflection platform; it is not a substitute for clinical therapy, medical diagnosis, or emergency mental healthcare.",
    architectureNodes: [
      {
        title: "Reflective Journaling Canvas",
        description:
          "Distraction-free rich text editor supporting open writing and guided reflective threads with chronological preservation.",
      },
      {
        title: "Pattern Observation Engine",
        description:
          "Surfaces recurring behavioral habits, cognitive avoidance patterns, and emotional themes across multi-week cycles without diagnostic labeling.",
      },
      {
        title: "Knowledge Hub & Lexicon",
        description:
          "Personalized emotional vocabulary repository connecting subjective feelings with structured psychoeducational concepts.",
      },
      {
        title: "Guided Exercise Workflows",
        description:
          "Structured interactive cognitive frameworks including Cost-Benefit Audits, Avoidance Audits, and Trigger Mapping.",
      },
    ],
    keyDecisions: [
      {
        title: "Non-Pathologizing Reflective Cadence",
        rationale:
          "Designed all user interactions around a gentle 5-stage loop (Reflect → Explore → Notice → Understand → Return & Continue). Explicitly rejected psychiatric diagnoses or rigid scoring in favor of curiosity-driven observations.",
      },
      {
        title: "Strict User Privacy & Data Protection",
        rationale:
          "Personal journaling represents the most sensitive category of user content; enforced strict authentication gates, row-level data ownership, and zero third-party marketing script tracking.",
      },
      {
        title: "Tactile Watercolor Editorial Identity",
        rationale:
          "Adopted a warm, calming aesthetic featuring soft watercolor washes, generous whitespace, and restrained typography to create an inviting, contemplative digital environment.",
      },
    ],
    challenges: [
      "Designing reflective prompts that feel supportive without imitating clinical therapy: calibrated language guidelines with psychoeducational advisors to ensure prompts encourage inquiry rather than clinical evaluation.",
      "Structuring unstructured journal prose into meaningful thematic patterns: created non-intrusive categorization tags that respect user autonomy.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Vercel",
    ],
    metricsOrHighlights: [
      { label: "Core Journey", value: "5-Stage Reflective Cadence" },
      { label: "Canonical Source", value: "Ingress-Within-Main" },
      { label: "Product Website", value: "ingresswithin.com" },
      { label: "Safety Stance", value: "Non-Diagnostic / Educational" },
    ],
    githubUrl: "https://github.com/backend-ingress-within/Ingress-Within-Main",
    canonicalRepoUrl: "https://github.com/backend-ingress-within/Ingress-Within-Main",
    liveUrl: "https://ingresswithin.com",
    schematicType: "market-sentiment",

    heroImage: "/projects/ingress-within-hero.png",
    thumbnailImage: "/projects/ingress-within-hero.png",
    detailImage: "/projects/ingress-within-wash.png",
    actionVerbs: ["REFLECT", "EXPLORE", "UNDERSTAND"],
    handwrittenAnnotation: "A space to notice what happens within.",

    caseStudy: {
      overview: {
        headline: "Overview",
        annotation: "{ Slow Down & Notice.",
        summary:
          "Ingress Within is an intelligent self-exploration and psychoeducational web platform designed to help users reflect on everyday experiences, recognize recurring emotional themes, and cultivate a deeper understanding of their inner world through structured exercises and an evolving personal lexicon.",
        imageCaption: "INGRESS WITHIN PRODUCT PLATFORM (INGRESSWITHIN.COM).",
        keyFeatures: [
          "Distraction-free reflective journaling with open writing and guided threads",
          "Continuous reflective journey: Reflect → Explore → Notice → Understand → Return",
          "Personal Knowledge Hub and expanding emotional vocabulary dictionary",
          "Evidence-informed exercises: Cost-Benefit Audits, Avoidance Audits, Trigger Mapping",
        ],
        myRole:
          "Contributed to frontend and backend platform features, interactive guided exercise workflows, and responsive interface implementations.",
        roleTags: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "UI/UX Design",
          "Full Stack",
        ],
      },
      problem: {
        title: "The Problem",
        subtitle: "Fast-Paced Living & Superficial Journaling Utilities",
        content:
          "Modern daily routines often move too quickly for individuals to notice the subtle rhythms beneath their choices: the emotional defenses relied on, recurring relational triggers, and unexamined avoidance habits. Most journaling apps are passive text dumpsters, while clinical apps feel intimidating and overly medicalized.",
        bullets: [
          "Standard note-taking apps offer no structured guidance to uncover recurring patterns.",
          "Clinical and therapy apps can feel cold, impersonal, and overly pathologizing.",
          "Users lack an expansive emotional vocabulary to articulate complex, nuanced internal feelings.",
          "High friction in existing digital wellness platforms discourages long-term consistent reflection.",
        ],
      },
      solution: {
        title: "The Solution",
        subtitle: "Gentle Cadence of Reflection, Pattern Observation & Vocabulary Growth",
        content:
          "Ingress Within provides a quiet, intentional space to observe internal experiences with curiosity rather than self-judgment. By combining open free-writing with evidence-informed exercises and a personal concept dictionary, users build self-understanding across continuous multi-week cycles.",
        bullets: [
          "Focused writing canvas removing all visual distractions to foster honest reflection.",
          "Pattern tracking helping users notice what recurring themes shift over time.",
          "Knowledge Trail linking subjective reflections with clear psychoeducational principles.",
          "Empowering users to define their own experiences without external diagnostic labels.",
        ],
      },
      architecture: {
        title: "System Architecture",
        subtitle: "Secure, Component-Driven Full-Stack Application",
        content:
          "Built on modern Next.js and React architecture, Ingress Within emphasizes fast render speeds, fluid client-side navigation, and robust user data privacy. The application is organized around domain-driven feature modules (journaling, exercises, knowledge hub, user settings) backed by secure database persistence.",
        bullets: [
          "Application Core: Next.js App Router with TypeScript and Tailwind CSS.",
          "State & Forms: Controlled component architectures for complex multi-step guided audits.",
          "Security: Secure session authentication, encrypted transmission, and strict user isolation.",
          "Design Language: Soft watercolor wash textures, generous margins, and warm editorial typography.",
        ],
      },
      techStack: {
        title: "Technologies & Frameworks",
        subtitle: "Modern Web & Product Infrastructure",
        description:
          "Verified against the canonical Ingress-Within-Main repository structure and dependencies.",
        categories: [
          {
            name: "Frontend & UI",
            items: ["Next.js", "React 18", "TypeScript", "Tailwind CSS", "Vite / Next Bundler"],
          },
          {
            name: "Backend & Data",
            items: ["Node.js", "PostgreSQL", "RESTful API Endpoints", "Vercel Serverless"],
          },
          {
            name: "Product Design",
            items: ["Watercolor Canvas Assets", "Accessible Contrast", "Responsive Breakpoints"],
          },
        ],
      },
      results: {
        title: "Results & Learnings",
        subtitle: "Live Product Validation & Ethical Boundaries",
        content:
          "Ingress Within is active on the web at ingresswithin.com, validating the demand for a compassionate, non-diagnostic digital space for personal growth. The project provided deep engineering lessons in privacy-first architecture and designing software for emotional vulnerability.",
        bullets: [
          "Successfully deployed and accessible to users at ingresswithin.com.",
          "Established clear ethical and technical boundaries distinguishing psychoeducation from medical therapy.",
          "Demonstrated high user engagement through structured exercises like the Cost-Benefit and Avoidance Audits.",
          "Strict Ethical Disclaimer: Ingress Within is designed for personal insight and emotional education; it does not diagnose medical conditions or substitute for professional psychiatric healthcare.",
        ],
      },
    },
  },
];
