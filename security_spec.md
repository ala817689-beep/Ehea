# Security Specification - Maher Iraq

## Data Invariants
- A professional profile must belong to the authenticated user (`userId == auth.uid`).
- Professional status must be one of `['active', 'suspended']`.
- Phone numbers must follow the Iraqi format (`^07[0-9]{8,9}$`).
- Ratings must be between 1 and 5.
- Balance cannot be updated directly by the client (must use a transaction or back-end logic, but for simplicity in this MVP, we manage deposits).

## Dirty Dozen Payloads (Rejection Tests)
1. **Unauthorized Profile Creation**: Creating a profile for another user ID.
2. **Phone Number Spoofing**: Setting a non-Iraqi phone number.
3. **Rating Injection**: Setting a rating of 10 or -1.
4. **Balance Manipulation**: Directly updating `balance` field without a transaction (if restricted).
5. **ID Poisoning**: Using a 1MB string as a `professionalId`.
6. **Email Non-verified Write**: Writing if the app required email verification (not enabled yet).
7. **Orphaned Review**: Creating a review for a professional ID that doesn't exist.
8. **Shadow Field Injection**: Adding `isAdmin: true` to a professional document.
9. **Transaction Type Swapping**: Changing a 'commission' transaction to 'deposit'.
10. **Province Injection**: Setting a province not in the allowed list.
11. **Mass Profile Read**: Attempting to list all professional data including sensitive fields if any.
12. **Double Registration**: Creating multiple professional profiles for the same user.

## Test Runner (Draft)
The `firestore.rules.test.ts` would involve mocking the Auth context and verifying these payloads.
