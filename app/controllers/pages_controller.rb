require 'rest-client'
require 'dotenv'
require 'json'
# Dotenv.load

class PagesController < ApplicationController
  def home
  end

  def restaurants
    # @response =  RestClient.get "https://api.yelp.com/v3/businesses/search?term=brasserie&location=bordeaux",
    # {content_type: :json, accept: :json, Authorization: ENV["API_KEY"]}

    # @city_info = JSON.parse(@response.body)["businesses"][0]

    respond_to do |format|
      format.html # show.html.erb
      # format.json {
      #   if @city_info
      #     #  @cuisines = RestClient.get "https://developers.zomato.com/api/v2.1/cuisines?city_id=#{@city_info["id"]}",
      #     #  {content_type: :json, accept: :json, "user-key": ENV["API_KEY"]}
      #     #  @city_info["cuisines"] = JSON.parse(@cuisines.body)["cuisines"]
      #     render json: @city_info
      #   else
      #     render json: { message: "No business, error: 404" }
      #   end
      # }
    end
  end
end
