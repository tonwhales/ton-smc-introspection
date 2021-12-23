import {genSupportsInterfaceFunction, getFunctionSelector} from "./introspection";

describe('Introspection', () => {
    it('should create selectors', () => {
        expect(getFunctionSelector('test')).toEqual(39686)
    })

    it('should generate introspection function', () => {
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

        let functionCode = genSupportsInterfaceFunction(interfaces)
        let expectedCode =
            `(int, int, int) supported_interfaces() method_id {
    ;; 0x5fd2: MathFunctionsInterface
    ;; 0x2545: ConstantsInterface
    ;; 0x667a: BasicIntrospection
    return (0x5fd2, 0x2545, 0x667a);
}
`
        expect(functionCode).toEqual(expectedCode)
    })
})