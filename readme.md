# ton-smc-introspection

This repo contains spec for ton smart contract introspection and reference implementation for JS.

Spec could be found [here](../master/basic-introspection-spec.md)

## Install

```bash
yarn add ton-smc-introspection
```

## Usage

```genSupportsInterfaceFunction``` method generates FunC code for basic introspection.

```typescript
import {genSupportsInterfaceFunction} from 'ton-smc-introspection'

let interfaces = [
    {
        name: 'MathFunctionsInterface',
        declaration: [
            'get-method: int sum(int a, int b)',
            'get-method: int sub(int a, int b)'
        ]
    },
    {
        name: 'ConstantsInterface',
        declaration: [
            'get-method: int get_speed_of_light()'
        ],
        seed: 'random_seed'                         // used to avoid colisions
    }
]

console.log(genSupportsInterfaceFunction(interfaces))
```
Outputs: 

```
(int, int, int) supported_interfaces() method_id {
    ;; 0x5fd2: MathFunctionsInterface
    ;; 0x2545: ConstantsInterface
    ;; 0x667a: BasicIntrospection
    return (0x5fd2, 0x2545, 0x667a);
}
```

You can use this function in your FunC smart contract code.
