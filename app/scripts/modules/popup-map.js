export let isLoaded = false;

import { MAP_API_KEY } from "../global.js";

export function loadMap() {
  const script = document.createElement("script");
  script.src = `https://api-maps.yandex.ru/v3/?apikey=${MAP_API_KEY}&lang=ru_RU`;
  document.body.appendChild(script);
  script.onload = function () {
    if (typeof ymaps3 === "undefined") return;
    initMap();
    isLoaded = true;
    // ymaps3.ready(initMap);
  };
}

const coords = [39.331297, 43.911584];

const mapElem = document.getElementById("map-popup");

async function initMap() {
  await ymaps3?.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } = ymaps3;

  const { YMapZoomControl } = await ymaps3.import("@yandex/ymaps3-controls@0.0.1");

  const map = new YMap(mapElem, {
    location: {
      center: coords,
      zoom: 15,
    },
  });
  // Добавьте слой с дорогами и зданиями
  map.addChild(new YMapDefaultSchemeLayer());
  // Добавьте слой для маркеров
  map.addChild(new YMapDefaultFeaturesLayer());

  // Инициализируйте маркер
  const content = document.createElement("div");
  const img = document.createElement("img");
  content.classList.add("map-marker");
  img.src = "/images/favicons/favicon.svg";
  content.appendChild(img);
  // Инициализируйте маркер
  const marker = new YMapMarker(
    {
      coordinates: coords,
      draggable: true,
    },
    content
  );
  map.addChild(marker);

  if (window.innerWidth < 1024) {
    map.setBehaviors(["multiTouch", "dblClickZoom", "rightMouseButtonMagnifier", "pinchZoom", "dblClick", "magnifier"]);

    const mapLayout = document.getElementById("map-popup");
    if (mapLayout) {
      let pane = document.createElement("div");
      pane.innerHTML = "Чтобы переместить карту проведите по ней двумя пальцами";
      pane.style.cssText =
        "height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; z-index: 9; color: #fff; font-size: 22px; font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; text-align: center; background-color: rgba(0,0,0,0.45); opacity: 0; transition: opacity 0.45s; padding: 25px; box-sizing: border-box;";
      mapLayout.append(pane);
      mapLayout.addEventListener("touchmove", function (e) {
        let touches = e.touches.length;
        if (touches > 1) {
          // Если точек касания больше одной
          pane.style.opacity = "0";
          pane.style.pointerEvents = "none";
          mapLayout.querySelector(".ymaps3x0--map").classList.remove("not-touch");
          map.setBehaviors(["drag", "multiTouch", "dblClickZoom", "rightMouseButtonMagnifier", "pinchZoom", "dblClick", "magnifier"]);
        } else {
          pane.style.opacity = "1";
          pane.style.pointerEvents = "";
          mapLayout.querySelector(".ymaps3x0--map").classList.add("not-touch");
          map.setBehaviors(["multiTouch", "dblClickZoom", "rightMouseButtonMagnifier", "pinchZoom", "dblClick", "magnifier"]);
        }
      });

      mapLayout.addEventListener("touchend", () => {
        pane.style.opacity = "0";
      });
    }
  } else {
    map.addChild(new YMapControls({ position: "right" }).addChild(new YMapZoomControl({})));
  }
}
