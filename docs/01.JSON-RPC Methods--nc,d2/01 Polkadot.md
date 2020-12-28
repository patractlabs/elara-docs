# Polkadot

## 1. System

System RPC API that exposes metadata or can be used for administration of the blockchain network.

### 1.1. System Errors

RPC error codes are in the `2000` - `2999` range. No known error types are specified.

### 1.2. `system_name`

Get the node's implementation name.

#### 1.2.1. Parameter

None.

#### 1.2.2. Response

`STRING` - The node's name.

#### 1.2.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_name", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "parity-polkadot",
  "id": 1
}
```

### 1.3. `system_version`

Get the node implementation's version. Should be a
[semantic versioning](https://semver.org/lang/de/) string.

#### 1.3.1. Parameter

None.

#### 1.3.2. Response

`STRING` - The node's version.

#### 1.3.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_version", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "0.7.20",
  "id": 1
}
```

### 1.4. `system_chain`

Get the chain's type. Given as a string identifier.

#### 1.4.1. Parameter

None.

#### 1.4.2. Response

`STRING` - The chain's name.

#### 1.4.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_chain", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "Kusama CC3",
  "id": 1
}
```

### 1.5. `system_chainType`

Get the chain's type.

#### 1.5.1. Parameter

None.

#### 1.5.2. Response

- `STRING` - The chain's type.

#### 1.5.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_chainType", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "Live",
  "id": 1
}
```

### 1.6. `system_properties`

Get a custom set of properties as a JSON object, defined in the chain specification.

#### 1.6.1. Parameter

None.

#### 1.6.2. Response

- `MAP` - (OPTIONAL)
  - `STRING`: `STRING` - Property name and value

#### 1.6.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_properties", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "ss58Format": 2,
    "tokenDecimals": 12,
    "tokenSymbol": "KSM"
  },
  "id": 1
}
```

### 1.7. `system_health`

Return health status of the node.

Node is considered healthy if it is:

- Connected to some peers (unless running in dev mode).
- Not performing a major sync.

#### 1.7.1. Parameter

None.

#### 1.7.2. Response

- `MAP`
  - `"isSyncing"`: `BOOL` - Whether the node is syncing.
  - `"peers"`: `U32` - Number of connected peers.
  - `"shouldHavePeers"`: `BOOL` - Should this node have any peers. Might be false for local chains
    or when running without discovery.

#### 1.7.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_health", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "isSyncing": false,
    "peers": 46,
    "shouldHavePeers": true
  },
  "id": 1
}
```

### 1.8. `system_localPeerId`

Returns the base58-encoded PeerId fo the node.

#### 1.8.1. Parameter

None.

#### 1.8.2. Response

- `STRING` - The base58 encoded PeerId.

#### 1.8.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_localPeerId", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "12D3KooWNU8nVAimt6DgxTKUqt4gQwZMJ6AWhjXCZbYbDEg5Wwg9",
  "id": 1
}
```

### 1.9. `system_localListenAddresses`

Returns the libp2p multiaddresses that the local node is listening on.

The addresses include a trailing `/p2p/` with the local PeerId, and are thus suitable to be passed
to `system_addReservedPeer` or as a bootnode address for example.

#### 1.9.1. Parameter

None.

#### 1.9.2. Response

- `ARRAY`
  - `STRING` - A multiaddress.

#### 1.9.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_localListenAddresses", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": ["/ip4/127.0.0.1/tcp/30333/p2p/12D3KooWNU8nVAimt6DgxTKUqt4gQwZMJ6AWhjXCZbYbDEg5Wwg9"],
  "id": 1
}
```

### 1.10. `system_peers`

Returns currently connected peers.

#### 1.10.1. Parameter

None.

#### 1.10.2. Response

- `ARRAY` - (OPTIONAL)
  - `MAP`
    - `"PeerId"`: `STRING` - Peer ID.
    - `"roles"`: `STRING` - Roles of the node. One of the following values is possible:
      - `"NONE"` - No network.
      - `"FULL"` - Full node, does not participate in consensus.
      - `"LIGHT"` - Light client node.
      - `"AUTHORITY"` - Acts as an authority.
    - `"protocolVersion"`: `U32` - Protocol version.
    - `"bestHash"`: `HEX` - Peer best block hash.
    - `"bestNumber"`: `U64` - Peer best block number.

#### 1.10.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_peers", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": [
    {
      "bestHash": "0x603b65f208656860f7d31f494896ac2ddcff37674442a84dfbcc1de0eacd83e2",
      "bestNumber": 1193270,
      "peerId": "QmTjJKhuLXKg9CfKkgGgJrzZ7LVfSmSUkQqFfZk1prF7LE",
      "protocolVersion": 6,
      "roles": "AUTHORITY"
    },
    {
      "bestHash": "0x603b65f208656860f7d31f494896ac2ddcff37674442a84dfbcc1de0eacd83e2",
      "bestNumber": 1193270,
      "peerId": "Qme89h5f5MkdN37R173z5GSJVBVSGeUriSrp4u3Y2ZRmUv",
      "protocolVersion": 6,
      "roles": "AUTHORITY"
    }
  ],
  "id": 1
}
```

### 1.11. `system_networkState`

_NOTE: This API is future-reserved, specification will be adjusted._

### 1.12. `system_addReservedPeer`

**Warning**: This method is [UNSAFE](#Safety).

Adds a reserved peer. The string parameter should encode a `p2p` multiaddr.

`/ip4/198.51.100.19/tcp/30333/p2p/QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV` is an example of a
valid, passing multiaddr with PeerId attached.

#### 1.12.1. Parameter

- `STRING` - Multiaddr to be added.

#### 1.12.2. Response

None.

#### 1.12.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_addReservedPeer", "params":["/ip4/198.51.100.19/tcp/30333/p2p/QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV"]}' http://localhost:9933
```

Response

