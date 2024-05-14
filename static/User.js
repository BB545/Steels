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

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    formContainer.classList.remove("active");
});

function createUser() {
    const form = document.forms['signup-form'];

    if(form.username.value.length === 0){
        alert('이름을 작성해주세요.')
        return 
    }

    if(form.phone.value.length === 0){
        alert('전화번호를 작성해주세요.')
        return 
    }

    if(form.userpw.value.length === 0){
        alert('비밀번호를 작성해주세요.')
        return 
    }

    if(form.userpw.value !== form.newuserpw.value) {
        alert('비밀번호가 일치하지 않습니다.')
        return
    }

    axios({
        method: 'post',
        url: '/signup',
        data: {
            username: form.username.value,
            phone: form.phone.value,
            userpw: form.userpw.value
        }
    }).then(res=>{
        alert('회원가입이 완료되었습니다.')
        form.reset();
        formContainer.classList.remove("active");
    })
}