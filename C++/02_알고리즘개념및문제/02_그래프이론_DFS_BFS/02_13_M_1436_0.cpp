#include <bits/stdc++.h>
using namespace std;

/**
 * 문제를 풀 때 일단
 * 1) 무식하게 풀 수 있는가
 *    1000만 정도는 오키
 *    (내생각) 무식함은 원초적인 반복을 의미하는듯
 * 2) 그다음 알고리즘(완탐 -> dp -> 그리디, 이분탐색)을 사용할 수 있는가
 * 
*/

int n; 

int main(){
    cin >> n;
    int i = 666;
    for(;; i++){
        if(to_string(i).find("666") != string::npos) n--;
        if(n == 0) break;
    }
    cout << i;
}
