import { useContext } from 'react';
import ShippingAddressFormikContext from '../context/ShippingAddressFormikContext';

export default function useShippingAddressFormContext() {
  return useContext(ShippingAddressFormikContext);
}
