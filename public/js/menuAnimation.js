$(document).ready(function () {
    $("#menuIcon").on("click", function () {
        var click = $(this).data("clicks");
        $("#menuList").toggle(500);
        if (click) {
            $("#menuIcon").css({
                color: "#996515",
            });
            $("#menuIcon").mouseover(function () {
            $(".mEl").css({
                    background: "black",
                    transition: '0.5s'
                });

                $(".mEl3").css({
                    background: "black",
                    transition: '0.5s'
                });
        });
            $("#menuIcon").mouseout(function () {
                $(".mEl").css({
                    background: "#996515",
                });

                $(".mEl3").css({
                    background: "#996515",
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
                    background: "black",
                });

                $(".mEl3").css({
                    background: "black",
                    transition: '0.5s'
                });
            });

        }

        $(this).data("clicks", !click);
    });
});