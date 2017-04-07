var App = App || {};

App.FlightsListView = Backbone.View.extend({
  events: {
    "click .flight_item": "showSeats"
  },

  initialize: function(options){
    // this.listenTo(App.flights, "change sync", this.render);
  },

  el: "#flightsList",

  render: function(){
    currSelectedSeat = '';
    lastSelectedSeat = '';
    var template = _.template($("#flightsListTemplate").html());
    this.$el.html(template(this.collection));
  },

  showSeats: function(event) {
    if(App.seatView !== undefined){
      App.seatView.remove();
    }
    App.seatView = new App.SeatSelectionView({flightID: $(event.target.parentElement).attr("id")});
    App.seatView.render();
  }
});
