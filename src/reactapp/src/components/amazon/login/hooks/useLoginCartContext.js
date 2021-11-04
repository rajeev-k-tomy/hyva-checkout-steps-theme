import useCartContext from '../../../../hook/useCartContext';

export default function useLoginCartContext() {
  const { setEmailOnGuestCart } = useCartContext();

  return { setEmailOnGuestCart };
}
