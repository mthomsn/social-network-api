const { User, Thought } = require('../models');

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No post with that ID' })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new post
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId},
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
  },

  // delete user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: 'User deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  // add a friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
