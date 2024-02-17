#include <bits/stdc++.h>
using namespace std;

int n, m;
string s, q[100004];
map<int, string> mp;
map<string, int> mp2;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> n >> m;
    for(int i = 0; i < n; i++){
        cin >> s;
        mp[i+1] = s;
        mp2[s] = i+1;
    }

    for(int i = 0; i < m; i++){
        cin >> q[i];
    }
    for(int i = 0; i < m; i++){
        
        if(atoi(q[i].c_str())){
            cout << mp[atoi(q[i].c_str())] << "\n";
        }else{
            cout << mp2[q[i]] << "\n";
        }
    }
}