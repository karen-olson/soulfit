class UserUploadedVideosController < ApplicationController
    skip_before_action :authorize
    # remove this!!

    def index
        videos = UserUploadedVideo.all 
        render json: videos
    end
        
    def create
        video = UserUploadedVideo.create!(user_uploaded_video_params)
        render json: video, status: :created
    end

    def destroy
        video = UserUploadedVideo.find(params[:id])
        video.destroy
        head: :no_content
    end

    private

    def user_uploaded_video_params
        params.permit(:id, :video_id, :user_id)
    end
end
