
        ymaps.ready(init);
        
        function init() {
            var myMap = new ymaps.Map("map", {
                center: [56.326887, 44.005986], 
                zoom: 17,
                controls: ['zoomControl', 'fullscreenControl']
            });
            
            var myPlacemark = new ymaps.Placemark([56.326887, 44.005986], {
                hintContent: 'КРАФТ РЁБРА',
                balloonContentHeader: 'КРАФТ РЁБРА',
                balloonContentBody: 'г. Нижний Новгород, ул. Ошарская, 9<br>Телефон: +7 (910) 894-71-22',
                balloonContentFooter: 'Время работы: Вс-Чт 12:00-00:00, Пт-Сб 12:00-02:00'
            }, {
                preset: 'islands#orangeFoodIcon'
            });
            
            myMap.geoObjects.add(myPlacemark);
            
            setTimeout(function() {
                myPlacemark.balloon.open();
            }, 1500);
        }