class InvitationMailer < ApplicationMailer
  def new_invitation_email(email, selection)
    puts email
    @selection = Selection.find(selection)
    puts '@selection'
    puts @selection
    @selection_restaurants = @selection.restaurants
    puts @selection_restaurants

    # guest_email
    puts 'in new_invitation_email'
    mail(to: email, subject: "Voici une sélection de restaux ")
  end
end
