class PagesController < ApplicationController
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
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.save
    # thing to do in case of error
  end


  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :price, :rating, :image_url, :url, :selection_id)
  end

end
