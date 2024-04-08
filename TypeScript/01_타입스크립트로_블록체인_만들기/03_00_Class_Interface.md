# Classes and Interfaces

## Classes

```typescript
// 추상클래스는 다른 클래스가 상속받을 수 있는 클래스이다.
// 하지만 추상클래스는 직접 새로운 인스턴스를 생성할 수 없다.
abstract class User {
    constructor(
        private firstName:string,
        private lastName:string,
        private nickname:string,
        protected nickname_:string,

        
    ) {}
    // 추상 메소드를 만들 경우 call signature으로만 생성해준다.
    // 추상 메소드는 추상 클래스를 상속받는 모든 것들이 구현을 해야하는 메소드를 의미한다.
    abstract getNickName():void

    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
    private getFullName_(){
        return `${this.firstName} ${this.lastName}`
    }

}

class Player extends User {
    getNickName(){
        console.log(this.nickname) // ... error : property를 private로 만든다면, 해당 클래스를 상속하였어도 해당 property에 접금할 수 없다.
        console.log(this.nickname_)
        // 외부에서는 접근하지 못하지만, 자식 클래스에서 사용할 수 있게 하고 싶다면 property를 protected로 사용하면 된다.

    }
}

const jenny = new Player("jenny", "black", "pink");

jenny.getFullName()
jenny.getFullName_() // ... error : private하기 때문에
console.log(this.nickname_) // ... error : 외부에서 호출했기 때문에
```

JavaScript에는 protected, private, public ... 은 없지만, TypeScript에는 존재하여 제어할 수 있다.

## Recap

```typescript
type Words = {
    [key:number]: string // object type
}

// let dic :Words = {
//     "potato": "fodd"
// }

class Dict {
    private words: Words // initializer 없이 선언한 후
    constructor(){
        this.words = {}// constructor에서 수동으로 초기화 시킨다.
    } 
    add(word:Word){ // 클래스를 타입처럼 사용할 수 있다.
        if(this.words[word.term] === undefined){
            this.words[word.term] = word.def;
        }
    }
    def(term:string){
        return this.words[term]
    }
    static hello(){
        return "hello";
    }
}

class Word{
    constructor(
        public readonly term:string,
        public readonly def:string
    ){}
}

const kimchi = new Word("kimchi", "한국의 음식")

kimchi.def = "xxx" // ... error : readonly 때문

const dict = new Dict()

dict.add(kimchi);
dict.def("kimchi");

Dict.hello()

```

## Interfaces

> 타입의 다양한 사용

```typescript

type Health = number
type Friends = Array<String>

type Player = {
    nickname: string,
    healthBar: Health
}

const jenny : Player = {
    nickname: "jenny"
    healthBar: 10
}

type Food = string;

const kimchi:Fodd = "delicious"

```

> 타입 지정된 옵션으로 제한하기

```typescript
type Team = "red" | "blue" | "yellow"
type Health = 1 | 5 | 10

type Player = {
    nickname: string,
    team: Team,
    health: Health
}

const jenny : Player = {
    nickname: "jenny",
    team: "pink",  // ... error
    health: 10
}
```

> 인터페이스 사용하기

인터페이스는 오브젝트의 모양을 특정해주기 위한 것이다.

```typescript
type Team = "red" | "blue" | "yellow"
type Health = 1 | 5 | 10

interface Player {
    nickname: string,
    team: Team,
    health: Health
}

const jenny : Player = {
    nickname: "jenny",
    team: "yellow",
    health: 10
}
```

즉, 타입스크립트에서 오브젝트의 모양을 알려주는 방법에 2가지가 있다.

1. type을 쓰고 오브젝트의 모양을 써주는 방법
2. interface 쓰고 오브젝트의 모양을 써주는 방법

여기서 다른 점은 **type 키워드는 interface 키워드에 비해 좀 더 활용할 수 있는게 많다.** 

```typescript
interface Hello = string // ... error

type Hello = string // 정상 동작
```

 **즉, type 키워드는 다양하게 사용되지만 interface는 오브젝트의 모양을 설명해주는 하나의 목적으로만 사용 가능하다.**

```typescript
// property 축적
interface User {
    readonly name: string
}

interface Player extends User  {

}

const jenny : Player = {
    name: "jenny"
}
```

*(개인적으로) 타입스크립트에게 오브젝트의 모양을 알려줄 때는 인터페이스를 사용하는 것을 선호한다. 왜냐하면 이것이 더 객체지향 프로그래밍처럼 보여서 이해하기 쉽기 떄문이다.*

```typescript
// property 축적
interface User {
    name: string
}
interface User {
    lastName: string
}
interface User {
    health: string
}

const rose : User = {
    name:"rose",
    lastName: "black",
    health: 10

}
```

인터페이스의 또 다른 특징으로는 property 들을 축적시킬 수 있다는 것이다. type은 해당 기능이 불가능하다.

## Interfaces part Two

```typescript
// 추상 클래스는 해당 클래스를 상속받는 다른 클래스가 가질 property와 method를 지정하도록 해준다.
// (참고) 추상 클래스는 인스턴스 생성을 할 수 없다.
abstract class User {
    constructor(
        protected firstName:string,
        protected lastName:stirng
    ) {}
    abstract sayHi(name:string):string
    abstract fullName():string
}

class Player extends User {
    fullName(){
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name:string){
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
```

JavaScript에서 위의 추상 클래스가 일반적인 클래스로 바뀌어 버린다.

