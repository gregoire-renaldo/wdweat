import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "form", "list", "searchInput" ]

  connect() {
    console.log(this.element);
    console.log(this.formTarget);
    console.log(this.listTarget);
    console.log(this.searchInputTarget);
  }
  // yelp is not accepting CORS, so the server has to do the calls,
  // here #search in YelpController
  //  https://tiffnuugen.github.io/the_de_facto_guide_to_using_the_yelp_api

  postSearch(e) {
    e.preventDefault()
    console.log('in get stimulus submit')
    const target = this.listTarget
    // launch loader ?
    target.insertAdjacentHTML('beforeend', `
    <div class="wrapper">
        <span class="circle circle-1"></span>
        <span class="circle circle-2"></span>
        <span class="circle circle-3"></span>
        <span class="circle circle-4"></span>
        <span class="circle circle-5"></span>
        <span class="circle circle-6"></span>
        <span class="circle circle-7"></span>
        <span class="circle circle-8"></span>
        </div>
        `)
    fetch('/search',{ method: "POST",})
      .then(function(response) {
        response.json()
        .then(function(data) {
          console.log(data);
          console.log(target);

          target.innerHTML = ''
          data.forEach(element => {
              // console.log(element)
              target.insertAdjacentHTML('beforeend', `

                <div class="card " style="width: 18rem;margin-bottom:20px;">
                  <img class="card-img-top card-image" src=${element.image_url} alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">Prix: ${element.price}</p>
                    <p class="card-text">Note: ${element.rating}</p>
                    <a href="${element.url}" target="blank" class="btn btn-primary">En savoir plus</a>
                  </div>
                </div>

        `)
          });
        });
      })
        .catch(function(error) {
          console.log('Fetch Error:', error);
        });
  }

}
