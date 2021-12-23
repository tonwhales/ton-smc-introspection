# Basic introspection spec

Highly inspired by
https://eips.ethereum.org/EIPS/eip-165

## Spec

In order to support Introspection SMC should implement supports_interface GET method:

```(int...) supported_interfaces()```

Which returns list of supported interface codes.

### Interface

Interface is defined by some uint16 associated with all function selectors of interface called interfaceID.
InterfaceID should be calculated by bitwise XOR of all function selectors in that interface.
For some cases InterfaceID should be once XOR'd with crc16 of some nonce.

### Function selectors

Function selector is some uint16 associated with some function (or internal/external message) of smart contract.

Basically selectors can be any numbers, but for convenience we propose that

```selector = crc16(formal_description) & 0xffff```

Where ```formal_description``` is some string describing get method / internal message / external message.

### Formal description for GET methods

```get-method $definition$```

For example: ```get-method cell get_name()```

### Formal description for Internal message

```int-msg $definition$```

For example: ```int-msg: place_bid#5cb63e53 query_id: uint32```

### Formal description for External message

```ext-msg $definition$```

For example: ```ext-msg: place_bid#5cb63e53 query_id: uint32```

### Formal description for Comment message

```int-msg-comment $definition$```

For example: ```int-msg-comment: make_bid```


Again one is free to came up with their own definition format since we only care about resulting crc.
General rule for definitions is to completely define method or message.

### Introspection of introspection

Any Smart Contract supporting introspection should also return interface_id for basic introspection interface.

Basic introspection interface definition:

```typescript
{
    name: 'BasicIntrospection',
    declaration: ['get-method: (int...) supported_interfaces()']
}
```

Resulting interfaceID for BasicIntrospection is ```0x667a```