class Video < ApplicationRecord
  belongs_to :category

  validates :url, :title, :channel_title, :duration, :youtube_video_id, :thumbnail_url, :category_id, presence: true
end
