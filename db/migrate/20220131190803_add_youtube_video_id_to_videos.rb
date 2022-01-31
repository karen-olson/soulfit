class AddYoutubeVideoIdToVideos < ActiveRecord::Migration[6.1]
  def change
    add_column :videos, :youtube_video_id, :string
  end
end
