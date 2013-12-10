define(['durandal/app', 'durandal/system', 'messageBox'], function(app, system, MessageBox) {
  return {
    items: ko.observableArray([
      { item: 'fruity pebbles', price: 4.5, quantity: 1 },
      { item: 'captain crunch', price: 3.5, quantity: 1 },
      { item: 'honey bunches of oats', price: 4, quantity: 1 }
    ]),
    showMessage: function(item) {
      var msg = 'your purchasing' + item.name;
      var mb = new MessageBox(msg)
      app.showModal(mb).then(function(dialogResult){
        system.log('dialogResult:', dialogResult);
      });
    }
  };
});