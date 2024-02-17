#include <bits/stdc++.h>
using namespace std;

/**
 * (못풀엇음 ㅠㅠ)
 * 모듈러 연산 활용하기
*/

typedef long long ll;
int n;

int main(){
    
    while(scanf("%d", &n) != EOF){
        ll cnt = 1, ret = 1;
        while(true){
            if(cnt % n == 0){
                printf("%lld\n", ret);
                break;
            }else{
                cnt = (cnt * 10) + 1;
                cnt %= n;
                ret++;
            }
        }
    }

}