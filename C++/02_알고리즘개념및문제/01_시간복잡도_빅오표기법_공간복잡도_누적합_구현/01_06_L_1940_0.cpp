#include <bits/stdc++.h>
using namespace std;

/**
 * 조합과 순열의 차이는 '순서여부'만 해당된다.
 * 배열은 개수 기준으로 크기 카운트..
*/

int n, m, cnt = 0;
int s[10000004];

int main(){
    cin >> n;
    cin >> m;

    for(int i = 0; i < n; i++){
        cin >> s[i];
    }

    for(int i = 0; i < n; i++){
        for(int j = 0; j < i; j++){
            if(s[i]+ s[j] == m) cnt++;
        }
    }
    

    cout << cnt;



}