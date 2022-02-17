class RenameUserSavedVideosToUserFavoritedVideos < ActiveRecord::Migration[6.1]
  def change
    rename_table :user_saved_videos, :user_favorited_videos
  end
end
