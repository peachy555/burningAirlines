Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "airplanes#app"
  resources :flights, only: [:index, :create, :show]   # For admin (show action for user)
  resources :airplanes, only: [:index, :create]   # For admin
  resources :search, only: [:index] # For user

  # Log in (session related)
  get "login", to: "sessions#new", as: "login"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy", as: "logout"

  # Create user
  get "signup", to: "users#new", as: "signup"
  resources :users, only: [:create]
end
