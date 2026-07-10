export const resume = {
  name: "Partha Pratim Bhakat",
  tagline: "Machine Learning Engineer | Software Developer",
  location: "Bhopal, India",
  heroTypewriter: [
    "Machine Learning Engineer",
    "Final Year CSE Undergrad @ VIT Bhopal",
    "Generative AI Specialist",
  ],
  heroDescription:
    "Bridging the gap between deep learning and production-scale software. Passionate about agentic LLM systems and computer vision.",
  summary:
    "Machine Learning Engineer and Computer Science undergraduate with hands-on experience in deep learning, generative AI, and agentic LLM systems, gained through a paid AI/ML internship, applied research, and an award-winning hackathon project. Seeking a full-time Machine Learning Engineer / AI Engineer role to apply model development and deployment skills to production-scale problems.",

  // Powers the "currently exploring" ticker in About — update this as you learn new things
  currentlyExploring: [
    "multi-agent orchestration",
    "retrieval-augmented generation at scale",
    "vision-language models",
    // 👉 add/replace with what's actually true for you at ship time
  ],

  // Hero stat strip — all real numbers from resume content
  stats: [
    { value: 99.8, suffix: "%", label: "ASL model accuracy", decimals: 1 },
    { value: 2, suffix: "nd", label: "Hackathon placement", decimals: 0 },
    { value: 1, suffix: "", label: "Patent filed", decimals: 0 },
    { value: 14, suffix: "+", label: "AI/ML tools", decimals: 0 },
  ],

  contact: {
    email: "bhakatparthapratim@gmail.com",
    phone: "+91 9002464500",
    github: { username: "parthabhakatppb", url: "https://github.com/parthabhakatppb" },
    linkedin: {
      username: "partha-pratim-bhakat",
      url: "https://www.linkedin.com/in/partha-pratim-bhakat-119856289",
    },
  },

  skills: {
    aiMl: [
      "Deep Learning", "Neural Networks (CNN, ANN)", "NLP", "Computer Vision",
      "Scikit-learn", "TensorFlow", "Keras", "PyTorch", "Hugging Face",
      "OpenCV", "Agentic AI", "OpenAI GPT-4o-mini", "Prompt Engineering", "Model Deployment",
      // 👉 add more AI/ML tools/frameworks here as you pick them up
    ],
    development: [
      "Python", "Java", "SQL", "Next.js", "FastAPI", "REST APIs", "Pydantic",
      // 👉 add more here
    ],
    dataAndTools: [
      "MySQL", "MongoDB", "Docker", "Git", "Pandas", "NumPy",
      // 👉 add more here
    ],
  },

  experience: [
    // 👉 add your next role here as a new object with this same shape
    {
      role: "AI/ML Intern",
      company: "Rigzz Technologies",
      location: "Kolkata, West Bengal",
      period: "Mar 2026 – Apr 2026",
      bullets: [
        "Assisted in building and testing machine learning models, contributing to data preprocessing and feature engineering that improved input data quality for downstream model evaluation.",
        "Collaborated with cross-functional engineers to debug and optimize AI/ML pipelines, reducing recurring pipeline errors through documented fixes and code reviews.",
        "Participated in daily stand-ups and sprint planning under agile practices, consistently delivering assigned components on schedule.",
      ],
    },
  ],

  // 👉 GitHub repositories you wish to showcase directly from your profile!
  // The website automatically retrieves live metrics (stars, forks, language, description, live URL) from GitHub.
  // To change which projects show up on your portfolio, just add/remove repo names in this array:
  githubSection: {
    username: "parthabhakatppb",
    highlightedRepos: [
      "KUMBH-CORTEX",
      "Sign-language-detection",
      "CodeAlpha_VisionTrack_AI",
      "CodeAlpha_Universal-AI-Translation-Engine",
      "ChemViz_Project",
      "buildmedic-platform",
    ],
  },

  projects: [
    // 👉 add your next project here as a new object with this same shape
    {
      title: "AI Text-to-SQL Pipeline",
      period: "May 2026",
      description:
        "Created a Text-to-SQL chatbot using Google Gemini and an agentic workflow to translate natural language into MySQL, evaluated with the RAGAS framework.",
      bullets: [
        "Created a Text-to-SQL chatbot using Google Gemini to translate natural language queries into executable MySQL statements, backed by an automated pipeline that ingests and maps raw Excel data into a structured database.",
        "Constructed an LLM chain with a custom output parser to dynamically execute queries and format results into conversational responses.",
        "Implemented an agentic workflow and evaluated query generation accuracy and response fidelity using the RAGAS framework.",
      ],
      tags: ["Python", "Google Gemini LLM", "MySQL", "Agentic AI"],
      link: null,
      // Tier 1 model card data
      modelCard: {
        framework: "Google Gemini + LangChain",
        dataset: "Custom Excel → MySQL pipeline",
        metric: "RAGAS fidelity score",
        detail: "Agentic LLM chain with custom output parser for NL→SQL translation",
      },
      // Tier 1 architecture diagram stages
      architecture: [
        "User Query",
        "LLM Chain (Gemini)",
        "SQL Generation",
        "MySQL Execution",
        "RAGAS Evaluation",
        "Response",
      ],
    },
    {
      title: "Real-Time ASL Detection",
      period: "May 2026",
      description:
        "Real-time American Sign Language detection app classifying 24 alphabet gestures via webcam, powered by a custom CNN trained from scratch.",
      bullets: [
        "Developed a real-time American Sign Language detection application classifying 24 alphabet gestures via a live webcam feed.",
        "Designed and trained a custom CNN from scratch on the Sign Language MNIST dataset, achieving 99.8% training accuracy using batch normalization, dropout, and dynamic learning-rate reduction to prevent overfitting.",
        "Integrated OpenCV for real-time video processing, leveraging background subtraction and contour detection to isolate hand gestures.",
      ],
      tags: ["Python", "OpenCV", "TensorFlow", "Keras"],
      link: "https://github.com/parthabhakatppb/sign-language-detection",
      // Tier 1 model card data
      modelCard: {
        framework: "TensorFlow / Keras",
        dataset: "Sign Language MNIST",
        metric: "99.8% training accuracy",
        detail: "Custom CNN with batch norm, dropout, dynamic LR reduction",
      },
      // Tier 1 architecture diagram stages
      architecture: [
        "Webcam Feed",
        "OpenCV Preprocessing",
        "Background Subtraction",
        "CNN Inference",
        "Gesture Classification",
        "Real-time Output",
      ],
    },
  ],

  achievements: [
    // 👉 add your next award/patent/publication here as a new object with this same shape
    {
      type: "Hackathon",
      title: "2nd Place Winner — Mahakumbh MP 2028 Innovation Hackathon",
      detail: "Project: Kumbh-Cortex Omni-Flow",
      date: "Jun 2026",
      link: null, // 👉 add a project write-up/demo link here if one exists
    },
    {
      type: "Patent",
      title: "Self-Recharging System for an Unmanned Aerial Platform",
      detail: "Application filed",
      date: "2026",
      link: null, // 👉 add the Google Patents link once the application is public
    },
    {
      type: "Publication",
      title: "Entertainment Multimedia Compression Using YOLOv8 and GAN",
      detail: "Under review, Springer",
      date: "2026",
      link: null, // 👉 add the arXiv/DOI link once available; update `detail` to "Published, Springer" too
    },
  ],

  leadership: [
    // 👉 add more leadership/extracurricular entries here as new objects with this same shape
    {
      role: "Operations Lead",
      org: "The Bengali Club, VIT Bhopal",
      period: "Mar 2024 – Mar 2025",
      detail: "Managed end-to-end logistics and workflows to ensure seamless execution of club cultural events.",
    },
    {
      role: "Core Member, Marketing",
      org: "Anterix Club, VIT Bhopal",
      period: "May 2025 – May 2026",
      detail: "Executed targeted marketing campaigns and campus outreach to boost club visibility and event registrations.",
    },
  ],

  education: {
    institution: "Vellore Institute of Technology-Bhopal",
    degree: "B.Tech, Computer Science and Engineering",
    cgpa: "7.74",
    period: "Aug 2023 – May 2027",
    location: "Bhopal, India",
  },
} as const;
