var App = App || {};

App.SeatSelectionView = Backbone.View.extend({
  events: {
    "click #reservationSubmit": "select"
  },
  el: "#seatSelection",
  render: function() {
    this.$el.html($("#seatSelectionTemplate").html());
    var view = new App.FlightSearchView({collection: this.collection});
    view.render();
  },
  select: function() {
    
    // create reservation
  }
})
