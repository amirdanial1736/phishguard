from flask import Flask, render_template, request, jsonify
from urllib.parse import urlparse

app = Flask(__name__)


def check_url(url):
    """Perform a basic URL safety check."""

    if not url:
        return {
            "status": "error",
            "message": "Please enter a URL."
        }

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    parsed = urlparse(url)

    if not parsed.netloc:
        return {
            "status": "error",
            "message": "Invalid URL."
        }

    domain = parsed.netloc.lower()

    suspicious_words = [
        "login",
        "verify",
        "account",
        "secure",
        "password",
        "update"
    ]

    found_words = [
        word for word in suspicious_words
        if word in url.lower()
    ]

    if found_words:
        return {
            "status": "suspicious",
            "message": "This URL contains words commonly found in suspicious links.",
            "domain": domain,
            "indicators": found_words
        }

    return {
        "status": "safe",
        "message": "No basic suspicious indicators were detected.",
        "domain": domain,
        "indicators": []
    }


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/check", methods=["POST"])
def check():
    data = request.get_json()

    if not data:
        return jsonify({
            "status": "error",
            "message": "No URL was provided."
        })

    url = data.get("url", "").strip()

    result = check_url(url)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)