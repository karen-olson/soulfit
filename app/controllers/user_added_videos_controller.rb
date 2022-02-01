class UserAddedVideosController < ApplicationController
    skip_before_action :authorize
    # remove this!!

    def index
        videos = UserAddedVideo.all 
        render json: videos
    end
        
    def create
        video = UserAddedVideo.create!(user_added_video_params)
        render json: video, status: :created
    end

    private

    def user_added_video_params
        params.permit(:id, :video_id, :user_id)
    end
end
