class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :admin, :password_digest

  has_many :user_added_videos
  has_many :user_saved_videos
end
