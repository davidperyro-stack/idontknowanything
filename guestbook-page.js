
const nameInput = document.getElementById("visitor-name");
const messageInput = document.getElementById("visitor-message");
const submitButton = document.getElementById("guest-message");
const messagesContainer = document.getElementById("messages");

async function loadMessages() {

    try {

        const response = await fetch("/api/guestbook");
        const messages = await response.json();

        if (!response.ok) {
            throw new Error(messages.error || "Could not load messages.");
        }

        messagesContainer.innerHTML = "<h2>Recent Messages</h2>";

        messages.forEach(function(message) {

            const messageBox = document.createElement("div");
            const name = document.createElement("h3");
            const text = document.createElement("p");

            name.textContent = message.name;
            text.textContent = message.message;

            messageBox.appendChild(name);
            messageBox.appendChild(text);

            messagesContainer.appendChild(messageBox);

        });

    } catch (error) {

        console.error("Guestbook loading error:", error);

    }

}

submitButton.addEventListener("click", async function() {

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert("Please fill in both fields!");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending to the moon!";

    try {

        const response = await fetch("/api/guestbook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                message: message
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Could not send message.");
        }

        nameInput.value = "";
        messageInput.value = "";

        await loadMessages();

        alert("Your message was sent!");

    } catch (error) {

        alert(error.message);

    }

    submitButton.disabled = false;
    submitButton.textContent = "Sign guestbook!";

});

loadMessages();
