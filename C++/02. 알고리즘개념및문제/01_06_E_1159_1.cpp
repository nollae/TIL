#include <bits/stdc++.h>
using namespace std;

/**
 * 1) count 생각나야하고, 좌표이동까지 생각해야한다.
 * 2) 아스키코드 활용이 많으니 항상 염두해두기.
*/

string s, ret;
int n, cnt[26];

int main(){
    cin >> n;

    for(int i = 0; i < n; i++){
        cin >> s;
        cnt[s[0] - 'a']++;
    }

    for(int i = 0; i < 26; i++){
        if(cnt[i] >= 5) ret += (i +'a');
    }
    
    if(ret.size()) cout << ret;
    else cout << "PREDAJA";
}