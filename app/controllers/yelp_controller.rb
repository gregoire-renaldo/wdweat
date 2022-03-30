require 'rest-client'
require 'dotenv'
require 'json'

class YelpController < ApplicationController
  skip_before_action :verify_authenticity_token #to check

  def search

    puts"params"
    puts params
    puts params[:term]
    term = params[:term]
    @response =  RestClient.get "https://api.yelp.com/v3/businesses/search?term=#{term}&location=bordeaux",
    {content_type: :json, accept: :json, Authorization: ENV["API_KEY"]}

    @restaurants_info = JSON.parse(@response.body)["businesses"]

    respond_to do |format|
      # format.html # show.html.erb
      format.json {
        if @restaurants_info
          #  @cuisines = RestClient.get "https://developers.zomato.com/api/v2.1/cuisines?restaurants_id=#{@restaurants_info["id"]}",
          #  {content_type: :json, accept: :json, "user-key": ENV["API_KEY"]}
          #  @restaurants_info["cuisines"] = JSON.parse(@cuisines.body)["cuisines"]
          render json: @restaurants_info
        else
          render json: { message: "No business, error: 404" }
        end
      }
    end
  end

end


  #  def search
  #   res = Faraday.get("https://api.yelp.com/v3/businesses/search") do |req|
  #     req.headers['Authorization'] = "#{ENV['API_KEY']}"
  #     req.params['categories'] = 'food,restaurants'
  #     # req.params['term'] = params[:term]
  #     # req.params['location'] = params[:location]
  #   end
  #   @search_results = JSON.parse(res.body)
  #   # render json: search_results
  #   # render json: {message: "hello json", error: 404}

  #   respond_to do |format|
  #     format.json {
  #       render json: @search_results
  #     }
  #   end

  # end
