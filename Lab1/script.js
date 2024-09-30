window.onload = function() {
    document.getElementById("subscribe-form").addEventListener("submit", onSubscribe);
}
    

const onSubscribe = (event) => {
    event.preventDefault();
    const subscribeForm = document.getElementById("subscribe-form");
    const formData = new FormData(subscribeForm);
    alert(formData.get("email"));
}
