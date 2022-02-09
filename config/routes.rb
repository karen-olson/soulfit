Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  resources :user_saved_videos
  resources :user_added_videos, only: [:index, :create, :destroy]
  resources :categories
  resources :users
  resources :videos
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
