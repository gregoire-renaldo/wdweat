class InvitationMailer < ApplicationMailer
  def new_invitation_email
    @selection = params[:selection]


      # guest_email
    mail(to: "gregoire.renaldo@gmail.com", subject: "You got a new order!")
  end
end
