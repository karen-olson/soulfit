class RemoveDurationColumnFromVideos < ActiveRecord::Migration[6.1]
  def change
    remove_column :videos, :duration
  end
end
