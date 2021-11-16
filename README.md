
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

Documentation coming soon
## Credits

- [Rajeev K Tomy][link-author]
- [integer_net GmbH][link-company1]

## License

The MIT License (MIT). Please see [License File](LICENSE.txt) for more information.

[ico-compatibility]: https://img.shields.io/badge/magento-%202.3%20|%202.4-brightgreen.svg?logo=magento&longCache=true&style=flat-square

[link-author]: https://github.com/rajeev-k-tomy
[link-company1]: https://integer-net.com