```json
{
  "jsonrpc": "2.0",
  "result": null,
  "id": 1
}
```

### 1.13. `system_removeReservedPeer`

**Warning**: This method is [UNSAFE](#Safety).

Remove a reserved peer. The string should encode only the PeerId e.g.
`QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV`.

#### 1.13.1. Parameter

- `STRING` - Peer ID to be removed.

#### 1.13.2. Response

None.

#### 1.13.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_removeReservedPeer", "params":["QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV"]}' http://localhost:9933
```

Response"

```json
{
  "jsonrpc": "2.0",
  "result": null,
  "id": 1
}
```

### 1.14. `system_nodeRoles`

Returns the roles the node is running as.

#### 1.14.1. Parameter

None.

#### 1.14.2. Response

- `ARRAY`
  - `STRING` - One of the following values is possible:
    - `"Full"` - The node is a full node.
    - `"LightClient"` - The node is a a light client.
    - `"Authority"` - The node is an authority.
    - `"UnknownRole"`: `ARRAY` - An unknown role followed by an arbitrary byte value.
      - `U8` - Undefined value.

#### 1.14.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_nodeRoles", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": ["Authority"],
  "id": 1
}
```

### 1.15. `system_syncState`

Returns the state of the syncing of the node.

#### 1.15.1. Parameter

None.

#### 1.15.2. Response

- `MAP`
  - `"currentBlock"`: `U32` - The current best block number.
  - `"highestBlock"`: `U32` - The highest known block number.
  - `"startingBlock"`: `U32` - The starting block number.

#### 1.15.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_syncState", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "currentBlock": 2614956,
    "highestBlock": 2614956,
    "startingBlock": 2614925
  },
  "id": 1
}
```

### 1.16. `system_accountNextIndex`

Returns the next valid index (aka. nonce) for given account.

This method takes into consideration all pending transactions currently in the pool and if no
transactions are found in the pool it fallbacks to query the index from the runtime (aka. state
nonce).

Alias: `account_nextIndex`

#### 1.16.1. Parameter

- `STRING` - The address of the account.

#### 1.16.2. Response

- `U64` - The nonce of the account.

#### 1.16.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_accountNextIndex", "params":["FJaSzBUAJ1Nwa1u5TbKAFZG5MBtcUouTixdP7hAkmce2SDS"]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": 35,
  "id": 1
}
```

### 1.17. `system_dryRun`

Dry run an extrinsic. Returns a SCALE encoded `ApplyExtrinsicResult`.

#### 1.17.1. Parameter

- `HEX` - The raw, SCALE encoded extrinsic.
- `HASH` - The block hash indicating the state. `Null` implies the current state.

#### 1.17.2. Response

- `HEX` - The SCALE encoded `ApplyExtrinsicResult`.


## 2. Author

Authoring RPC API.

### 2.1. Common types

#### 2.1.1. Key types

Polkadot separates keys into different types, depending on its use-case. Following variants are
available.

- `"babe"` - Babe functionality.
- `"gran"` - GRANDPA functionality.
- `"acco"` - Controlling an account.
- `"aura"` - Aura functionality.
- `"imon"` - _ImOnline_ functionality.
- `"audi"` - Authority discovery functionality.
- `"dumy"` - Useful for testing.

#### 2.1.2. Author Errors

RPC error codes are in the `1000` - `1999` range. The following known error types are possible:

- _BadFormat_
  - Occurrence: incorrect extrinsic format.
  - RPC code: 1001
  - RPC message: "Extrinsic has invalid format: ${details}"
    - _${details}_: details of the error message.
- _Verification_
  - Occurrence: verification error.
  - RPC code: 1002
  - RPC message: "Extrinsic verification error: ${details}"
    - _${details}_: details of the error message.
- _Pool_
  - _InvalidTransaction_
    - Occurrence: the transaction is invalid.
    - RPC code: 1010
    - RPC message: "Invalid Transaction"
  - _UnknownTransaction_
    - Occurrence: the transaction is unknown.
    - RPC code: 1011
    - RPC message: "Unknown Transaction Validity"
  - _TemporarilyBanned_
    - Occurrence: the transaction is temporarily banned.
    - RPC code: 1012
    - RPC message: "Transaction is temporarily banned"
  - _AlreadyImported_
    - Occurrence: the transaction was already imported.
    - RPC code: 1013
    - RPC message: "Transaction Already Imported"
  - _TooLowPriority_
    - Occurrence: the transaction has too low priority.
    - RPC code: 1014
    - RPC message: "The transaction has too low priority to replace another transaction already in
      the pool"
  - _CycleDetected_
    - Occurrence: a cycle has been detected.
    - RPC code: 1015
    - RPC message: "Cycle Detected"
  - _ImmediatelyDropped_
    - Occurrence: transaction pool limit reached.
    - RPC code: 1016
    - RPC message: "The transaction couldn't enter the pool because of the limit"
- _UnsupportedKeyType_
  - Occurrence: key type ID has some unsupported crypto.
  - RPC code: 1017
  - RPC message: "The crypto for the given key type is unknown, please add the public key to the
    request to insert the key successfully"

### 2.2. `author_submitExtrinsic`

