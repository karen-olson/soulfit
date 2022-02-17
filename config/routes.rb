Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  delete "/user_favorited_videos", to: "user_favorited_videos#destroy_by_user_id_and_video_id"
  resources :user_favorited_videos
  resources :user_uploaded_videos, only: [:index, :create, :destroy]
  resources :categories
  resources :users
  resources :videos
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
