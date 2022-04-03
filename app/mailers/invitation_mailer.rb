class InvitationMailer < ApplicationMailer
  def new_invitation_email(email, selection)
    @selection_restaurants = Selection.find(selection).restaurants
    puts @selection_restaurants
    # guest_email
    puts 'in new_invitation_email'
    mail(to: email, subject: "You got an invitation! ")
  end
end
