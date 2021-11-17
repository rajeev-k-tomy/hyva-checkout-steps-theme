export function prepareAddressCardListData({
  selectedAddressId,
  customerAddressList,
  cartShippingAddress,
  defaultBillingAddress,
}) {
  const hasCustomerAddress = !_isObjEmpty(customerAddressList);
  const recentAddressIds = [selectedAddressId];
  const customerAddressListArray = _objToArray(customerAddressList);

  if (hasCustomerAddress) {
    const defaultAddress = customerAddressList[defaultShippingAddress];
    const [firstAddress, secondAddress] = customerAddressListArray.filter(
      (address) => address.id !== selectedAddressId
    );

    if (defaultAddress && defaultShippingAddress !== selectedAddressId) {
      recentAddressIds.push(defaultShippingAddress);
    } else {
      recentAddressIds.push(firstAddress.id)
    }
  }

  const otherAddresses = customerAddressListArray.filter(
    (address) => !recentAddressIds.includes(address.id)
  );

  return {  addressDa };
}
