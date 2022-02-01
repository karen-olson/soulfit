class UserAddedVideo < ApplicationRecord
  belongs_to :video_added_by_user, :class_name => "User", :foreign_key => "user_id"
  belongs_to :added_video, :class_name => "Video", :foreign_key => "video_id"
end
