//
// This is only a SKELETON file for the 'Circular Buffer' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class CircularBuffer {
  constructor(n) {
    this.buffer = new Array(n);
  }

  write(item) {
    for (const [index, element] of this.buffer.entries()) {
      if (!element) return (this.buffer[index] = item);
    }
  }

  read() {
    for (const [index, element] of this.buffer.entries()) {
      if (element) {
        this.buffer[index] = undefined;
        return element;
      }
    }
    throw new BufferEmptyError('Buffer is empty!');
  }

  forceWrite() {
    throw new Error('Remove this statement and implement this function');
  }

  clear() {
    throw new Error('Remove this statement and implement this function');
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
  constructor() {
    throw new Error('Remove this statement and implement this function');
  }
}

export class BufferEmptyError extends Error {
  constructor(err) {
    super(err);
  }
}
