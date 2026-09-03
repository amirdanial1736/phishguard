# PhishGuard 🔐

A beginner-friendly web-based phishing and URL security checker built with **HTML, CSS, JavaScript, Python, and Flask**.

PhishGuard allows users to enter a website URL and performs a **heuristic analysis** to identify potentially suspicious characteristics. The project is designed to provide a foundation that can later be extended with external phishing detection and threat-intelligence services.

> **⚠️ Disclaimer:** PhishGuard is currently an educational security analysis tool. Its results are not a guarantee that a website is safe or malicious. Users should not rely on PhishGuard as the sole method of determining whether a website is trustworthy.

---

## ✨ Features

* 🔎 URL scanning
* 🛡️ Heuristic-based suspicious URL detection
* 📊 Risk score calculation
* 🚦 Risk-level classification
* 🟢 Low-risk results
* 🟡 Suspicious results
* 🔴 Invalid input / error handling
* 📋 Display detected security indicators
* 🌐 Web-based interface
* 🐍 Python Flask backend
* ⚡ JavaScript frontend-to-backend communication
* 📱 Responsive interface
* 🧩 Separated heuristic analysis logic
* 🔮 Designed for future threat-intelligence API integration

---

## 🧠 Heuristic URL Analysis

PhishGuard currently uses a **heuristic-based approach** to analyze URLs.

A heuristic is a rule-based method that looks for characteristics commonly associated with suspicious or potentially malicious URLs.

The heuristic analysis is separated into its own Python module:

```text
heuristic.py
```

This keeps the URL analysis logic separate from the Flask application and makes the project easier to maintain, debug, and extend.

Depending on the URL, PhishGuard can identify suspicious indicators and use them when determining the overall risk score.

### Example

A URL with multiple suspicious characteristics may receive a higher risk score, while a URL with few or no detected indicators may receive a lower score.

The result can include:

* Risk level
* Risk score
* Domain
* Detected indicators

---

## 📊 Risk Score

PhishGuard uses a risk score to provide the user with a simplified representation of the URL's potential risk.

Example:

```text
Scan Result

🟢 Low Risk

No major suspicious indicators were detected.

Risk Score: 15/100

Domain: example.com

Indicators:
...
```

The score is generated from the heuristic analysis and should be treated as an **educational assessment**, not a definitive security verdict.

---

## 🏗️ System Architecture

PhishGuard uses a simple frontend/backend architecture.

```text
                    User
                      │
                      ▼
              HTML + CSS Interface
                      │
                      ▼
                 JavaScript
                      │
                HTTP Request
                      │
                      ▼
                Flask Backend
                   app.py
                      │
                      ▼
              Heuristic Analysis
                heuristic.py
                      │
                      ▼
                Risk Assessment
                      │
                      ▼
                  Result
                      │
                      ▼
                 JavaScript
                      │
                      ▼
                Website UI
```

### Component Responsibilities

| Component          | Responsibility                                                       |
| ------------------ | -------------------------------------------------------------------- |
| `index.html`       | Provides the webpage structure and user interface                    |
| `style.css`        | Controls the appearance and responsive layout                        |
| `script.js`        | Handles user interaction and communicates with the Flask backend     |
| `app.py`           | Runs the Flask application and handles backend requests              |
| `heuristic.py`     | Performs heuristic URL analysis and identifies suspicious indicators |
| `requirements.txt` | Contains the Python dependencies required by the project             |
| `README.md`        | Provides project documentation                                       |
| `.gitignore`       | Prevents unnecessary or sensitive files from being committed         |

---

## 📁 Project Structure

The current project structure is:

```text
phishguard/
│
├── app.py
├── heuristic.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

---

## 🔄 How It Works

When a user scans a URL, the application follows this process:

### 1. Enter URL

The user enters a website URL into the PhishGuard interface.

### 2. Frontend Request

JavaScript sends the URL to the Flask backend.

### 3. Backend Processing

`app.py` receives the request and handles the application logic.

### 4. Heuristic Analysis

The URL is passed to `heuristic.py`, where the heuristic rules analyze the URL for suspicious characteristics.

### 5. Risk Assessment

The detected indicators are used to determine the risk score and risk level.

### 6. Return Result

The Flask backend returns the analysis result to the frontend.

### 7. Display Result

JavaScript processes the response and displays the result to the user.

---

## 🛠️ Technologies Used

| Technology     | Purpose                                             |
| -------------- | --------------------------------------------------- |
| **HTML**       | Website structure                                   |
| **CSS**        | Website styling and responsive design               |
| **JavaScript** | User interaction and frontend/backend communication |
| **Python**     | Backend and security analysis logic                 |
| **Flask**      | Python web framework                                |
| **Git**        | Version control                                     |
| **GitHub**     | Source code hosting                                 |

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/phishguard.git
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Enter the Project Folder

```bash
cd phishguard
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

