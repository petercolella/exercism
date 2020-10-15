//
// This is only a SKELETON file for the 'Circular Buffer' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class CircularBuffer {
  constructor(n) {
    this.buffer = new Array(n);
    this.oldest = 0;
  }

  write(item) {
    for (let i = this.oldest; i < this.buffer.length; i++) {
      if (!this.buffer[i]) {
        this.buffer[i] = item;
        return;
      }
    }
  }

  read() {
    for (let i = this.oldest; i < this.buffer.length; i++) {
      if (this.buffer[i]) {
        const item = this.buffer[i];
        this.buffer[i] = undefined;
        this.oldest++;
        if (this.oldest >= this.buffer.length) this.oldest = 0;
        return item;
      }
    }
    throw new BufferEmptyError('Buffer is empty!');
  }

  forceWrite() {
    throw new Error('Remove this statement and implement this function');
  }

  clear() {
    for (const [index, element] of this.buffer.entries()) {
      if (element) {
        this.buffer[index] = undefined;
      }
    }
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
