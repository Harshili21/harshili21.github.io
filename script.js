/* ============================================
   HARSHILI PATNI - PORTFOLIO JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Particle Background ----------
    createParticles();

    // ---------- Typing Effect ----------
    initTypingEffect();

    // ---------- Navigation ----------
    initNavigation();

    // ---------- Scroll Animations ----------
    initScrollAnimations();

    // ---------- Stats Counter ----------
    initStatsCounter();

    // ---------- Back to Top ----------
    initBackToTop();

    // ---------- Image Fallbacks ----------
    initImageFallbacks();

    // ---------- Theme Toggle ----------
    initThemeToggle();

    // ---------- ML Code Preview Modal ----------
    initCodeModal();
});

/* ---- Particles ---- */
function createParticles() {
    const container = document.getElementById('particles-bg');
    if (!container) return;
    const count = 40;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        const size = 2 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = 0.15 + Math.random() * 0.35;
        container.appendChild(particle);
    }
}

/* ---- Typing Effect ---- */
function initTypingEffect() {
    const titles = [
        'Full-Stack Developer',
        'AI Automation Engineer',
        'Machine Learning Engineer',
        'Software Developer'
    ];
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ---- Navigation ---- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        updateActiveLink();
    });

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ---- Scroll Animations (custom AOS) ---- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ---- Stats Counter Animation ---- */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    const isFloat = target % 1 !== 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;

        if (isFloat) {
            element.textContent = current.toFixed(2);
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isFloat ? target.toFixed(2) : target;
        }
    }

    requestAnimationFrame(update);
}

/* ---- Back to Top ---- */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

/* ---- Image Fallbacks ---- */
function initImageFallbacks() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function () {
            // Create a fallback placeholder
            const parent = this.parentElement;
            const alt = this.alt || 'Image';
            const isProfile = this.id === 'profileImage';

            if (isProfile) {
                // Profile placeholder
                parent.innerHTML = `
                    <div style="
                        width: 100%; height: 100%;
                        display: flex; align-items: center; justify-content: center;
                        background: linear-gradient(135deg, #1a1a2e, #2d1b69);
                        color: #8b5cf6; font-size: 5rem; font-weight: 800;
                        font-family: 'Space Grotesk', sans-serif;
                    ">HP</div>
                `;
            } else {
                // Project image placeholder
                const icons = {
                    'mailpilotImg': '🤖',
                    'pixouraImg': '🎨',
                    'cropWeedImg': '🌾',
                    'trafficImg': '🚦',
                    'salesDashboardImg': '📊',
                    'exoplanetImg': '🚀',
                    'autovestImg': '💰',
                    'airlineImg': '✈️',
                    'foodImg': '🍕',
                    'visaImg': '🌐',
                    'hotelImg': '🏨'
                };
                const icon = icons[this.id] || '📁';

                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.style.background = 'linear-gradient(135deg, #1a1a2e, #2d1b69)';
                parent.style.flexDirection = 'column';
                parent.style.gap = '12px';

                this.remove();
                parent.innerHTML = `
                    <span style="font-size: 3rem;">${icon}</span>
                    <span style="
                        color: #a0a0b8; font-size: 0.85rem;
                        padding: 6px 16px; border-radius: 8px;
                        background: rgba(139,92,246,0.1);
                        border: 1px dashed rgba(139,92,246,0.3);
                    ">Drop image in assets/ folder</span>
                ` + (parent.querySelector('.project-image-overlay')?.outerHTML || '');
            }
        });
    });
}