For **Windows PowerShell**:

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Running the Project

Start the Flask development server:

```bash
python app.py
```

The application should provide a local address similar to:

```text
http://127.0.0.1:5000
```

Open the address in a web browser to access PhishGuard.

---

## 🧪 Example Scan

A user can enter a URL such as:

```text
https://example.com
```

PhishGuard analyzes the URL and returns a result containing information such as:

```text
Risk Level: Low Risk
Risk Score: 15/100
Domain: example.com
Indicators: None
```

A URL containing suspicious characteristics may produce a higher risk score and display the indicators that contributed to the result.

---

## ⚠️ Current Limitations

The current version of PhishGuard is based on heuristic URL analysis.

This means:

* It does not guarantee that a website is safe.
* It does not guarantee that a website is malicious.
* Heuristic rules can produce false positives.
* Heuristic rules can produce false negatives.
* A low risk score does not prove that a website is trustworthy.
* A high risk score does not automatically prove that a website is malicious.
* External threat-intelligence services are not currently integrated.

---

## 🔐 Security Considerations

Because PhishGuard is a cybersecurity-related application, security should be considered throughout development.

Important considerations include:

* Validate user input.
* Handle malformed URLs safely.
* Avoid exposing sensitive information.
* Never hardcode API keys or secrets.
* Use environment variables for future API credentials.
* Handle external API errors safely.
* Implement appropriate request limits when external APIs are added.
* Avoid committing secrets to GitHub.

---

## 🔮 Future API Integration

A major future goal of PhishGuard is to expand beyond local heuristic analysis by integrating external **phishing detection, URL reputation, and threat-intelligence services**.

The planned architecture is:

```text
                         User
                           │
                           ▼
                       PhishGuard
                           │
                           ▼
                     Flask Backend
                           │
                           ▼
                  Local Heuristic Check
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       Heuristic Result          External APIs
                                      │
                         ┌────────────┼────────────┐
                         │            │            │
                         ▼            ▼            ▼
                    URL Reputation  Phishing   Threat
                      Service       Detection  Intelligence
                         │            │            │
                         └────────────┼────────────┘
                                      │
                                      ▼
                              Result Aggregation
                                      │
                                      ▼
                                Risk Scoring
                                      │
                                      ▼
                               Final Result
                                      │
                                      ▼
                                   User
```

The purpose of this architecture is to allow PhishGuard to combine multiple sources of security information instead of depending entirely on heuristic analysis.

---

## 🗺️ Development Roadmap

### ✅ Currently Implemented

* [x] Web-based URL scanner
* [x] Flask backend
* [x] HTML/CSS frontend
* [x] JavaScript frontend/backend communication
* [x] URL input handling
* [x] Heuristic URL analysis
* [x] Separate `heuristic.py` module
* [x] Suspicious indicator detection
* [x] Risk score
* [x] Risk-level result
* [x] Domain display
* [x] Indicator display
* [x] Invalid input handling
* [x] Basic result interface

### 🔄 Planned

* [ ] Integrate real phishing detection APIs
* [ ] Integrate URL reputation services
* [ ] Integrate additional threat-intelligence sources
* [ ] Aggregate results from multiple security services
* [ ] Improve risk-scoring methodology
* [ ] Add more URL analysis indicators
* [ ] Add API error handling and fallback logic
* [ ] Add API response caching
* [ ] Add scan history
* [ ] Add database support
* [ ] Add user accounts
* [ ] Improve security logging
* [ ] Improve frontend interface
* [ ] Add automated security testing

---

## 🎯 Project Goals

The main goals of PhishGuard are to provide practical experience with:

* Python programming
* Flask web development
* HTML, CSS, and JavaScript
* Frontend/backend communication
* URL analysis
* Heuristic security detection
* Risk scoring
* Threat intelligence
* API integration
* Cybersecurity concepts
* Git and GitHub

The project is also structured so that the current heuristic detection system can be expanded with external security services in the future.

---

## 📚 Educational Purpose

PhishGuard is primarily a **cybersecurity learning project**.

It demonstrates how a web application can:

1. Accept a URL from a user.
2. Send the URL to a backend.
3. Analyze security-related characteristics.
4. Generate a risk assessment.
5. Return security information to the frontend.
6. Present the result in an understandable format.

The project is intended to develop practical skills in web development and cybersecurity while providing a foundation for future threat-intelligence integration.

---

## 👨‍💻 Author

PhishGuard was created as a cybersecurity learning project to practice:

* Python
* Flask
* HTML/CSS
* JavaScript
* Web application development
* Cybersecurity
* URL analysis
* Git/GitHub

---

## 📄 License

This project is intended for educational purposes.
