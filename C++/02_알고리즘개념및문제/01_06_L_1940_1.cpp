#include <bits/stdc++.h>
using namespace std;

/**
 * 예외처리 경우도 생각하자..
*/
int n, m, cnt = 0;
int s[15001];

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> n;
    cin >> m;

    for(int i = 0; i < n; i++){
        cin >> s[i];
    }

    if(m > 200000) cout << 0 << "\n";
    else{
        for(int i = 0; i < n; i++){
            for(int j = 0; j < i; j++){
                if(s[i]+ s[j] == m) cnt++;
            }
        }
        cout << cnt;
    }
    

    



}