import crypto from 'crypto';

export class UserCredentialsModel {
  readonly id?: string;
  readonly username: string;
  readonly password?: string;

  constructor(builder: Partial<UserCredentialsModel>) {
    let data;
    if( builder ) {
      data = {
        username: builder.username,
        password: builder.password,
      };
    }
    Object.assign(this, builder);
  }
}
