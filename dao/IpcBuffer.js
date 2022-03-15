class IpcBuffer {

  constructor(delimiter) {
    this.delimiter = delimiter;
    this.buffer = "";
    this.cursor = -1;
  }

  add(data) {
    const idx = data.lastIndexOf(this.delimiter);
    if (idx != -1) {
      this.cursor = this.buffer.length + idx;
    }
    this.buffer += data;
  }

  take() {
    if (this.cursor > 0) {
      const bufferLen = this.buffer.length;
      if (this.cursor == bufferLen - 1) {
        const result = this.buffer;
        this.buffer = "";
        this.cursor = -1;
        return result;
      }
      const result = this.buffer.substring(0, this.cursor+1);
      this.buffer = this.buffer.substring(this.cursor+1);
      this.cursor = -1;
      return result;
    }
  }

  addAndTake(data) {
    this.add(data);
    return this.take();
  }

}

export {
  IpcBuffer as default,
  IpcBuffer
};
