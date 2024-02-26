#include <bits/stdc++.h>
using namespace std;

/**
 * 필요에 따라 자료구조 2개이상 사용하는 것 고려하기
*/

int n, c, a;
vector<pair<int, int>> v;
map<int, int> mp, mp_f;

bool cmp(pair<int, int> a, pair<int, int> b){
    if(a.first == b.first)
        return mp_f[a.second] < mp_f[b.second];
    return a.first > b.first;
}

int main(){
    cin >> n >> c;

    for(int i = 0; i < n; i++){
        cin >> a;
        mp[a]++;
        if(mp_f[a] == 0) mp_f[a] = i + 1;
    }

    for(auto it : mp){
        v.push_back({it.second, it.first});
    }

    sort(v.begin(), v.end(), cmp);

    for(auto it : v){
        for(int i = 0; i < it.first; i++){
            cout << it.second << " ";
        }
    }
}