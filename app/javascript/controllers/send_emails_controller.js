import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["email","button"];

  connect() {
  }

  sendEmails() {
    console.log(this.emailTargets);
    const button = this.buttonTarget
    const emailsFromClient = this.emailTargets;
    const emails = [];
    emailsFromClient.forEach((element) => {
      emails.push(`${element.innerHTML}`);
    });
    const params_email = emails;
    const param_selection = this.element.attributes[2].value;
    fetch(
      `/send_emails_to_guests?guests=${params_email}&selection=${param_selection}`,
      { method: "POST" })
      .then(function (response) {
        button.disabled = true
        button.value = "Invitations envoyées"
        alert('emails envoyés !')
        console.log(response);
      })
      .catch(function (error) {
        console.log("Fetch Error:", error);
      });
  }
}
