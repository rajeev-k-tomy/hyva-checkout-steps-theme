import useAppContext from '../../../../hook/useAppContext';

export default function useShippingAddressAppContext() {
  const { isLoggedIn } = useAppContext();

  return { isLoggedIn };
}
