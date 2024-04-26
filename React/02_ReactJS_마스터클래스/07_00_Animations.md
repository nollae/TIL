# Animations

## Introduction

### Framer Motion

**React용 production-ready 모션 라이브러리 (오픈 소스)**

🔗 
https://www.framer.com/motion
<br>
🔗 https://github.com/framer/motion

```npm
npx create-react-app my-app --template typescript
```

## Installation

```npm
npm i framer-motion
```

```typescript
import { motion } from "framer-motion"
```

## Basic Animations

### Animation

Framer Motion의 애니메이션은 모션 컴포넌트의 유연한 animate 속성을 통해 제어된다. 간단한 애니메이션의 경우 animate props에서 직접 값을 설정할 수 있다.

```typescript
<motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }}>  </motion.div>
```
🔗 https://www.framer.com/docs/animation

### initial: boolean | Target | VariantLabels (애니메이션의 초기값 지정)

속성, 변형 레이블 또는 시작할 변형 레이블의 배열이다.
animate의 값으로 초기화하려면 false로 설정한다(마운트 애니메이션 비활성화).

🔗 https://www.framer.com/docs/component/###initial

### Transition

Transition은 값이 한 상태에서 다른 상태로 움직이는 방식을 정의한다.
또한 Tween, Spring 또는 Inertia를 사용할 애니메이션 유형을 정의하는 소품을 허용할 수 있다.

```typescript
<motion.div animate={{ rotate: 180 }} transition={{ type: 'spring' }}> </motion.div>
```

🔗 https://www.framer.com/docs/transition

## Variants part One

### Variants

Variants은 컴포넌트가 가질 수 있는 미리 정의된 시각적 state이다.

```typescript
const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

<motion.div initial="hidden" animate="visible" variants={variants}>  </motion.div>
```

🔗 https://www.framer.com/docs/introduction/##variants

## Variants part Two

### Orchestration

#### delayChildren
딜레이 시간(초) 후에 하위 애니메이션이 시작된다.

####  staggerChildren

하위 컴포넌트의 애니메이션에 지속 시간(초)만큼 시차를 둘 수 있다. 

예를 들어, staggerChildren이 0.01이면 첫 번째 자식은 0초, 두 번째 자식은 0.01초, 세 번째 자식은 0.02초 지연되는 식이다. 

계산된 stagger 딜레이가 delayChildren에 추가된다.

🔗 https://www.framer.com/docs/transition/#orchestration

##### inherit: boolean
부모로부터 variant 변경 사항을 상속하지 않도록 하려면 false로 설정한다.

##### custom: any
각 애니메이션 컴포넌트에 대해 dynamic variants을 다르게 사용할 사용자 지정 데이터이다.

```typescript
const variants = {
visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom * 0.2 }
    })
}

< motion.div inherit={false} custom={0} animate="visible" variants={variants} / >
< motion.div custom={1} animate="visible" variants={variants} / >
< motion.div custom={2} animate="visible" variants={variants} / >
```

🔗 https://www.framer.com/docs/component/###inherit

##### place-items (Container Properties)
justify-items과 align-items를 합친 축약형

##### place-self (Item Properties)
justify-self와 align-self를 합친 축약형

> App.tsx

demo에 나와있는 Variants를 구현해보자.

```typescript
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
}

export default App;
```

## Gestures part One

### Hover
hover 제스처는 포인터가 컴포넌트 위로 이동하거나 컴포넌트를 떠날 때를 감지한다. onMouseEnter 및 onMouseLeave와는 달리 실제 마우스 이벤트의 결과로만 호버가 실행되도록 보장된다.

#### whileHover: VariantLabels | TargetAndTransition
호버 제스처가 인식되는 동안 애니메이션할 속성 또는 변형 레이블이다.

```typescript
< motion.div whileHover={{ scale: 0.8 }} / >
```

🔗 https://www.framer.com/docs/gestures/#hover

### Tap

#### whileTap: VariantLabels | TargetAndTransition
컴포넌트를 누르고 있는 동안 애니메이션할 속성 또는 변형 레이블이다.

```typescript
< motion.div whileTap={{ scale: 0.8 }} / >
```

🔗 https://www.framer.com/docs/gestures/#tap

### Drag

#### drag: boolean | "x" | "y"

이 요소에 대해 끌기를 활성화한다. 기본적으로 false로 설정된다. 양방향으로 드래그하려면 true로 설정해야한다. 특정 방향으로만 드래그하려면 "x" 또는 "y"를 설정한다.

```typescript
< motion.div drag="x" / >
```

#### whileDrag: VariantLabels | TargetAndTransition

드래그 제스처가 인식되는 동안 애니메이션할 속성 또는 변형 레이블이다.

```typescript
< motion.div whileDrag={{ scale: 1.2 }} / >
```

🔗 https://www.framer.com/docs/gestures/#drag

## Gestures part Two

### dragConstraints

허용된 드래그 가능 영역에 제약 조건을 적용하다.
dragConstraints 에는 드래그 가능한 컴포넌트의 가장자리 거리를 정의한다. (드래그 가능한 영역에 가장자리에서 얼마만큼까지 허용할 것인지 지정)

