class RemoveDislikesFromVideos < ActiveRecord::Migration[6.1]
  def change
    remove_column :videos, :dislikes
  end
end
