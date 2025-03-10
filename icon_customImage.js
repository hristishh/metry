ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map('map', {
        center: [55.755773, 37.617761],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    });

    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #000000; font-weight: bold;">$[properties.iconContent]</div>');

    // Изображения для меток
    const images = {
        images: { src: 'images.png', width: 100, height: 100 },
        sergey: { src: 'sergey.png', width: 100, height: 100 },
        degt: { src: 'degt.png', width: 100, height: 100 },
        passion: { src: 'passion.png', width: 100, height: 100 },
        passion2: { src: 'passion2.png', width: 100, height: 100 },
        prech: { src: 'prech.png', width: 100, height: 100 },
        mir: { src: 'mir.png', width: 100, height: 100 }
    };

    // Данные меток
    const placemarksData = [
        { coordinates: [55.768339, 37.629125], imageKey: 'sergey' },
        { coordinates: [55.768532, 37.604978], imageKey: 'degt' },
        { coordinates: [55.764987, 37.608212], imageKey: 'passion' },
        { coordinates: [55.767053, 37.611859], imageKey: 'passion2' },
        { coordinates: [55.744064, 37.590856], imageKey: 'prech' },
        { coordinates: [55.781793, 37.634290], imageKey: 'mir' }
    ];

     // Данные меток достопримечательностей
    const attractionsData = [
        { coordinates: [55.747224, 37.605240], title: 'Museum', imageSrc: 'museum.png' },
        { coordinates: [55.753544, 37.621202], title: 'Red Square', imageSrc: 'square.png' },
        { coordinates: [55.760135, 37.624957], title: 'Central Children_s Store', imageSrc: 'cdm.png' },
        { coordinates: [55.760056, 37.618672], title: 'Bolshoi Theatre', imageSrc: 'theatre.png' },
        { coordinates: [55.731474, 37.603431], title: 'Gorky Park', imageSrc: 'park.png' },
        { coordinates: [55.741556, 37.620028], title: 'Gallery', imageSrc: 'gallery.png' }
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
            iconImageSize: [40, 60],
            iconImageOffset: [-5, -38]
        });

        myMap.geoObjects.add(myPlacemark);

        myPlacemark.events
            .add('mouseenter', function (e) {
                e.get('target').options.set('iconLayout', 'default#imageWithContent');
                e.get('target').options.set('iconImageSize', [200, 120]);
                e.get('target').options.set('iconImageOffset', [-images[data.imageKey].width, -images[data.imageKey].height]);
                e.get('target').options.set('iconContentOffset', [-120, -200]);
                e.get('target').options.set('iconImageHref', images[data.imageKey].src);
            })
            .add('mouseleave', function (e) {
                e.get('target').options.set('iconLayout', 'default#imageWithContent');
                e.get('target').options.set('iconImageSize', [40, 60]);
                e.get('target').options.set('iconImageOffset', [-5, -38]);
                e.get('target').options.set('iconImageHref', 'images.png');
            })
            .add('click', function (e) {
                // Создаем модальное окно для изображения
                const img = document.createElement('img');
                img.src = images[data.imageKey].src;
                img.style.width = '300px'; // Задайте нужные размеры
                img.style.height = 'auto';

                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.onclick = () => {
                    document.body.removeChild(modal);
                };

                modal.appendChild(img);
                document.body.appendChild(modal);
            });
    });
    // Добавление меток достопримечательностей с индивидуальными изображениями
    attractionsData.forEach(attraction => {
        const attractionPlacemark = new ymaps.Placemark(attraction.coordinates, {
            hintContent: attraction.title,
            balloonContent: attraction.title,
        }, {
            iconLayout: 'default#image',
            iconImageHref: attraction.imageSrc,
            iconImageSize: [100, 55],
            iconImageOffset: [-15, -30] // Центрирование по нижнему центру
        });

        myMap.geoObjects.add(attractionPlacemark);
    });
}




