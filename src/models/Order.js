class Order {
  constructor(data) {
    this.id = data.id;
    this.operatorId = data.operatorId;
    this.girlId = data.girlId;
    this.clientId = data.clientId;
    this.shiftId = data.shiftId;
    this.startTime = data.startTime;
    this.finishTime = data.finishTime;
    this.amount = data.amount;
    this.isExtended = data.isExtended;
    this.isCancelled = data.isCancelled;
    this.isCashless = data.isCashless;
    this.splitWithOperator = data.splitWithOperator;
    this.comment = data.comment;
  }
}

export default Order;