**Warning**: This method is [UNSAFE](#Safety).

Submit an extrinsic for inclusion into a block.

#### 2.2.1. Parameter

- `HEX` - A SCALE encoded extrinsic.

#### 2.2.2. Response

- `HASH` - The resulting transaction hash of the extrinsic.

### 2.3. `author_pendingExtrinsics`

Returns all pending extrinsics, potentially grouped by sender.

#### 2.3.1. Parameter

None.

#### 2.3.2. Response

- `ARRAY`
  - `HEX` - (OPTIONAL) SCALE encoded extrinsic.

### 2.4. `author_removeExtrinsic`

**Warning**: This method is [UNSAFE](#Safety).

Remove given extrinsic from the pool and temporarily ban it to prevent reimporting.

#### 2.4.1. Parameter

Either one of the following types:

- `ARRAY`
  - `HASH` - The hash of the extrinsic to be removed.
- `HASH` - The hash of the extrinsic to be removed.

#### 2.4.2. Response

- `ARRAY` - (OPTIONAL)
  - `HEX` - The extrinsic that was removed.

### 2.5. `author_insertKey`

**Warning**: This method is [UNSAFE](#Safety).

Insert a key into the keystore.

#### 2.5.1. Parameter

- `STRING` \* [Key type](#Key-types).
- `HEX` - The seed.
- `HEX` - The public key.

#### 2.5.2. Response

None.

#### 2.5.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_insertKey", "params":["dumy", "0x3fb882f70b4ddf5f8923f4a2d3b30a20f79bc0c5de212c1a8977f4972272db8d", "0x5ebf69cfbb4914711f70ff3b9e7455f7d5006b15f220d011387038cf4fb1593e"]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": null,
  "id": 1
}
```

### 2.6. `author_rotateKeys`

**Warning**: This method is [UNSAFE](#Safety).

Generate new session keys and returns the corresponding public keys.

#### 2.6.1. Parameter

None.

#### 2.6.2. Response

- `HEX` - The SCALE encoded, concatenated keys.

#### 2.6.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "0x8c0baa0b4cf42e669a3805c1d6405926c9adf0691f854a6ddaffde3abc1dbd6b7c70cc7d2a731186ec54e26e0b0509667376d818643a5969549e44a76dc42f5a041b0120d2fc6d686e1bec66f596ddcce78da4029a23b3c213c55d2a064e9c26a20ab338080835b845e71573c3197795b729a1015b504a8352ee7dcbce92296c28bcc393e3cb1b18f597c597a458e21f706374e75f35445132977a66519d731d",
  "id": 1
}
```

### 2.7. `author_hasSessionKeys`

Checks if the keystore has private keys for the given session public keys.

#### 2.7.1. Parameter

- `HEX` - The SCALE encoded, concatenated keys.

#### 2.7.2. Response

- `BOOL` - Returns `true` if all private keys could be found, `false` if otherwise.

#### 2.7.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_hasSessionKeys", "params":["0x8c0baa0b4cf42e669a3805c1d6405926c9adf0691f854a6ddaffde3abc1dbd6b7c70cc7d2a731186ec54e26e0b0509667376d818643a5969549e44a76dc42f5a041b0120d2fc6d686e1bec66f596ddcce78da4029a23b3c213c55d2a064e9c26a20ab338080835b845e71573c3197795b729a1015b504a8352ee7dcbce92296c28bcc393e3cb1b18f597c597a458e21f706374e75f35445132977a66519d731d"]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

### 2.8. `author_hasKey`

Checks if the keystore has private keys for the given public key and key type.

#### 2.8.1. Parameter

- `HEX` - The public key.
- `STRING` \* [Key type](#Key-types).

#### 2.8.2. Response

- `BOOL` - Returns `true` if a private key could be found, `false` if otherwise.

#### 2.8.3. Example

Request:

```bash
// Request
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_hasKey", "params":["0x5ebf69cfbb4914711f70ff3b9e7455f7d5006b15f220d011387038cf4fb1593e", "dumy"]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

### 2.9. `author_submitAndWatchExtrinsic` (pubsub)

Submit an extrinsic and watch.

This endpoint communicates over the Websocket protocol (`author_extrinsicUpdate` subscription).

#### 2.9.1. Parameter

- `HEX` - The SCALE encoded extrinsic.

#### 2.9.2. Response

Return **one** of the following extrinsic statuses:

- `"future"` - The extrinsic is part of the future queue.
- `"ready"` - The extrinsic is part of the ready queue.
- `MAP` - The extrinsic has been broadcast to the given peers.
  - `"broadcast"`: `ARRAY`
    - `STRING` - The PeerId.
- `MAP` - The extrinsic has been included in block with given hash.
  - `"inBlock"`: `HASH` - The hash of the block.
- `MAP` - The block this extrinsic was included in has been retracted.
  - `"retracted"`: `HASH` - The hash of the block.
- `MAP` - Maximum number of finality watchers has been reached, old watches are being removed.
  - `"finalityTimeout"`: `HASH` - The hash of the block.
- `MAP` - The extrinsic has been finalized by GRANDPA.
  - `"finalized"`: `HASH` - The hash of the block.
- `MAP` - The extrinsic has been replaced in the pool, by another extrinsic that provides the same
  tags (e.g. same sender/nonce).
  - `"usurped"`: `HASH` - The hash of the extrinsic.
- `"dropped"` - The extrinsic has been dropped from the pool because of the limit.
- `"invalid"` - The extrinsic is no longer valid in the current state.

#### 2.9.3. Example

Request:

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "author_submitAndWatchExtrinsic",
  "params": [
    "0x01d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000bae32a8130ab7966a82a8a025e24d23f0244e606f34375f66855b105d1d2e25eca2e21855ba44e90bd48833638220a4a9ddd1b6ffa08a2424df1a8ffbd8b0d8f00"
  ]
}
```

Response:

```json
{
    "jsonrpc": "2.0",
    "method": "author_extrinsicUpdate",
    "params": {
        "result": "ready",
        "subscription": 1
    }
}

{
    "jsonrpc": "2.0",
    "method": "author_extrinsicUpdate",
    "params": {
        "result": {
            "usurped": "0x01d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d0000000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000001a19b6a160cd4f6ba18f9432255c018252e79759248b57e8e907ba3e87642e287581e10a1ced3004831908bb31d16740d6d35b536204540bd82fa23ebfd2608b00"
        },
        "subscription": 1
    }
}
```

### 2.10. `author_unwatchExtrinsic` (pubsub)

Unsubscribe extrinsic watching.

#### 2.10.1. Parameter

- `STRING` or `U32` - The subscriber ID, depending on subscription initialization.

#### 2.10.2. Response

- `BOOL` - `true` if the subscriber was unsubscribed, `false` if there was no such provided
  subscriber.

#### 2.10.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "author_unwatchExtrinsic",
  "params": [10],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

## 3. Chain

Blockchain RPC API.

### 3.1. Chain Errors

RPC error codes are in the `3000` - `3999` range. No known error types are specified.

### 3.2. `chain_getHeader`

Get header of a relay chain block. If no block hash is provided, the latest block header will be
returned.

#### 3.2.1. Parameter

- `HASH` - (OPTIONAL) Hex encoded block hash.

#### 3.2.2. Response

- `MAP` - (OPTIONAL).
  - `"parentHash"`: `HEX` - The parent hash.
  - `"number"`: `HEX` - The block number.
  - `"stateRoot"`: `HASH` - The state trie merkle root.
  - `"extrinsicsRoot"`: `HASH` - The merkle root of the extrinsics.
  - `"digest"`: `MAP` - Chain-specific digest of data useful for light clients or auxiliary data.
    - `"logs"`: `ARRAY` - A list of logs in the digest.
      - `HEX` - Digest logs of opaque nature.

#### 3.2.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "chain_getHeader", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "digest": {
      "logs": [
        "0x064241424534020b000000497fb90f00000000",
        "0x05424142450101f4b34c2a153dc4912c859ac9542c4345911ed0c1cae18c9704d6566f2689ac158681adfd0410a9e1c97a50b0c455af1b4d5447cbd4c4da1a6ebcd53ee5d3ee89"
      ]
    },
    "extrinsicsRoot": "0x01f31561613c605d96d0572b7dda3884ccc2f9f890538974007eb610784216d9",
    "number": "0x12d2a9",
    "parentHash": "0x281270fff803f40aad2f5e6bc113f6814060cc2f435bf6e4526795ec9d73a62d",
    "stateRoot": "0xc51f09252a24f7965c892a4f57d5ec5985830ac90b32da0a045b92457ebc5b39"
  },
  "id": 1
}
```

### 3.3. `chain_getBlock`

Get header and body of a relay chain block. If no block hash is provided, the latest block body will
be returned.

#### 3.3.1. Parameter

- `HASH` - (OPTIONAL) The block hash.

#### 3.3.2. Response

- `MAP` - (OPTIONAL)
  - `"block"`: `MAP`
    - `"extrinsics"`: `ARRAY`
      - `HEX` - An extrinsic.
    - `"header"`: `MAP`
      - `"parentHash"`: `HASH` - The parent hash.
      - `"number"`: `HEX` - The block number.
      - `"stateRoot"`: `HASH` - The state trie merkle root.
      - `"extrinsicsRoot"`: `HASH` - The merkle root of the extrinsics.
      - `"digest"`: `MAP` - Chain-specific digest of data useful for light clients or auxiliary
        data.
        - `"logs"`: `ARRAY` - A list of logs in the digest.
          - `HEX` - Digest logs of opaque nature.
  - `"justification"`: `HEX` - (OPTIONAL) The justification.

#### 3.3.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "chain_getBlock", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "block": {
      "extrinsics": ["0x280402000bb0019c8b7001", "0x1c0409006a4b4b00", "0x1004140000"],
      "header": {
        "digest": {
          "logs": [
            "0x06424142453402610000007d7fb90f00000000",
            "0x0542414245010166b01406e966b6604ea996cda5355c5f24fffee6cb2082802105f136b456c9412855a0cce4058f08ccf9ce822cd94a6ae786037a8566310765a043a09514488a"
          ]
        },
        "extrinsicsRoot": "0x1ce1236c8262cead39a2a758fc4cdba0b918f309e5a8572c288c5ba2c16aa7a7",
        "number": "0x12d2dd",
        "parentHash": "0x78b7af6942c220ec33945f228f1e17383403561f8d7bbc02da2c79650f22fdbe",
        "stateRoot": "0xa6387842acac9315ad4424828f571c348a40bdfb9f9b4cb4951bcb76e43dacfb"
      }
    },
    "justification": null
  },
  "id": 1
}
```

### 3.4. `chain_getBlockHash`

Get hash of the 'n-th' block in the canon chain. If no parameters are provided, the latest block
hash gets returned.

Alias: `chain_getHead`

#### 3.4.1. Parameter

One of the following types is allowed:

- `HEX` - (OPTIONAL) The value indicating the 'n-th' block in the chain.
- `U32` - (OPTIONAL) The value indicating the 'n-th' block in the chain.
- `ARRAY` - (OPTIONAL) Multiple values, where each value can be one of the following types:
  - `HEX` - The value indicating the 'n-th' block in the chain.
  - `U32` - The value indicating the 'n-th' block in the chain.

#### 3.4.2. Response

One of the following types gets returned, depending on the provided parameters:

- `HASH` - (OPTIONAL) The block hash.
- `ARRAY`
  - `HASH` - (OPTIONAL) A block hash

#### 3.4.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "chain_getBlockHash", "params":[50, "0x64", 200]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": [
    "0x4fee9b1803132954978652e4d73d4ec5b0dffae3832449cd5e4e4081d539aa22",
    "0x46781d9a3350a0e02dbea4b5e7aee7c139331a65b2cd736bb45a824c2f3ffd1a",
    "0x0f82403bcd4f7d4d23ce04775d112cd5dede13633924de6cb048d2676e322950"
  ],
  "id": 1
}
```

### 3.5. `chain_getFinalizedHead`

Get hash of the last finalized block in the canon chain.

Alias: `chain_getFinalisedHead`

#### 3.5.1. Parameter

None.

#### 3.5.2. Response

- `HASH` - The hash of the last finalized block.

#### 3.5.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "chain_getFinalizedHead", "params":[]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "0x00b8360db070d20fb2bc700a73240c65acb590d26ae8c477b0add48a3695bd35",
  "id": 1
}
```

