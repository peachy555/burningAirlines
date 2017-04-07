Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "flights#search"
  get "/search", to: "flights#search", as: "search_flight"
  resources :flights, only: [:index, :create]   # For admin (show action for user)
  get "flights/admin", to: "flights#admin", as: "flights_admin"
  resources :airplanes, only: [:index, :create]   # For admin
  get "airplanes/admin", to: "airplanes#admin", as: "airplanes_admin"
  resources :reservations, only: [:index, :create]
  resources :search, only: [:index] # For user

  # Log in (session related)
  get "login", to: "sessions#new", as: "login"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy", as: "logout"

  # Create user
  get "signup", to: "users#new", as: "signup"
  resources :users, only: [:create, :show]
end
