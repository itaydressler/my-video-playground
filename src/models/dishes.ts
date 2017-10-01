import commentSchema, {IComment} from './comments';
import {model, Model, Schema, Document} from 'mongoose';

export interface IDish extends Document {
  name: string;
  image: string;
  category: string;
  label: string;
  description: string;
  comments:[IComment];
}

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true,
    default: ""
  },
  description: {
    type: String,
  },
  comments:[commentSchema]
}, {
  timestamps: true
});

export const Dishes : Model<IDish> = model('Dish', dishSchema);