### 3.6. `chain_subscribeAllHeads` (pubsub)

Subscription for all block headers (new blocks and finalized blocks).

This endpoint communicates over the Websocket protocol (`chain_allHead` subscription).

#### 3.6.1. Parameter

None.

#### 3.6.2. Response

- `MAP`
  - `"digest"`: `MAP`
    - `"logs"`: `ARRAY`
      - `HEX` - Digest item.
  - `"extrinsicsRoot"`: `HASH` - The merkle root of extrinsics.
  - `"number"`: `HEX` - The block number.
  - `"parentHash"`: `HASH` - The parent hash.
  - `"stateRoot"`: `HASH` - The state root.

#### 3.6.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_subscribeAllHeads",
  "params": [],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_allHead",
  "params": {
    "result": {
      "digest": {
        "logs": [
          "0x0642414245b50101a300000082accc0f0000000056b7c762126decd0f4ea57564d468873831e92905fdd0b398c53240bb9df7e642b47b8af28e025257219acaa4c5065daa9e48d23451a0e046aba07be1666080de5889c4e698919bb735905ceafcb6d0af2d64377ad7a7dd6c0c85e3a6009780f",
          "0x054241424501015e0cf4e51a0395d88303ccdaeefec4c5384f7f8fa7dbd1dc57503b9d344c436891c9140baa0f65060f1f0a9e192fd4e8268475f8caeae7ce13490f34c9e5678d"
        ]
      },
      "extrinsicsRoot": "0x165cb92127cd5eef85ace0af1dbefd952b913858909b9cc4b35fa33d457a7c9c",
      "number": "0x25997e",
      "parentHash": "0xa777e05033d255b84180e96a0d1b0b04b7d118969b4d60f78750900278ed4774",
      "stateRoot": "0xd330701dc41b9c2c97cbb4cfaed3e59e6f94e3d896e4d9c904235c657091175b"
    },
    "subscription": 1
  }
}
```

### 3.7. `chain_unsubscribeAllHeads` (pubsub)

Unsubscribe from watching all block headers.

#### 3.7.1. Parameter

- `STRING` or `U32` - The subscriber ID, depending on subscription initialization.

#### 3.7.2. Response

- `BOOL` - `true` if the subscriber was unsubscribed, `false` if there was no subscriber.

#### 3.7.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_unsubscribeAllHeads",
  "params": [3],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

### 3.8. `chain_subscribeNewHeads` (pubsub)

Subscription for new block headers.

This endpoint communicates over the Websocket protocol (`chain_newHead` subscription).

#### 3.8.1. Parameter

None.

#### 3.8.2. Response

- `MAP`
  - `"digest"`: `MAP`
    - `"logs"`: `ARRAY`
      - `HEX` - A digest item.
  - `"extrinsicsRoot"`: `HASH` - The merkle root of extrinsics.
  - `"number"`: `HEX` - The block number.
  - `"parentHash"`: `HASH` - The parent hash.
  - `"stateRoot"`: `HASH` - The state root.

#### 3.8.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_subscribeNewHeads",
  "params": [],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_newHead",
  "params": {
    "result": {
      "digest": {
        "logs": [
          "0x06424142453402be00000024adcc0f00000000",
          "0x05424142450101eec7df1cd6e522d9e753a971f25bffd07646632a2cccc24ab8d6ca08d4313f0c8afc9fd4ec741ad677eeb373ad66c5a55e31f7f74d76d83d10763c30357f2883"
        ]
      },
      "extrinsicsRoot": "0xe83be686dc673d81624e105b4def1773631ba9b5d0bb21aff683cfe402c092d9",
      "number": "0x259a1e",
      "parentHash": "0x2bdf3aea35b4fbc9fae4a001821973d872bf7fae9acfd7d15deb86b7a31ccba3",
      "stateRoot": "0x1735078a466512f5c1275d13e5f2634e00b505aee5d673a4fd167630bf108a99"
    },
    "subscription": 2
  }
}
```

