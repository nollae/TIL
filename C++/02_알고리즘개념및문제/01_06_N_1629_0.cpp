#include <bits/stdc++.h>
using namespace std;

/**
 * (틀렸음)
 * 재귀함수를 이용하면 시간복잡도를 줄일 수 있다.
 * 
 * 곱할 때마다 모듈러 연산을 하자.
 * 
 * 어려워도 화이팅.
*/

long long a, b, c, ret;

long long go(long long a, long long b){

    if(b == 1) return a % c;

    long long ret = go(a, b/2);

    ret = (ret * ret) % c;

    if(b % 2) ret = (ret * a) %c;

    return ret;
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> a >> b >> c;
    cout << go(a, b) << "\n";
}