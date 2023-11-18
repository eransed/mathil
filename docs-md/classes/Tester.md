[mathil - v0.12.0](../README.md) / [Exports](../modules.md) / Tester

# Class: Tester\<T, U\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `U` | extends (...`p`: `any`) => `T` |

## Table of contents

### Constructors

- [constructor](Tester.md#constructor)

### Properties

- [eq](Tester.md#eq)
- [failed](Tester.md#failed)
- [passed](Tester.md#passed)
- [startTime](Tester.md#starttime)
- [to\_str](Tester.md#to_str)

### Methods

- [summary](Tester.md#summary)
- [test](Tester.md#test)

## Constructors

### constructor

• **new Tester**\<`T`, `U`\>(`_eq`, `_to_str`, `testName?`): [`Tester`](Tester.md)\<`T`, `U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `U` | extends (...`p`: `any`) => `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `_eq` | (`a`: `T`, `b`: `T`) => `boolean` | `undefined` |
| `_to_str` | (`t`: `T`) => `string` | `undefined` |
| `testName` | `string` | `'_default_'` |

#### Returns

[`Tester`](Tester.md)\<`T`, `U`\>

#### Defined in

[tester.ts:11](https://github.com/eransed/mathil/blob/84118e9/src/tester.ts#L11)

## Properties

### eq

• `Private` **eq**: (`a`: `T`, `b`: `T`) => `boolean`

#### Type declaration

▸ (`a`, `b`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |
| `b` | `T` |

##### Returns

`boolean`

#### Defined in

[tester.ts:5](https://github.com/eransed/mathil/blob/84118e9/src/tester.ts#L5)

___

### failed

• `Private` **failed**: `number` = `0`

#### Defined in

[tester.ts:8](https://github.com/eransed/mathil/blob/84118e9/src/tester.ts#L8)

___

### passed

• `Private` **passed**: `number` = `0`

#### Defined in

[tester.ts:7](https://github.com/eransed/mathil/blob/84118e9/src/tester.ts#L7)

___

### startTime

• `Private` **startTime**: `number`

#### Defined in

[tester.ts:9](https://github.com/eransed/mathil/blob/84118e9/src/tester.ts#L9)

___

### to\_str

• `Private` **to\_str**: (`t`: `T`) => `string`

#### Type declaration

▸ (`t`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `T` |

##### Returns

`string`

#### Defined in

[tester.ts:6](https://github.com/eransed/mathil/blob/84118e9/src/tester.ts#L6)

## Methods

### summary

▸ **summary**(): `void`

#### Returns

`void`

#### Defined in

[tester.ts:40](https://github.com/eransed/mathil/blob/84118e9/src/tester.ts#L40)

___

### test

▸ **test**(`expect`, `func`, `...params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expect` | `T` |
| `func` | `U` |
| `...params` | `any`[] |

#### Returns

`void`

#### Defined in

[tester.ts:19](https://github.com/eransed/mathil/blob/84118e9/src/tester.ts#L19)
