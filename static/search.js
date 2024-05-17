const search = document.getElementById("search"),
    searchop = document.getElementById("search-open"),
    searchBtn = document.getElementById("search-btn"),
    searchClose = document.getElementById("search-close"),
    searchInput = document.querySelector('.search__input');

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

searchInput.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const tag = searchInput.value.trim();

        if (!tag) {
            alert('검색어를 입력하세요.');
            return;
        }

        axios.get(`/search?tag=${encodeURIComponent(tag)}`)
            .then(response => {
                const products = response.data.products;

                showSearchResults(products);
            })
            .catch(error => {
                console.error('검색 중 오류 발생:', error);
                alert('검색 중 오류가 발생했습니다.');
            });
    }
});

function showSearchResults(products) {
    const searchResults = document.getElementById('search-results');

    if (products.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center;">검색 결과가 없습니다.</p>';
        return;
    }

    const productHTML = products.map(product => `
        <div class="grid">
            <div class="card image-container">
                <img src="/item${product.pro_num}.jpg" alt="${product.pro_name}" />
                <div class="save-image-btn" onclick="alert('이미지를 저장합니다.')">
                    이미지 저장해서 보기
                </div>
                <h2>${product.pro_name}</h2>
                <p>${product.pro_price}원</p>
            </div>
        </div>
    `).join('');
    searchResults.innerHTML = productHTML;

    // search.classList.remove("show-search");
}