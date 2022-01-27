class VideosController < ApplicationController

    def index
        videos = Video.all
        render json: videos
    end

    def show
        video = find_video 
        render json: video
    end

    def create
        video = Video.create!(video_params)
        render json: video, status: :created
    end

    def update
        video = find_video
        video.update!(video_params)
        render json: video, status: :accepted
    end

    def destroy
        video = find_video
        video.destroy
        head :no_content
    end

    private 

    def find_video
        Video.find(params[:id])
    end

    def video_params
        params.permit(:id, :url, :title, :content_creator, :uploaded_by_user_id, :duration_in_seconds, :likes, :dislikes, :views, :category_id)
    end
end
