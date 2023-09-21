var tempArray = ["password", "creds"];

InboxSDK.load(2, "sdk_09876_75dca01832").then((sdk) => {
  var updatedText = [] ;

  sdk.Compose.registerComposeViewHandler((composeView) => {




    var temp = composeView.addComposeNotice({
      body: "Please double-check your email before sending it.",
      color: "red", // You can specify the color of the notice (optional)
      duration: 5000, // The duration in milliseconds the notice should be displayed (optional)
    });


    composeView.on('bodyChanged', function(event) {
      let data  = composeView.getHTMLContent();
      console.log(data);
      emailBody = highlightSensitiveText(data);
      console.log(emailBody);
  
      });
  
      composeView.on('presending', function(event) {
     
      // Set the modified body as the new email body content
      composeView.setBodyHTML(emailBody);
      });
  
      
      composeView.on('destroy', function(event) {
     
      });
   

    function highlightSensitiveText(emailBody) {
      // Replace sensitive keywords with highlighted HTML
      var sensitiveKeywords = ["password","security" ,"ATM pin","pin","credit card", "confidential"];
     
      
      sensitiveKeywords.forEach(function(keyword) {
      var regex = new RegExp(keyword, 'gi');
  
      if (regex.test(emailBody) && !updatedText.includes(keyword)) {
        updatedText.push(keyword);
        emailBody = emailBody.replace(regex, '<span><font color=\"#ffd966\"><font color=\"#f1c232\">$&</font></font></span><font color=\"#000000\">&nbsp</font>');
        keywordsFound = true;
        sdk.Compose.registerComposeViewHandler(function(composeView) {
          composeView.setBodyHTML('');
          composeView.insertHTMLIntoBodyAtCursor(emailBody);
          
        });
      }
    });
  
    console.log(emailBody)
    return emailBody;
    }
  
  

    composeView.addButton({
      title: "Add info footer",
      iconUrl: chrome.extension.getURL("/") + "images/logo.png",
      onClick(event) {
        event.composeView.insertTextIntoBodyAtCursor(`
        Shubham More,
        Software Engineer
        Kanaka Software,
        Pune
        Mob: 9595130613
        `);
      },
    });
  });
});
