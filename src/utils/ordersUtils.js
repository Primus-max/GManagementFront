export function calculateSummary(orders) {
  const ordersSummary = {
      totalAmount: 0,
      cashlessAmount: 0,
      mySalary: 0,
      splitSalary: 0,
  };

  orders.forEach((order) => {
      // Суммируем общую сумму заказов
      ordersSummary.totalAmount += order.amount;

      // Суммируем сумму безналичных заказов
      if (order.isCashless) {
          ordersSummary.cashlessAmount += order.amount;
      }

      // Расчет моей зарплаты и split зарплаты
      if (order.splitOperator !== null && !order.isCancelled) {
          ordersSummary.splitSalary += order.amount * 0.07 / 2;
          ordersSummary.mySalary += order.amount * 0.07 / 2;
      } else {
        if (!order.isCancelled)
          ordersSummary.mySalary += order.amount * 0.07;
      }
  });

  return ordersSummary;
}
