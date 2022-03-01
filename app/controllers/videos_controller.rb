class VideosController < ApplicationController
    before_action :find_video, only: [:show, :update, :destroy]

    def index
        videos = Video.all
        render json: videos
    end

    def show
        render json: @video
    end

    def create
        if session[:user_id]
            current_user = User.find(session[:user_id])
            video = current_user.uploaded_videos.create!(video_params)
        else
            video = Video.create!(video_params)
        end
        render json: video, status: :created
    end

    def update
        @video.update!(video_params)
        render json: @video, status: :accepted
    end

    def destroy
        @video.destroy
        head :no_content
    end

    private 

    def find_video
        @video = Video.find(params[:id])
    end

    def video_params
        params.permit(:id, :url, :title, :channel_title, :likes, :views, :category_id, :created_at, :updated_at, :duration, :published_at, :youtube_video_id, :description, :thumbnail_url)
    end
end
