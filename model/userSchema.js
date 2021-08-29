const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Login-Service', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
})
  .then(() => console.log('DB connection successful!'));

  const userSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        unique: true,
        required: true
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phoneNo: {
        type: Number,
      },
      password: {
        type: String
      }
    },
    {
      timestamps: {
        createdAt: true,
        updatedAt: true,
      },
    },
    {
      collection: 'Users Table'
    }
  );
  
  const userModel = mongoose.model('Users Table', userSchema, 'Users Table');
  
  module.exports = userModel;