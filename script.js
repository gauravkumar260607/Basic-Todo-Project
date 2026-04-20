function login(){
  const user=document.getElementById("username").value;
  const pass=document.getElementById("password").value;

  if(user && pass){
    localStorage.setItem("loggedInUser", user);
    window.location.href="dashboard.html";
  }else{
    alert("Enter username and password");
  }
}