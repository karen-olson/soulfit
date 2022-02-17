class UserUploadedVideo < ApplicationRecord
  belongs_to :video_uploaded_by_user, :class_name => "User", :foreign_key => "user_id"
  belongs_to :uploaded_video, :class_name => "Video", :foreign_key => "video_id"
end
