class Video < ApplicationRecord
  belongs_to :category

  validates :url, :title, :content_creator, :uploaded_by_user_id, :duration_in_seconds, :category_id, presence: true
end
