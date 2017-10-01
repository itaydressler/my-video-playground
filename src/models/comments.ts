import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IComment extends Document {
  rating: number;
  comment: string;
  author: string;
}

const commentSchema = new Schema({
  rating:  {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment:  {
    type: String,
    required: true
  },
  author:  {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default commentSchema;