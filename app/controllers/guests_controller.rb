
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
      selection = params[:selection]
      puts 'guest'
      guests = params[:guests]
      puts guests
      # " Email: kkni@mail.com,Email: gregoire.renaldo@gmail.com"
      puts guests.class
      array = guests.split(',')
      email_array = []
      array.each do |pair|
        email_array << pair.split(':')[1].strip
      end
      puts email_array

      # InvitationMailer.with(invitation: @invitation).new_invitation_email.deliver_now
      # InvitationMailer.new_invitation_email(email, selection).deliver_now
      email_array.each do |guest|
        InvitationMailer.new_invitation_email(guest, selection).deliver_now
      end

    end

  private

  def guest_params
    params.require(:guest).permit(:name, :email)
  end


end
