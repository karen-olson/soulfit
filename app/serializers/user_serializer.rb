class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :admin, :password_digest
end
