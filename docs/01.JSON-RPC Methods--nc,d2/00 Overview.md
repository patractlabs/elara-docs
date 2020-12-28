# Overview 

## 1. Summary

This standard describes the JSON-RPC interfaces that Polkadot node implementations should provide,
including each function call's parameter types, behavior and possible return values.

## 2. Motivation

This standard should serve as common ground for API endpoints in order for external applications to
be able to reuse existing functionality on various implementations of the Polkadot node. Avoiding
disparity among node implementations will simplify their development, as well as allow applications
which use different node implementations to switch seamlessly between them.

## 3. Specification

[JSON-RPC](https://www.jsonrpc.org/specification) is a stateless, light-weight remote procedure call
(RPC) protocol. Primarily this specification defines several data structures and the rules around
their processing. It is transport agnostic in that the concepts can be used within the same process,
over sockets, over http, or in many various message passing environments. It uses
[JSON](https://www.json.org/json-en.html) ([RFC 4627](https://www.ietf.org/rfc/rfc4627.txt)) as data
format.

All parameters in the specified JSON-RPC methods are **REQUIRED**, unless explicitly mentioned
otherwise (**OPTIONAL**). Return values which are OPTIONAL indicate the possibility of `null` being
returned. Additionally, the JSON-RPC API should be made available over the
[WebSocket Protocol](https://tools.ietf.org/html/rfc6455).

Certain APIs, indicated by `pubsub`, communicate exclusively over the WebSocket protocol and follow
the publish-subscribe pattern. The client needs to subscribe to those APIs by specifying the
`method`. The publisher then creates response messages for the corresponding subscription (defined
in the `"method"` field) and generates a `subscription` ID, which can either be an integer or a
string. The client needs to keep track of that ID in order to unsubscribe from messages.

Request:

```bash
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": <METHOD>,
    "params": [
        <PARAMS>
    ]
}
```

Response:

```bash
{
    "jsonrpc": "2.0",
    "method": <SUBSCRIPTION>,
    "params": {
        "result": <RESULT>,
        "subscription": <ID>
    }
}
```

This document contains examples on how `pubsub` APIs are supposed to be used.

### 3.1. Safety

Exposing RPC calls to the public may open up a huge surface of attacks, such as denial or service
attacks, and has to be carefully considered. There are quite a few RPC methods that should be never
(or rarely) directly exposed. Those methods are considered **UNSAFE** and are explicitly
highlighted.

The implementation of this specification must disable the JSON API by default and should offer four
different flags (for the RPC/TCP and the RPC/WebSocket interface each) in order to enable specific
parts of the API. Two flags for exposing safe and unsafe PRC to localhost only, and two flags for
exposing safe and unsafe RPC to all interfaces.

| API / Network | Localhost                 | All interfaces             |
| ------------- | ------------------------- | -------------------------- |
| Safe API      | `--local-{rpc/ws}`        | `--public-{rpc/ws}`        |
| Unsafe API    | `--local-unsafe-{rpc/ws}` | `--public-unsafe-{rpc/ws}` |

**Warning**: Enabling `--public-unsafe-{rpc/ws}` is dangerous and should be avoided.

### 3.2. Errors

Each namespace specifies RPC error code ranges of possible error types that can be returned. Known
error types are defined in this document and some APIs may return undefined error messages. Defined
error messages are subject to expansion and changes.

### 3.3. Common types

This document references commonly used types, represented in capital letters, as defined in the
subsections below.

#### 3.3.1. `STRING`

A sequence of characters: `"value"`

#### 3.3.2. `U32` / `U64` / `U128`

Unsigned integers.

- `U32` - A 32-bit unsigned integer (min: `0`, max: `4294967295`).
- `U64` - A 64-bit unsigned integer (min: `0`, max: `18446744073709551615`).
- `U128` - A 128-bit unsigned integer (min: `0`, max: `340282366920938463463374607431768211455`).

#### 3.3.3. `BOOL`

A boolean type, which can either be `true` or `false`.

#### 3.3.4. `MAP`

A key/value object, where keys are `STRING`s and values are arbitrary types. Each API defines its
own value types.

```json
{
  "key": "value1",
  "key2": "value2"
}
```

#### 3.3.5. `ARRAY`

An object containing a varying amount of items.

```json
["item1", "item2"]
```

#### 3.3.6. `HEX`

A string of varying size representing hexadecimal-encoded data. Contains a `0x` prefix to indicate
the hexadecimal encoding.

This type only includes the characters `[a-fA-F0-9]`.

#### 3.3.7. `HASH`

A string which represents a 32-byte, hexadecimal-encoded Blake2 hash. Contains a `0x` prefix to
indicate the hexadecimal encoding.

This type has 66 characters in total and only includes the characters `[a-fA-F0-9]`, with the
exception of the `0x` prefix.