```typescript
// 픽셀 이용
< motion.div drag="x" dragConstraints={{ left: 0, right: 300 }}/ >

// ref이용
const MyComponent = () => {
const constraintsRef = useRef(null)

return (
< motion.div ref={constraintsRef}>
< motion.div drag dragConstraints={constraintsRef} />
< /motion.div>
)
}
```

### dragSnapToOrigin: boolean
true인 경우 드래그 가능한 요소는 드래그를 놓을 때, 원점으로 다시 애니메이션된다.

```typescript
dragSnapToOrigin={true}
```

### dragElastic: DragElastic

외부 제약 조건에서 허용되는 이동 정도. 0 = 움직임 없음, 1 = 전체 움직임. 기본적으로 0.5로 설정된다. 움직임을 비활성화하기 위해 false로 설정할 수도 있다.

```typescript
dragElastic={0.2}
```

🔗 https://www.framer.com/docs/gestures/#drag

## MotionValues part One

### MotionValue

MotionValues는 애니메이션 값의 상태(state)와 속도(velocity)를 추적한다. 모든 모션 컴포넌트는 내부적으로 MotionValues를 사용하여 애니메이션 값의 상태와 속도를 추적한다. 일반적으로 이들은 자동으로 생성된다. (MotionValue는 React State가 아니기 때문에 Motion Value값이 바뀌어도 리랜더링이 일어나지 않는다.)

```typescript
import { motion, useMotionValue } from "framer-motion"

export function MyComponent() {
const x = useMotionValue(0)
return < motion.div style={{ x }} />
}
```

#### useMotionValue

```typescript
const x = useMotionValue(0)
```

useMotionValue 후크로 MotionValues를 생성할 수 있다. useMotionValue에 전달된 값은 MotionValue의 초기 상태로 작동한다.

##### set

```typescript
x.set(100)
```

set 메서드로 업데이트할 수 있다.이것은 React 리렌더링을 트리거하지 않는다.

##### get

```typescript
x.get() // 100
```

MotionValue는 문자열이나 숫자가 될 수 있다. get 메소드로 값을 읽을 수 있다.

🔗 https://www.framer.com/docs/motionvalue/

## MotionValues part Two

### useTransform

useTransform 훅을 통해 MotionValues를 연결한다.

useTransform()는 한 값 범위에서 다른 값 범위로 매핑하여 다른 MotionValue의 output을 변환하는 MotionValue를 만든다.
x(Motion Value)값을 다른 output값으로 변환해준다.


```typescript
// ex) x: -400 => 1
const x = useMotionValue(0)
const input = [-200, 0, 200]
const output = [0, 1, 0]
const opacity = useTransform(x, input, output)

return < motion.div drag="x" style={{ x, opacity }} />
```

🔗 https://www.framer.com/docs/motionvalue/##usetransform

## MotionValues part Three

### useViewportScroll(): ScrollMotionValues

뷰포트가 스크롤될 때 업데이트되는 MotionValues를 리턴한다.
아래 값들은 모두 MotionValue< number >를 넘겨준다.
- scrollX: 실제 수평 스크롤 픽셀 ex) 500px
- scrollY: 실제 수직 스크롤 픽셀 ex) 500px
- scrollXProgress : 0 ~ 1 사이의 수평 스크롤
- scrollYProgress : 0 ~ 1 사이의 수직 스크롤(가장 상단 0, 가장 하단 1)

```typescript
export const MyComponent = () => {
    const { scrollYProgress } = useViewportScroll()
    return < motion.div style={{ scaleX: scrollYProgress }} />
}
```

🔗 https://www.framer.com/docs/motionvalue/##useviewportscroll

## SVG Animation

[Fontawesome Airbnb Logo](https://fontawesome.com/v5.15/icons/airbnb?style=brands)

*< />모양 클릭해서 svg복사 후 사용*

### Line drawing
svg 엘리먼트에 'pathLength', 'pathSpacing', 'pathOffset' 속성을 사용하여 Line drawing 애니메이션을 만들 수 있다.

🔗 https://www.framer.com/docs/examples/#line-drawing

#### path (SVG)
path SVG 엘리먼트는 모양을 정의하는 일반 엘리먼트이다. 모든 기본 모양은 path 엘리먼트로 만들 수 있다. path의 속성 d는 경로의 모양을 정의한다.

🔗 https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path

motion.path 컴포넌트는 세 가지 강력한 SVG path 속성인 pathLength, pathSpacing 및 pathOffset을 가지고 있다. 수동 경로 측정이 필요 없이 모두 0과 1 사이의 값으로 설정된다.

### Line drawing

선 그리기 애니메이션은 pathLength, pathSpacing 및 pathOffset의 세 가지 특수 속성을 사용하여 많은 SVG 요소로 만들 수 있다.

```typescript
<motion.circle initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}>  
```

🔗 https://www.framer.com/docs/examples/#line-drawing

## AnimatePresence

