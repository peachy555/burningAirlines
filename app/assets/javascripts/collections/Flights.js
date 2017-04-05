var App = App || {};

App.Flights = Backbone.Collection.extend({
  model: App.Flight,
  url: '/flights'
})
