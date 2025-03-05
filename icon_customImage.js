ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map('map', {
        center: [55.755773, 37.617761],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    });

    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #000000; font-weight: bold;">$[properties.iconContent]</div>');

    // Çàäàéòå ðàçìåðû âàøèõ èçîáðàæåíèé
    const images = {
        images: { src: 'images.png', width: 100, height: 100 }, // Îáùåå èçîáðàæåíèå äëÿ âñåõ ìåòîê
        sergey: { src: 'sergey.png', width: 100, height: 100 },
        degt: { src: 'degt.png', width: 100, height: 100 },
        passion: { src: 'passion.png', width: 100, height: 100 },
        passion2: { src: 'passion2.png', width: 100, height: 100 },
        prech: { src: 'prech.png', width: 100, height: 100 }
    };

    // Êîîðäèíàòû äëÿ êàæäîãî îáúåêòà
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
            iconImageOffset: [-5, -38] // Ñìåùåíèå äëÿ íà÷àëüíîãî èçîáðàæåíèÿ
        });

        myMap.geoObjects.add(myPlacemark);

        myPlacemark.events
            .add('mouseenter', function (e) {
                e.get('target').options.set('iconLayout', 'default#imageWithContent');
                e.get('target').options.set('iconImageSize', [240, 144]); // Óñòàíîâèòå ðàçìåðû äëÿ èçîáðàæåíèÿ
                e.get('target').options.set('iconImageOffset', [-images[data.imageKey].width, -images[data.imageKey].height]); // Ñìåùåíèå äëÿ ôèêñàöèè ëåâîãî íèæíåãî óãëà
                e.get('target').options.set('iconContentOffset', [20, 15]);
                e.get('target').options.set('iconImageHref', images[data.imageKey].src); // Ìåíÿåì íà èíäèâèäóàëüíîå èçîáðàæåíèå
            })
            .add('mouseleave', function (e) {
                e.get('target').options.set('iconLayout', 'default#imageWithContent');
                e.get('target').options.set('iconImageSize', [30, 50]);
                e.get('target').options.set('iconImageOffset', [-5, -38]);
                e.get('target').options.set('iconImageHref', 'images.png'); // Âîçâðàùàåì îáùåå èçîáðàæåíèå
            })
            .add('click', function (e) {
                // Îòêðûâàåì áàëóí ñ èçîáðàæåíèåì
                e.get('target').data.imageKey.open(data.coordinates, {
                    contentBody: '<img src="' + images[data.imageKey].src + '" width="' + images[data.imageKey].width + '" height="' + images[data.imageKey].height + '" alt="Image"/>',
                    closeButton: true // Êíîïêà çàêðûòèÿ áàëóíà
                });
            });
    });
}