```javascript
class User {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
...
```

그러면 왜 타입스크립트에서 추상클래스를 만드는 것일까?

다른 클래스들이 표준화된 모양, 표준화된 property와 메소드를 갖도록 해주는 청사진을 만들기 위해 추상클래스를 사용한다.

이때, 인터페이스를 사용하여 더 간단하게 작성할 수 잇다.

인터페이스는 컴파일하면 JavaScript로 바뀌지 않고 사라진다.

> 추상클래스를 인터페이스로 바꿔보자.

```typescript
interface User {
    firstName:string
    lastName:stirng
    sayHi(name:string):string
    fullName():string
}

interface Human{
    health:number
}

class Player implements User, Human {
    constructor(
        // 인터페이스를 상속할 때는 property를 private, protected로 만들지 못한다. : error 가 발생한다.
        // private firstName:string,
        // private lastName:string 
        public firstName:string,
        public lastName:string,
        public health:number

    ){}
    fullName(){
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name:string){
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}

function makeUser(user: User): User{
    return {
        firstName:"jenny",
        lastName:"black",
        fullName: () => "XX",
        sayHi(name) => string
    }
}

makeUser({
    firstName:"jenny",
    lastName:"black",
    fullName: () => "XX",
    sayHi(name) => string
})
```

implements를 사용하면 코드가 더 가벼워진다. 

User 인터페이스를 추적할 수가 없는데, 인터페이스는 타입스크립트에만 존재하고 자바스크립트에서는 존재하지 않게 되기 때문이다.

> 정리

- 인터페이스는 고유한 사용처가 있다. 인터페이스는 클래스의 모양을 알려준다는 점에서 매우 유용하다. 그러면서도 자바스크립트 코드로 컴파일되지는 않는다.

- 추상클래스를 사용할 때는 그 클래스들이 자바스크립에서 보였다. 

- 인터페이스를 상속하는 것의 문제점 중 하는 private property 들을 사용하지 못한다는 것과 

- 추상 클래스에서는 constructor가 constructor()~... 이 귀찮은 부분을 해주도록 할 수 있지만 인터페이스를 사용하면 이 부분을 해줄 constructor가 없다.

- 우리가 원한다면, 하나 이상의 인터페이스를 동시에 상속할 수 있다.

- 인터페이스는 오브젝트의 모양도 결정지을 수 있지만, 클래스의 모양을 특정짓기도 한다. 또한 argument에 설정할 수도 있고, 인터페이스를 리턴할 수 도 있다.

## Recap

인터페이스는 
- 사용자가 원하는 메소드와 property를 클래스가 가지도록 강제할 수 있게 해준다.
- 그리고 인터페이스는 자바스크립트로 컴파일이 되지 않는다.
- 추상 클래스와 비슷한 보호를 제공하지만, 인터페이스는 자바스크립트 파일에서 보이지 않는다.

추상 클래스를 사용하면 자바스크립트에서는 일반적인 클래스로 바뀐다.
파일 크기가 좀 더 커지고, 추가 클래스가 만들어진다는 뜻이다.

**만약 추상 클래스를 다른 클래스들이 특정 모양을 따르도록 하기 위한 용도로 쓴다면 같은 역할을 하는 인터페이스를 사용하는 것이 더 좋다.**

```typescript
type PlayerA = {
    name:string
}
type PlayerAA = PlayerA & {
    lastName:string
}
const playerA: PlayerA = {
    name: "jenny",
    lastName: "xx"
}
type PlayerAA ... // ... error
//////////////
interface PlayerB {
    name:string
}
interface PlayerBB extends PlayerB {
    lastName:string
}
interface PlayerB {
    health:number
}

const playerB: PlayerB = {
    name: "jenny", 
    lastName: "xx",
    health: 10
}
```

**type과 interface 두 가지 모두 추상 클래스를 대체할 수 있다.**

```typescript

type PlayerA = {
    firstName:string
}
interface PlayerB {
    firstName:string
}
class User implements PlayerA {
    constructor(
        public  firstName:string
    ){}
}
class User implements Playerㅠ {
    constructor(
        public  firstName:string
    ){}
}
``` 

타입스크립트 커뮤니티에서는 **클래스나 오브젝트의 모양을 정의하고 싶으면 인터페이스를 사용하고, 다른 모든 경우에서는 타입을 쓰라고 하고 있다.**

## Polymorphism

- 다형성(Polymorphism)은 다른 모양의 코드르 가질 수 있게 해주는 것이다. 
- 다형성을 이룰 수 있는 방법은 `제네릭`을 사용하는 것이다.
- 제네릭은 `placeholder` 타입을 쓸 수 있도록 해준다.
때가 되면, 타입스크립트가 placeholder 타입을 `concrete` 타입으로 바꿔준다. 이는 *같은 코드를 다른 타입에 대해서 쓸 수 있도록 해준다.*

> 브라우저에서 쓰는 로컬 스토리지 API와 비슷한 API를 만들어보자.

```typescript
interface SStorage<T> {
    // key가 제한되지 않은 오브젝트를 정의하게 해준다.
    [key:stirng]: T
}

class LocalStorage<T> {
    private storage: SStorage<T> = {}
    set(key:string, value:T){
        this.storage[key] = value;
    }
    remove(key:string){
        delete this.storage[key]
    }
    get(key:string):T{
        return thi.storage[key]
    }
    clear(){
        this.storage = {}
    }
}

const stringsStorage = new LocalStorage<string>();

```