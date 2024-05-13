const formOpenBtn = document.querySelector("#form-open");
const formOpenlg = document.querySelector("#login_open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login"),
    loggedBtn = document.querySelector(".logged-btn"),
    signedBtn = document.querySelector(".signed-in");

formOpenlg.addEventListener("click", () => home.classList.add("show"));
formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () =>
        home.classList.remove("show")
);

loggedBtn.addEventListener("click", (e) => {
    alert("로그인에 성공하셨습니다!");
    home.classList.remove("show");
});
signedBtn.addEventListener("click", (e) => {
    event.preventDefault();
    var newPw = document
        .getElementById("new-pw")
        .querySelector("input").value;
    var chkPw = document
        .getElementById("chk-pw")
        .querySelector("input").value;
    if (newPw === chkPw) {
        alert("회원 가입에 성공하셨습니다!");
        home.classList.remove("show");
    } else {
        alert("설정한 비밀 번호와 비밀 번호 확인이 일치하지 않습니다.");
    }
});
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    formContainer.classList.remove("active");
});