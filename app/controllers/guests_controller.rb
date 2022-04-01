
class GuestsController < ApplicationController

  def create
    @selection = Selection.find(params[:selection_id])
    @guest = Guest.new(guest_params)
    @guest.selection = @selection
    if @guest.save
      redirect_to selection_path(@selection)
    else
      render 'selections/show'
    end
  end


    def destroy
    @selection = Selection.find(params[:selection_id])
    @guest = Guest.find(params[:id])
    @guest.destroy
    redirect_to selection_path(@selection)
    # redirect_to guests_path
    end



  private

  def guest_params
    params.require(:guest).permit(:name, :email)
  end


end
