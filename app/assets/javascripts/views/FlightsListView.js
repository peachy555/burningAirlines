var App = App || {};

App.FlightsListView = Backbone.View.extend({
  initialize: function(options){
    this.listenTo(App.flights, "change sync", this.render);
  },
  el: "#flightsList",
  render: function(){
    debugger
    var template = _.template($("#flightsListTemplate").html());
    this.$el.html(template(this.collection));
  }
});
