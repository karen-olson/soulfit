class RenameDurationInSecondsInVideos < ActiveRecord::Migration[6.1]
  def change
    rename_column :videos, :duration_in_seconds, :duration
  end
end
