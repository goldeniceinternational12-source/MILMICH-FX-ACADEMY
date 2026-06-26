async function testBackend() {
    try {
        const response = await fetch(
            "https://milmich-fx-academy.onrender.com/test"
        );

        if (!response.ok) {
            throw new Error("Server returned " + response.status);
        }

        const data = await response.json();

        document.getElementById("result").innerHTML = data.message;

    } catch (error) {
        console.error(error);

        document.getElementById("result").innerHTML = "Connection Failed";
    }
}

// Add this BELOW the testBackend function

async function handleSubmit(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const isWhatsapp = document.getElementById("isWhatsapp").checked;

    try {
        const response = await fetch(
            "https://milmich-fx-academy.onrender.com/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName,
                    phoneNumber,
                    email,
                    password,
                    isWhatsapp
                })
            }
        );

        const data = await response.json();

        document.getElementById("message").innerHTML = data.message;

        if (response.ok) {
            setTimeout(() => {
                window.location.href = "./sign in.html";
            }, 1500);
        }

    } catch (error) {
        console.error(error);
        document.getElementById("message").innerHTML = "Registration Failed";
    }
}