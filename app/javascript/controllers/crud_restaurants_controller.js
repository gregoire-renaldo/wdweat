import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [  ]

  connect() {
    // console.log(this.element);
    // console.log(this.listTarget);
    // console.log(this.searchInputTarget);
    // console.log(this.searchInputPlace);
  }

  // create a restaurant, from front, to action in restaurant controller

  addRestaurant(e) {
    console.log('stimulus addRestaurant')
    console.log(e.target)
    e.preventDefault()
    const queryString = window.location.search;
    console.log('queryString',queryString)
    const urlParams = new URLSearchParams(queryString);
    const selection_id = urlParams.get('selection_id')
    console.log(selection_id);

    // const place = this.searchPlaceTarget.value
    const restaurantId = e.target.dataset.restaurantid
    console.log(restaurantId)
    fetch(`/restaurants?id=${restaurantId}&selection_id=${selection_id}`,{ method: "POST",
          // body:JSON.stringify(query)
        }).then(function(response) {
        response.json()
        .then(function(data) {
          console.log(data);


        });
      })
        .catch(function(error) {
          console.log('Fetch Error:', error);
        });
  }


}
