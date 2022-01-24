Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
