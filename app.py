from flask import Flask, render_template, request, jsonify
from urllib.parse import urlparse
from services.heuristic_checker import check_url_heuristics

app = Flask(__name__)


def check_url(url):
    """Validate and analyze a URL using the local heuristic engine."""

    if not url:
        return {
            "status": "error",
            "message": "Please enter a URL."
        }

    # Add HTTPS if the user didn't provide a protocol
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    parsed = urlparse(url)

    # Make sure a domain exists
    if not parsed.netloc or "." not in parsed.netloc:
        return {
            "status": "error",
            "message": "Please enter a valid website URL, such as https://example.com."
        }

    domain = parsed.netloc.lower()

    # Run local heuristic analysis
    heuristic_result = check_url_heuristics(url)

    return {
        "status": "success",
        "domain": domain,
        "url": url,
        "heuristic": heuristic_result
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