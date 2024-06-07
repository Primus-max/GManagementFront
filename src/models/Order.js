class Order {
    constructor(data) {
      this.id = data.id;
      this.operatorId = data.operatorId;
      this.girlId = data.girlId;
      this.clientId = data.clientId;
      this.shiftId = data.shiftId;     
      this.totalTime = data.totalTime;
      this.amount = data.amount;
      this.isExtended = data.isExtended;
      this.isCancelled = data.isCancelled;
      this.splitWithOperator = data.splitWithOperator;
      this.comment = data.comment;
    }
  }