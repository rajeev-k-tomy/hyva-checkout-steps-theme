import { useCartContext } from '../../../../../hooks';

export default function useCouponCodeCartContext() {
  const { cart, applyCouponCode, removeCouponCode } = useCartContext();

  return {
    applyCouponCode,
    removeCouponCode,
    appliedCoupon: cart?.appliedCoupon,
  };
}
