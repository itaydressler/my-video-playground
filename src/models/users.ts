import {model, Model, Schema, Document, PassportLocalModel} from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  admin: boolean;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.plugin(passportLocalMongoose);

export const Users = model('User', userSchema) as PassportLocalModel<IUser>;