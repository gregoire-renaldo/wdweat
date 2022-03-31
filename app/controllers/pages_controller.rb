require 'rest-client'
# require 'dotenv'
require 'json'
# Dotenv.load

class PagesController < ApplicationController
  def home
  end

  def results
    respond_to do |format|
      format.html
    end
  end

end
