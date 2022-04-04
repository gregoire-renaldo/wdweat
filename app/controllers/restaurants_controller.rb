class RestaurantsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def new
    @restaurant = Restauant.new
  end

  def create
    id = params[:id]
    puts params[:selection_id]
    selection_id =  params[:selection_id]
    @response =  RestClient.get "https://api.yelp.com/v3/businesses/#{id}",
    {content_type: :json, accept: :json, Authorization: ENV["API_KEY"]}

    @restaurants_info = JSON.parse(@response.body)
    @restaurant = Restaurant.new(name: @restaurants_info["name"],price: @restaurants_info["price"],rating: @restaurants_info["rating"], image_url: @restaurants_info["image_url"],url: @restaurants_info["url"], selection_id: selection_id)
    @restaurant.save
  end

  def destroy
    @restaurant = Restaurant.find(params[:id])
    @restaurant.destroy
    selection = params[:selection_id]
    redirect_to selection_path(selection)
  end

  def score
    restaurant = Restaurant.find(params[:restaurant_id])
    selection = params[:selection_id]
    if params[:vote] == 'increment'
      score = restaurant.score + 1
      restaurant.update(score: score)
    elsif params[:vote] == 'decrement'
      score = restaurant.score - 1
      restaurant.update(score: score)
    end
    redirect_to selection_path(selection)
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :price, :rating, :image_url, :url, :selection_id, :score)
  end

end
