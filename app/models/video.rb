class Video < ApplicationRecord
  belongs_to :category

  has_one :user_added_video
  has_one :video_added_by, through: :user_added_video

  validates :url, :title, :channel_title, :duration, :youtube_video_id, :thumbnail_url, :category_id, presence: true
end
