/* eslint-disable no-unused-vars */
//
// This is only a SKELETON file for the 'Bob' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const hey = message => {
  //
  // YOUR CODE GOES HERE
  //
  if (message === message.toUpperCase() && message.includes('?')) {
    return "Calm down, I know what I'm doing!";
  } else if (!/[a-z]/.test(message)) {
    return 'Whoa, chill out!';
  } else if (message.includes('?')) {
    return 'Sure.';
  } else if (message === null || message === undefined) {
    return 'Fine. Be that way!';
  } else {
    return 'Whatever.';
  }
};