### 3.9. `chain_unsubscribeNewHeads` (pubsub)

Unsubscribe from watching new block headers.

#### 3.9.1. Parameter

- `STRING` or `U32` - The subscriber ID, depending on subscription initialization.

#### 3.9.2. Response

- `BOOL` - `true` if the subscriber was unsubscribed, `false` if there was no subscriber.

#### 3.9.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_unsubscribeNewHeads",
  "params": [7],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

### 3.10. `chain_subscribeFinalizedHeads` (pubsub)

Subscription for finalized block headers.

This endpoint communicates over the Websocket protocol (`chain_finalizedHead` subscription).

#### 3.10.1. Parameter

None.

#### 3.10.2. Response

- `MAP`
  - `"digest"`: `MAP`
    - `"logs"`: `ARRAY`
      - `HEX` - A digest item.
  - `"extrinsicsRoot"`: `HASH` - The merkle root of extrinsics.
  - `"number"`: `HEX` - The block number.
  - `"parentHash"`: `HASH` - The parent hash.
  - `"stateRoot"`: `HASH` - The state root.

#### 3.10.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_subscribeFinalizedHeads",
  "params": [],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_finalizedHead",
  "params": {
    "result": {
      "digest": {
        "logs": [
          "0x0642414245340251000000d2adcc0f00000000",
          "0x05424142450101c26bd718dc93364f14911ad1a9f946238b34ecc38723e00f3819a0440ad4c331a4a40009fffd5364998bbbcd85cec755156c09e45a36276ee0317c4720396385"
        ]
      },
      "extrinsicsRoot": "0xbd09c7fc3a39c11cd87992eb29c263c84f71c3bf42134a14834bc0b70ca69d02",
      "number": "0x259acc",
      "parentHash": "0xe06552be3f8126a6bc3c8bf5f6a7541f357eb7be86f0be48198356dd58c723c8",
      "stateRoot": "0x8f6fd73fb852009bfcce5df4b769f77a42eb401c545ba17e3fd183ac4decb5cf"
    },
    "subscription": 3
  }
}
```

### 3.11. `chain_unsubscribeFinalizedHeads` (pubsub)

Unsubscribe from watching finalized block headers.

#### 3.11.1. Parameter

- `STRING` or `U32` - The subscriber ID, depending on subscription initialization.

#### 3.11.2. Response

- `BOOL` - `true` if the subscriber was unsubscribed, `false` if there was no subscriber.

#### 3.11.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "chain_unsubscribeFinalizedHeads",
  "params": [5],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

## 4. Offchain

Blockchain RPC API.

### 4.1. Offchain Errors

RPC error codes are in the `5000` - `5999` range. No known error types are specified.

### 4.2. Storage kinds

The following Storage kinds are available:

- "PERSISTENT" - is non-revertible and not fork-aware. It means that any value set by the offchain
  worker is persisted even if that block (at which the worker is called) is reverted as
  non-canonical (meaning that the block was surpassed by a longer chain). The value is available for
  the worker that is re-run at the new (different block with the same block number) and future
  blocks. This storage can be used by offchain workers to handle forks and coordinate offchain
  workers running on different forks.
- "LOCAL" - is revertible and fork-aware. It means that any value set by the offchain worker
  triggered at a certain block is reverted if that block is reverted as non-canonical. The value is
  NOT available for the worker that is re-run at the next or any future blocks.

### 4.3. `offchain_localStorageSet`

Set offchain local storage under given key and prefix.

#### 4.3.1. Parameter

- `STRING` - [Storage kind](#Storage-kinds).
- `HEX` - The key.
- `HEX` - The value.

#### 4.3.2. Response

None.

#### 4.3.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "offchain_localStorageSet", "params":["PERSISTENT","0x4B6579","0x56616C7565"]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": null,
  "id": 1
}
```

