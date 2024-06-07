class Report {
    constructor(data) {
      this.id = data.id;
      this.operatorId = data.operatorId;
      this.when = data.when;
      this.totalAmount = data.totalAmount;
      this.operatorPercentage = data.operatorPercentage;
      this.splitWithOperator = data.splitWithOperator;
      this.splitAmount = data.splitAmount;
      this.isPaid = data.isPaid;
    }
  }