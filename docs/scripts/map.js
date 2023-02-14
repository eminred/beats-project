let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.751644, 37.600618],
   zoom: 13,
   controls: [],
 });
 
 let coords = [
     [55.75475586753862,37.621361737218315],
     [55.75119228405711,37.60671206576479],
     [55.757905298455725,37.58219594981976],
     [55.74397814711495,37.582641377300185],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/marker_map.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);