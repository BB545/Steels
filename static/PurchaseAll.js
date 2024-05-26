function submitSelectedProducts() {
    const selectedProducts = Array.from(document.querySelectorAll('.item-checkbox:checked'))
        .map(checkbox => checkbox.getAttribute('data-id'));

    axios.post('/selected', { selectedProducts })
        .then(response => {
            if (response.data.success) {
                localStorage.removeItem('selectedProducts');
                localStorage.setItem('selectedProducts', JSON.stringify(response.data.products));
                window.location.href = '/purchase2';
            }
        })
        .catch(error => console.error('Error:', error));
}

document.querySelector('.selecBtn').addEventListener('click', submitSelectedProducts);

function selectAllProductsAndOrder() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });

    submitSelectedProducts();
}

document.querySelector('.allBtn').addEventListener('click', selectAllProductsAndOrder);