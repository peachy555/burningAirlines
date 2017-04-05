var App = App || {};

App.SeatSelectionView = Backbone.View.extend({
  initialize: function(options){
    this.listenTo(App.reservations, "change sync", this.render);
  },
  events: {
    "click .seats": "select",
    "click #reservationSubmit": "reservationSubmit"
  },
  el: "#seatSelection",
  render: function() {
    console.log("rendering seatSelection");
    _.each(this.collection.models, function(reservation) {
      seatDivID = "#" + reservation.attributes.seat_row + "-" + reservation.attributes.seat_col;
      $(seatDivID).css( "backgroundColor", "red" );
    })
  },
  select: function() {
    debugger
    // create reservation
  }
})
