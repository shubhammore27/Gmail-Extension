var tempArray = ["password", "creds"];

InboxSDK.load(2, "sdk_09876_75dca01832").then((sdk) => {
  sdk.Compose.registerComposeViewHandler((composeView) => {
    var temp = composeView.addComposeNotice({
      body: "Please double-check your email before sending it.",
      color: "red", // You can specify the color of the notice (optional)
      duration: 5000, // The duration in milliseconds the notice should be displayed (optional)
    });

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
