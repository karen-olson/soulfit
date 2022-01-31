class RenameContentCreatorInVideos < ActiveRecord::Migration[6.1]
  def change
    rename_column :videos, :content_creator, :channel_title
  end
end
