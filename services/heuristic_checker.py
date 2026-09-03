from urllib.parse import urlparse
import re


def check_url_heuristics(url):
    """
    Perform local heuristic analysis on a URL.

    Returns:
        dict: Heuristic analysis results.
    """

    parsed = urlparse(url)

    domain = parsed.netloc.lower()
    path = parsed.path.lower()

    score = 0
    indicators = []

    # --------------------------------------------------
    # 1. Check for HTTPS
    # --------------------------------------------------

    if parsed.scheme != "https":
        score += 10

        indicators.append({
            "type": "no_https",
            "severity": "low",
            "description": "The URL does not use HTTPS."
        })

    # --------------------------------------------------
    # 2. Check for IP address instead of domain name
    # --------------------------------------------------

    ip_pattern = r"^(?:\d{1,3}\.){3}\d{1,3}$"

    if re.match(ip_pattern, domain):
        score += 25

        indicators.append({
            "type": "ip_address",
            "severity": "medium",
            "description": "The URL uses an IP address instead of a domain name."
        })

    # --------------------------------------------------
    # 3. Check URL length
    # --------------------------------------------------

    if len(url) > 100:
        score += 10

        indicators.append({
            "type": "long_url",
            "severity": "low",
            "description": "The URL is unusually long."
        })

    if len(url) > 200:
        score += 15

        indicators.append({
            "type": "very_long_url",
            "severity": "medium",
            "description": "The URL is extremely long."
        })

    # --------------------------------------------------
    # 4. Check for suspicious keywords
    # --------------------------------------------------

    suspicious_keywords = [
        "login",
        "signin",
        "verify",
        "verification",
        "account",
        "secure",
        "security",
        "password",
        "credential",
        "update",
        "confirm",
        "payment",
        "billing",
        "wallet"
    ]

    matched_keywords = []

    for keyword in suspicious_keywords:
        if keyword in url.lower():
            matched_keywords.append(keyword)

    if matched_keywords:
        score += min(len(matched_keywords) * 5, 25)

        indicators.append({
            "type": "suspicious_keywords",
            "severity": "medium",
            "description": "The URL contains potentially suspicious keywords.",
            "matches": matched_keywords
        })

    # --------------------------------------------------
    # 5. Check for excessive subdomains
    # --------------------------------------------------

    domain_parts = domain.split(".")

    if len(domain_parts) >= 4:
        score += 15

        indicators.append({
            "type": "many_subdomains",
            "severity": "medium",
            "description": "The domain contains an unusually large number of subdomains."
        })

    # --------------------------------------------------
    # 6. Check for @ symbol
    # --------------------------------------------------

    if "@" in url:
        score += 20

        indicators.append({
            "type": "at_symbol",
            "severity": "high",
            "description": "The URL contains an @ symbol, which can be used to disguise the actual destination."
        })

    # --------------------------------------------------
    # 7. Check for excessive hyphens
    # --------------------------------------------------

    hyphen_count = domain.count("-")

    if hyphen_count >= 3:
        score += 10

        indicators.append({
            "type": "many_hyphens",
            "severity": "low",
            "description": "The domain contains multiple hyphens."
        })

    # --------------------------------------------------
    # 8. Check for suspicious path patterns
    # --------------------------------------------------

    suspicious_path_words = [
        "login",
        "signin",
        "verify",
        "password",
        "credential",
        "account"
    ]

    matched_path_words = [
        word
        for word in suspicious_path_words
        if word in path
    ]

    if matched_path_words:
        score += 10

        indicators.append({
            "type": "suspicious_path",
            "severity": "medium",
            "description": "The URL path contains potentially sensitive account-related keywords.",
            "matches": matched_path_words
        })

    # --------------------------------------------------
    # Limit score
    # --------------------------------------------------

    score = min(score, 100)

    # --------------------------------------------------
    # Determine risk level
    # --------------------------------------------------

    if score >= 60:
        risk_level = "high"

    elif score >= 30:
        risk_level = "medium"

    else:
        risk_level = "low"

    # --------------------------------------------------
    # Return structured result
    # --------------------------------------------------

    return {
        "score": score,
        "risk_level": risk_level,
        "indicators": indicators
    }