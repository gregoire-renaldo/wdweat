require 'rest-client'
require 'json'

class YelpController < ApplicationController
  skip_before_action :verify_authenticity_token #to check

  def search
    puts"params"
    puts params
    puts params[:term]
    term = params[:term]
    location = params[:location]

    @response =  RestClient.get "https://api.yelp.com/v3/businesses/search?term=#{term}&location=#{location}",
    {content_type: :json, accept: :json, Authorization: ENV["API_KEY"]}

    @restaurants_info = JSON.parse(@response.body)["businesses"]

    @markers = []
    @restaurants_info.each do |restaurant|
      @markers << restaurant["coordinates"]
    end

    @markers = @markers.map do |marker|
      {
        lat:marker['latitude'],
        lng:marker['longitude']
      }
    end
    puts "markers"
    puts @markers

    respond_to do |format|
      # format.html # show.html.erb
      format.json {
        if @restaurants_info
          render json: @restaurants_info
        else
          render json: { message: "No business, error: 404" }
        end
      }
    end
  end

  def search_random
    puts"params"
    location = params[:location]
    random_term = ["korean","Italian","Thai","Brasserie", "Indian", "Chinese", "Fromage", "Kebab", "sushis"].sample

    @response =  RestClient.get "https://api.yelp.com/v3/businesses/search?term=#{random_term}&location=#{location}",
    {content_type: :json, accept: :json, Authorization: ENV["API_KEY"]}

    @restaurants_info = JSON.parse(@response.body)["businesses"].sample

    respond_to do |format|
      # format.html # show.html.erb
      format.json {
        if @restaurants_info
          render json: @restaurants_info
        else
          render json: { message: "No business, error: 404" }
        end
      }
    end
  end

end
