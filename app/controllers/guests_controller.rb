
class GuestsController < ApplicationController
  skip_before_action :verify_authenticity_token

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

    def send_emails_to_guests
      puts params
      restaurants = params[:restaurants]
      guest = params[:guests]

      # InvitationMailer.with(invitation: @invitation).new_invitation_email.deliver_now
      InvitationMailer.new_invitation_email.deliver_now
    end

  private

  def guest_params
    params.require(:guest).permit(:name, :email)
  end


end
