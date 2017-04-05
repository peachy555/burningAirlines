var App = App || {};

App.Reservations = Backbone.Collection.extend({
  model: App.Reservation,
  url: '/reservations'
})
