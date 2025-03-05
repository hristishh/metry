ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map('map', {
        center: [55.755773, 37.617761],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    });

    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #000000; font-weight: bold;">$[properties.iconContent]</div>');

    // Задайте размеры ваших изображений
    const images = {
        images: { src: 'images.png', width: 100, height: 100 }, // Общее изображение для всех меток
        sergey: { src: 'sergey.png', width: 100, height: 100 },
        degt: { src: 'degt.png', width: 100, height: 100 },
        passion: { src: 'passion.png', width: 100, height: 100 },
        passion2: { src: 'passion2.png', width: 100, height: 100 },
        prech: { src: 'prech.png', width: 100, height: 100 }
    };

    // Координаты для каждого объекта
    const placemarksData = [
        { coordinates: [55.768339, 37.629125], imageKey: 'sergey' },
        { coordinates: [55.768532, 37.604978], imageKey: 'degt' },
        { coordinates: [55.764987, 37.608212], imageKey: 'passion' },
        { coordinates: [55.767053, 37.611859], imageKey: 'passion2' },
        { coordinates: [55.744064, 37.590856], imageKey: 'prech' }
    ];

    placemarksData.forEach(data => {
        const myPlacemark = new ymaps.Placemark(data.coordinates, {
            hintContent: '',
            balloonContent: '',
            iconContent: '',
        }, {
            iconContentLayout: MyIconContentLayout,
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'images.png',
            iconImageSize: [30, 50],
            iconImageOffset: [-5, -38] // Смещение для начального изображения
        });

        myMap.geoObjects.add(myPlacemark);

        myPlacemark.events
            .add('mouseenter', function (e) {
                e.get('target').options.set('iconLayout', 'default#imageWithContent');
                e.get('target').options.set('iconImageSize', [240, 144]); // Установите размеры для изображения
                e.get('target').options.set('iconImageOffset', [-images[data.imageKey].width, -images[data.imageKey].height]); // Смещение для фиксации левого нижнего угла
                e.get('target').options.set('iconContentOffset', [20, 15]);
                e.get('target').options.set('iconImageHref', images[data.imageKey].src); // Меняем на индивидуальное изображение
            })
            .add('mouseleave', function (e) {
                e.get('target').options.set('iconLayout', 'default#imageWithContent');
                e.get('target').options.set('iconImageSize', [30, 50]);
                e.get('target').options.set('iconImageOffset', [-5, -38]);
                e.get('target').options.set('iconImageHref', 'images.png'); // Возвращаем общее изображение
            })
            .add('click', function (e) {
                // Открываем балун с изображением
                e.get('target').balloon.open(data.coordinates, {
                    contentBody: '<img src="' + images[data.imageKey].src + '" width="' + images[data.imageKey].width + '" height="' + images[data.imageKey].height + '" alt="Image"/>',
                    closeButton: true // Кнопка закрытия балуна
                });
            });
    });
}



