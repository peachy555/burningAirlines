var App = App || {};

App.Flights = Backbone.Collection.extend({
  model: flight,
  url: '/flights'
})
