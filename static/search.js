const search = document.getElementById("search"),
    searchop = document.getElementById("search-open"),
    searchBtn = document.getElementById("search-btn"),
    searchClose = document.getElementById("search-close");

    searchop.addEventListener("click", () => {
        search.classList.add("show-search");
    });
    searchBtn.addEventListener("click", () => {
        search.classList.add("show-search");
    });

    searchClose.addEventListener("click", () => {
        search.classList.remove("show-search");
    });