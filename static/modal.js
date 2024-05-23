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
                    displayImages(i)
                } else {
                    modalElement.style.display = "none";
                }
            }
        }

        function displayImages(modalNumber) {
            const swiperWrapper = document.querySelector("#modal_" + modalNumber + " .swiper-wrapper");
            swiperWrapper.innerHTML = "";

            for (let j = 1; j <= 4; j++) {
                const image = document.createElement("img");
                image.classList.add("swiper-slide");
                image.src = "/item" + modalNumber + "_" + j + ".jpg";
                swiperWrapper.appendChild(image);
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

        const saveButton = document.querySelector(".save_button a");
        const buyButton = document.querySelector(".buy_button a");

        saveButton.setAttribute("data-index", clickedIndex);
        buyButton.setAttribute("data-index", clickedIndex);

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