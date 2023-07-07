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
    window.localStorage.setItem("token", JSON.stringify(userData));
    window.location.href="index.html";
    }else{
    alert('Identifiant ou mot de passe incorect');
}
});