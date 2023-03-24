
# Hyvä Checkout - Lumazon theme

[![Hyvä Themes](https://repository-images.githubusercontent.com/303806175/a3973c80-479c-11eb-8716-03e369d87143)](https://hyva.io/)

This is an alternative theme for Hyvä checkout. It contains a 4 steps based checkout.

## Why this theme is called Lumazon theme?

The theme is inspired from the checkout process of both Luma checkout as well as
the Amazon.com checkout. It is basically an Amalgam of both these checkout.
## Requirements

It is supposed to be used with the `2.x.x` version of Hyvä checkout. Currently,
Hyvä checkout has `2.0-develop` branch. You can use this theme with that version.

## Installation

1. Go to `src/reactapp/package.json` and update the `config` part as shown below.
    ```
    "config": {
        "themeRepositories": {
            "lumazon": "git@github.com:rajeev-k-tomy/hyva-checkout-steps-theme.git"
        }
    },
    ```
2. Run `npm install`. It will include this theme as part of the React App.
3. Go to `src/reactapp/src/app/code/checkoutForm/CheckoutForm.jsx` and do following modification.
    ```
    ...
    import LumazonTheme from '../../themes/lumazon/Index';
    ...
    ...
    return (
        <CheckoutFormWrapper initialData={initialData}>
        <LumazonTheme />
        </CheckoutFormWrapper>
    );
    ```

You are now able to see the Hyvä Checkout in this theme.
## Translations

You can find csv files related to this theme inside `i18n` directory here. You need to move those translations to your Magento site and add those translations via layout xml file.

Here is the translation entries you would need to add via layout xml file
```
<item name="medical_highlights_theme" xsi:type="string">
    <![CDATA[Create Account,New customer,Sign-in,Email,you@example.com,Continue,OR,Create an account,Login,Address,Address Details,Shipping,Shipping Information,Payment,Payment Information,Login form is invalid.,Cart items are invalid.,Shipping address is invalid.,Billing address is invalid.,No shipping method selected.,Payment method selected is invalid.,Please agree with all terms and conditions.,Coupon code is required.,Add a new delivery address,Edit your delivery address,First name,Last name,Company,Street %1,Town / City,Country,State / Province,PIN code,Phone,I like to keep my billing address same as my delivery address above.,Is billing same as shipping,Order Summary,Subtotal,Tax,Grand Total,Select a shipping method,Select a payment method,Billing address updated successfully.,Billing address update failed. Please try again.,Shipping address updated successfully.,Billing address update failed. Please try again.,More payment options,Apply,Enter your promotional code,Apply promotional codes,Coupon code: %1 is applied successfully.,Coupon code: %1 is invalid.,Coupon code: %1 is removed successfully.,Required,Enter your discount code,Remove Coupon Code,Apply Discount,Place Order,Please provide your login details.,Please provide your email address.,Please provide your shipping address information.,Please provide your billing address information.,Please select your shipping method.,Please select your payment method.,Please agree with the terms & conditions.]]>
</item>
```

## Credits

- [Rajeev K Tomy][link-author]
- [integer_net GmbH][link-company1]

## License

The MIT License (MIT). Please see [License File](LICENSE.txt) for more information.

[ico-compatibility]: https://img.shields.io/badge/magento-%202.3%20|%202.4-brightgreen.svg?logo=magento&longCache=true&style=flat-square

[link-author]: https://github.com/rajeev-k-tomy
[link-company1]: https://integer-net.com
