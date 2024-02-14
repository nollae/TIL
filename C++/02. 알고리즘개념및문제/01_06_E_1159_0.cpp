#include <bits/stdc++.h>
using namespace std;

/**
 * 추가적으로 생각해야할 부분.
 * 1) count 생각나야하고, 좌표이동까지 생각해야한다.
 * 2) 아스키코드 활용이 많으니 항상 염두해두기.
 * 1) 간단하게 생각하자...ㅠㅠ..ㅠ.ㅠ..
 * 2) mp.find(s[0]) != mp.end() ? 값이 존재한다 : 값이 존재하지 않는다.
*/

int cnt;
string s, ret;
map<char, int> mp;

int main(){
    cin >> cnt;

    for(int i = 0; i < cnt; i++){
        cin >> s;
        if(mp.find(s[0]) != mp.end()){
            mp[s[0]]++;
        }else{
            mp[s[0]] = 1;
        }
    }

    for(auto c : mp){
        if(c.second >= 5) ret += c.first;
    }

    if(ret.length() != 0) cout << ret;
    else{ cout << "PREDAJA"; }
}
