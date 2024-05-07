const itemButtons = document.querySelectorAll(".image-container img");

itemButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        const clickedIndex = index + 1;
        const modalId = "modal_" + clickedIndex;

        document.getElementById("modal").style.display = "block";

        for (let i = 1; i <= 9; i++) {
            const modalElement = document.getElementById("modal_" + i);
            if (modalElement) {
                if ("modal_" + i === modalId) {
                    modalElement.style.display = "block";
                } else {
                    modalElement.style.display = "none";
                }
            }
        }

        var username = "BB545";
        var repo = "Steels";
        var filePath = "public/item_" + clickedIndex + ".txt";
        var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

        $.ajax({
            url: rawURL,
            success: function (data) {
                $("#content").html(data);
            },
            error: function () {
                $("#content").html(
                    "<p>파일을 불러오는 데 문제가 발생했습니다.</p>"
                );
            },
        });
    });
});

document.getElementById("modal_close_btn").onclick = function () {
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = "";
};

new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
    },
}); 