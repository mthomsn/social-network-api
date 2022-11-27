const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
