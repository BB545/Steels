document.getElementById('pur-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('fullname').value;
    const phone = document.getElementById('tel').value;
    const usercontent = document.getElementById('address').value;

    axios.post('/customer', {
        username,
        phone,
        usercontent,
        date: new Date().toISOString().slice(0, 10)
    })
        .then(response => {
            alert(response.data);
            window.location.reload();
        })
        .catch(error => alert('동일한 문의 내역이 존재합니다.'));
});
