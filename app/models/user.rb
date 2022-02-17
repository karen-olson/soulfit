class User < ApplicationRecord
    has_secure_password

    has_many :user_uploaded_videos, dependent: :destroy
    has_many :uploaded_videos, through: :user_uploaded_videos

    has_many :user_favorited_videos, dependent: :destroy 
    has_many :favorited_videos, through: :user_favorited_videos


    validates :username, presence: true, uniqueness: true
    validates :password, presence: true

    def self.youtube_api_key
        puts ENV["YOUTUBE_API_KEY"]
    end
end
