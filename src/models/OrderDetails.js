class OrderDetails {
    constructor(data) {
      this.id = data.id;
      this.operator = data.operator;
      this.girl = data.girl;
      this.client = data.client;      
      this.startTime = data.startTime;
      this.finishTime = data.finishTime;
      this.amount = data.amount;
      this.isExtended = data.isExtended;
      this.isCancelled = data.isCancelled;
      this.splitWithOperator = data.splitWithOperator;
      this.comment = data.comment;
    }
  }
  
  export default OrderDetails;
  