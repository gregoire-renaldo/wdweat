import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [  "email"]

  connect() {
    console.log(this.element);

    console.log(this.emailTargets);


  }

  sendEmails() {
    console.log(this.emailTargets)
    const emailsFromClient = this.emailTargets
    const emails = []
    emailsFromClient.forEach(element => {
      emails.push(element.innerHTML)
    });
    const params = emails.join('&')
    console.log("emails", emails.join('&'))
    fetch(`/send_emails_to_guests?${params}`, {method: "POST"})
      .then(function(response) {
        response.json() })
      .catch(function(error) {
          console.log('Fetch Error:', error);
        });



  }


}