### 4.4. `offchain_localStorageGet`

Get offchain local storage under given key and prefix.

#### 4.4.1. Parameter

- `STRING` - [Storage kind](#Storage-kinds).
- `HEX` - The key.

#### 4.4.2. Response

- `HEX` - (OPTIONAL) The value.

#### 4.4.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "offchain_localStorageGet", "params":["PERSISTENT","0x4B6579"]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "0x56616c7565",
  "id": 1
}
```

## 5. State

State RPC API.

### 5.1. State Errors

RPC error codes are in the `4000` - `4999` range. No known error types are specified.

### 5.2. Common types

#### 5.2.1. State Errors

_NOTE: This type is future-reserved, specification will be adjusted._

### 5.3. `state_call`

_NOTE: This API is future-reserved, specification will be adjusted._

Call a contract at a block's state.

### 5.4. `state_getPairs`

**Warning**: This method is [UNSAFE](#Safety).

Returns the keys with prefix, leave empty to get all the keys.

#### 5.4.1. Parameter

- `HEX` - The prefix.
- `HEX` - (OPTIONAL) The block hash.

#### 5.4.2. Response

- `ARRAY`
  - `ARRAY` - (OPTIONAL)
    - `HEX` - The key.
    - `HEX` - The value.

#### 5.4.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_getPairs", "params":["0x", null]}' http://localhost:9933
```

Response (shortened):

```json
{
  "jsonrpc": "2.0",
  "result": [
    ["0x0b76934f4cc08dee01012d059e1b83eebbd108c4899964f707fdaffb82636065", "0x00"],
    ["0x11f3ba2e1cdd6d62f2ff9b5589e7ff816254e9d55588784fa2a62b726696e2b1", "0x7b000000"]
  ],
  "id": 1
}
```

### 5.5. `state_getKeysPaged`

**Warning**: This method is [UNSAFE](#Safety).

Returns the keys with prefix with pagination support.

#### 5.5.1. Parameter

- `HEX` - (OPTIONAL) The prefix.
- `U32` - Amount of keys to be return.
- `HEX` - (OPTIONAL) The storage key after which the next keys should be returned in lexicographic
  order.
- `HASH` - (OPTIONAL) The block hash.

#### 5.5.2. Response

- `ARRAY`
  - `HEX` - (OPTIONAL) Storage key

#### 5.5.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_getKeysPaged", "params":[null, 2]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": [
    "0x0b76934f4cc08dee01012d059e1b83ee5e0621c4869aa60c02be9adcc98a0d1d",
    "0x0b76934f4cc08dee01012d059e1b83eebbd108c4899964f707fdaffb82636065"
  ],
  "id": 1
}
```

### 5.6. `state_getStorage`

Returns a storage entry at a specific block's state. If not block hash is provided, the latest value
is returned.

#### 5.6.1. Parameter

- `HEX` - The storage key.
- `HASH` - (OPTIONAL) The block hash.

#### 5.6.2. Response

- `HEX` - (OPTIONAL) The storage value.

#### 5.6.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_getStorage", "params":["0xc2261276cc9d1f8598ea4b6a74b15c2f6482b9ade7bc6657aaca787ba1add3b458ad08561bd8f502d2ba488697d10b58aaa7c4097d4abb1c8861495348fd6970", null]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "0x00e40b54020000000000000000000000",
  "id": 1
}
```

### 5.7. `state_getStorageHash`

Returns the hash of a storage entry at a block's state. If no block hash is provided, the latest
value is returned.

#### 5.7.1. Parameter

- `HEX` - The storage key
- `HASH` - (OPTIONAL) The block hash.

#### 5.7.2. Response

- `HEX` - (OPTIONAL) The hash of the storage entry.

