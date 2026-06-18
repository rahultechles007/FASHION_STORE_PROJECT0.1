window.addEventListener("load", () => {

    const subscribed =
        localStorage.getItem("newsletterSubscribed");

    if (!subscribed) {

        setTimeout(() => {

            document.getElementById("emailPopup")
                .style.display = "flex";

        }, 2000);

    }

});

function submitEmail() {

    let email =
        document.getElementById("userEmail").value;

    let subscribers =
        JSON.parse(localStorage.getItem("subscribers"))
        || [];

    subscribers.push(email);

    localStorage.setItem(
        "subscribers",
        JSON.stringify(subscribers)
    );

    localStorage.setItem(
        "newsletterSubscribed",
        true
    );

    document.getElementById("emailPopup")
        .style.display = "none";
}