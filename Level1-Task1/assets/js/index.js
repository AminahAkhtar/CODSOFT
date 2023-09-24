function sendMail() {
    var params = {
      email: document.getElementById("email").value
    };
  
    const serviceID = "service_f6pes64";
    const templateID = "template_wecl7oa";
  
    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        document.getElementById("email").value = "";
        console.log(res);
        alert("Your Message Sent Successfully");
      })
      .catch((err) => console.log(err));
  }
  
  