import { Controller } from "stimulus";
import mapboxgl from "!mapbox-gl";

export default class extends Controller {
  static values = { apiKey: String };
  static targets = [
    "list",
    "searchInput",
    "searchPlace",
    "searchPlace2",
    "containerMap",
  ];

  connect() {
    // console.log(this.containerMap);
    console.log("cont map", this.containerMapTarget);
    console.log(this.apiKeyValue);
    console.log(this.element);
    console.log(this.listTarget);
    console.log(this.searchInputTarget);
    console.log(this.searchInputPlace);

    // mapboxgl.accessToken = this.apiKeyValue
    mapboxgl.accessToken =
      "pk.eyJ1Ijoicm9iZXJ0ZHVwb250IiwiYSI6ImNsMWkzd3I4dDBnaGQzam4zZnk5dnV6bDgifQ.IDerL2K28FfdFy2eY6rA4A";

    this.map = new mapboxgl.Map({
      container: this.containerMapTarget,
      style: "mapbox://styles/robertdupont/cl1j14ur0000414n6ucz2ps2m",
    });
  }

  // yelp is not accepting CORS, so the server has to do the calls,
  // here #search in YelpController
  //  https://tiffnuugen.github.io/the_de_facto_guide_to_using_the_yelp_api

  postSearch(e) {
    e.preventDefault();
    console.log("in get stimulus submit");
    const target = this.listTarget;
    const query = this.searchInputTarget.value;
    const place = this.searchPlaceTarget.value;

    // for the map
    const el = this;

    fetch(`/search?term=${query}&location=${place}`, { method: "POST" })
      .then(function (response) {
        response.json().then(function (data) {
          target.innerHTML = "";
          data.map((obj) => {
            obj.image_url === ""
              ? (obj.image_url =
                  "https://eatdrinkplay.com/wp-content/uploads/2015/11/IMG_5077-e1447640039980.jpg")
              : obj.image_url;
          });
          if (data.length === 0) {
            target.insertAdjacentHTML(
              "beforeend",
              `<h1>Nous n'avons pas de résultats pour votre recherche</h1>`
            );
          } else {
            data.forEach((element) => {
              target.insertAdjacentHTML(
                "beforeend",
                `
                  <div class="card " style="width: 18rem;margin-bottom:20px;">
                    <img class="card-img-top card-image" src=${element.image_url} alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${element.name}</h5>
                      <p class="card-text">Prix: ${element.price}</p>
                      <p class="card-text">Note: ${element.rating}</p>
                      <a href="${element.url}" target="blank" class="btn btn-primary">En savoir plus</a>
                      <button data-restaurantId="${element.id}"  data-action="click->crud-restaurants#addRestaurant" class="btn btn-secondary mt-1">Ajouter à ma sélection </button>
                    </div>
                  </div>
                `
              );
            });

            // data for markers for map
            const coordinates = [];
            data.forEach((el) => {
              console.log("el", el.image_url);
              const marker = {};
              marker.lat = el.coordinates.latitude;
              marker.lng = el.coordinates.longitude;
              marker.name = el.name;
              marker.image = el.image_url;
              marker.price = el.price || "-";
              marker.rating = el.rating || "-";
              marker.id = el.id || "-";
              coordinates.push(marker);
            });
            console.log("coordinates", coordinates);
            console.log("map", el);
            const bounds = new mapboxgl.LngLatBounds();
            coordinates.forEach((marker) => {
              const popup = new mapboxgl.Popup().setHTML(
                `<div class="card " style="width: 9rem;margin-bottom:5px;">
                  <img class="card-img-top pop-up-image" src=${marker.image} alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">${marker.name}</h5>
                    <p class="card-text">Prix: ${marker.price}</p>
                    <p class="card-text">Note: ${marker.rating}</p>
                  </div>
                  <button data-restaurantId="${marker.id}"  data-action="click->crud-restaurants#addRestaurant" class="btn btn-secondary">Ajouter</button>
                </div>`
              );
              new mapboxgl.Marker()
                .setLngLat([marker.lng, marker.lat])
                .setPopup(popup)
                .addTo(el.map);
              bounds.extend([marker.lng, marker.lat]);
              el.map.fitBounds(bounds, {
                padding: 70,
                maxZoom: 15,
                duration: 0.7,
              });
            });
          }
        });
      })
      .catch(function (error) {
        console.log("Fetch Error:", error);
      });
  }

  postSearchRandom(e) {
    e.preventDefault();
    console.log("in get stimulus submit random");
    const target = this.listTarget;
    const place = this.searchPlace2Target.value;

    // for the map
    const el = this;

    fetch(`/search_random?location=${place}`, { method: "POST" })
      .then(function (response) {
        response.json().then(function (data) {
          target.innerHTML = "";
          if (data === [])
            target.insertAdjacentHTML(
              "beforeend",
              `<h1>Nous n'avons pas de résultats pour votre recherche</h1>`
            );
          data.image_url === ""
            ? (data.image_url =
                "https://eatdrinkplay.com/wp-content/uploads/2015/11/IMG_5077-e1447640039980.jpg")
            : data.image_url;
          target.insertAdjacentHTML(
            "beforeend",
            `
            <div class="card " style="width: 18rem;margin-bottom:20px;">
              <img class="card-img-top card-image" src=${data.image_url} alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">Prix: ${data.price}</p>
                <p class="card-text">Note: ${data.rating}</p>
                <a href="${data.url}" target="blank" class="btn btn-primary">En savoir plus</a>
                <button data-restaurantId="${data.id}"  data-action="click->crud-restaurants#addRestaurant" class="btn btn-secondary mt-1">Ajouter à ma sélection</button>
              </div>
            </div>
          `
          );

          // marker for random restaurant
          const coordinates = [];
          const marker = {};
          marker.lat = data.coordinates.latitude;
          marker.lng = data.coordinates.longitude;
          marker.name = data.name;
          marker.image = data.image_url;
          marker.price = data.price || "-";
          marker.rating = data.rating || "-";
          marker.id = data.id || "-";
          coordinates.push(marker);

          const bounds = new mapboxgl.LngLatBounds();
          coordinates.forEach((marker) => {
            const popup = new mapboxgl.Popup().setHTML(
              `<div class="card " style="width: 9rem;margin-bottom:20px;">
                <img class="card-img-top card-image" src=${marker.image} alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${marker.name}</h5>
                  <p class="card-text">Prix: ${marker.price}</p>
                  <p class="card-text">Note: ${marker.rating}</p>
                </div>
                <button data-restaurantId="${marker.id}"  data-action="click->crud-restaurants#addRestaurant" class="btn btn-secondary mt-1">Ajouter à ma sélection</button>
              </div>`
            );
            new mapboxgl.Marker()
              .setLngLat([marker.lng, marker.lat])
              .setPopup(popup)
              .addTo(el.map);
            bounds.extend([marker.lng, marker.lat]);
            el.map.fitBounds(bounds, {
              padding: 70,
              maxZoom: 15,
              duration: 0.7,
            });
          });
        });
      })
      .catch(function (error) {
        console.log("Fetch Error:", error);
      });
  }
}
