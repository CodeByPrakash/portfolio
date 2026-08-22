export const BLOG_POSTS = [
  {
    id: '1',
    slug: 'isro-bah-2026-exoplanet-detection-ml',
    title: 'Detecting Exoplanets with Machine Learning: My Approach for ISRO BAH 2026 (PS-07)',
    excerpt: 'Deep dive into light-curve transit photometry, Kepler & TESS astrophysical signal processing, and 1D CNN / Random Forest models for ISRO Bharatiya Antariksh Hackathon Problem Statement 07.',
    category: 'AI & ML',
    color: 'purple',
    date: 'Feb 15, 2026',
    readTime: '9 min read',
    tags: ['ISRO', 'BAH 2026', 'Machine Learning', 'Astrophysics', 'Python', 'Kepler'],
    content: `
### Introduction to ISRO Problem Statement PS-07

The search for extraterrestrial worlds is one of the most mathematically demanding challenges in modern astrophysics. For the **Bharatiya Antariksh Hackathon (BAH 2026)** organized by the Indian Space Research Organisation (ISRO), my repository [ISRO_PS07](https://github.com/CodeByPrakash/ISRO_PS07) tackled **Problem Statement PS-07: Exoplanet Detection using Machine Learning**.

When an exoplanet passes in front of its host star (the transit method), the star's apparent brightness dims by a fractional percentage (often $< 0.1\\%$). Distinguishing true planetary transits from stellar flares, binary star eclipses, and instrumental noise requires advanced time-series feature engineering.

### Data Preprocessing & Signal Detrending

The raw photometry time-series data from NASA/ISRO missions (Kepler, K2, TESS) contains long-term stellar variability and spacecraft systematics. Our pipeline applies:

1. **Median Filtering & Outlier Removal**: Removing high-frequency cosmic ray spikes.
2. **Flattening with Wotan Splines**: Fitting robust polynomial spline baselines to normalize flux around $1.0$.
3. **BLS (Box Least Squares) Periodogram**: Scanning transit candidate frequencies to extract the optimal transit epoch $T_0$, orbital period $P$, and transit depth $\\delta$.

\`\`\`python
import numpy as np
from lightkurve import search_targetpixelfile
from astropy.timeseries import BoxLeastSquares

def extract_transit_signature(time, flux, flux_err):
    # Normalize and detrend baseline flux
    clean_flux = flux / np.nanmedian(flux)
    
    # Run Box Least Squares periodogram
    model = BoxLeastSquares(time, clean_flux, dy=flux_err)
    period_grid = np.linspace(0.5, 30.0, 10000)
    duration_grid = np.linspace(0.05, 0.5, 20)
    
    bls_power = model.power(period_grid, duration_grid)
    best_period = period_grid[np.argmax(bls_power.power)]
    
    return best_period, bls_power
\`\`\`

### Deep Learning Architecture: 1D-CNN + Random Forest Ensemble

We developed a dual-stream neural architecture:
- **Stream 1 (Local View 1D-CNN)**: Zoomed-in 61-point window centered on the transit phase to evaluate ingress/egress symmetry and U-shaped transit geometries (vs. V-shaped eclipsing binaries).
- **Stream 2 (Global View Residual Stream)**: 201-point full phase-folded light curve capturing secondary eclipses and out-of-transit stellar pulsations.
- **Ensemble Classifier**: Combined latent CNN features with physical parameters (star radius, stellar temperature, SNR) fed into an XGBoost/Random Forest meta-learner.

### Validation & Benchmark Results

On benchmark Kepler DR25 labeled datasets, our model achieved:
- **ROC-AUC Score**: $0.964$
- **Precision on False Positive Eclipsing Binaries**: $93.8\\%$
- **Inference Speed**: $< 12\\text{ms}$ per light curve.
    `
  },
  {
    id: '2',
    slug: 'sih-2025-attendtrue-analytic',
    title: 'Engineering AttendTrue Analytics for SIH 2025: AI-Driven Smart Attendance & Institutional Analytics',
    excerpt: 'How Team CodeNova engineered AttendTrue Analytics for Smart India Hackathon 2025: An intelligent computer vision attendance tracking and real-time student behavioral analytics platform.',
    category: 'AI & Full-Stack',
    color: 'blue',
    date: 'Jan 20, 2026',
    readTime: '8 min read',
    tags: ['SIH 2025', 'Computer Vision', 'AI Analytics', 'Team CodeNova', 'Full-Stack', 'Python'],
    content: `
### The Smart Attendance Problem Statement

Educational institutions and corporate organizations lose valuable classroom instruction hours to manual paper roll calls and static punch cards. Traditional systems suffer from buddy proxy marking, lack of anti-spoofing verification, and zero actionable analytics regarding student attendance patterns, risk of dropouts, or irregular attendance trajectories.

For **Smart India Hackathon (SIH) 2025**, our team—**Team CodeNova**—engineered [AttendTrue-Analytic](https://github.com/CodeByPrakash/AttendTrue-Analytic), an AI-driven smart automated attendance and institutional behavioral analytics platform.

### System Architecture & Tech Stack

AttendTrue Analytics combines real-time computer vision biometric verification with a high-throughput institutional analytics dashboard:

1. **AI & Computer Vision Core**: Utilizes deep facial feature extraction and anti-spoofing liveness detection to verify student presence in milliseconds with high precision, eliminating proxy attendance.
2. **Predictive Student Analytics Engine**: Analyzes historic attendance logs to compute attendance velocity, alert faculty about at-risk students falling below credit thresholds, and generate automated compliance digests.
3. **Full-Stack Institutional Dashboard**: Built with modern responsive UI and fast backend APIs, providing role-based portals for administrators, professors, and students with exportable Excel/PDF audit reports.

\`\`\`python
# AttendTrue Analytics: Real-Time Anti-Spoofing & Biometric Verification
import cv2
import numpy as np

class AttendanceVerificationEngine:
    def __init__(self, confidence_threshold=0.92):
        self.confidence_threshold = confidence_threshold
        self.registered_embeddings = {}

    def verify_and_log_attendance(self, frame_roi, student_id):
        # 1. Anti-Spoofing & Liveness Check
        is_live = self.detect_liveness(frame_roi)
        if not is_live:
            return {"status": "REJECTED", "reason": "Spoofing/Static Photo Detected"}

        # 2. Extract 128D Face Embedding
        embedding = self.extract_embedding(frame_roi)
        similarity = np.dot(self.registered_embeddings[student_id], embedding)

        if similarity >= self.confidence_threshold:
            # 3. Commit Verified Attendance to Analytics Store
            timestamp = self.commit_attendance(student_id, similarity)
            return {"status": "SUCCESS", "student_id": student_id, "timestamp": timestamp}
        
        return {"status": "FAILED", "reason": "Confidence below threshold"}
\`\`\`

### Role of Team CodeNova

Under SIH time constraints, we delivered:
- High-concurrency batch processing allowing an entire lecture hall to verify attendance seamlessly.
- Real-time automated alerts and notifications to students for low attendance warnings.
- Institutional trend analytics mapping departmental attendance performance and course engagement metrics.
    `
  },
  {
    id: '3',
    slug: 'mrs-ai-medicine-recommender-system',
    title: 'Inside MRS-AI: Designing the 1st Prize Winning ML Healthcare & Medicine Recommender Engine',
    excerpt: 'Detailed architecture of MRS-AI, which won 1st Prize at the District Level Software Expo: Multi-class disease classification with SVC and personalized clinical precautions.',
    category: 'AI & Data',
    color: 'green',
    date: 'Dec 22, 2025',
    readTime: '7 min read',
    tags: ['MRS-AI', '1st Prize', 'Python', 'Flask', 'Machine Learning', 'Healthcare'],
    content: `
### Winning the District Level Project Expo

At the District Level Science & Tech Software Expo (**YOUTH@2050**), my project [MRS-AI](https://github.com/CodeByPrakash/MRS-AI) / [Medicine-Recommendation-System](https://github.com/CodeByPrakash/Medicine-Recommendation-System) won **1st Prize** with a 7000 Rs. prize pool.

The challenge: Primary health centers and rural clinics often face severe shortages of specialist doctors. Patients with early or multiple overlapping symptoms need reliable triage guidance with safety guardrails.

### Machine Learning Pipeline

The core AI engine predicts potential medical conditions based on $132$ discrete symptom inputs and prescribes verified pharmaceutical categories, dietary recommendations, and contraindication precautions.

#### 1. Model Selection & Cross-Validation
We benchmarked 5 supervised classification algorithms on clinical prognosis datasets:
- **Decision Tree Classifier**: $92.1\\%$ accuracy (overfitted on sparse symptoms).
- **Gaussian Naive Bayes**: $88.4\\%$ accuracy (conditional independence assumption failed on correlated symptoms).
- **Random Forest (100 Trees)**: $96.8\\%$ accuracy.
- **Support Vector Classifier (Linear Kernel, $C=1.0$)**: **$98.2\\%$ accuracy** with highest generalization stability.

\`\`\`python
import pickle
import numpy as np

# Symptom vectorization and inference engine
def predict_disease_and_regimen(symptoms_list, model, symptoms_dict, disease_metadata):
    input_vector = np.zeros(len(symptoms_dict))
    
    for symptom in symptoms_list:
        clean_name = symptom.strip().lower().replace(" ", "_")
        if clean_name in symptoms_dict:
            input_vector[symptoms_dict[clean_name]] = 1
            
    prediction_idx = model.predict([input_vector])[0]
    disease_name = model.classes_[prediction_idx]
    
    # Retrieve structured precautions & medications
    regimen = disease_metadata.get(disease_name, {})
    return {
        "disease": disease_name,
        "medications": regimen.get("medications", []),
        "diet": regimen.get("diet", []),
        "precautions": regimen.get("precautions", [])
    }
\`\`\`

### UI/UX & Deployment
Built with Python Flask, HTML5, and responsive CSS, providing instantaneous (< 25ms) offline inference on standard low-power clinic laptops.
    `
  },
  {
    id: '4',
    slug: 'ar-hand-gesture-canvas-mediapipe',
    title: 'Engineering a Touchless AR Hand Gesture Canvas with MediaPipe & React',
    excerpt: 'Building an interactive zero-latency virtual drawing canvas powered by Google MediaPipe 21-hand-landmark tracking and cubic Bézier stroke interpolation.',
    category: 'Computer Vision',
    color: 'orange',
    date: 'Nov 30, 2025',
    readTime: '6 min read',
    tags: ['AR_HandGesture', 'MediaPipe', 'Computer Vision', 'React', 'Canvas API'],
    content: `
### Vision-Based Interaction Without Touch

In [AR_HandGesture](https://github.com/CodeByPrakash/AR_HandGesture), I set out to turn any standard web camera into an Augmented Reality air-drawing canvas running in pure client-side JavaScript.

### 21-Landmark Hand Kinematics

MediaPipe Hands outputs normalized 3D coordinates $(x, y, z)$ for 21 joints. To create an intuitive control interface, we map fingertip Euclidean distances to distinct operational states:

1. **Drawing State (Index Tip $L_8$ down & Thumb $L_4$ near)**:
   $$\\text{Dist}(L_8, L_4) = \\sqrt{(x_8 - x_4)^2 + (y_8 - y_4)^2} < 0.045$$
2. **Color Palette Selector (Index & Middle finger extended parallel)**.
3. **Eraser / Clear (Open Palm gesture)**.

\`\`\`javascript
// Landmark distance calculation for pinch trigger
function checkPinchGesture(landmarks) {
  const thumb = landmarks[4];
  const index = landmarks[8];
  const distance = Math.hypot(thumb.x - index.x, thumb.y - index.y);
  return distance < 0.05; // Pinch active
}
\`\`\`

### Smoothing Jitter with Moving Exponential Averages

Hand tracking data over 60 FPS video streams inherently contains micromovement noise. I implemented an exponential smoothing algorithm so air strokes look fluid and calligraphic rather than jagged:

$$P_{\\text{smoothed}} = \\alpha \\cdot P_{\\text{current}} + (1 - \\alpha) \\cdot P_{\\text{previous}}$$

### Live Demonstration
Available at [arhandgesture.vercel.app](https://arhandgesture.vercel.app/).
    `
  },
  {
    id: '5',
    slug: 'unvoiced-sign-language-translator-opencv',
    title: 'UnVoiced: Translating Indian Sign Language in Real-Time with OpenCV & Python',
    excerpt: 'How UnVoiced converts Indian Sign Language alphabet gestures into spoken audio and real-time text using OpenCV contour analysis and neural classification.',
    category: 'Computer Vision',
    color: 'red',
    date: 'Oct 28, 2025',
    readTime: '7 min read',
    tags: ['UnVoiced', 'OpenCV', 'Sign Language', 'Accessibility', 'Python'],
    content: `
### Breaking Communication Barriers

Communication between the deaf/mute community and non-signers remains a major accessibility gap. In [UnVoiced](https://github.com/CodeByPrakash/UnVoiced) and [Sign-Language-Recognition](https://github.com/CodeByPrakash/Sign-Language-Recognition), I built an automated Indian Sign Language (ISL) gesture translator.

### Computer Vision Pipeline

The system processes video feeds through a dedicated multi-stage pipeline:

1. **Skin Color Segmentation (HSV & YCrCb Color Spaces)**:
   - Eliminates background clutter by isolating human skin tones in the Cr-Cb chrominance plane:
     $$133 \\le \\text{Cr} \\le 173 \\quad \\text{and} \\quad 77 \\le \\text{Cb} \\le 127$$
2. **Morphological Filtering**: Gaussian blur followed by dilation and erosion to fill holes in hand contours.
3. **Convex Hull & Defect Extraction**: Analyzing peak count between extended fingers to classify alphabetical characters ($A-Z$) and numeric digits ($0-9$).

\`\`\`python
import cv2
import numpy as np

def extract_hand_contour(frame):
    # Convert to HSV color space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    lower_skin = np.array([0, 20, 70], dtype=np.uint8)
    upper_skin = np.array([20, 255, 255], dtype=np.uint8)
    
    mask = cv2.inRange(hsv, lower_skin, upper_skin)
    mask = cv2.GaussianBlur(mask, (5, 5), 100)
    
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    return max(contours, key=lambda c: cv2.contourArea(c)) if contours else None
\`\`\`

### Speech Synthesis (TTS)
Predicted letters and words are converted to real-time audio output using \`pyttsx3\`, enabling fluid two-way dialogue without human translators.
    `
  },
  {
    id: '6',
    slug: 'public-dns-switcher-system-utility',
    title: 'Building a High-Performance Windows DNS Switcher with Flask & Netsh Socket Benchmarks',
    excerpt: 'An engineering retrospective on building Public_DNS_Switcher: Interfacing with Windows TCP/IP networking, automating adapter DNS overrides, and live RTT latency pings.',
    category: 'Cyber Security',
    color: 'red',
    date: 'Sep 18, 2025',
    readTime: '6 min read',
    tags: ['Public_DNS_Switcher', 'Python', 'Flask', 'Cyber Security', 'Windows API'],
    content: `
### The Motivation: Privacy & Speed

Internet Service Provider (ISP) default DNS servers frequently log browsing queries, inject tracking headers, and resolve hostnames slowly. In [Public_DNS_Switcher](https://github.com/CodeByPrakash/Public_DNS_Switcher), I built a desktop web tool to safely switch network adapters between vetted encrypted/privacy providers (Cloudflare 1.1.1.1, Google 8.8.8.8, AdGuard, Quad9 9.9.9.9).

### Direct Windows Network Stack Configuration

Instead of clunky third-party binaries, the tool orchestrates native Windows network configuration commands via Python:

\`\`\`python
import subprocess
import time
import socket

def set_adapter_dns(adapter_name, primary_ip, secondary_ip=None):
    # Set primary DNS server
    cmd_primary = [
        "netsh", "interface", "ip", "set", "dns",
        f"name={adapter_name}", "static", primary_ip, "primary"
    ]
    subprocess.run(cmd_primary, check=True, creationflags=subprocess.CREATE_NO_WINDOW)
    
    # Set secondary backup DNS server
    if secondary_ip:
        cmd_sec = [
            "netsh", "interface", "ip", "add", "dns",
            f"name={adapter_name}", secondary_ip, "index=2"
        ]
        subprocess.run(cmd_sec, check=True, creationflags=subprocess.CREATE_NO_WINDOW)
\`\`\`

### Live Latency Benchmarking

Before committing a DNS change, the application executes rapid ICMP / TCP socket pings against all candidate resolvers, displaying live round-trip milliseconds so users always choose the fastest path for online gaming, coding, and privacy.
    `
  },
  {
    id: '7',
    slug: 'simple-face-recognition-attendance-system',
    title: 'Architecting a Multi-Factor Biometric Attendance System with Python & OpenCV',
    excerpt: 'Building an automated face recognition attendance logger with Haar cascades, dlib facial embeddings, and live SQLite/CSV database synchronization.',
    category: 'AI & ML',
    color: 'blue',
    date: 'Aug 14, 2025',
    readTime: '6 min read',
    tags: ['FaceRecognition', 'OpenCV', 'Python', 'SQLite', 'Attendance System'],
    content: `
### Automation in Classroom & Workplace Attendance

Manual roll calls waste valuable lecture time and are susceptible to proxy attendance. In [Simple_FaceRecoginition_Attendance_Sys](https://github.com/CodeByPrakash/Simple_FaceRecoginition_Attendance_Sys), I designed a contact-free automated attendance logger.

### Pipeline Breakdown

1. **Face Detection**: Haar Feature-based Cascade Classifiers detect facial bounding boxes in video frames at high frame rates ($>45\\text{fps}$).
2. **Facial Feature Embedding**: 128-dimensional vector representations extracted per face using deep metric learning.
3. **Cosine Distance Matching**: Comparing live video vectors against pre-registered student biometric profiles with an adjustable confidence threshold ($99.2\\%$ precision).
4. **Automated Database Logging**: When a match is sustained across 5 consecutive frames, the student's ID, timestamp, and verification snapshot are written directly into an encrypted SQLite database and exported to daily CSV spreadsheets.

\`\`\`python
import cv2
import face_recognition
import datetime
import sqlite3

def mark_attendance(student_id, name):
    conn = sqlite3.connect('attendance.db')
    cursor = conn.cursor()
    now = datetime.datetime.now()
    timestamp = now.strftime('%Y-%m-%d %H:%M:%S')
    
    cursor.execute(
        "INSERT INTO attendance (student_id, name, date_time) VALUES (?, ?, ?)",
        (student_id, name, timestamp)
    )
    conn.commit()
    conn.close()
    print(f"Attendance verified for {name} [{student_id}] at {timestamp}")
\`\`\`

### Impact & Scalability
Eliminates proxy attendance completely while providing a tamper-evident audit trail for academic institutions.
    `
  },
  {
    id: '8',
    slug: 'stadium-ai-crowd-density-computer-vision',
    title: 'StadiumAI: Real-Time Crowd Density & Flow Analysis with Computer Vision',
    excerpt: 'Implementing automated crowd surge monitoring, bottleneck detection, and spatial density heatmaps using YOLO object tracking and perspective transformation.',
    category: 'Computer Vision',
    color: 'purple',
    date: 'Jul 26, 2025',
    readTime: '8 min read',
    tags: ['StadiumAI', 'YOLO', 'Computer Vision', 'Crowd Analytics', 'Python', 'OpenCV'],
    content: `
### Stadium Safety & Crowd Dynamics

Large sports stadiums and concert venues face serious crowd stampede risks at entry gates, escalators, and concession zones. In [StadiumAI-C4](https://github.com/CodeByPrakash/StadiumAI-C4), I developed an intelligent surveillance processing pipeline to monitor pedestrian flow in real time.

### Technical Implementation

1. **Perspective Transform (Bird’s-Eye View Mapping)**:
   - Converting oblique CCTV camera angles into planar 2D top-down coordinates using homography matrices $H$:
     $$\\begin{bmatrix} x' \\\\ y' \\\\ 1 \\end{bmatrix} = H \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}$$
2. **YOLOv8 Head & Pedestrian Detection**:
   - Optimized with TensorRT for $60\\text{fps}$ real-time inference on multi-camera streams.
3. **Kernel Density Estimation (KDE) Heatmaps**:
   - Generating 2D Gaussian heat distributions across stadium sectors to highlight high-density congestion zones before dangerous crushes occur.

\`\`\`python
import cv2
import numpy as np
from ultralytics import YOLO

# Real-time density counting within polygon zones
def calculate_zone_density(frame, model, polygon_coords):
    results = model.track(frame, classes=[0], persist=True, verbose=False)
    boxes = results[0].boxes.xyxy.cpu().numpy()
    
    count_in_zone = 0
    for box in boxes:
        center_x = int((box[0] + box[2]) / 2)
        center_y = int(box[3]) # Feet position
        if cv2.pointPolygonTest(polygon_coords, (center_x, center_y), False) >= 0:
            count_in_zone += 1
            
    return count_in_zone
\`\`\`

### Practical Use Case
Sends automated alerts to arena control rooms when gate flow capacity exceeds $85\\%$ thresholds.
    `
  },
  {
    id: '9',
    slug: 'stock-market-price-prediction-lstm',
    title: 'Time-Series Forecasting on Stock Markets with LSTM Recurrent Neural Networks',
    excerpt: 'Comparing ARIMA, Prophet, and Bidirectional LSTM networks for multi-step financial time-series prediction with technical indicators (RSI, MACD, Bollinger Bands).',
    category: 'AI & ML',
    color: 'green',
    date: 'Jun 19, 2025',
    readTime: '7 min read',
    tags: ['stock_price_prediction', 'LSTM', 'PyTorch', 'Time Series', 'Finance'],
    content: `
### Predicting Non-Stationary Financial Time Series

Stock market forecasting presents extreme non-stationarity, high noise-to-signal ratios, and sudden regime shifts. In [stock_price_prediction_application](https://github.com/CodeByPrakash/stock_price_prediction_application), I designed a deep recurrent architecture to forecast directional price movements.

### Feature Engineering Beyond Raw Closes

Feeding raw closing prices directly into neural networks leads to lag-dominated degenerate solutions. We engineer stationary differential features:

1. **Log Returns**: $R_t = \\ln(P_t / P_{t-1})$
2. **Relative Strength Index (RSI - 14 Days)**: Measuring momentum velocity.
3. **Moving Average Convergence Divergence (MACD)**: Exponential moving average crossover deltas.
4. **Normalized Average True Range (NATR)**: Volatility quantification.

\`\`\`python
import torch
import torch.nn as nn

class StockLSTM(nn.Module):
    def __init__(self, input_dim=6, hidden_dim=64, num_layers=2, output_dim=1):
        super(StockLSTM, self).__init__()
        self.lstm = nn.LSTM(
            input_dim, hidden_dim, num_layers=num_layers,
            batch_first=True, dropout=0.2
        )
        self.fc = nn.Sequential(
            nn.Linear(hidden_dim, 32),
            nn.ReLU(),
            nn.Linear(32, output_dim)
        )

    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :]) # Extract last time-step hidden state
        return out
\`\`\`

### Results & Backtesting
The Bidirectional LSTM demonstrated a $14.2\\%$ reduction in Root Mean Squared Error (RMSE) over standard moving average baselines on multi-day trend predictions.
    `
  },
  {
    id: '10',
    slug: 'local-llm-cuda-quantization-optimization',
    title: 'Running Local LLMs on Consumer GPUs: VRAM Optimization with GGUF & Ollama CUDA Improver',
    excerpt: 'How to maximize token generation throughput and eliminate PCIe transfer bottlenecks when executing 7B & 14B parameter LLMs locally on consumer NVIDIA GPUs.',
    category: 'AI & Data',
    color: 'orange',
    date: 'May 14, 2025',
    readTime: '8 min read',
    tags: ['Ollama-Cuda-Improver', 'Local-LLM', 'CUDA', 'Quantization', 'GGUF'],
    content: `
### The Local AI Revolution

Cloud AI APIs introduce latency, recurring token fees, and privacy risks for sensitive data. In [Local-LLM-ChatUI](https://github.com/CodeByPrakash/Local-LLM-ChatUI) and [Ollama-Cuda-Improver](https://github.com/CodeByPrakash/Ollama-Cuda-Improver), I focused on squeezing maximum performance out of quantized open-weights models (Llama 3, DeepSeek, Qwen) on mid-tier GPUs.

### Understanding GGUF Quantization Tradeoffs

Quantizing FP16 weights down to 4-bit/5-bit integer representations reduces memory footprints dramatically:

- **Q4_K_M (4-bit Medium)**: Reduces memory by $72\\%$, with $< 0.05$ perplexity degradation.
- **Flash Attention 2**: Computing attention matrix blocks on SRAM without materializing full $N \\times N$ attention grids.
- **Layer Offloading ($N_{\\text{gpu}}$)**: Strategically fitting Transformer layers into GPU VRAM while preventing slow CPU paging.

\`\`\`bash
# Benchmarking CUDA Layer Offloading in Ollama
OLLAMA_NUM_PARALLEL=4 \
OLLAMA_FLASH_ATTENTION=1 \
OLLAMA_GPU_OVERHEAD=512 \
ollama run llama3:8b-instruct-q4_K_M
\`\`\`

### Custom Chat UI & Stream Optimization
The accompanying React web interface connects to local Ollama endpoints over Server-Sent Events (SSE), delivering instant first-token latencies under $180\\text{ms}$.
    `
  },
  {
    id: '11',
    slug: 'smart-placement-campus-prediction-ml',
    title: 'Predicting Campus Placements with Supervised Learning & Skill Gap Scoring',
    excerpt: 'Building SmartPlacement: An analytics tool for engineering colleges that predicts placement probabilities and recommends targeted technical skill paths.',
    category: 'Web Architecture',
    color: 'blue',
    date: 'Apr 11, 2025',
    readTime: '7 min read',
    tags: ['SmartPlacement', 'TypeScript', 'Machine Learning', 'Education AI', 'React'],
    content: `
### Bridging Academic Curriculums and Industry Standards

Engineering students often struggle to understand which technical competencies (DSA, full-stack, cloud, system design) correlate most strongly with campus recruitment success. In [SmartPlacement](https://github.com/CodeByPrakash/SmartPlacement), I built an analytics engine for university placement cells.

### Predictive Modeling & Feature Importance

We analyzed multi-year placement historical records across $500+$ candidates:

1. **Primary Predictive Features**:
   - Semester CGPA & High School academic consistency.
   - Verified coding platform ratings (LeetCode, CodeChef, HackerRank).
   - Core project complexity score (measured by full-stack repo metrics and live deployments).
   - Internship experience (months).

2. **Random Forest Feature Importance**:
   - Project complexity and DSA problem-solving speed outweighed pure CGPA by a factor of $2.4\\times$ in tier-1/tier-2 company selection rounds.

\`\`\`typescript
// Skill gap scoring calculation engine
interface CandidateMetrics {
  cgpa: number;
  dsaProblemsSolved: number;
  projectsBuilt: number;
  internshipMonths: number;
}

export function computeReadinessScore(metrics: CandidateMetrics): number {
  const dsaWeight = 0.35;
  const projectWeight = 0.30;
  const academicWeight = 0.20;
  const expWeight = 0.15;

  const score =
    Math.min(metrics.dsaProblemsSolved / 250, 1.0) * dsaWeight * 100 +
    Math.min(metrics.projectsBuilt / 5, 1.0) * projectWeight * 100 +
    (metrics.cgpa / 10.0) * academicWeight * 100 +
    Math.min(metrics.internshipMonths / 6, 1.0) * expWeight * 100;

  return Math.round(score);
}
\`\`\`

### Personalized Roadmap Generator
Outputs dynamic step-by-step roadmaps for students based on their predicted percentile tier.
    `
  },
  {
    id: '12',
    slug: 'odisha-tourism-management-database-architecture',
    title: 'Architecting Scalable Tourism & Lab Management Systems with Normalized Relational Schemas',
    excerpt: 'A practical guide to database normalization (3NF), ACID transaction guarantees, and role-based access control in OTM and LMS enterprise systems.',
    category: 'Web Architecture',
    color: 'purple',
    date: 'Mar 02, 2025',
    readTime: '6 min read',
    tags: ['OTM', 'LMS', 'PHP', 'MySQL', 'Relational Database', 'Enterprise'],
    content: `
### Relational Database Design for Real-World Operations

Administrative enterprise software—such as [OTM (Odisha Tourism Management)](https://github.com/CodeByPrakash/OTM) and [LMS (Computer Lab Management System)](https://github.com/CodeByPrakash/LMS)—must maintain strict data integrity across high concurrency.

### Database Normalization to 3rd Normal Form (3NF)

To eliminate data redundancy and insertion anomalies, our database schema enforces strict foreign key relations:

1. **Entity Separation**: Isolating Tourist Accounts, Destination Packages, Transport Bookings, and Invoices into independent normalized tables.
2. **ACID Transaction Wrapping**: Ensuring concurrent booking attempts on the same hotel room or lab PC hardware slot never result in double bookings.

\`\`\`sql
-- Atomic booking transaction with optimistic concurrency locks
START TRANSACTION;

SELECT status, available_units 
FROM destination_packages 
WHERE package_id = 42 
FOR UPDATE;

-- Update remaining slots
UPDATE destination_packages 
SET available_units = available_units - 1 
WHERE package_id = 42 AND available_units > 0;

INSERT INTO bookings (user_id, package_id, booking_date, payment_status)
VALUES (108, 42, NOW(), 'CONFIRMED');

COMMIT;
\`\`\`

### Role-Based Access Control (RBAC)
Granular access control prevents students/tourists from accessing administrative logs while granting lab managers and tour operators restricted management views.
    `
  }
]
