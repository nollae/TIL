# Overview of TypeScript

## How TypeScript Works

TypeScript는 **strongly typed 프로그래밍 언어**이다.

**타입스크립트 코드를 작성하면 타입스크립트가 일반 자바스크립트를 생성하는 것** 을 확인할 수 있다. 
이러한 이유는 브라우저가 타입스크립트가 아니라 자바스크립트를 이해하기 때문이다.

타입스크립트 코드를 작성하고 컴파일하면 보호장치없는 일반적인 자바스크립트 코드가 된다. 그러나 **타입스크립트 코드에 에러가 있으면 그 코드는 자바스크립트로 컴파일되지 않는다.**
(이러한 보호장치가 사용자가 코드를 실행하는 *런타임에 발생하는 것이 아니다.*)

## Implicit Types vs Explicit Types

Type Checker가 타입을 확인을 해주는데 2가지 방법이 있다.

1. Type을 추론하기
```typescript
let a = "hello"
```

2. Type을 구체적으로 하기
```typescript
let b : boolean = false
```

## Types of TS part One

### 타입 할당하는 방법 

> 유형 1
```typescript
let a : number = 1;
let b : string = "11";
let c : boolean[] = [true];
```

> 유형 2
```typescript
const singer : {
    name : string,
    age?: number // 1
} = {
    name:"jenny"
}

if(player.age && player.age < 10){ // 2
    ...
}
```

1. ?(optional parameter, 선택적 변수) : 해당 Key의 Value를 선택적으로 입력하도록 할 수 있다. 
2. player.age : 선택값이라서 `undefined`일 수 있으므로, if문을 작성할 때 값을 확인해줘야 한다. 

> 유형 3

```typescript
type Age = number;
type Singer = {
    name : string,
    age?: Age
}

const jenny : Singer = {
    name : "jenny"
}

const rose : Singer = {
    name : "rose",
    age : 27
}
```

위와 같이 type을 지정하여 재사용성을 높일 수 있다.

### function return 타입 할당하는 방법

```typescript
type Age = number;
type Singer = {
    name : string,
    age?: Age
}

// 일반 함수 방법
function singerMaker(name:string) : Singer {
    retrun {
        name
    }
}

// 화살표 함수 방법
const singerMaker = (name:string) : Singer => ({name})

const jenny = singerMaker("jenny")
jenny.age = 12
```

## Types of TS part Two

### readonly

```typescript
type Age = number;
type Singer = {
    readonly name : string,
    age?: Age
}

const singerMaker = (name:string) : Singer => ({name})

const jenny = singerMaker("jenny")
jenny.age = 12
jenny.name = "aa" // ... error

const numbers: readonly number[] = [1,2,3,4]
numbers.push(8) // ... error

```

readonly를 적용하면 설정한 값을 변경하려고 할 때 error를 발생시킨다.

### Tuple

Tuple은 array를 생성할 수 있게 하는데, 최소한의 길이를 가져야 하고 특정 위치에 특정 타입이 있어야 한다.

```typescript

const singer: [string, number, boolean] = ["jenny", 1, false]

const singer: readonly [string, number, boolean] = ["jenny", 1, false]

```

### undefined, null

```typescript
let a : undefined = undefined
let b : null = null

type Singer = {
    age?: number // number | undefined
```

### any

비어있는 값들을 쓰면 기본값이 any가 된다.

```typescript
let a = [] // type: any
```

any를 사용하는 것을 지양해야한다.

```typescript
const a : any[] = [1,2,3,4]
const b : any = true

a+b // error가 발생하지 않는다. 즉, typescript는 이를 문제삼지 않는다.
```

위의 코드를 보면 any를 써서 TypeScript 보호장치로부터 빠져나온 것을 확인할 수 있다.

그러나, 어떠한 때는 any가 필요한 경우가 있다. TypeScript에게 관여를 그만하라고 할 때 사용한다.

## Types of TS part Three

> [!IMPORTANT]
> TypeScript에서 중요한 포인트는 **Type Checker와 소통**하는 것이다.사용자가 코드의 타입을 설명해주면 TypeScript는 이때 발생하는 error로부터 보호해주는 것이다.

### unknown

unknown 타입 은 어떤 타입인지 모르는 변수를 나타낼 때 사용한다. 예를 들어,API로부터 응답을 받는데 그 응답의 타입을 모른다면 unknown 타입을 사용한다.

```typescript
let a : unknown;

if(typeof a === 'number'){
    let b = a + 1
}

if(typeof a === 'string'){
    let b = a.toUpperCase()
}

```

unknown을 사용하기 위해서는 먼저 `typeof`를 이용해서 타입을 확인해줘야 한다.

### void

void는 아무것도 return 하지 않는 함수를 대상으로 사용한다.

```typescript
function hello(){
    console.log("x")
} // function hello(): void
```

보통 void는 따로 지정해줄 필요는 없다.

### never

never는 함수가 절대 return하지 않을 때 발생한다.
예를 들어, 함수에서 exception(예외)이 발생할 때 말이다.

```typescript
function hello():nerver{
    return "x"
} // ... error

function hi():never{
    throw new Error("xxx")
}
```

또한 never는 타입이 두가지 일 수도 있는 상황에 발생할 수 있다.

```typescript
function hi(name:string|number){
    name + 1 // ... error : string일 수도 있기 때문이다.

    if(typeof name === "string"){
        name
    }else if(typeof name === "number"){
        name
    }else{
        name // 여기는 never이 되고 절대 실행되지 않을 것이다.
    }
}
```