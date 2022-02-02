class User < ApplicationRecord
    has_secure_password

    has_many :user_added_videos, dependent: :destroy
    has_many :added_videos, through: :user_added_videos

    ##### need to alias "videos" after the second association between user and video is added

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true

    def self.youtube_api_key
        puts ENV["YOUTUBE_API_KEY"]
    end
end
