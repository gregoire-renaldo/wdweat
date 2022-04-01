class RestaurantsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def new
    @restaurant = Restauant.new
  end

  def create
    # t.string "name"
    # t.string "price"
    # t.integer "rating"
    # t.string "image_url"
    # t.string "url"
    # selection_id

    puts params
    puts params[:id]
    id = params[:id]
    selection_id = params[:selection_id]

    @response =  RestClient.get "https://api.yelp.com/v3/businesses/#{id}",
    {content_type: :json, accept: :json, Authorization: ENV["API_KEY"]}
    puts "@response"

    @restaurants_info = JSON.parse(@response.body)
    puts "@restaurants_info"
    puts @restaurants_info

    @restaurant = Restaurant.new(name: @restaurants_info["name"],price: @restaurants_info["price"],rating: @restaurants_info["rating"], image_url: @restaurants_info["image_url"],url: @restaurants_info["url"], selection_id: 25)
    @restaurant.save

    # thing to do in case of error
  end


  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :price, :rating, :image_url, :url, :selection_id)
  end

end
