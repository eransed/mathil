[mathil - v0.12.0](../README.md) / [Exports](../modules.md) / EveryInterval

# Class: EveryInterval

## Table of contents

### Constructors

- [constructor](EveryInterval.md#constructor)

### Properties

- [currentTick](EveryInterval.md#currenttick)
- [maxTicks](EveryInterval.md#maxticks)

### Methods

- [tick](EveryInterval.md#tick)

## Constructors

### constructor

• **new EveryInterval**(`maxTicks`): [`EveryInterval`](EveryInterval.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxTicks` | `number` |

#### Returns

[`EveryInterval`](EveryInterval.md)

#### Defined in

[other.ts:6](https://github.com/eransed/mathil/blob/84118e9/src/other.ts#L6)

## Properties

### currentTick

• `Private` **currentTick**: `number` = `0`

#### Defined in

[other.ts:3](https://github.com/eransed/mathil/blob/84118e9/src/other.ts#L3)

___

### maxTicks

• `Private` **maxTicks**: `number` = `1`

#### Defined in

[other.ts:4](https://github.com/eransed/mathil/blob/84118e9/src/other.ts#L4)

## Methods

### tick

▸ **tick**(`callback`, `_maxTicks?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `callback` | () => `void` | `undefined` |
| `_maxTicks` | ``null`` \| `number` | `null` |

#### Returns

`void`

#### Defined in

[other.ts:10](https://github.com/eransed/mathil/blob/84118e9/src/other.ts#L10)
