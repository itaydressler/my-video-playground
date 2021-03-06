import {model, Model, Schema, Document, PassportLocalModel} from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export interface IBasicUserData {
  id?: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface IUser extends Document, IBasicUserData {

}

const userSchema = new Schema({
  username: String,
  password: String,
  admin: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose);

export const Users = model('User', userSchema) as PassportLocalModel<IUser>;