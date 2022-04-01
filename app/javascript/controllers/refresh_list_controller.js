import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [  "list", "searchInput", "searchPlace","searchPlace2" ]

  connect() {
    console.log(this.element);

    console.log(this.listTarget);
    console.log(this.searchInputTarget);
    console.log(this.searchInputPlace);
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
    const query = this.searchInputTarget.value
    const place = this.searchPlaceTarget.value

    fetch(`/search?term=${query}&location=${place}`,{ method: "POST"})
      .then(function(response) {
        response.json()
        .then(function(data) {
          // console.log(data);
          // console.log(target);
          target.innerHTML = ''
          data.map(obj => {
            obj.image_url === "" ?  obj.image_url = "https://eatdrinkplay.com/wp-content/uploads/2015/11/IMG_5077-e1447640039980.jpg" : obj.image_url
          })
          if (data.length === 0 ) {
            target.insertAdjacentHTML('beforeend',`<h1>Nous n'avons pas de résultats pour votre recherche</h1>`)
          } else {
            data.forEach((element,index) => {

                target.insertAdjacentHTML('beforeend', `
                  <div class="card " style="width: 18rem;margin-bottom:20px;">
                    <img class="card-img-top card-image" src=${element.image_url} alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${element.name}</h5>
                      <p class="card-text">Prix: ${element.price}</p>
                      <p class="card-text">Note: ${element.rating}</p>
                      <a href="${element.url}" target="blank" class="btn btn-primary">En savoir plus</a>
                      <button data-restaurantId="${element.id}"  data-action="click->crud-restaurants#addRestaurant" class="btn btn-secondary">Ajouter à ma sélection de restaurants</button>
                    </div>
                  </div>
                `)
            });
          }
        });
      })
        .catch(function(error) {
          console.log('Fetch Error:', error);
        });
  }

  postSearchRandom(e) {
    e.preventDefault()
    console.log('in get stimulus submit random')
    const target = this.listTarget
    const place = this.searchPlace2Target.value
    fetch(`/search_random?location=${place}`,{ method: "POST",
          // body:JSON.stringify(query)
        })
        .then(function(response) {
        response.json()
        .then(function(data) {
          console.log(data);
          console.log(target);

          target.innerHTML = ''
          if (data === []) target.insertAdjacentHTML('beforeend',`<h1>Nous n'avons pas de résultats pour votre recherche</h1>`)
                // console.log(element)
                target.insertAdjacentHTML('beforeend', `
                  <div class="card " style="width: 18rem;margin-bottom:20px;">
                    <img class="card-img-top card-image" src=${data.image_url} alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${data.name}</h5>
                      <p class="card-text">Prix: ${data.price}</p>
                      <p class="card-text">Note: ${data.rating}</p>
                      <a href="${data.url}" target="blank" class="btn btn-primary">En savoir plus</a>
                      <button data-restaurantId="${data.id}"  data-action="click->crud-restaurants#addRestaurant" class="btn btn-secondary">Ajouter à ma sélection de restaurants</button>
                    </div>
                  </div>
                `)
        });
      })
        .catch(function(error) {
          console.log('Fetch Error:', error);
        });

  }

}
