#include <bits/stdc++.h>
using namespace std;

/**
 * 시각은 이상, 미만이다.
*/

int A, B, C, a, b, cnt[104], ret;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> A >> B >> C;

    for(int i = 0; i < 3; i++){
        cin >> a >> b;
        for(int j = a; j < b; j++) cnt[j]++;
    }

    for(int j = 1; j < 100; j++){
        if(cnt[j]){
            if(cnt[j] == 1) ret += A;
            else if(cnt[j] == 2) ret += B * 2;
            else if(cnt[j] == 3) ret += C * 3;
        }
    }

    cout << ret;

    return 0;
}   