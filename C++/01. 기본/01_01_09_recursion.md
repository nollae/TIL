## 재귀함수(Recursion)
- 재귀함수는 정의 단계에서 자신을 재참조하는 함수
- 전달되는 상태인 매개변수가 달라질 뿐 똑같은 일을 하는 함수
- 큰 문제를 작은 부분문제로 나눠서 풀 때 사용한다.

### 팩토리얼(factorial)
>$n! = n \times (n-1) \times (n-2) \times \ldots 1$

```c++
#include <bits/stdc++.h>
using namespace std;

int fact_ret(int n){
    if(n == 1 || n == 0) return 1;
    return n * fact_ret(n-1);
}

int fact_for(int n){
    int ret = 1;
    for(int i = 1; i <= n; i++){
        ret *= i;
    }
    return ret;
}

int n = 5;

int main(){
    cout << fact_ret(n) << "\n";
    cout << fact_for(n) << "\n";
}
```

### 피보나치 수 

피보나치 수 F(n)의 점화식은 다음과 같다.

> $F_1 = F_2 = 1$
<br>
$F_n = F_n-1 = F_n-2 (n \in \{3,4, \dots\})$

0번째 항부터 시작할 경우 다음과 같이 정의된다.

>$F_0 = 0$
<br>
$F_1 = 1$
<br>
$F_n = F_n-1 = F_n-2 (n \in \{2,3,4, \dots\})$

```c++
#include <bits/stdc++.h>
using namespace std;

int fibo(int n){
    cout << "fibo : " << n << "\n";
    if(n == 0 || n == 1) return n;
    return fibo(n-1) + fibo(n-2);
}

int n = 5; 

int main(){
    cout << fibo(n) << "\n";
    return 0;
}
```

### 재귀함수 사용 시 주의사항
- 반드시 기저사례를 작성해야한다.
- 사이클이 있다면 쓰면 안된다.
- 반복문으로 될 것 같으면 반복문을 사용한다.
