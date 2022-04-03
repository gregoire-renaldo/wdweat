class RestaurantsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def new
    @restaurant = Restauant.new
  end

  def create
    # créer un dossier service,  avec les methodes RestClient ?
    id = params[:id]
    puts params[:selection_id]
    selection_id =  params[:selection_id]
    @response =  RestClient.get "https://api.yelp.com/v3/businesses/#{id}",
    {content_type: :json, accept: :json, Authorization: ENV["API_KEY"]}

    @restaurants_info = JSON.parse(@response.body)
    @restaurant = Restaurant.new(name: @restaurants_info["name"],price: @restaurants_info["price"],rating: @restaurants_info["rating"], image_url: @restaurants_info["image_url"],url: @restaurants_info["url"], selection_id: selection_id)
    @restaurant.save
    # thing to do in case of error
  end

  def destroy
    @restaurant = Restaurant.find(params[:id])
    @restaurant.destroy
    puts params
    selection = params[:selection_id]

    # no need for app/views/restaurants/destroy.html.erb
    redirect_to selection_path(selection)
  end

  def score
    puts 'in score'
    puts params[:id]
    restaurant = Restaurant.find(params[:id]).vote
    restaurant.save
    r.save
  end


  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :price, :rating, :image_url, :url, :selection_id, :score)
  end

end
