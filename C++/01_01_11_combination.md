## 조합
조합은 순서 상관없이 특정 개수를 뽑을 때 사용한다.

> ${_n}C{_r} = \frac{n!}{r!(n-r)!}$

### 재귀를 이용한 조합
```c++
#include <bits/stdc++.h>
using namespace std;

int n = 5, k = 3, a[5] = {1,2,3,4,5};

void print(vector<int> b){
for(int i : b)cout << i << " ";
    cout << '\n';
}

void combi(int start, vector<int> b){
    if(b.size() == k){
        print(b);
        return;
    }
    for(int i = start + 1; i < n; i++){
        b.push_back(i);
        combi(i, b);
        b.pop_back();
    }
    return;
}

int main() { 
    vector<int> b;
    combi(-1, b); 
    return 0;
}
```

### 중첩for문
[방법1]
```c++
#include <bits/stdc++.h>
using namespace std;

int n = 5, k = 3, a[5] = {1,2,3,4,5};

int main(){
    for(int i = 0; i < n; i++){
        for(int j = i + 1; j < n; j++){
            for(int k = j + 1; k < n; k++){
                cout << i << " " << j << " " << k << "\n";
            }
        }
    }
}
```

[방법2]
```c++
#include <bits/stdc++.h>
using namespace std;

int n = 5, k = 3, a[5] = {1,2,3,4,5};

int main(){
    for(int i = 0; i < n; i++){
        for(int j = 0; j < i; j++){
            for(int k = 0; k < j; k++){
                cout << i << " " << j << " " << k << '\n';
            }
        }
    }
    return 0;
}
```

### 조합의 특징 : nCr = nC(n - r)