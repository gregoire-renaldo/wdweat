import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [  ]

  connect() {
    console.log(this.element)
  }

  votePlus(e) {
    e.preventDefault()
    console.log('etarget', e.target.dataset)
    const restaurantId = e.target.dataset.restaurantid
    console.log(restaurantId)
    fetch(`/restaurant/score?id=${restaurantId}`,{ method: "POST",})
      .then(alert('vote effectué'))
      .catch(function(error) {
        console.log('Fetch Error:', error);
      });

  }


}
