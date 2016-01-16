class User < ActiveRecord::Base
  def self.from_omniauth(auth_info)
    where(uid: auth_info[:uid]).first_or_create do |new_user|
      new_user.uid                = auth_info.uid
      new_user.name               = auth_info.extra.raw_info.name
      new_user.screen_name        = auth_info.extra.raw_info.screen_name
      new_user.oauth_token        = auth_info.credentials.token
      new_user.oauth_token_secret = auth_info.credentials.secret
    end
  end

  def twitter_service
    @twitter_service ||= TwitterService.new(self).client
  end

  def twitter_user
    @twitter_user ||= twitter_service.user
  end

  def profile_photo
    twitter_user.profile_image_uri_https(:original)
  end

  def name
    twitter_user.name
  end

  def handle
    twitter_user.screen_name
  end
end
