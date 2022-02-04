class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :admin, :password_digest
  has_many :added_videos, serializer: AddedVideosSerializer
end
