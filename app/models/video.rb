class Video < ApplicationRecord
  belongs_to :category

  has_one :user_uploaded_video, dependent: :destroy
  has_one :video_uploaded_by_user, through: :user_uploaded_video

  has_one :user_favorited_video, dependent: :destroy
  has_one :video_favorited_by_user, through: :user_favorited_video

  validates :url, :title, :channel_title, :duration, :youtube_video_id, :category_id, presence: true
end
