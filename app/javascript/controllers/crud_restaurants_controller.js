import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [  ]

  connect() {
  }

  addRestaurant(e) {
    
    e.preventDefault()
    const queryString = window.location.search;
    console.log('queryString',queryString)
    const urlParams = new URLSearchParams(queryString);
    const selection_id = urlParams.get('selection_id')
    console.log(selection_id);
    const restaurantId = e.target.dataset.restaurantid
    console.log(restaurantId)
    fetch(`/restaurants?id=${restaurantId}&selection_id=${selection_id}`,{ method: "POST",
        }).then(alert('restaurant ajouté'))
        .catch(function(error) {
          console.log('Fetch Error:', error);
        });
  }


}
