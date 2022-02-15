class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :admin

  has_many :added_videos, through: :user_added_videos
  has_many :saved_videos, through: :user_saved_videos
end
