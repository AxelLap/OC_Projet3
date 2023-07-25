document.querySelector(".logButton").addEventListener("click", async function(event){
    event.preventDefault();
const url = "http://localhost:5678/api/users/login";
let emailInput = document.querySelector("#email").value;
let passwordInput = document.querySelector("#password").value;

const response = await fetch(url, {
    method: "POST",
    body:JSON.stringify({
        email: emailInput,
        password: passwordInput,
    }),
    headers:{
        "Content-type" : "application/json"
    }
})
if(response.ok){
    let userData = await response.json();
    window.sessionStorage.setItem("token", JSON.stringify(userData));
    window.location.href="index.html";
    }else{
    let errorMessage = document.querySelector(".ErrorMessage");
    errorMessage.innerHTML = "";
    let alertText = document.createElement("p");
    alertText.className = "AlertText";
    alertText.innerText = "E-mail ou mot de passe incorect";
    errorMessage.appendChild(alertText);
}
});










