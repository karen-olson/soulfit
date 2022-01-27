class AddImageUrlToCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :img_url, :string
  end
end