/* ---- Theme Toggle ---- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    if (!toggleBtn || !themeIcon) return;

    // Dark is the default — clear any stale 'theme' key from automated testing.
    localStorage.removeItem('theme');

    // Only switch to light if user explicitly chose it via the toggle.
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        themeIcon.className = 'fas fa-moon';
    } else {
        document.body.classList.remove('light');
        themeIcon.className = 'fas fa-sun';
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light');
        if (isLight) {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('user-theme', 'light');
        } else {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('user-theme', 'dark');
        }
    });
}


/* ---- ML Code Preview Modal ---- */
const ML_CODE_SNIPPETS = {
    "crop-weed": {
        "filename": "train_crop.py",
        "meta": "Crop & Weed Detection • YOLOv8n Fine-Tuning (512x512, 50 epochs)",
        "githubUrl": "https://github.com/Harshili21/ml-crop-detection-and-traffic-forecasting/blob/main/Project5_Ag_Crop%20and%20weed%20detection/Project5_Ag_Crop%20and%20weed%20detection/train_crop.py",
        "code": "from ultralytics import YOLO\nimport os\n\ndef main():\n    # 1. Double check that the configuration file exists\n    yaml_path = \"dataset.yaml\"\n    if not os.path.exists(yaml_path):\n        print(f\"❌ Error: {yaml_path} not found! Please create it first.\")\n        return\n\n    # 2. Load a pre-trained nano YOLOv8 model (lightweight, fast to train)\n    print(\"🔄 Initializing pre-trained YOLOv8 nano model...\")\n    model = YOLO(\"yolov8n.pt\") \n\n    # 3. Start the fine-tuning training process\n    print(\"🚀 Starting custom training on the Crop & Weed dataset...\")\n    results = model.train(\n        data=yaml_path,      # Path to your dataset configuration file\n        epochs=50,           # Number of training loops (adjust based on hardware)\n        imgsz=512,           # Target image dimensions from your processing step\n        batch=16,            # Number of images per training batch\n        device=\"cpu\",        # Change to \"cuda\" if you have a dedicated NVIDIA GPU\n        name=\"crop_weed_yolov8\"\n    )\n    \n    print(\"✅ Training complete! Performance metrics saved in 'runs/detect/crop_weed_yolov8'\")\n\nif __name__ == \"__main__\":\n    main()\n"
    },
    "traffic-forecast": {
        "filename": "train_traffic.py",
        "meta": "Smart City Traffic Forecasting • XGBoost Regressor (R² = 0.8961)",
        "githubUrl": "https://github.com/Harshili21/ml-crop-detection-and-traffic-forecasting/blob/main/Project9_smart-city-traffic-patterns/Project9_smart-city-traffic-patterns/train_traffic.py",
        "code": "import pandas as pd\nimport numpy as np\nimport xgboost as xgb\nfrom sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nimport os\n\ndef load_data():\n    train_path = \"traffic.csv\"\n    test_path = os.path.join(\"smart-city-traffic-patterns\", \"datasets_8494_11879_test_BdBKkAj.csv\")\n    \n    if not os.path.exists(train_path):\n        raise FileNotFoundError(f\"Missing training data: {train_path}\")\n    if not os.path.exists(test_path):\n        raise FileNotFoundError(f\"Missing test data: {test_path}\")\n        \n    train_df = pd.read_csv(train_path)\n    test_df = pd.read_csv(test_path)\n    return train_df, test_df\n\ndef feature_engineering(df):\n    # Make copy to avoid warnings\n    df = df.copy()\n    df['DateTime'] = pd.to_datetime(df['DateTime'])\n    \n    # Extract time features\n    df['hour'] = df['DateTime'].dt.hour\n    df['day_of_week'] = df['DateTime'].dt.dayofweek\n    df['day_of_month'] = df['DateTime'].dt.day\n    df['month'] = df['DateTime'].dt.month\n    df['year'] = df['DateTime'].dt.year\n    df['day_of_year'] = df['DateTime'].dt.dayofyear\n    \n    # Is weekend\n    df['is_weekend'] = (df['day_of_week'] >= 5).astype(int)\n    \n    # Public holidays (mapping for 2015, 2016, 2017)\n    holidays = [\n        '2015-01-01', '2015-01-26', '2015-05-01', '2015-08-15', '2015-10-02', '2015-12-25',\n        '2016-01-01', '2016-01-26', '2016-05-01', '2016-08-15', '2016-10-02', '2016-12-25',\n        '2017-01-01', '2017-01-26', '2017-05-01', '2017-08-15', '2017-10-02', '2017-12-25'\n    ]\n    df['is_holiday'] = df['DateTime'].dt.strftime('%Y-%m-%d').isin(holidays).astype(int)\n    \n    # Junction is a key categorical feature. Let's do one-hot encoding or leave as-is for XGBoost (which handles numerical features).\n    # Since XGBoost handles numbers, we'll keep Junction as label (1, 2, 3, 4) and also add one-hot encoded columns.\n    for i in [1, 2, 3, 4]:\n        df[f'junction_{i}'] = (df['Junction'] == i).astype(int)\n        \n    return df\n\ndef main():\n    print(\"[1/6] Loading datasets...\")\n    train_df, test_df = load_data()\n    \n    print(\"[2/6] Performing feature engineering...\")\n    train_df = feature_engineering(train_df)\n    test_df = feature_engineering(test_df)\n    \n    # List of features for the model\n    features = [\n        'hour', 'day_of_week', 'day_of_month', 'month', 'year', 'day_of_year',\n        'is_weekend', 'is_holiday',\n        'junction_1', 'junction_2', 'junction_3', 'junction_4'\n    ]\n    \n    target = 'Vehicles'\n    \n    # Time-based validation split: last 4 months of training data\n    # (Train ends on 2017-06-30. So validation will be 2017-03-01 to 2017-06-30)\n    split_date = pd.to_datetime('2017-03-01')\n    \n    train_mask = train_df['DateTime'] < split_date\n    val_mask = train_df['DateTime'] >= split_date\n    \n    X_train, y_train = train_df.loc[train_mask, features], train_df.loc[train_mask, target]\n    X_val, y_val = train_df.loc[val_mask, features], train_df.loc[val_mask, target]\n    \n    print(f\"      Train shape: {X_train.shape}, Validation shape: {X_val.shape}\")\n    \n    print(\"[3/6] Training XGBoost Regressor model on validation split...\")\n    model = xgb.XGBRegressor(\n        n_estimators=300,\n        learning_rate=0.05,\n        max_depth=6,\n        subsample=0.8,\n        colsample_bytree=0.8,\n        random_state=42\n    )\n    \n    model.fit(\n        X_train, y_train,\n        eval_set=[(X_val, y_val)],\n        verbose=50\n    )\n    \n    # Evaluation\n    val_preds = model.predict(X_val)\n    val_rmse = np.sqrt(mean_squared_error(y_val, val_preds))\n    val_mae = mean_absolute_error(y_val, val_preds)\n    val_r2 = r2_score(y_val, val_preds)\n    \n    print(\"\\n--- Validation Metrics ---\")\n    print(f\"RMSE: {val_rmse:.4f}\")\n    print(f\"MAE:  {val_mae:.4f}\")\n    print(f\"R2:   {val_r2:.4f}\")\n    print(\"--------------------------\\n\")\n    \n    # Write metrics to a text file for summary references\n    with open(\"model_metrics.txt\", \"w\") as f:\n        f.write(f\"Validation Split Date: {split_date.strftime('%Y-%m-%d')}\\n\")\n        f.write(f\"Train samples: {len(X_train)}\\n\")\n        f.write(f\"Validation samples: {len(X_val)}\\n\")\n        f.write(f\"Validation RMSE: {val_rmse:.4f}\\n\")\n        f.write(f\"Validation MAE: {val_mae:.4f}\\n\")\n        f.write(f\"Validation R2 Score: {val_r2:.4f}\\n\")\n    \n    print(\"[4/6] Creating actual vs prediction evaluation plot...\")\n    plt.figure(figsize=(14, 7))\n    # We plot a 10-day segment from validation set for readability (e.g. 240 hours)\n    val_plot_df = train_df.loc[val_mask].copy()\n    val_plot_df['Predictions'] = val_preds\n    \n    # Let's plot for Junction 1 specifically as it has the highest traffic\n    j1_val = val_plot_df[val_plot_df['Junction'] == 1].head(168) # 1 week (168 hours)\n    \n    plt.plot(j1_val['DateTime'], j1_val['Vehicles'], label='Actual Vehicles', color='blue', alpha=0.7)\n    plt.plot(j1_val['DateTime'], j1_val['Predictions'], label='XGBoost Predicted', color='red', linestyle='--', alpha=0.9)\n    plt.title(\"Junction 1: Actual vs. XGBoost Predicted Traffic Volume (1-Week Validation Sample)\")\n    plt.xlabel(\"Date & Time\")\n    plt.ylabel(\"Vehicle Count\")\n    plt.legend()\n    plt.grid(True, linestyle=':', alpha=0.6)\n    plt.xticks(rotation=30)\n    plt.tight_layout()\n    plt.savefig(\"traffic_forecasting_eval.png\")\n    print(\"      Saved 'traffic_forecasting_eval.png'\")\n    \n    print(\"[5/6] Retraining model on full dataset for final predictions...\")\n    full_model = xgb.XGBRegressor(\n        n_estimators=300,\n        learning_rate=0.05,\n        max_depth=6,\n        subsample=0.8,\n        colsample_bytree=0.8,\n        random_state=42\n    )\n    \n    X_full = train_df[features]\n    y_full = train_df[target]\n    full_model.fit(X_full, y_full)\n    \n    # Save full model\n    model_save_path = \"traffic_model.json\"\n    full_model.save_model(model_save_path)\n    print(f\"      Saved model to '{model_save_path}'\")\n    \n    print(\"[6/6] Generating forecasting predictions for test set...\")\n    X_test = test_df[features]\n    test_preds = full_model.predict(X_test)\n    \n    # Bound predictions to be non-negative\n    test_preds = np.clip(test_preds, 0, None)\n    \n    # Create final prediction output dataframe\n    test_df['Vehicles'] = test_preds.astype(int)\n    prediction_output = test_df[['ID', 'Vehicles']]\n    \n    prediction_file = \"traffic_predictions.csv\"\n    prediction_output.to_csv(prediction_file, index=False)\n    print(f\"      Saved forecasts to '{prediction_file}'\")\n    print(\"      Verification: first 5 predictions:\")\n    print(prediction_output.head())\n    print(\"Traffic forecasting model training and prediction complete!\")\n\nif __name__ == \"__main__\":\n    main()\n"
    },
    "foundit-cv": {
        "filename": "foundit_memory_system.py",
        "meta": "FoundIt CV System • Real-Time YOLOv8 + OpenCV Object Memory",
        "githubUrl": "https://github.com/Harshili21/Project_Timerush-cv_project/blob/main/New%20folder/cv_project/cv_project/foundit_memory_system.py",
        "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"\nFoundIt - Computer Vision Tool for Finding Misplaced Items\n\nPhase 2: Memory (Data Logging)\nPhase 4: Query System\n\nThis script provides real-time object detection with logging and search capabilities.\n\"\"\"\n\nimport cv2\nimport pandas as pd\nimport csv\nimport os\nfrom datetime import datetime, timedelta\nfrom ultralytics import YOLO\nimport threading\nimport time\nfrom collections import defaultdict\n\nclass FoundItSystem:\n    def __init__(self, model_path='best.pt', csv_file='foundit_logs.csv', location_tag='Living Room'):\n        \"\"\"\n        Initialize the FoundIt system\n        \n        Args:\n            model_path: Path to the trained YOLOv8 model\n            csv_file: Path to the CSV log file\n            location_tag: Hardcoded location tag for logging\n        \"\"\"\n        self.model = YOLO(model_path)\n        self.csv_file = csv_file\n        self.location_tag = location_tag\n        self.last_seen = {}  # Track last seen times for each object\n        self.cooldown_period = 5  # 5 seconds cooldown\n        self.running = False\n        \n        # Initialize CSV file\n        self._init_csv()\n        \n        # Target classes\n        self.target_classes = ['remote', 'keys', 'glasses']\n        \n    def _init_csv(self):\n        \"\"\"Initialize the CSV file with headers if it doesn't exist\"\"\"\n        if not os.path.exists(self.csv_file):\n            with open(self.csv_file, 'w', newline='') as file:\n                writer = csv.writer(file)\n                writer.writerow(['Timestamp', 'Object_Name', 'Confidence', 'Location_Tag'])\n            print(f\"Created new log file: {self.csv_file}\")\n    \n    def _log_detection(self, object_name, confidence):\n        \"\"\"\n        Log detection to CSV file with cooldown logic\n        \n        Args:\n            object_name: Name of detected object\n            confidence: Confidence score (0-1)\n        \"\"\"\n        current_time = datetime.now()\n        \n        # Check cooldown period\n        if object_name in self.last_seen:\n            time_diff = current_time - self.last_seen[object_name]\n            if time_diff.total_seconds() < self.cooldown_period:\n                return  # Skip logging due to cooldown\n        \n        # Log the detection\n        with open(self.csv_file, 'a', newline='') as file:\n            writer = csv.writer(file)\n            writer.writerow([\n                current_time.strftime('%Y-%m-%d %H:%M:%S'),\n                object_name,\n                f\"{confidence:.3f}\",\n                self.location_tag\n            ])\n        \n        self.last_seen[object_name] = current_time\n        print(f\"Logged: {object_name} (confidence: {confidence:.3f}) at {self.location_tag}\")\n    \n    def _process_frame(self, frame):\n        \"\"\"\n        Process a single frame for object detection\n        \n        Args:\n            frame: OpenCV frame\n            \n        Returns:\n            Processed frame with detections\n        \"\"\"\n        results = self.model(frame, conf=0.25)\n        \n        for result in results:\n            boxes = result.boxes\n            names = result.names\n            \n            for box in boxes:\n                # Get detection info\n                cls_id = int(box.cls[0])\n                confidence = float(box.conf[0])\n                class_name = names[cls_id]\n                \n                # Check if it's one of our target classes\n                if class_name in self.target_classes and confidence >= 0.25:\n                    # Log the detection\n                    self._log_detection(class_name, confidence)\n                    \n                    # Draw bounding box\n                    x1, y1, x2, y2 = map(int, box.xyxy[0])\n                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)\n                    \n                    # Add label\n                    label = f\"{class_name}: {confidence:.2f}\"\n                    cv2.putText(frame, label, (x1, y1-10), \n                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)\n        \n        return frame\n    \n    def start_detection(self):\n        \"\"\"Start real-time detection with webcam\"\"\"\n        print(\"Starting FoundIt detection system...\")\n        print(\"Press 'q' to quit detection\")\n        print(\"Press 's' to search for an item\")\n        \n        cap = cv2.VideoCapture(0)\n        \n        if not cap.isOpened():\n            print(\"Error: Could not open webcam\")\n            return\n        \n        self.running = True\n        \n        while self.running:\n            ret, frame = cap.read()\n            if not ret:\n                print(\"Error: Could not read frame\")\n                break\n            \n            # Process frame for detection\n            processed_frame = self._process_frame(frame)\n            \n            # Add status text\n            cv2.putText(processed_frame, f\"Location: {self.location_tag}\", \n                       (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)\n            cv2.putText(processed_frame, \"Press 'q' to quit, 's' to search\", \n                       (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)\n            \n            # Display frame\n            cv2.imshow('FoundIt - Object Detection', processed_frame)\n            \n            # Handle key presses\n            key = cv2.waitKey(1) & 0xFF\n            if key == ord('q'):\n                break\n            elif key == ord('s'):\n                self._search_interface()\n        \n        cap.release()\n        cv2.destroyAllWindows()\n        self.running = False\n        print(\"Detection stopped\")\n    \n    def _search_interface(self):\n        \"\"\"Simple search interface for querying logged data\"\"\"\n        print(\"\\n\" + \"=\"*50)\n        print(\"FoundIt Search System\")\n        print(\"=\"*50)\n        \n        while True:\n            query = input(\"Enter object name to search (or 'back' to return to detection): \").strip().lower()\n            \n            if query == 'back':\n                break\n            \n            if not query:\n                print(\"Please enter a valid object name\")\n                continue\n            \n            result = self.search_object(query)\n            if result:\n                print(f\"\\nLast known location for '{query}':\")\n                print(f\"  Timestamp: {result['timestamp']}\")\n                print(f\"  Location: {result['location']}\")\n                print(f\"  Confidence: {result['confidence']}\")\n            else:\n                print(f\"No records found for '{query}'\")\n            \n            print(\"-\" * 30)\n    \n    def search_object(self, object_name):\n        \"\"\"\n        Search for the last known location of an object\n        \n        Args:\n            object_name: Name of the object to search for\n            \n        Returns:\n            Dictionary with timestamp, location, and confidence, or None if not found\n        \"\"\"\n        try:\n            if not os.path.exists(self.csv_file):\n                return None\n            \n            df = pd.read_csv(self.csv_file)\n            \n            # Filter by object name (case insensitive)\n            object_df = df[df['Object_Name'].str.lower() == object_name.lower()]\n            \n            if object_df.empty:\n                return None\n            \n            # Get the most recent entry\n            latest_entry = object_df.iloc[-1]\n            \n            return {\n                'timestamp': latest_entry['Timestamp'],\n                'location': latest_entry['Location_Tag'],\n                'confidence': latest_entry['Confidence']\n            }\n            \n        except Exception as e:\n            print(f\"Error searching for object: {e}\")\n            return None\n    \n    def get_all_logs(self):\n        \"\"\"Get all logged data\"\"\"\n        try:\n            if not os.path.exists(self.csv_file):\n                return None\n            \n            df = pd.read_csv(self.csv_file)\n            return df\n            \n        except Exception as e:\n            print(f\"Error reading logs: {e}\")\n            return None\n\ndef main():\n    \"\"\"Main function to run the FoundIt system\"\"\"\n    print(\"=\"*60)\n    print(\"FoundIt - Computer Vision Tool for Finding Misplaced Items\")\n    print(\"=\"*60)\n    \n    # Initialize the system\n    try:\n        foundit = FoundItSystem(\n            model_path='best.pt',\n            csv_file='foundit_logs.csv',\n            location_tag='Living Room'\n        )\n    except Exception as e:\n        print(f\"Error initializing system: {e}\")\n        return\n    \n    print(\"\\nOptions:\")\n    print(\"1. Start real-time detection\")\n    print(\"2. Search for an item\")\n    print(\"3. View all logs\")\n    print(\"4. Exit\")\n    \n    while True:\n        choice = input(\"\\nEnter your choice (1-4): \").strip()\n        \n        if choice == '1':\n            foundit.start_detection()\n        elif choice == '2':\n            object_name = input(\"Enter object name to search: \").strip()\n            result = foundit.search_object(object_name)\n            if result:\n                print(f\"\\nLast known location for '{object_name}':\")\n                print(f\"  Timestamp: {result['timestamp']}\")\n                print(f\"  Location: {result['location']}\")\n                print(f\"  Confidence: {result['confidence']}\")\n            else:\n                print(f\"No records found for '{object_name}'\")\n        elif choice == '3':\n            logs = foundit.get_all_logs()\n            if logs is not None and not logs.empty:\n                print(\"\\nAll logged detections:\")\n                print(logs.to_string(index=False))\n            else:\n                print(\"No logs found\")\n        elif choice == '4':\n            print(\"Goodbye!\")\n            break\n        else:\n            print(\"Invalid choice. Please enter 1-4\")\n\nif __name__ == \"__main__\":\n    main()\n"
    }
};

