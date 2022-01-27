class VideoSerializer < ActiveModel::Serializer
  attributes :id, :url, :title, :content_creator, :uploaded_by_user_id, :duration_in_seconds, :likes, :dislikes, :views
  has_one :category
end
