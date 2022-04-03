import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["email"]
  // static values = {
  //   "selection": String
  // }


  connect() {

    console.log(this.element);
    console.log(this.element.attributes[2].value);
    console.log(this.emailTargets);
    console.log(this.selectionValue);

  }

  sendEmails() {
    console.log(this.emailTargets)
    const emailsFromClient = this.emailTargets
    const emails = []
    emailsFromClient.forEach((element,index) => {
      emails.push(`${element.innerHTML}`)
    });
    // email-${index}=

    const params_email = emails
    const param_selection = this.element.attributes[2].value
    fetch(`/send_emails_to_guests?guests=${params_email}&selection=${param_selection}`, {method: "POST"})
      .then(function(response) {
        console.log(response) })
      .catch(function(error) {
          console.log('Fetch Error:', error);
        });



  }


}