function highlightPython(code) {
    const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const tokenRegex = /(#.*$)|("{3}[\s\S]*?"{3}|'{3}[\s\S]*?'{3}|f?"(?:\\.|[^"\\\n])*"|f?'(?:\\.|[^'\\\n])*')|(\b(?:from|import|as|def|class|return|if|elif|else|for|in|while|try|except|with|raise|not|and|or|is|None|True|False)\b)|(\b\d+(?:\.\d+)?\b)/gm;

    return escaped.replace(tokenRegex, (match, comment, str, kw, num) => {
        if (comment) return `<span class="py-comment">${comment}</span>`;
        if (str) return `<span class="py-string">${str}</span>`;
        if (kw) return `<span class="py-keyword">${kw}</span>`;
        if (num) return `<span class="py-number">${num}</span>`;
        return match;
    });
}

function initCodeModal() {
    const modal = document.getElementById('codeModal');
    const filenameEl = document.getElementById('codeModalFilename');
    const metaEl = document.getElementById('codeModalMeta');
    const contentEl = document.getElementById('codeModalContent');
    const githubEl = document.getElementById('codeModalGithub');
    const copyBtn = document.getElementById('codeModalCopy');
    const closeBtn = document.getElementById('codeModalClose');
    const triggers = document.querySelectorAll('.code-preview-btn');

    if (!modal || !contentEl || !triggers.length) return;

    let activeRawCode = '';

    function openModal(codeId) {
        const entry = ML_CODE_SNIPPETS[codeId];
        if (!entry) return;
        activeRawCode = entry.code;
        filenameEl.textContent = entry.filename;
        metaEl.textContent = entry.meta;
        githubEl.href = entry.githubUrl;
        contentEl.innerHTML = highlightPython(entry.code);
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    triggers.forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.codeId));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            if (!activeRawCode) return;
            const label = copyBtn.querySelector('span');
            try {
                await navigator.clipboard.writeText(activeRawCode);
                if (label) label.textContent = 'Copied!';
                setTimeout(() => {
                    if (label) label.textContent = 'Copy';
                }, 1800);
            } catch {
                if (label) label.textContent = 'Copy failed';
                setTimeout(() => {
                    if (label) label.textContent = 'Copy';
                }, 1800);
            }
        });
    }
}
