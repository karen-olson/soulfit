class UsersController < ApplicationController

    def index 
        render json: User.all
    end

    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private 

    def user_params 
        params.permit(:name, :username, :admin, :password, :password_confirmation)
    end
end
