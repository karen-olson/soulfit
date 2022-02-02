class RemoveUploadedByUserIdFromVideos < ActiveRecord::Migration[6.1]
  def change
    remove_column :videos, :uploaded_by_user_id
  end
end
