$(document).ready(function () {
    //LOGICA PARA DIBUJAR LAS CELDAS
    const numberOfColumns = 100;
    const windowHeight = $(window).height();
    const cellSize = Math.floor($(window).width() / numberOfColumns);
    const numberOfRows = Math.floor(windowHeight / cellSize);

    $('.grid').css('grid-template-rows', `repeat(${numberOfRows}, ${cellSize}px)`);

    for (let i = 0; i < numberOfRows * numberOfColumns; i++) {
        $('.grid').append('<div class="cell"></div>');
    }


    //LOGICA PARA PINTAR Y BORRAR CELDAS INDIVIDUALES
    const emptyCellColor = "rgb(240, 240, 240)";
    let selectedColor = "#74D3AE";

    $('.cell').click(function () {
        $(this).css('background-color') === emptyCellColor ? $(this).css('background-color', selectedColor) : $(this).css('background-color', emptyCellColor);
    });


    //LOGICA PARA PINTAR MANTENIENDO EL CLICK
    let isMouseClicked = false;

    $(document).mousedown(function () {
        isMouseClicked = true;
    });

    $(document).mouseup(function () {
        isMouseClicked = false;
    });

    $('.cell').mousemove(function () {
        if (isMouseClicked) {
            $(this).css('background-color', selectedColor);
        }
    });


    //LOGICA PARA ABRIR EL COLOR PICKER
    $('body').mousedown(function (e) {
        if (e.button == 2) {
            document.oncontextmenu = function () { return false; };

            $('.popup').css({
                top: e.clientY + 10 + "px",
                left: e.clientX - 80 + "px"
            }).css('visibility', 'visible');;

            return false;
        }
        return true;
    });

    //LOGICA PARA PINTAR CADA OPCION DEL COLOR CORRECTO
    $(".picker").each(function () {
        var color = $(this).data("color");
        $(this).css("background-color", color);

        if (color === selectedColor) {
            $(this).addClass("selected");
        }
    });

    //LOGICA PARA SELECCIONAR UN COLOR Y CERRAR EL COLOR PICKER
    $(".picker").on("click", function () {
        selectedColor = $(this).data("color");

        $(".picker").removeClass("selected");
        $(this).addClass("selected");

        $('.popup').css('visibility', 'hidden');
    });
});