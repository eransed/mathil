[mathil - v0.13.0](../README.md) / [Exports](../modules.md) / Pinger

# Class: Pinger

## Table of contents

### Constructors

- [constructor](Pinger.md#constructor)

### Properties

- [accRttUs](Pinger.md#accrttus)
- [outstandingPings](Pinger.md#outstandingpings)
- [pingSentCount](Pinger.md#pingsentcount)
- [port](Pinger.md#port)

### Methods

- [averageRttUs](Pinger.md#averagerttus)
- [bounceServer](Pinger.md#bounceserver)
- [handlePingRes](Pinger.md#handlepingres)
- [ping](Pinger.md#ping)
- [pingReq](Pinger.md#pingreq)
- [test](Pinger.md#test)

## Constructors

### constructor

• **new Pinger**(): [`Pinger`](Pinger.md)

#### Returns

[`Pinger`](Pinger.md)

## Properties

### accRttUs

• `Private` **accRttUs**: `number` = `0`

#### Defined in

ping.ts:53

___

### outstandingPings

• `Private` **outstandingPings**: [`PingData`](../interfaces/PingData.md)[] = `[]`

#### Defined in

ping.ts:51

___

### pingSentCount

• `Private` **pingSentCount**: `number` = `0`

#### Defined in

ping.ts:52

___

### port

• `Private` **port**: `number` = `8080`

#### Defined in

ping.ts:54

## Methods

### averageRttUs

▸ **averageRttUs**(): `number`

#### Returns

`number`

#### Defined in

ping.ts:56

___

### bounceServer

▸ **bounceServer**(): `void`

#### Returns

`void`

#### Defined in

ping.ts:129

___

### handlePingRes

▸ **handlePingRes**(`res`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | [`PingData`](../interfaces/PingData.md) |

#### Returns

`void`

#### Defined in

ping.ts:72

___

### ping

▸ **ping**(): `void`

#### Returns

`void`

#### Defined in

ping.ts:89

___

### pingReq

▸ **pingReq**(): [`PingData`](../interfaces/PingData.md)

#### Returns

[`PingData`](../interfaces/PingData.md)

#### Defined in

ping.ts:63

___

### test

▸ **test**(): `void`

#### Returns

`void`

#### Defined in

ping.ts:181
