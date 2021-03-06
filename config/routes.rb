Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'pages#home'

  get 'results', to: 'pages#results'
  post '/search', to: 'yelp#search'
  post '/search_random', to: 'yelp#search_random'

  resources :selections, only: %i[new create edit update]
  resources :selections, only: %i[index show destroy] do
    resources :guests, only: [:create]
  end

  post 'send_emails_to_guests', to: 'guests#send_emails_to_guests'
  resources :guests, only: [:destroy]

  resources :votes, only: %i[new create update]

  resources :restaurants do
    put 'score', to: 'restaurants#score'
  end

end
