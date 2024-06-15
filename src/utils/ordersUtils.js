export function calculateSummary(orders) {
    const ordersSummary = {
      totalAmount: 0,
      cashlessAmount: 0,
      mySalary: 0,
      splitSalary: 0,
    };
  
    orders.forEach((order) => {
      ordersSummary.totalAmount += order.amount;
      if (order.isCashless) {
        ordersSummary.cashlessAmount += order.amount;
      }
      if (order.operatorId !== null) {
        ordersSummary.mySalary += order.amount * 0.07; 
      } else {
        ordersSummary.splitSalary += order.amount * 0.07 / 2; 
      }
    });
  
    return ordersSummary;
  }
  