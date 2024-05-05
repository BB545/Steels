const btn_data1 = (document.getElementById("item1").onclick =
        function () {
          var username = "BB545"; // GitHub 사용자 이름
          var repo = "Steels"; // GitHub 저장소 이름
          var filePath = "public/item_1.txt";
          // GitHub raw URL 생성
          var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

          // AJAX 요청으로 파일 가져오기
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
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal_1").style.display = "block";
          document.getElementById("modal_2").style.display = "none";
          document.getElementById("modal_3").style.display = "none";
          document.getElementById("modal_4").style.display = "none";
          document.getElementById("modal_5").style.display = "none";
          document.getElementById("modal_6").style.display = "none";
          document.getElementById("modal_7").style.display = "none";
          document.getElementById("modal_8").style.display = "none";
          document.getElementById("modal_9").style.display = "none";
        });
const btn_data2 = (document.getElementById("item2").onclick =
    function () {
        var username = "BB545"; // GitHub 사용자 이름
        var repo = "Steels"; // GitHub 저장소 이름
        var filePath = "public/item_2.txt";
        // GitHub raw URL 생성
        var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

        // AJAX 요청으로 파일 가져오기
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
        document.getElementById("modal").style.display = "block";
        document.getElementById("modal_2").style.display = "block";
        document.getElementById("modal_1").style.display = "none";
        document.getElementById("modal_3").style.display = "none";
        document.getElementById("modal_4").style.display = "none";
        document.getElementById("modal_5").style.display = "none";
        document.getElementById("modal_6").style.display = "none";
        document.getElementById("modal_7").style.display = "none";
        document.getElementById("modal_8").style.display = "none";
        document.getElementById("modal_9").style.display = "none";
});

      const btn_data3 = (document.getElementById("item3").onclick =
        function () {
          var username = "BB545"; // GitHub 사용자 이름
          var repo = "Steels"; // GitHub 저장소 이름
          var filePath = "public/item_3.txt";
          // GitHub raw URL 생성
          var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

          // AJAX 요청으로 파일 가져오기
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
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal_3").style.display = "block";
          document.getElementById("modal_2").style.display = "none";
          document.getElementById("modal_1").style.display = "none";
          document.getElementById("modal_4").style.display = "none";
          document.getElementById("modal_5").style.display = "none";
          document.getElementById("modal_6").style.display = "none";
          document.getElementById("modal_7").style.display = "none";
          document.getElementById("modal_8").style.display = "none";
          document.getElementById("modal_9").style.display = "none";
        });

      const btn_data4 = (document.getElementById("item4").onclick =
        function () {
          var username = "BB545"; // GitHub 사용자 이름
          var repo = "Steels"; // GitHub 저장소 이름
          var filePath = "public/item_4.txt";
          // GitHub raw URL 생성
          var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

          // AJAX 요청으로 파일 가져오기
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
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal_4").style.display = "block";
          document.getElementById("modal_2").style.display = "none";
          document.getElementById("modal_3").style.display = "none";
          document.getElementById("modal_1").style.display = "none";
          document.getElementById("modal_5").style.display = "none";
          document.getElementById("modal_6").style.display = "none";
          document.getElementById("modal_7").style.display = "none";
          document.getElementById("modal_8").style.display = "none";
          document.getElementById("modal_9").style.display = "none";
        });

      const btn_data5 = (document.getElementById("item5").onclick =
        function () {
          var username = "BB545"; // GitHub 사용자 이름
          var repo = "Steels"; // GitHub 저장소 이름
          var filePath = "public/item_5.txt";
          // GitHub raw URL 생성
          var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

          // AJAX 요청으로 파일 가져오기
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
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal_5").style.display = "block";
          document.getElementById("modal_2").style.display = "none";
          document.getElementById("modal_3").style.display = "none";
          document.getElementById("modal_4").style.display = "none";
          document.getElementById("modal_1").style.display = "none";
          document.getElementById("modal_6").style.display = "none";
          document.getElementById("modal_7").style.display = "none";
          document.getElementById("modal_8").style.display = "none";
          document.getElementById("modal_9").style.display = "none";
        });

      const btn_data6 = (document.getElementById("item6").onclick =
        function () {
          var username = "BB545"; // GitHub 사용자 이름
          var repo = "Steels"; // GitHub 저장소 이름
          var filePath = "public/item_6.txt";
          // GitHub raw URL 생성
          var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

          // AJAX 요청으로 파일 가져오기
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
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal_6").style.display = "block";
          document.getElementById("modal_2").style.display = "none";
          document.getElementById("modal_3").style.display = "none";
          document.getElementById("modal_4").style.display = "none";
          document.getElementById("modal_5").style.display = "none";
          document.getElementById("modal_1").style.display = "none";
          document.getElementById("modal_7").style.display = "none";
          document.getElementById("modal_8").style.display = "none";
          document.getElementById("modal_9").style.display = "none";
        });

      const btn_data7 = (document.getElementById("item7").onclick =
        function () {
          var username = "BB545"; // GitHub 사용자 이름
          var repo = "Steels"; // GitHub 저장소 이름
          var filePath = "public/item_7.txt";
          // GitHub raw URL 생성
          var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

          // AJAX 요청으로 파일 가져오기
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
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal_7").style.display = "block";
          document.getElementById("modal_2").style.display = "none";
          document.getElementById("modal_3").style.display = "none";
          document.getElementById("modal_4").style.display = "none";
          document.getElementById("modal_5").style.display = "none";
          document.getElementById("modal_6").style.display = "none";
          document.getElementById("modal_1").style.display = "none";
          document.getElementById("modal_8").style.display = "none";
          document.getElementById("modal_9").style.display = "none";
        });

      const btn_data8 = (document.getElementById("item8").onclick =
        function () {
          var username = "BB545"; // GitHub 사용자 이름
          var repo = "Steels"; // GitHub 저장소 이름
          var filePath = "public/item_8.txt";
          // GitHub raw URL 생성
          var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

          // AJAX 요청으로 파일 가져오기
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
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal_8").style.display = "block";
          document.getElementById("modal_2").style.display = "none";
          document.getElementById("modal_3").style.display = "none";
          document.getElementById("modal_4").style.display = "none";
          document.getElementById("modal_5").style.display = "none";
          document.getElementById("modal_6").style.display = "none";
          document.getElementById("modal_7").style.display = "none";
          document.getElementById("modal_1").style.display = "none";
          document.getElementById("modal_9").style.display = "none";
        });

      const btn_data9 = (document.getElementById("item9").onclick =
        function () {
          var username = "BB545"; // GitHub 사용자 이름
          var repo = "Steels"; // GitHub 저장소 이름
          var filePath = "public/item_9.txt";
          // GitHub raw URL 생성
          var rawURL =
            "https://raw.githubusercontent.com/" +
            username +
            "/" +
            repo +
            "/main/" +
            filePath;

          // AJAX 요청으로 파일 가져오기
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
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal_9").style.display = "block";
          document.getElementById("modal_2").style.display = "none";
          document.getElementById("modal_3").style.display = "none";
          document.getElementById("modal_4").style.display = "none";
          document.getElementById("modal_5").style.display = "none";
          document.getElementById("modal_6").style.display = "none";
          document.getElementById("modal_7").style.display = "none";
          document.getElementById("modal_8").style.display = "none";
          document.getElementById("modal_1").style.display = "none";
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