#### 5.7.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_getStorageHash", "params":["0xc2261276cc9d1f8598ea4b6a74b15c2f6482b9ade7bc6657aaca787ba1add3b458ad08561bd8f502d2ba488697d10b58aaa7c4097d4abb1c8861495348fd6970", "0x579deccea7183c2afedbdaea59ad23e970458186afc4d57d5577842d4a219925"]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": "0x7155ca82321b189fc7b9009d9a0c2ebffba28aad222e28986543f266a65064eb",
  "id": 1
}
```

### 5.6. `state_getStorageSize`

Returns the size of a storage entry at a block's state. If no block hash is provided, the latest
value is used.

#### 5.6.1. Parameter

- `HEX` - The storage key.
- `HASH` - (OPTIONAL) The block hash.

#### 5.6.2. Response

- `U64` - (OPTIONAL) The size of the storage entry in bytes.

#### 5.6.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_getStorageSize", "params":["0xc2261276cc9d1f8598ea4b6a74b15c2f6482b9ade7bc6657aaca787ba1add3b458ad08561bd8f502d2ba488697d10b58aaa7c4097d4abb1c8861495348fd6970", null]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": 16,
  "id": 1
}
```

### 5.9. `state_getMetadata`

Returns the runtime metadata.

#### 5.9.1. Parameter

- `HASH` - (OPTIONAL) The block hash indicating the state. `NULL` implies the current state.

#### 5.9.2. Response

- `HEX` - The runtime metadata as an opaque blob.

#### 5.9.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_getMetadata", "params":[null]}' http://localhost:9933
```

Response (shortened):

```json
{
  "jsonrpc": "2.0",
  "result": "0x6d6574610c701853797374656...c696461746541747465737473",
  "id": 1
}
```

### 5.10. `state_getRuntimeVersion`

Get the runtime version at a given block. If no block hash is provided, the latest version gets
returned.

#### 5.10.1. Parameter

- `HEX` - (OPTIONAL) The block hash indicating the state. `NULL` implies the current state.

#### 5.10.2. Response

- `MAP`
  - `"specName"`: `STRING` - Name of the runtime.
  - `"implName"`: `STRING` - Name of the implementation of the specification.
  - `"authoringVersion"`: `U32` - Version of the authorship interface.
  - `"specVersion"`: `U32` - Version of the runtime specification.
  - `"implVersion"`: `U32` - Version of the implementation of the specification.
  - `"apis"`: `ARRAY` - List of supported API features along with their version.
    - `ARRAY` - (OPTIONAL)
      - `HEX` - The feature name.
      - `U32` - Version of the feature.

#### 5.10.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_getRuntimeVersion", "params":[]}' http://localhost:9933
```

Response (shortened):

```json
{
  "jsonrpc": "2.0",
  "result": {
    "apis": [
      ["0xdf6acb689907609b", 2],
      ["0x37e397fc7c91f5e4", 1]
    ],
    "authoringVersion": 2,
    "implName": "parity-kusama",
    "implVersion": 0,
    "specName": "kusama",
    "specVersion": 1045
  },
  "id": 1
}
```

### 5.11. `state_queryStorage`

**Warning**: This method is [UNSAFE](#Safety).

Query historical storage entries (by key) starting from a block given as the second parameter.

**Note**: This first returned result contains the initial state of storage for all keys. Subsequent
values in the array represent changes to the previous state (diffs).

#### 5.11.1. Parameter

- `ARRAY` - List of storage keys to query.
  - `HEX` - The storage key.
- `HEX` - The block hash from where to start the query.
- `HASH` - (OPTIONAL) The block hash to where to end the query

#### 5.11.2. Response

- `ARRAY`
  - `MAP` - (OPTIONAL)
    - `"block"`: `HASH` - The block hash at which a change occurred.
    - `"changes"`: `ARRAY` - Mappings between keys and their corresponding (changed) values.
      - `ARRAY`
        - `HEX` - The storage key.
        - `HEX` - The value.

#### 5.11.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_queryStorage", "params":[["0xf2794c22e353e9a839f12faab03a911bf68967d635641a7087e53f2bff1ecad3c6756fee45ec79ead60347fffb770bcdf0ec74da701ab3d6495986fe1ecc3027"], "0xa32c60dee8647b07435ae7583eb35cee606209a595718562dd4a486a07b6de15", null]}' http://localhost:9933
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": [
    {
      "block": "0xe99c87d6efab57a98706c10fa4bc4d39feaf51ca62ac3bae7a67bf17c8c305ec",
      "changes": [
        [
          "0xf2794c22e353e9a839f12faab03a911bf68967d635641a7087e53f2bff1ecad3c6756fee45ec79ead60347fffb770bcdf0ec74da701ab3d6495986fe1ecc3027",
          "0xa80400fffe112179ba7e7a1549e6c45522901ab7ef7ee373c1797b0f58191c6b53c7831c0b00a0724e1809603153efe4c60f146d61b66d5c9f4a9b469291aa260899bd99083d755a28923d00ea56fa000000000000000000000000490f0600"
        ]
      ]
    }
  ],
  "id": 1
}
```

### 5.10. `state_getReadProof`

Returns the proof of storage entries.

#### 5.10.1. Parameter

- `ARRAY`
  - `HEX` - The storage key.
- `HASH` - (OPTIONAL) The block hash indicating the sate. `NULL` implies the current state.

#### 5.10.2. Response

- `MAP`
  - `"at"`: `HASH` - The block has used to generate the proof.
  - `"proof"`: `ARRAY`
    - `HEX` - The proofs of the storage entries.

#### 5.10.3. Example

Request:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "state_getReadProof", "params":[["0x1a736d37504c2e3fb73dad160c55b2918ee7418a6531173d60d1f6a82d8f4d51c16ee72ac33a6a9e5e887792c26526f9cc080000"], null]}' http://localhost:9933
```

Response (shortened):

```json
{
  "jsonrpc": "2.0",
  "result": {
    "at": "0x4f6b72413a242fb63b3637d2102d3f5d64319d9f9dd60cdc39aade2a093dfab5",
    "proof": [
      "0x650ee72ac33a6a9e5e887792c26526f9cc080000c4664dbd21a50bec286ed2ae25da8f41634778154b3ae6dbd93290bcae58f1dd600000000000000000000000000000000000",
      "0x80801080126002ea89025d2ff7332e6e13b01319e19154993e60db82ac22ce1c7084e19980fe72d495f75a1317c844a2bd7d3ec5c99ac7acf5d8e61096b8d2fe6152574ef2"
    ]
  },
  "id": 1
}
```

