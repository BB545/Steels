document.addEventListener('DOMContentLoaded', function () {
    const buyButton = document.querySelector(".buy_button a");

    if (buyButton) {
        buyButton.addEventListener('click', function (event) {
            const clickedIndex = this.getAttribute("data-index");
            fetchProductInfo(clickedIndex)
                .then(product => {
                    localStorage.removeItem('selectedProduct');
                    localStorage.setItem('selectedProduct', JSON.stringify(product));
                    window.location.href = "/purchase";
                })
                .catch(error => console.error('Error:', error));
            console.log(clickedIndex);
        });
    } else {
        console.error('Error: .buy_button a 요소를 찾을 수 없습니다.');
    }

    function fetchProductInfo(productId) {
        return axios.get(`/purchase/${productId}`)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error)
                throw error;
            });
    }
});