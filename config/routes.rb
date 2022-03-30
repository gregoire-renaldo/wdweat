Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root :to => "pages#home"

   get 'restaurants', to: 'pages#restaurants'
   post '/search', to: 'yelp#search'
   post '/search_random', to: 'yelp#search_random'

end
