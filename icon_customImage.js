ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map('map', {
        center: [55.755773, 37.617761],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    });

    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #000000; font-weight: bold;">$[properties.iconContent]</div>');

    // Èçîáðàæåíèÿ äëÿ ìåòîê
    const images = {
        images: { src: 'images.png', width: 100, height: 100 },
        sergey: { src: 'sergey.png', width: 100, height: 100 },
        degt: { src: 'degt.png', width: 100, height: 100 },
        str4: { src: 'str4.png', width: 100, height: 100 },
        str12: { src: 'str12.png', width: 100, height: 100 },
        prech: { src: 'prech.png', width: 100, height: 100 },
        mir: { src: 'mir.png', width: 100, height: 100 },
        tver: { src: 'tver.png', width: 100, height: 100 },
        devyat: { src: 'devyat.png', width: 100, height: 100 },
        petr: { src: 'petr.png', width: 100, height: 100 },
        str5: { src: 'str5.png', width: 100, height: 100 }
    };

    // Äàííûå ìåòîê
    const placemarksData = [
        { coordinates: [55.768339, 37.629125], imageKey: 'sergey' },
        { coordinates: [55.768532, 37.604978], imageKey: 'degt' },
        { coordinates: [55.764987, 37.608212], imageKey: 'str4' },
        { coordinates: [55.767053, 37.611859], imageKey: 'str12' },
        { coordinates: [55.744064, 37.590856], imageKey: 'prech' },
        { coordinates: [55.781793, 37.634290], imageKey: 'mir' },
        { coordinates: [55.768659, 37.597558], imageKey: 'tver' },
        { coordinates: [55.759375, 37.638575], imageKey: 'devyat' },
        { coordinates: [55.764323, 37.615416], imageKey: 'petr' },
        { coordinates: [55.764739, 37.608805], imageKey: 'str5' },
    ];

     // Äàííûå ìåòîê äîñòîïðèìå÷àòåëüíîñòåé
    const attractionsData = [
        { coordinates: [55.747224, 37.605240],  imageSrc: 'museum.png' },
        { coordinates: [55.753544, 37.621202],  imageSrc: 'square.png' },
        { coordinates: [55.760135, 37.624957],  imageSrc: 'cdm.png' },
        { coordinates: [55.760056, 37.618672],  imageSrc: 'theatre.png' },
        { coordinates: [55.731474, 37.603431],  imageSrc: 'park.png' },
        { coordinates: [55.741556, 37.620028],  imageSrc: 'gallery.png' },
        { coordinates: [55.744661, 37.605526],  imageSrc: 'hram.png' },
        { coordinates: [55.764944, 37.591722],  imageSrc: 'patriki.png' }
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
                        const modalImageSrc = {
                            sergey: 'fullsergey.png',
                            degt: 'fulldegt.png',
                            str4: 'fullstr4.png',
                            str12: 'fullstr12.png',
                            prech: 'fullprech.png',
                            mir: 'fullmir.png',
                            tver: 'fulltver.png',
                            devyat: 'fulldevyat.png',
                            petr: 'fullpetr.png',
                            str5: 'fullstr5.png',
                        }[data.imageKey];
 
                // Ñîçäàåì ìîäàëüíîå îêíî äëÿ èçîáðàæåíèÿ
                const img = document.createElement('img');
                img.src = modalImageSrc;
                img.style.width = '300px'; // Çàäàéòå íóæíûå ðàçìåðû
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
    // Äîáàâëåíèå ìåòîê äîñòîïðèìå÷àòåëüíîñòåé ñ èíäèâèäóàëüíûìè èçîáðàæåíèÿìè
    attractionsData.forEach(attraction => {
        const attractionPlacemark = new ymaps.Placemark(attraction.coordinates, {
            hintContent: attraction.title,
            balloonContent: attraction.title,
        }, {
            iconLayout: 'default#image',
            iconImageHref: attraction.imageSrc,
            iconImageSize: [70, 80],
            iconImageOffset: [-15, -30] // Öåíòðèðîâàíèå ïî íèæíåìó öåíòðó
        });

        myMap.geoObjects.add(attractionPlacemark);
    });
}




