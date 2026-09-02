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

        if (data.status === "error") {
            errorMessage.textContent = data.message;
            return;
        }

        resultSection.classList.remove("hidden");

        statusBox.className = "";

        if (data.status === "safe") {

            statusBox.classList.add("safe");
            statusTitle.textContent = "🟢 Safe";
            statusMessage.textContent = data.message;

        } else if (data.status === "suspicious") {

            statusBox.classList.add("suspicious");
            statusTitle.textContent = "🟡 Suspicious";
            statusMessage.textContent = data.message;
        }

        domain.textContent = data.domain || "N/A";

        if (data.indicators && data.indicators.length > 0) {
            indicators.textContent = data.indicators.join(", ");
        } else {
            indicators.textContent = "None detected";
        }

    } catch (error) {

        errorMessage.textContent =
            "Could not connect to the server.";

    } finally {

        checkButton.disabled = false;
        checkButton.textContent = "Check URL";
    }
});