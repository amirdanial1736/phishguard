const checkButton = document.getElementById("checkButton");
const urlInput = document.getElementById("urlInput");

const resultSection = document.getElementById("result");
const statusBox = document.getElementById("statusBox");
const statusTitle = document.getElementById("statusTitle");
const statusMessage = document.getElementById("statusMessage");

const domain = document.getElementById("domain");
const indicators = document.getElementById("indicators");
const errorMessage = document.getElementById("errorMessage");


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

    checkButton.disabled = true;
    checkButton.textContent = "Checking...";

    try {

        const response = await fetch("/check", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                url: url
            })
        });

        const data = await response.json();

        // Handle backend errors
        if (data.status === "error") {
            errorMessage.textContent = data.message;
            return;
        }

        // Show result section
        resultSection.classList.remove("hidden");

        // Get heuristic result
        const heuristic = data.heuristic;

        // Clear previous status classes
        statusBox.className = "";

        // Display result based on risk level
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

        // Display domain
        domain.textContent = data.domain || "N/A";

        // Display score
        statusMessage.textContent +=
            ` Risk score: ${heuristic.score}/100.`;

        // Display indicators
        if (heuristic.indicators && heuristic.indicators.length > 0) {

            indicators.innerHTML = "";

            heuristic.indicators.forEach(indicator => {

                const item = document.createElement("div");

                item.innerHTML = `
                    <strong>${indicator.type}</strong>
                    (${indicator.severity}):
                    ${indicator.description}
                `;

                indicators.appendChild(item);
            });

        } else {

            indicators.textContent = "None detected.";
        }

    } catch (error) {

        console.error("Error:", error);

        errorMessage.textContent =
            "Could not connect to the server.";

    } finally {

        checkButton.disabled = false;
        checkButton.textContent = "Check URL";
    }
});