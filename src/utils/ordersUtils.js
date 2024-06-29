export function calculateSummary(orders) {
  const ordersSummary = {
    totalAmount: 0,
    cashlessAmount: 0,
    mySalary: 0,
    splitSalary: 0,
  };

  orders.forEach((order) => {
    // Суммируем общую сумму заказов
    if (!order.isCancelled && !order.isClientHasLeft)
      ordersSummary.totalAmount += order.amount;

    // Суммируем сумму безналичных заказов
    if (order.isCashless && !order.isCancelled && !order.isClientHasLeft) {
      ordersSummary.cashlessAmount += order.amount;
    }

    // Расчет моей зарплаты и split зарплаты
    if (
      order.splitOperator !== null &&
      !order.isCancelled &&
      !order.isClientHasLeft
    ) {
      ordersSummary.splitSalary += (order.amount * 0.07) / 2;
      ordersSummary.mySalary += (order.amount * 0.07) / 2;
    } else {
      if (!order.isCancelled && !order.isClientHasLeft && !order.isCancelled)
        ordersSummary.mySalary += order.amount * 0.07;
    }
  });

  return ordersSummary;
}
