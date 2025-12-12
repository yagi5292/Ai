document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const chatBox = document.getElementById("chat-box");
    const input = document.getElementById("message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userMsg = input.value;
        chatBox.innerHTML += `<div class="text-right"><b>You:</b> ${userMsg}</div>`;
        input.value = "";

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify({ message: userMsg }),
        });

        const data = await response.json();
        const botMsg = data.choices[0].message.content;
        chatBox.innerHTML += `<div class="text-left"><b>AI:</b> ${botMsg}</div>`;
    });
});
