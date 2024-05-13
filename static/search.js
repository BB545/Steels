const search = document.getElementById("search"),
    searchop = document.getElementById("search-open"),
    searchBtn = document.getElementById("search-btn"),
    searchClose = document.getElementById("search-close");

searchop.addEventListener("click", () => {
    search.classList.add("show-search");
    isSpeechEnabled = false;
});
searchBtn.addEventListener("click", () => {
    search.classList.add("show-search");
    isSpeechEnabled = false;
});

searchClose.addEventListener("click", () => {
    search.classList.remove("show-search");
    // recognition.stop();
});