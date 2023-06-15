const express = require('express');
const app = express();
const userDetails = require('./data/userDetails.json');

// Route to delete a user detail
app.delete('/api/v1/details/:id', (req, res) => {
  // Get the id of the user to be deleted
  const userId = req.params.id;
  
  // Find the user with the given id
  const user = userDetails.find((user) => user.id === parseInt(userId));
  
  // If the user is found, remove the user object from the userDetails array
  if (user) {
    const index = userDetails.indexOf(user);
    userDetails.splice(index, 1);
    
    // Return a JSON response with a 200 OK status code along with a success message and the deleted user detail
    return res.status(200).json({
      status: 'success',
      message: 'User details deleted successfully',
      data: {
        details: user
      }
    });
  }
  
  // If the user is not found, return a JSON response with a 404 Not Found status code along with an error message
  return res.status(404).json({
    status: 'failed',
    message: 'User not found!'
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


module.exports = app;
