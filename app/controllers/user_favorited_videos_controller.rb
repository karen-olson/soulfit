class UserFavoritedVideosController < ApplicationController

    def index
        videos = UserFavoritedVideo.all 
        render json: videos
    end
        
    def create
        video = UserFavoritedVideo.create!(user_favorited_video_params)
        render json: video, status: :created
    end

    def destroy_by_user_id_and_video_id
        UserFavoritedVideo.destroy_by(user_id: params[:user_id], video_id: params[:video_id])
        head :no_content
    end

    private

    def user_favorited_video_params
        params.permit(:id, :video_id, :user_id)
    end
end
