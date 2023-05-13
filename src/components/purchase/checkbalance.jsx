import { fetcher, updater } from '../api/api_utils';

export const PurchaseConfirmation = async (userId, purchasingPrice) => {
  const userBalance = await fetcher(`/api/users/${userId}`, fetcher);

  if (userBalance && userBalance.accbalance >= purchasingPrice) {
    const results = await updater(`/api/users/${userId}`, {
      accbalance: userBalance.accbalance - purchasingPrice,
    });
    if (results) {
      return { message: 'Payment was successful', payment: true };
    } else {
      return { message: 'Payment failed', payment: false };
    }
  } else if (userBalance && userBalance.accbalance < purchasingPrice) {
    return {
      message: 'Your account balance is insufficient to make this purchase',
      payment: false,
    };
  }
};
