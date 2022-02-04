class UserSavedVideosController < ApplicationController
    skip_before_action :authorize
    # remove this!!

    def index
        videos = UserSavedVideo.all 
        render json: videos
    end
        
    def create
        video = UserSavedVideo.create!(user_saved_video_params)
        render json: video, status: :created
    end

    def destroy
        video = UserSavedVideo.find(params[:id])
        video.destroy
        head: :no_content
    end

    private

    def user_saved_video_params
        params.permit(:id, :video_id, :user_id)
    end
end
