class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true

    # Add custom method to find all videos a user uploaded. Add this to user serializer (and controller?)
    # def uploaded_videos
        
    # end
end
