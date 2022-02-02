class Video < ApplicationRecord
  belongs_to :category

  has_one :user_added_video, dependent: :destroy
  has_one :video_added_by_user, through: :user_added_video

  validates :url, :title, :channel_title, :duration, :youtube_video_id, :category_id, presence: true
end
