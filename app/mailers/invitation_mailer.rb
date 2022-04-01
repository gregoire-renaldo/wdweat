class InvitationMailer < ApplicationMailer
  def new_invitation_email
    # @selection = params[:selection]


      # guest_email
      puts 'in new_invitation_email'
    mail(to: "gregoire.renaldo@gmail.com", subject: "You got an invitation!")
  end
end
