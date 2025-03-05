ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map('map', {
        center: [55.755773, 37.617761],
        zoom: 9
    }, {
        searchControlProvider: 'yandex#search'
    });

    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #000000; font-weight: bold;">$[properties.iconContent]</div>');

    // «адайте размеры вашего изображени€
    const sergeyImageWidth = 100; // ширина sergey.png
    const sergeyImageHeight = 100; // высота sergey.png
    const placemarkCoordinates = [55.768339, 37.629125];

    const myPlacemark = new ymaps.Placemark(placemarkCoordinates, {
        hintContent: '',
        balloonContent: '',
        iconContent: '',
    }, {
        iconContentLayout: MyIconContentLayout,
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'images.png',
        iconImageSize: [30, 50],
        iconImageOffset: [-5, -38] // —мещение дл€ начального изображени€
    });

    myMap.geoObjects.add(myPlacemark);

    myPlacemark.events
        .add('mouseenter', function (e) {
            e.get('target').options.set('iconLayout', 'default#imageWithContent');
            e.get('target').options.set('iconImageSize', [200, 120]); // ”становите размеры дл€ sergey.png
            e.get('target').options.set('iconImageOffset', [-sergeyImageWidth, -sergeyImageHeight]); // —мещение дл€ фиксации левого нижнего угла
            e.get('target').options.set('iconContentOffset', [20, 15]);
            e.get('target').options.set('iconImageHref', 'sergey.png');
        })
        .add('mouseleave', function (e) {
            e.get('target').options.set('iconLayout', 'default#imageWithContent');
            e.get('target').options.set('iconImageSize', [30, 50]);
            e.get('target').options.set('iconImageOffset', [-5, -38]);
            e.get('target').options.set('iconImageHref', 'images.png');
        });
}




