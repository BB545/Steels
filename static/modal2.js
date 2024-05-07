const itemButtons = document.querySelectorAll(".image-container img");

itemButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        const clickedIndex = index + 7;
        const modalId = "modal_" + clickedIndex;

        // 모달 창 보이기
        document.getElementById("modal").style.display = "block";

        // 해당하는 모달만 보이기
        for (let i = 7; i <= 8; i++) {
            const modalElement = document.getElementById("modal_" + i);
            if (modalElement) {
                if ("modal_" + i === modalId) {
                    modalElement.style.display = "block";
                } else {
                    modalElement.style.display = "none";
                }
            }
        }

        // AJAX 요청으로 파일 가져오기
        var username = "BB545"; // GitHub 사용자 이름
        var repo = "Steels"; // GitHub 저장소 이름
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
                // 파일 내용을 content 요소에 추가
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