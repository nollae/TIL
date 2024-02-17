#include <bits/stdc++.h>
using namespace std;

/**
 * 적당히 복잡하게 생각하기....ㅜㅜ
 * - 경우의 수이면 무조건 long long으로 받도록 하자!
*/

int n, m;
string a, b;

int main(){
    cin >> n;

    while(n--){
        cin >> m;

        map<string, int> mp;
        
        for(int i = 0; i < m; i++){
            cin >> a >> b;
            mp[b]++;
        }
        
        long long ret = 1;

        for(auto it : mp){
            ret *= (long long)(it.second +1);
        }

        ret--;

        cout << ret << "\n";
    }
}