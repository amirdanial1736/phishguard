const checkButton = document.getElementById("checkButton");
const urlInput = document.getElementById("urlInput");

const resultSection = document.getElementById("result");
const statusBox = document.getElementById("statusBox");
const statusTitle = document.getElementById("statusTitle");
const statusMessage = document.getElementById("statusMessage");

const domain = document.getElementById("domain");
const indicators = document.getElementById("indicators");
const errorMessage = document.getElementById("errorMessage");

const riskScore = document.getElementById("riskScore");
const scoreFill = document.getElementById("scoreFill");


// --------------------------------------------------
// Convert internal indicator names into user-friendly names
// --------------------------------------------------

function formatIndicatorName(type) {

    const names = {
        "no_https": "No HTTPS",
        "ip_address": "IP Address Used",
        "long_url": "Long URL",
        "very_long_url": "Very Long URL",
        "suspicious_keywords": "Suspicious Keywords",
        "many_subdomains": "Many Subdomains",
        "at_symbol": "Unusual @ Symbol",
        "many_hyphens": "Multiple Hyphens",
        "suspicious_path": "Suspicious URL Path"
    };

    return names[type] || type.replaceAll("_", " ");
}


// --------------------------------------------------
// Convert severity into a nicer format
// --------------------------------------------------

function formatSeverity(severity) {

    return severity.charAt(0).toUpperCase() + severity.slice(1);

}


// --------------------------------------------------
// Check URL button
// --------------------------------------------------

checkButton.addEventListener("click", async () => {

    const url = urlInput.value.trim();


    // Clear previous messages
    errorMessage.textContent = "";

    resultSection.classList.add("hidden");


    // Check if the input is empty
    if (url === "") {

        errorMessage.textContent = "Please enter a URL.";

        return;
    }


    // Disable button while checking
    checkButton.disabled = true;

    checkButton.textContent = "Checking...";


    try {

        // Send URL to Flask backend
        const response = await fetch("/check", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                url: url
            })

        });


        // Convert backend response into JavaScript object
        const data = await response.json();


        // --------------------------------------------------
        // Handle backend errors
        // --------------------------------------------------

        if (data.status === "error") {

            errorMessage.textContent = data.message;

            return;
        }


        // --------------------------------------------------
        // Show result section
        // --------------------------------------------------

        resultSection.classList.remove("hidden");


        // Get heuristic result
        const heuristic = data.heuristic;


        // Clear previous status classes
        statusBox.className = "";


        // --------------------------------------------------
        // Display risk level
        // --------------------------------------------------

        if (heuristic.risk_level === "low") {

            statusBox.classList.add("safe");

            statusTitle.textContent = "🟢 Low Risk";

            statusMessage.textContent =
                "No major suspicious indicators were detected.";


        } else if (heuristic.risk_level === "medium") {

            statusBox.classList.add("suspicious");

            statusTitle.textContent = "🟡 Medium Risk";

            statusMessage.textContent =
                "Some potentially suspicious indicators were detected.";


        } else if (heuristic.risk_level === "high") {

            statusBox.classList.add("error-status");

            statusTitle.textContent = "🔴 High Risk";

            statusMessage.textContent =
                "Several suspicious indicators were detected.";

        }


        // --------------------------------------------------
        // Display risk score
        // --------------------------------------------------

        riskScore.textContent =
            `${heuristic.score}/100`;


        // Set risk score bar width
        scoreFill.style.width =
            `${heuristic.score}%`;


        // --------------------------------------------------
        // Display domain
        // --------------------------------------------------

        domain.textContent =
            data.domain || "N/A";


        // --------------------------------------------------
        // Clear previous indicators
        // --------------------------------------------------

        indicators.innerHTML = "";


        // --------------------------------------------------
        // Display security indicators
        // --------------------------------------------------

        if (
            heuristic.indicators &&
            heuristic.indicators.length > 0
        ) {

            heuristic.indicators.forEach(indicator => {

                // Create indicator card
                const card =
                    document.createElement("div");


                card.classList.add("indicator-card");


                // Convert technical name into friendly name
                const indicatorName =
                    formatIndicatorName(indicator.type);


                // Convert severity into friendly format
                const severity =
                    formatSeverity(indicator.severity);


                // Create card content
                card.innerHTML = `

                    <div class="indicator-header">

                        <strong>
                            ${indicatorName}
                        </strong>

                        <span class="severity ${indicator.severity}">
                            ${severity}
                        </span>

                    </div>

                    <p>
                        ${indicator.description}
                    </p>

                `;


                // --------------------------------------------------
                // Display matched keywords
                // --------------------------------------------------

                if (indicator.matches) {

                    const matches =
                        document.createElement("small");


                    matches.textContent =
                        `Detected: ${indicator.matches.join(", ")}`;


                    card.appendChild(matches);

                }


                // Add card to page
                indicators.appendChild(card);

            });


        } else {

            // No suspicious indicators
            indicators.innerHTML = `

                <div class="no-indicators">

                    ✓ No suspicious indicators were detected.

                </div>

            `;

        }


    } catch (error) {

        // Show error in browser console
        console.error("Error:", error);


        // Show friendly error to user
        errorMessage.textContent =
            "Could not connect to the server.";

    } finally {

        // Re-enable button
        checkButton.disabled = false;

        checkButton.textContent = "Check URL";

    }

});