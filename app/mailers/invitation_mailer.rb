class InvitationMailer < ApplicationMailer
  def new_invitation_email(emails_array, selection)
    puts 'in controller mailer emails_array'
    puts emails_array
    puts 'in controller mailer, selection'
    @selection_restaurants = Selection.find(selection).restaurants
    puts @selection_restaurants
    emails = emails_array

      # guest_email
      puts 'in new_invitation_email'
    mail(to: "gregoire.renaldo@gmail.com", subject: "You got an invitation!")
  end
end
