# Node OAuth Demo

Node OAuth Demo is deisgned to get developers up and working with the OAuth Google Strategy in minimal time.
The application is simple a login page that redirects the user to a Google Auth page. Upon accepting the user is
redirected back to the login page, but now their Google profile picture is visible. When one logs out, the picture disapears.

## Installation

Clone this repo.  
Run `yarn install` in the project directory.  
Run `node app.js` in the project directory.  
The server should now be running on port `4444`

## Usage

Navigate to `localhost:4444` and simple click `Login With Google`
This will pop up a Google Authentication page.  You are free to decline their request, but if you do, the demo stops there.
If the user accepts the request, they will be routed back to the 'login' page, and their Google profile image should be visible.  
If it is, congradulations, you loged in with OAuth!  

The user can now test the logout function.  
If the profile image disapears, congradulations, you are logged out!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)