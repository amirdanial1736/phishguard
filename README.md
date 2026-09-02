# PhishGuard 🔐

A beginner-friendly web-based URL security checker built with **HTML, CSS, JavaScript, Python, and Flask**.

PhishGuard allows users to enter a website URL and performs a basic check for potentially suspicious indicators.

> **Note:** This project is for educational purposes. It is not a replacement for professional phishing detection or security services.

## Features

* 🔎 Check a website URL
* 🛡️ Detect basic suspicious URL indicators
* 🟢 Display safe results
* 🟡 Display suspicious results
* 🔴 Display errors for invalid input
* 🌐 Web-based interface
* 🐍 Python Flask backend
* ⚡ JavaScript frontend-to-backend communication
* 📱 Responsive design

## Technologies Used

| Technology | Purpose                                |
| ---------- | -------------------------------------- |
| HTML       | Website structure                      |
| CSS        | Website styling                        |
| JavaScript | User interaction and API communication |
| Python     | Backend logic                          |
| Flask      | Python web framework                   |
| Git        | Version control                        |
| GitHub     | Source code hosting                    |

## Project Structure

```text
phishguard/
│
├── app.py
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

## How It Works

The project uses a frontend and backend architecture.

```text
User
  │
  ▼
HTML + CSS
  │
  ▼
JavaScript
  │
  │ HTTP Request
  ▼
Python + Flask
  │
  ▼
URL Analysis
  │
  ▼
Result
  │
  ▼
JavaScript
  │
  ▼
Website
```

The user enters a URL through the website. JavaScript sends the URL to the Flask backend, where Python performs the basic analysis. The result is then returned to the website and displayed to the user.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/phishguard.git
```

### 2. Enter the project folder

```bash
cd phishguard
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install the required packages

```bash
pip install -r requirements.txt
```

## Running the Project

Start the Flask server:

```bash
python app.py
```

The terminal will provide a local address similar to:

```text
http://127.0.0.1:5000
```

Open that address in your web browser.

## Example

Enter:

```text
https://example.com
```

PhishGuard will perform a basic analysis and display the result.

URLs containing certain words commonly associated with suspicious links may be flagged as suspicious.

## Disclaimer

PhishGuard currently performs **basic educational URL analysis**.

It does **not** guarantee that a website is safe or malicious and should not be used as the sole method of determining whether a website is trustworthy.

Future versions may integrate external threat-intelligence services and additional security checks.

## Future Improvements

* [ ] Add real phishing detection APIs
* [ ] Add URL reputation checking
* [ ] Add risk/credibility scoring
* [ ] Add scan history
* [ ] Add database support
* [ ] Add user accounts
* [ ] Add detailed URL analysis
* [ ] Improve frontend design
* [ ] Add automated security checks

## Author

Created as a cybersecurity learning project to practice web development, Python, Flask, and Git/GitHub.
