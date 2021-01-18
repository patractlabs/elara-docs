# Mandala

## 1. Oracle

Oracle RPC API.

### 1.1. `oracle_getValue`

Retrieves the oracle value for a given key.

#### 1.1.1. Parameter

- `String` - providerId.
- `Object` - currencyId

#### 1.1.2. Response

- Option<TimestampedValue>

#### 1.1.3. Example

Request:

```bash
curl --location --request POST 'https://node-6714447553777491968.jm.onfinality.io/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": "42", 
  "jsonrpc": "2.0",
  "method": "oracle_getValue",
  "params": ["Aggregated", { "Token": "DOT" }]
}
'
```
Response:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": 1610867636000,
        "value": "17318150000000000000"
    },
    "id": "42"
}
```

### 1.2. `oracle_getAllValues`

Retrieves all oracle values.

#### 1.2.1. Parameter

- `String` - providerId.

#### 1.2.2. Response

- Vec<(OracleKey, Option<TimestampedValue>)>

#### 1.2.3. Example

Request:

```bash
curl --location --request POST 'https://node-6714447553777491968.jm.onfinality.io/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": "42", 
  "jsonrpc": "2.0",
  "method": "oracle_getAllValues",
  "params": ["Aggregated"]
}
'
```

Response (shortened):

```json
{
    "jsonrpc": "2.0",
    "result": [
        [
            {
                "Token": "DOT"
            },
            {
                "timestamp": 1610867936000,
                "value": "17326675000000000000"
            }
        ],
        [
            {
                "Token": "XBTC"
            },
            {
                "timestamp": 1610867936000,
                "value": "35466865000000000000000"
            }
        ],
        [
            {
                "Token": "RENBTC"
            },
            {
                "timestamp": 1610867936000,
                "value": "35466865000000000000000"
            }
        ]
    ],
    "id": "42"
}
```

## 2. StakingPool

StakingPool RPC API.

### 2.1 `stakingPool_getAvailableUnbonded`

Get Available Unbonded

#### 2.1.1. Parameter

- `String` - account.

#### 2.1.2. Response

- BalanceInfo

### 2.2 `stakingPool_getLiquidStakingExchangeRate`

Get liquid staking exchange rate.

#### 2.2.1. Parameter

- `String` - account.

#### 2.2.2. Response

- ExchangeRate
