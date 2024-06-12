class Shift {
  constructor(data) {
      this.id;
      this.start = data.start;
      this.end = data.end;
      this.isClosed = data.isClosed;
      this.groupId = data.groupId;      
      this.operatorId = data.id;
  }
}

export default Shift