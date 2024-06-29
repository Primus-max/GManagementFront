class Order {
  constructor(data) {
    this.id = data.id;
    this.operatorId = data.operatorId;
    this.girlId = data.girlId;
    this.clientId = data.clientId;
    this.shiftId = data.shiftId;
    this.groupId = data.groupId;
    this.startTime = data.startTime;
    this.finishTime = data.finishTime;
    this.amount = data.amount;
    this.isExtended = data.isExtended;
    this.isCancelled = data.isCancelled;
    this.isClientHasLeft = data.isClientHasLeft;
    this.isCashless = data.isCashless;
    this.splitWithOperator = data.splitWithOperator || -1;
    this.comment = data.comment;
  }
}

export default Order;
