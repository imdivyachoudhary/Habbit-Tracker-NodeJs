var showNotification = (type,message) => {
    new Noty({
        theme: "relax",
        text: message,
        type: type,
        layout: "topRight",
        timeout: 3000,
      }).show();
}
