## 순열(permutation)
순열이란, 순서가 정해진 임의의 집합을 다른 순서로 섞는 연산을 말한다.

> ${_n}P{_r} = \frac{n!}{(n-r)!} $

### next_permutation과 prev_permutation
`next_permutation`은 오름차순의 배열을 기반으로 순열을 만들 수 있으며, `prev_permutation`은 내림차순의 배열을 기반으로 순열을 만들 수 있다.

[first, last)

```c++
#include <bits/stdc++.h>
using namespace std;

void print(vector<int> &v){
    for(int i = 0; i < v.size(); i++){
        cout << v[i] << " ";
    }
    cout << "\n";
}

int main(){
    int a[3] = {1,2,3};
    vector<int> v;
    for(int i = 0; i < 3; i++)v.push_back(a[i]);

    do{
        print(v);
    }while(next_permutation(v.begin(), v.end()));
    
    cout << "-------------" << '\n';
    v.clear();

    for(int i = 2; i >= 0; i--)v.push_back(a[i]);
    do{
        print(v);
    }while(prev_permutation(v.begin(), v.end()));
    
    return 0;
}
```

end() 대신 다음처럼 표현할 수 있다
```c++
do{ 
    print(v);
}while(next_permutation(v.begin(), v.begin() + 2));
```

### next_permutation() 사용 시 주의할 점
배열을 "오름차순"으로 정렬을 해서 쓰는게 중요하다.

### next_permutation() 원리
새로운 순열이 이전 순열보다 사전순으로 큰 경우 true를 반환한다. 그러다가 마지막 순열에 도달하고 범위가 첫 번재 순열로 재설정된 경우 false를 반환하는 함수이다.

```c++
do{
    flag = next_permutation(a, a+3)
}while(flag)
```

### 재귀를 이용한 순열

```c++
#include <bits/stdc++.h>
using namespace std;

int a[3] = {1,2,3};
int n = 3, r = 3;

void print(){
    for(int i = 0; i < r; i++){
        cout << a[i] << " ";
    }
    cout << "\n";
}

void makePermutation(int n, int r, int depth){
    if(r == depth){
        print();
        return;
    }
    for(int i = depth; i < n; i++){
        swap(a[i], a[depth]);
        makePermutation(n, r, depth + 1);
        swap(a[i], a[depth]);
    }
    return;
}

int main(){ 
    makePermutation(n, r, 0); 
    return 0;
}
```