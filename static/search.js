const search = document.getElementById("search"),
    searchop = document.getElementById("search-open"),
    searchBtn = document.getElementById("search-btn"),
    searchClose = document.getElementById("search-close"),
    searchInput = document.getElementById('searchInput');

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
    recognition.stop();
});

if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const tag = searchInput.value.trim();

            if (!tag) {
                alert('검색어를 입력하세요.');
                return;
            }

            window.location.href = `/search?tag=${encodeURIComponent(tag)}`;
        }
    });
}