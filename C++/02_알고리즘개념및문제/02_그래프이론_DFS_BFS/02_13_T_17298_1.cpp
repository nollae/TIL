#include <bits/stdc++.h>
using namespace std;
/**
 * 이건 짝짓기 문제이다. => 스택
 * 그런데!! 먼저 무식하게 풀 수 있는가를 chk!
 *  여기서는 100만 * 100만.. 너무 커서 안된다..ㅠ
 * 
 * 오큰수
 * 담아놓다 -> 결정이 되면 그 때 오큰수가 결정됨
 * stack  -> num 1 < num 2 
 *           ret이라는 변수에 오큰수 넣기. 이때 여러개 넣을테니 배열이어야 한다.
*/

int n, a[1000004], ret[1000004];
stack<int> s;

int main(){
    cin >> n;
    memset(ret, -1, sizeof(ret));
    for(int i = 0; i < n; i++){
        cin >> a[i];
        while(s.size() && a[s.top()] < a[i]){
            ret[s.top()] = a[i]; s.pop();
        }
        s.push(i);
    }

    for(int i = 0; i < n; i++){
        cout << ret[i] << " ";
    }
}