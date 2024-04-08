# TypeScript Blockchain

## Introduction

NestJS, NextJS, Create-React-App(CRA)를 사용하는 대부분의 사용자들은 수동으로 타입스크립트 프로젝트를 설정할 일이 거의 없다.
왜냐하면 *이런 프레임워크랑 라이브러리, 패키지들이 알아서 타입스크립트 프로젝트를 만들어주기 떄문이다.*

**그러나, 우리가 다룰 내용을 이해하는 것은 중요하다.**

블록체인의 PoC(개념증명)를 객체 지향 프로그래밍을 활용하는 타입스크립트로 만들어보면서 알아보고자 한다.

## Targets

1. folder 생성하기
2. 새로운 nodejs 프로젝트 만들기
    ```npm
    npm init -y
    ```
3. `package.json` 에서 main 제거 / scripts의 test 제거
    ```json
    {
    "name": "00_typechain",
    "version": "1.0.0",
    "description": "",
    "scripts": {
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
    }
    ```
4. typescript 설치하기
    ```npm
    npm i -D typescript
    ```
5. `src` folder 생성하고 `index.ts` file 생성하기
6. `tsconfig.json` 파일 생성하기<br>
`tsconfig.json` 이 있으면, **VSCode는 우리가 타입스크립트로 작업한다는 것을 즉시 알게되고, 자동완성기능을 제공해줄 것이다.**
    ```npm
    touch tsconfig.json
    ```
 
    **[ tsconfig.json에서 해야할 작업내용 ]**
    ```json
    {
        "include": [
            "src" // ts가 src의 모든 파일을 확인한다는 것을 의미한다.
        ],
        "compilerOptions": {
            "outDir": "build", // build라는 폴더에 만들어진 코드를 넣는다는 것을 의미한다. 
            "target": "ES6" 
        }
    }
    ```

    1. `include`의 배열에는 우리가 자바스크립트로 컴파일하고 싶은 모든 디렉토리를 넣어준다.
    2. `compilerOptions`에서 `outDir`는 자바스크립트 파일이 생성될 디렉터리를 지정한다.<br>
    타입스크립트는 컴파일러이므로, 이 파일들을 일반적인 자바스크립트로 컴파일 시켜준다.그래서 우리는 타입스크립트에게 자바스크립트 파일을 어디에 생성을 해줘야 하는지 알려줘야 한다.
    3. `compilerOptions`에서 `target`은 어떤 버전의 자바스크립트로 타입스크립트를 컴파일하고 싶은지를 나타낸다.


7. `package.json`에서 scripts에 아래와 같이 작성해준다.
    ```json
    "scripts": {
        "build": "tsc"
    }
    ```
8. `npm run build` 실행하면 `build`라는 folder가 생성된다. 그 안에는 `index.js`라는 자바스크립트가 생성되어 있다.

## Lib Configuration

```json
{
    "include": [
        "src"
    ],
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6",
        "lib": ["ES6", "DOM"], // here
        "strict": true // ts가 작동하여 실수를 체크해준다.
    },
}
```

`tsconfig.json`에서 `lib`은 자바스크립트 코드가 어디에서 동작할지를 알려주는 역할을 한다.
어떤 환경인지 즉, **자바스크립의 어떤 버전이 그 환경에서 사용되는지를 의미한다.**

lib에 작성된 것들을 기반으로, **사용자는 타입스크립트가 어디서 동작할 것인지를 알려줄 수 있다.**
그래서 타입스크립트는 사용자가 사용할 API가 무엇인지 알게됨으로 **자동완성 기능**을 제공해 줄 수 있다.

## Declaration Files

> [!NOTE]
> 타입스크립트는 내장된 자바스크립트 API를 위한 **기본적인 타입 정의는 가지고 있다.**<br>
타입 정의는 사용자가 타입스크립트에게 몇몇 자바스크립트 코드의 타입을 설명해 주기 위해 사용하는 것이다.

대부분 우리는 타입스크립트로 만들어지 패키지는 사용하지 않을 것이다.
대신 *자바스크립트로 만들어진 패키지와 라이브러리를 사용*하게 되는데, **이때 사용자는 타입스크립트에게 그 자바스크립트 파일의 모양을 설명해줘야 한다.**

> `myPackage.js`를 만들어보자.

1. js 파일에 함수를 생성한다.
    ```javascript
    // js
    export  function init(cofig){
        return true;
    }

    export function exit(code){
        return code + 1;
    }
    ```
2. index.ts 파일에서 js가 node의 모듈인 것처럼 행동하게 한다.
3. 이때 에러가 발생하는데, 타입스크립트에게 js에 대한 설명을 해줘야 하기 때문이다.
    ```typescript
    // ts
    import {init} from "myPackage";
    ```

> `myPackage.d.ts`를 생성하자.

1. 생성한 ts에서 모듈 하나를 선언한다.
    ```typscript
    // d.ts
    declare module "myPackage" {
        
    }
    ```
2. 이때 타입스크립트가 해당 파일이 존재한다는 것은 알지만, 그 안에 function(init, exit...)이 있는지 모른다.
3. d.ts의 정의 파일에서 호출 시그니처 즉, 타입만 써주면 된다.
    ```typescript
    // d.ts
    interface Config {
        url: string;
    }

    declare module "myPackage" {
        function init(config:Config):boolean;
        function exit(code:number):number;
    }
    ```

    ```javascript
    import {init, exit} from "myPackage";

    init({
        url:"true"
    })

    exit(1)
    ```
    
## JSDoc

