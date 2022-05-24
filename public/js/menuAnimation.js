$(document).ready(function () {
    $("#menuIcon").on("click", function () {
        var click = $(this).data("clicks");
        $("#menuList").toggle(500);
        if (click) {
            $("#menuIcon").mouseover(function () {
            $(".mEl").css({
                    background: "#A0522D",
                    transition: '0.5s'
                });

                $(".mEl3").css({
                    background: "#A0522D",
                    transition: '0.5s'
                });
        });
            $("#menuIcon").mouseout(function () {
                $(".mEl").css({
                    background: "#A0522D",
                });

                $(".mEl3").css({
                    background: "#A0522D",
                    transition: '0.5s'
                });
            });

        } else {

            $("#menuIcon").mouseover(function () {
            $(".mEl").css({
                    background: "red",
                    transition: '0.5s'
                });

                $(".mEl3").css({
                    background: "red",
                    transition: '0.5s'
                });
        });
            $("#menuIcon").mouseout(function () {
                $(".mEl").css({
                    background: "#B10000",
                });

                $(".mEl3").css({
                    background: "#B10000",
                    transition: '0.5s'
                });
            });

        }

        $(this).data("clicks", !click);
    });
});