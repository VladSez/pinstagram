const express = require('express');
const { catchErrors } = require('./handlers/errors');
const img = require('./controllers/imageControllers');
const auth = require('./controllers/authControllers');
const user = require('./controllers/userControllers');

const router = express.Router();

router.get('/', catchErrors(img.recentImages));

router.get('/register', auth.registerForm);
router.post('/register',
  auth.validateRegister,
  catchErrors(auth.register),
  auth.login
);

router.get('/login', auth.loginForm);
router.post('/login', auth.login);

router.get('/logout', auth.logout);

router.get('/user', catchErrors(img.showUser));
router.get('/user/upload', img.imageForm);
router.post('/user/upload',
  img.upload,
  catchErrors(img.resize),
  catchErrors(img.saveImage)
);
router.get('/user/p/:image', catchErrors(img.showImage));

router.get('/user/edit', user.showUserData);
router.post('/user/edit',  catchErrors(user.updateAccount));


module.exports = router;
