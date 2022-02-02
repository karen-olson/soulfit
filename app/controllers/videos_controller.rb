class VideosController < ApplicationController
    # remove this later
    skip_before_action :authorize, only: :index

    def index
        videos = Video.all
        render json: videos
    end

    def show
        video = find_video 
        render json: video
    end

    def create
        if session[:user_id]
            current_user = User.find(session[:user_id])
            video = current_user.added_videos.create!(video_params)
            byebug
        else
            video = Video.create!(video_params)
        end
        byebug
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
        params.permit(:id, :url, :title, :channel_title, :likes, :views, :category_id, :created_at, :updated_at, :duration, :published_at, :youtube_video_id, :description, :thumbnail_url)
    end
end
