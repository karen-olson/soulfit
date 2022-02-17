class RenameUserAddedVideosToUserUploadedVideos < ActiveRecord::Migration[6.1]
  def change
    rename_table :user_added_videos, :user_uploaded_videos
  end
end
