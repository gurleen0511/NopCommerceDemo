# Manual to Automation Mapping

This suite focuses on high-value nopCommerce storefront flows that are stable enough for repeatable end-to-end coverage.

| Area | Automated coverage | Spec file |
| --- | --- | --- |
| Registration | Successful registration, blank required fields, invalid email, mismatched passwords | `tests/auth/registration.spec.ts` |
| Login | Successful login/logout, incorrect credentials, blank credentials | `tests/auth/login.spec.ts` |
| Search | Existing product, no matching product, empty search validation | `tests/search/search.spec.ts` |
| Cart | Required product options, add item, configured item, quantity update, invalid quantity, remove item | `tests/cart/cart.spec.ts` |
| Checkout | Terms of service validation, blank guest billing address validation | `tests/checkout/checkout-validation.spec.ts` |

Longer checkout completion paths and date-sensitive product flows are intentionally left out of the default suite because they are more vulnerable to public demo-site data changes and bot-protection interruptions.
