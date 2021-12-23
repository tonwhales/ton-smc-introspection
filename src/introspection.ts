import {crc16} from "./utils/crc16";
import {CodeBuilder} from "./utils/CodeBuilder";

export type SmartContractInterfaceDeclaration = {
    name: string,
    declaration: string[] // declaration split to lines
    seed?: string
}

export const BasicIntrospectionInterface: SmartContractInterfaceDeclaration = {
    name: 'BasicIntrospection',
    declaration: ['get_method: (int...) supported_interfaces()']
}

export function getFunctionSelector(declaration: string) {
    return crc16(declaration) & 0xffff
}

export function getInterfaceId(interfaceDeclaration: SmartContractInterfaceDeclaration) {
    let interfaceId = 0

    for (let line of interfaceDeclaration.declaration) {
        interfaceId ^= getFunctionSelector(line)
    }

    if (interfaceDeclaration.seed) {
        interfaceId ^= getFunctionSelector(interfaceDeclaration.seed)
    }

    return interfaceId
}

export function genSupportsInterfaceFunction(interfaces: SmartContractInterfaceDeclaration[]) {
    interfaces.push(BasicIntrospectionInterface)

    let code = new CodeBuilder()
    code.add(`(${new Array(interfaces.length).fill('int').join(', ')}) supported_interfaces() method_id {`)
    code.tab()
    for (let i of interfaces) {
        code.add(`;; 0x${getInterfaceId(i).toString(16)}: ${i.name}`)
    }
    let codes = interfaces.map(i => '0x' + getInterfaceId(i).toString(16))
    code.add('return (' + codes.join(', ') + ');')
    code.unTab()
    code.add('}')

    return code.render()
}