### 5.13. `state_subscribeRuntimeVersion` (pubsub)

Runtime version subscription. Creates a message for current version and each upgrade.

This endpoint communicates over the Websocket protocol (`state_runtimeVersion` subscription).

#### 5.13.1. Parameter

None.

#### 5.13.2. Response

- `MAP`
  - `"specName"`: `STRING` - Name of the runtime.
  - `"implName"`: `STRING` - Name of the implementation of the specification.
  - `"authoringVersion"`: `U32` - Version of the authorship interface.
  - `"specVersion"`: `U32` - Version of the runtime specification.
  - `"implVersion"`: `U32` - Version of the implementation of the specification.
  - `"apis"`: `ARRAY` - List of supported API features along with their version.
    - `ARRAY` - (OPTIONAL)
      - `HEX` - The feature name.
      - `U32` - Version of the feature.

#### 5.13.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "state_subscribeRuntimeVersion",
  "params": [],
  "id": 1
}
```

Response (shortened):

```json
{
  "jsonrpc": "2.0",
  "method": "state_runtimeVersion",
  "params": {
    "result": {
      "apis": [
        ["0xdf6acb689907609b", 3],
        ["0x37e397fc7c91f5e4", 1]
      ],
      "authoringVersion": 2,
      "implName": "parity-kusama",
      "implVersion": 0,
      "specName": "kusama",
      "specVersion": 1062,
      "transactionVersion": 1
    },
    "subscription": 4
  }
}
```

### 5.14. `state_unsubscribeRuntimeVersion` (pubsub)

Unsubscribe from watching the runtime version.

#### 5.14.1. Parameter

- `STRING` or `U32` - The subscriber ID, depending on subscription initialization.

#### 5.14.2. Response

- `BOOL` - `true` if the subscriber was unsubscribed, `false` if there was no subscriber.

#### 5.14.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "state_unsubscribeRuntimeVersion",
  "params": [5],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

### 5.15. `state_subscribeStorage` (pubsub)

Storage subscription. If storage keys are specified, it creates a message for each block which
changes the specified storage keys. If none are specified, then it creates a message for every
block.

This endpoint communicates over the Websocket protocol (`state_storage` subscription).

#### 5.15.1. Parameter

- `ARRAY` (OPTIONAL)
  - `HEX` - The storage key.

#### 5.15.2. Response

- `MAP`
  - `"block"`: `HASH` - The block hash.
  - `"changes"`: `ARRAY`
    - `ARRAY`
      - `HEX` - The storage key.
      - `HEX` - (OPTIONAL) The new value.

#### 5.15.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "state_subscribeStorage",
  "params": [],
  "id": 1
}
```

Response (shortened):

```json
{
  "jsonrpc": "2.0",
  "method": "state_storage",
  "params": {
    "result": {
      "block": "0x7c29399516740ddbbb0d6bd9b34ed67bafe6bee31405d72be3b6b8db72172a0f",
      "changes": [
        ["0x0b76934f4cc08dee01012d059e1b83eebbd108c4899964f707fdaffb82636065", "0x00"],
        ["0x26aa394eea5630e07c48ae0c9558cef78a42f33323cb5ced3b44dd825fda9fcc", null],
        ["0xf68f425cf5645aacb2ae59b51baed9049b58374218f48eaf5bc23b7b3e7cf08a", "0x62952500"]
      ]
    },
    "subscription": 11
  }
}
```

### 5.16. `state_unsubscribeStorage` (pubsub)

Unsubscribe from watching storage.

#### 5.16.1. Parameter

- `STRING` or `U32` - The subscriber ID, depending on subscription initialization.

#### 5.16.2. Response

- `BOOL` - `true` if the subscriber was unsubscribed, `false` if there was no subscriber.

#### 5.16.3. Example

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "state_unsubscribeStorage",
  "params": [14],
  "id": 1
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

## 6.Child State

### 6.1. `childstate_getKeys`

**Warning**: This method is [UNSAFE](#Safety).

Returns the keys from the specified child storage. The keys can also be filtered based on a prefix.

#### 6.1.1. Parameter

- `HEX` - The child storage key.
- `HEX` - The prefix of the child storage keys to be filtered for. Leave empty ("") to return all
  child storage keys.
- `HASH` - (OPTIONAL) The block hash indicating the state. `NULL` implies the current state.

#### 6.1.2. Response

- `ARRAY`
  - `HEX` - (OPTIONAL) Storage key.

### 6.2. `childstate_getStorage`

Returns a child storage entry.

#### 6.2.1. Parameter

- `HEX` - The child storage key.
- `HEX` - The key within the child storage.
- `HASH` - (OPTIONAL) The block hash indicating the state. `NULL` implies the current state.

#### 6.2.2. Response

- `HEX` - (OPTIONAL) Storage data, if found.

### 6.3. `childstate_getStorageHash`

Returns the hash of a child storage entry.

#### 6.3.1. Parameter

- `HEX` - The child storage key.
- `HEX` - The key within the child storage.
- `HASH` - (OPTIONAL) The block hash indicating the state. `NULL` implies the current state.

#### 6.3.2. Response

- `HASH` - (OPTIONAL) The hash of the child storage entry, if found.

### 6.4. `childstate_getStorageSize`

Returns the size of a child storage entry.

#### 6.4.1. Parameter

- `HEX` - The child storage key.
- `HEX` - The key within the child storage.
- `HASH` - (OPTIONAL) The block hash indicating the state. `NULL` implies the current state.

#### 6.4.2. Response

- `U64` - (OPTIONAL) The size of the storage entry in bytes, if found.


