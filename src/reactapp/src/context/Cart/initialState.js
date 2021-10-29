import LocalStorage from '../../utils/localStorage';

const selectedShippingAddress = LocalStorage.getCustomerShippingAddressId();

const initialState = {
  errors: false,
  order: {},
  cart: {
    loaded: false,
    email: null,
    id: null,
    billing_address: null,
    shipping_address: {},
    selected_shipping_address: selectedShippingAddress || '',
    shipping_methods: {},
    selected_shipping_method: {},
    items: {},
    available_payment_methods: {},
    selected_payment_method: { code: '', title: '' },
    applied_coupons: null,
    prices: {
      discounts: [],
      discountLabel: '',
      discountAmount: 0,
      hasDiscounts: false,
      subTotal: '',
      subTotalAmount: 0,
      grandTotal: '',
      grandTotalAmount: 0,
    },
    is_virtual: false,
  },
};

export default initialState;
