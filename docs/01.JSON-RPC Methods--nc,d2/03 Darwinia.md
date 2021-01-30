# Darwinia

The JSON-RPC API of [Darwinia Network](https://darwinia.network/) are really similar to Polkadot. Most of them have the same method name, parameters, and types as well. You can find more information about Polkadot's JSON-RPC here: <https://docs.elara.patract.io/01.JSON-RPC%20Methods--nc,d2/01%20Polkadot&Kusama.html>.

However, Darwinia has a few additional RPC methods in order to provide simper interaction with the [wallets](https://apps.darwinia.network) and other apps.

Here are the docs of Darwinia's additional RPC methods. A [`Toolbox` in apps.darwinia.network](https://apps.darwinia.network/#/toolbox) is also provided for developers to test and submit RPC calls.

## 1. `headerMMR`

### 1.1. `headerMMR_genProof`

Generate MMR proof.

#### Parameters

- `U64` - block_number_of_member_leaf
- `U64` - blockNumberOfLastLeaf

#### Response

- `OBJECT`
  - `U64` - mmrSize
  - `ARRAY` - proof
    - `STRING` - hash
    - ...

#### Example

Request:

```bash
curl https://darwinia.elara.patract.io \
    -H 'Content-Type: application/json' \
    -d '{"id":1, "jsonrpc":"2.0", "method":"headerMMR_genProof", "params":[1797008, 1797008]}'
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "mmrSize": "3594006",
    "proof": "[0x406e0bfcb7078d2bf7de2f8aa2bbcf2f63bf4e8a963b1adeba691addb31f129d, 0x2b624bcc74cd80f3b4b66c81c6c891f76dca9737a77a552d6a160f9807f17e91, 0x5189ffb2ada0e9897535cec316d9308e883a6fff01d8b3c24c1ad75a7e5ef8d7, 0x9bfcd63778c9e76057fcfa7919044531beaa9acc39a1e6c9d51354a9b612a8cd, 0xaf2fa3c2f1a5c53b95558ae93a92921f5e271f2188e69ca964169e3f46befd69, 0x19ce45eb71472168a24567fb3099851d61717e8d67740678f10061516783a406, 0xba3899453c644d97a60a8532585baa1a050529013a3f5761e8e483a8c0502aa3, 0x1f668c12bc3e3faf7767de9a8fbe74e1fe8bb0679f2ebf4dda83c6884229d297, 0x4d2eaed79439d085284e7eb6179bfd960ed3d8dfbced50d7ccf3297311bc4375, 0xd0cf136d7d622f7c402676ff27f21e49c5b4c752462ac17355a7f93a61a93e60, 0xd733205e5e31d5c860fe18c0a3a83a30b093701db511765cdb3a7183ab8fcd30]"
  },
  "id": 1
}
```

## 2. `staking`

### 2.1. `staking_powerOf`

Get the staking power of specific account.

#### Parameters

- `STRING` - accountId

#### Response

- `U32` - power

#### Example

Request:

```bash
curl https://darwinia.elara.patract.io \
    -H 'Content-Type: application/json' \
    -d '{"id":1, "jsonrpc":"2.0", "method":"staking_powerOf", "params":["2qwNw3ba7AYrW4AEc8jP1iWKethu8XBGV3HmJGd6XAHGgQso"]}'
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "power": "92589"
  },
  "id": 1
}
```

## 3. `balances`

### 3.1. `balances_usableBalance`

Get the usable balence (RING or KTON).

#### Parameters

- `U8` - tokenType (`0` for RING, `1` for KTON)
- `STRING` - accountId

#### Response

- `U128` - usableBalance

The value is either RING or KTON, depends on parameter `tokenType`. The unit is Nano RING or Nano KTON. 1 Nano RING/KTON = `1 * 10^(-9)` RING/KTON.

#### Example

Request:

```bash
curl https://darwinia.elara.patract.io \
    -H 'Content-Type: application/json' \
    -d '{"id":1, "jsonrpc":"2.0", "method":"balances_usableBalance", "params":[0, "2qwNw3ba7AYrW4AEc8jP1iWKethu8XBGV3HmJGd6XAHGgQso"]}'
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "usableBalance": "72965319215348"
  },
  "id": 1
}
```
