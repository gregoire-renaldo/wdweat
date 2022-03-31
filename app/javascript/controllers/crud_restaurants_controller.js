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
    e.preventDefault()
    console.log('in get stimulus submit')
    // const target = this.listTarget

    // const query = this.searchInputTarget.value
    // const place = this.searchPlaceTarget.value

    fetch(`/search?term=${query}&location=${place}`,{ method: "POST",
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
