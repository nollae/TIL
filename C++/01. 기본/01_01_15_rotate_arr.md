## 1차원 배열 회전
배열 {1, 2, 3,4,5,6}에서 시계방향으로 한칸 움직이면{6, 1, 2, 3, 4, 5}가 되고 반시계방향으로 한칸 움직이면 {2, 3, 4, 5, 6, 1}이 되는 것을 볼 수 있다.

### rotate()를 이용한 방법

```c++
 ForwardIterator rotate (ForwardIterator first, ForwardIterator middle, ForwardIterator last);
```

#### 반시계방향 구축
```c++
#include <bits/stdc++.h>
using namespace std; 
int main(){
    vector<int> v = {1, 2, 3, 4, 5, 6}; 
    rotate(v.begin(), v.begin() + 1, v.end()); 
    for(int i : v) cout << i << ' ';
}
```

만약 배열의 전체가 아닌 일부분만 회전시키고 싶다면 아래와 같다.

```c++
#include <bits/stdc++.h>
using namespace std; 
int main(){
    vector<int> v = {1, 2, 3, 4, 5, 6}; 
    rotate(v.begin() + 1, v.begin() + 2, v.begin() + 5); 
    for(int i : v) cout << i << ' ';
}
```

#### 시계방향 구축
```c++
#include <bits/stdc++.h>
using namespace std; 
int main(){
    vector<int> v = {1, 2, 3, 4, 5, 6}; 
    rotate(v.rbegin(), v.rbegin() + 1, v.rend()); 
    for(int i : v) cout << i << ' ';
}
```

### 직접 구현하는 방법

```c++
#include <bits/stdc++.h>
using namespace std; 
int main(){
    vector<int> v = {1, 2, 3, 4, 5, 6}; 
    int i = 1;
    int temp = v[i];
    v[i] = v[i + 1];
    v[i + 1] = v[i + 2];
    v[i + 2] = v[i + 3];
    v[i + 3] = temp;
    for(int i : v) cout << i << ' ';
```

## 2차원 배열 회전

```c++
#include <bits/stdc++.h>
using namespace std;

const int n = 3; 
const int m = 4;

void rotate_left_90(vector<vector<int>> &key){
    int n = key.size();
    int m = key[0].size();
    vector<vector<int>> temp(m, vector<int>(n, 0));
    
    for(int i = 0; i < m; i++){ for(int j = 0; j < n; j++){
            temp[i][j] = key[j][m - i - 1];
        }
    }
    key.resize(m);
    key[0].resize(n);
    
    key = temp;
    return;
}

void rotate_right_90(vector<vector<int>> &key){
    int n = key.size();
    int m = key[0].size();
    vector<vector<int>> temp(m, vector<int>(n, 0));

    for(int i = 0; i < m; i ++){
        for(int j = 0; j < n; j++){
            temp[i][j] = key[n - j - 1][i];
        }
    }
    key.resize(m);
    key[0].resize(n);

    key = temp;
    return;
}

int main(){
    ios::sync_with_stdio(0); cin.tie(0);
    vector<vector<int>> a = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12},
    };
    rotate_right_90(a); 
    for(int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){ 
            cout << a[i][j] << " ";
        }
        cout << '\n';
    }
    return 0;
}
```

## 2차원 배열 대칭
```c++
#include<bits/stdc++.h>
using namespace std;
vector<vector<int>> v = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}; 
int b[3][3];

int main(){
    for(int i = 0; i < 3; i++){ 
        for(int j = 0; j < 3; j++){
            b[j][i] = v[i][j];
        }
    }

    for(int i = 0; i < 3; i++){ 
        for(int j = 0; j < 3; j++){ 
            cout << b[i][j] << " ";
        }
        cout << '\n';
    }
    return 0; 
}

