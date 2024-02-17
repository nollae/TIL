#include <bits/stdc++.h>
using namespace std;

/**
 * 시간초과
*/

string s;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    
    cin >> s;
    bool flag = 0;
    sort(s.begin(), s.end());
    do{
        string temp, t;
        for(auto i : s) t += i;
        temp = t;
        reverse(t.begin(), t.end());
        if(temp == t) {
            flag = 1;
            cout << temp << "\n";
            break;
        }
    }while(next_permutation(s.begin(), s.end()));

    if(!flag) cout << "I'm Sorry Hansoo" << "\n";
}