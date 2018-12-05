module.exports = function (server, config = {
  GoogleClientID: '',
  GoogleClientSecret: '',
  GoogleRedirectUri: '',
}) {
  // PASSPORT
  var passport = require('passport')
  server.use(passport.initialize())
  server.use(passport.session())

  let redirectURL

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GoogleClientID,
        clientSecret: config.GoogleClientSecret,
        callbackURL: config.GoogleRedirectUri,
        passReqToCallback: true
      },
      function(req, accessToken, refreshToken, profile, done) {
        let user = {}
        user.id = profile.id
        user.displayName = profile.displayName
        user.picture = profile._json.image.url
        user.google = {}
        user.google.id = profile.id
        user.google.accessToken = accessToken
        user.google.refreshToken = refreshToken
        user.email = profile.emails[0].value
        done(null, user)
      }
    )
  )

  server.use('/api/oauth/google', (req, res, next) => {
    redirectURL = req.headers.referer
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    })(req, res, next)
  })

  server.use('/oauth/complete', (req, res, next) => {
    console.log(req);
    passport.authenticate(
      'google',
      { failWithError: true },
      async (err, user, info) => {
        if (err) {
          return res.status(403).send({ message: err.message })
        }
        if (!user) {
          return res.status(403).send({ message: 'System Error' })
        }

        req.logIn(user, (err) => {
          if (err) {
            return res.send({
              success: false,
              message: JSON.stringify(err)
            })
          } else {
            req.user.updated_at = (new Date()).getTime()
            return res.redirect(redirectURL)
          }
        })
      }
    )(req, res, next)
  })

  server.use('/api/logout', function(req, res, next) {
    req.logout()
    req.session = null
    res.redirect('/')
  })
}
