class UserAddedVideosController < ApplicationController
    skip_before_action :authorize
    # remove this!!

    def index
        user_added_videos = UserAddedVideo.all
        render json: user_added_videos
    end
        
    def create

    end
end
