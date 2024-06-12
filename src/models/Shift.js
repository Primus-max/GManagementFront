class Shift {
  constructor(data) {
      this.id = data.id;
      this.start = data.start;
      this.end = data.end;
      this.isClosed = data.isClosed;
      this.groupId = data.groupId;
      this.employeeType = data.employeeType;
      this.employeeId = data.employeeId;
  }
}

export default Shift