class VideoSerializer < ActiveModel::Serializer
  attributes :id, :url, :title, :channel_title, :uploaded_by_user_id, :likes, :views, :category_id, :created_at, :updated_at, :duration, :published_at, :youtube_video_id, :description, :thumbnail_url
  has_one :category
end
