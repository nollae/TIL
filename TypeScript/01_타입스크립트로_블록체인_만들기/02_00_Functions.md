# Functions

## Call Signatures

call signatures라는 것은 **함수 위에 마우스르 올렸을 때 보게 되는 걸 말한다.**
이건 사용자가 **함수를 어떻게 호출해야하는 것인지 알려준다.** 그리고 **함수의 반환 타입도 알려준다.**

```typescript
type Add = (a:number, b:number) => number; // call signature

const add:Add = (a, b) => a + b
```

## Overloading

오버로딩은 함수가 서로 다른 여러 개의 call signatures를 가지고 있을 때 발생시킨다. 

> 예시 1

```typescript
type Add = {
    (a:number, b:number) => number
    (a:number, b:string) => number
} 

const add:Add = (a, b) => {
    if(typeof b === "string") return a
    return a + b
}
```

> 예시 2

```typescript
type Config = {
    path: string,
    state: object
}
type Push = {
    (path:string):void
    (config:Config):void
}

const push:Push = (config) => {
    if(typeof config === "string") console.log(config)
    else{
        console.log(config.path, config.state)
    }
}
```

> 예시 3

이 경우에는 파라미터의 개수가 다를 때 일어나는 경우이다.

```typescript
type Add = {
    (a: number, b: number):number
    (a: number, b: number, c:number):number
}

const add:Add = (a, b, c?:number) => {
    if(c) return a + b + c
    return a + b
}
```

## Polymorphism

다형성(Polymorphism)이란 여러 다른 구조들, 여러 가지 다른 모양들, 여러 다른 형태들을 의미한다.

```typescript
type SuperPrint = {
    (arr: number[]):void
    (arr: boolean[]):void
    (arr: string[]):void
    (arr: (number|boolean)[]):void
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}

superPrint([1,2,3,4])
superPrint([true, false, true])
superPrint(["a", "b", "c"])
superPrint([1, 2, true, false])

```

위의 예시를 보면 `superPrint(...)` 안에 새로운 파라미터를 생성할 때마다 call signature를 작성해야한다. 이는 매우 비효율적이다. 이를 해결하려면 어떻게 하면 될까?

### generic

generic 이란, 타입의 placeholder 같은 것이다. concrete type을 사용하는 것 대신 쓸 수 있다.(concrete type이란 number, boolean, string, void, unknown ... 이다.)

우리는 call signature를 작성할 때, 여기 **들어올 확실한 타입을 모를 경우 generic을 사용한다.**

**generic을 사용하면 타입스크립트가 값들을 보고 타입을 유추하고 그 유추한 타입으로 call signature를 사용자에게 보여준다.**

```typescript
type SuperPrint = {
    <T>(arr: T[]):T
}

const superPrint: SuperPrint = (arr) => arr[0]

const a = superPrint([1,2,3,4])
const b = superPrint([true, false, true])
const c = superPrint(["a", "b", "c"])
const d = superPrint([1, 2, true, false])

```

## Generics Recap

제네릭은 사용자가 요구한 대로 signature를 생성해줄 수 있는 도구이다. 

만약 `superPrint` 타입 제네릭을 하나 더 추가하고 싶으면 어떻게 해야할까? 작성 방법은 아래와 같다.

```typescript
type SuperPrint = {
    <T, M>(a: T[], b:M):T
}

const superPrint: SuperPrint = (arr) => arr[0]

const a = superPrint([1,2,3,4], "x")
const b = superPrint([true, false, true],1)
const c = superPrint(["a", "b", "c"], false)
const d = superPrint([1, 2, true, false], [])

```

**타입스크립트는 제네릭을 처음 인식했을 때와 제네릭의 순서를 기반으로 제네릭의 타입을 알게 된다.**

## Conclusions

### 제네릭 사용되는 곳

> 제네릭을 사용한 타입 생성

```typescript
function superPrint<V>(a: V[]){
    return a[0]
}

const a = superPrint([1,2,3,4])
const b = superPrint([true, false, true])
const c = superPrint(["a", "b", "c"])
const d = superPrint([1, 2, true, false])

```

> 제네릭을 사용한 타입 확장 

```typescript
type Player<E> = {
    name:string
    extraInfo: E
}

type JennyExtra = {
    favFood:string
}
type JennyPlayer = Player<JennyExtra>

const jenny: JennyPlayer = {
    name:"jenny",
    extraInfo: {
        favFood:"kimchi"
    }
}

const rose: Player<null> ={
    name: "rose",
    extraInfo: null
}
```

> 제네릭 사용한 다른 예시 

```typescript
type a = Array<number>

let a:A = [1,2,3,4]

function printAllNumbers(arr: Array<number>){
    ...
}
```