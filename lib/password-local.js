import Local from 'passport-local'
import { v4 as uuidv4 } from 'uuid';

export const localStrategy = new Local.Strategy(function (
  username,
  password,
  done
) {
  const validPW = process.env.PASSWORD;
  if (password === validPW) {
    return done(null, {user: 'anonymous', userId: uuidv4(), loggedInAt: Date.now()})
  } else {
    return done(null, false, { message: 'Incorrect password' });
  }
})
