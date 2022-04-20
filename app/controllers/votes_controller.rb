class VotesController < ApplicationController
  skip_before_action :authenticate_user!

  def new
    @vote ==Vote.new
  end

  def create
    @vote = Vote.new(vote_params)
  end

  def update
    
  end
  

private

  def vote_params
    params.require(:vote).permit(:selection_id, :guest_id)
  end
end
