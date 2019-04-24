/* eslint-disable no-unused-vars */
//
// This is only a SKELETON file for the 'Bob' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const hey = message => {
  //
  // YOUR CODE GOES HERE
  //
  if (
    !/[a-z]/.test(message) &&
    /[A-Z]/.test(message) &&
    message.charAt(message.length - 1) === '?'
  ) {
    return "Calm down, I know what I'm doing!";
  } else if (!/[a-z]/.test(message) && /[A-Z]/.test(message)) {
    return 'Whoa, chill out!';
  } else if (message.charAt(message.trim().length - 1) === '?') {
    return 'Sure.';
  } else if (!message || !/\S/.test(message)) {
    return 'Fine. Be that way!';
  } else {
    return 'Whatever.';
  }
};
