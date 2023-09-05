import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID || ' ',
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { id, name, emails, gender } = profile;
    const user = {
      id,
      email: emails?.value,
      firstName: name.givenName,
      lastName: name.familyName,
      gender,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}