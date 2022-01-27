class CreateVideos < ActiveRecord::Migration[6.1]
  def change
    create_table :videos do |t|
      t.string :url
      t.string :title
      t.string :content_creator
      t.integer :uploaded_by_user_id
      t.time :duration
      t.integer :likes
      t.integer :dislikes
      t.integer :views
      t.belongs_to :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
