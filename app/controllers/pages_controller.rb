require 'rest-client'
require 'json'


class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
  end

  def results
    respond_to do |format|
      format.html
    end
  end

end
