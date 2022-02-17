class UserFavoritedVideo < ApplicationRecord
  belongs_to :video_favorited_by_user, :class_name => "User", :foreign_key => "user_id"
  belongs_to :favorited_video, :class_name => "Video", :foreign_key => "video_id"
end
