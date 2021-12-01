$(document).ready(function () {
    if ($('.map').length > 0) {
        ymaps.ready(init);
        var myMap,
            myPlacemark;


        function init() {
            myMap = new ymaps.Map("map-cart", {
                center: [57.00678406768955, 41.03014316134638],
                zoom: 17,
                controls: []
            }, {
                suppressMapOpenBlock: true
            });
            myMap.behaviors.disable('scrollZoom');
            myMap.controls.add('zoomControl', {position: {right: '10px', top: '200px'}});
            myPlacemark = new ymaps.Placemark([57.00678406768955, 41.03402699999996], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/pin.png',
                iconImageSize: [137, 70],
                iconImageOffset: [-67, -75]
            });

            myMap.geoObjects.add(myPlacemark);

        }

    } else {
        // не существует
    }

    $leftMenu = $('.map-tab-pane').find('.left-menu').find('a');
    $right = $('.map-tab-pane').find('.map-area').find('a');

    $leftMenu.mouseenter(function () {
        let classOne = $(this).attr('href');
        let color = $(this).data('color');
        let currentElement = $(".map-area a[href='" + classOne + "']");
        currentElement.find('polygon').css('fill', color).css('stroke-width', '2px')
        currentElement.find('path').css('fill', color).css('stroke-width', '2px')
        $(this).addClass('active');
    });

    $leftMenu.mouseleave(function () {
        let classOne = $(this).attr('href');
        let color = $(this).data('color');
        let currentElement = $(".map-area a[href='" + classOne + "']");
        let fillPol = currentElement.find('polygon').attr('fill');
        let fillPath = currentElement.find('path').attr('fill');
        currentElement.find('polygon').css('fill', fillPol).css('stroke-width', '1px')
        currentElement.find('path').css('fill', fillPath).css('stroke-width', '1px')
        $(this).removeClass('active');
    });

    $right.mouseenter(function () {
        let classOne = $(this).attr('href');
        let color = $(this).data('color');
        let currentElement = $(".left-menu a[href='" + classOne + "']");
        $(this).find('polygon').css('fill', color).css('stroke-width', '2px')
        $(this).find('path').css('fill', color).css('stroke-width', '2px')
        currentElement.addClass('active');
    });

    $right.mouseleave(function () {
        let classOne = $(this).attr('href');
        let color = $(this).data('color');
        let currentElement = $(".left-menu a[href='" + classOne + "']");
        let fillPol = $(this).find('polygon').attr('fill');
        let fillPath = $(this).find('path').attr('fill');
        $(this).find('polygon').css('fill', fillPol).css('stroke-width', '1px')
        $(this).find('path').css('fill', fillPath).css('stroke-width', '1px')
        currentElement.removeClass('active');
    });

    var declineObl = '';

    $('body').on('click', '.map-tab-link', function () {
        var href = $(this).attr('href');
        let hreff = href.slice(1);
        console.log(hreff);
        $('.map-tab .map-tab-pane').removeClass('current').removeClass('in');
        var id = $(href).addClass('current');
        declineObl = $(this).data('decline');
        let bidElement = $(".district-area .district-block[data-class='bid']");
        bidElement.find('.text').find('span').text(declineObl);
        if ($('.swiper-container').length > 0) {
            swiperFilter = new Swiper(".district-area .swiper-container[data-swiper='" + hreff + "']", {
                slidesPerGroup: 2,
                width: 349,
                spaceBetween: 23,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }

        setTimeout(function () {
            $(href).addClass('in');
        }, 200);
        return false;
    });

    $('.left-menu ul').each(function () {
        if ($(this).find('li').length > 8) {
            $(this).mCustomScrollbar({
                mouseWheelPixels: 500,
                scrollButtons: {
                    enable: true
                }
            });
        }
    });

    $('.dist').click(function () {
        $('.lazy').Lazy();
    });


});
