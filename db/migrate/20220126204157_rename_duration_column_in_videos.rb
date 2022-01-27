class RenameDurationColumnInVideos < ActiveRecord::Migration[6.1]
  def change
    rename_column :videos, :duration, :duration_in_seconds
  end
end
