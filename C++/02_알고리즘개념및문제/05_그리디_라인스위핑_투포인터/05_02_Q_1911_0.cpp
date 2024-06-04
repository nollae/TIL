#include <bits/stdc++.h>
using namespace std;

int n, l, ret, b, idx;

int main(){

    cin >> n >> l;
    vector<pair<int, int>> v(n);
    for(int i = 0; i < n; i++){
        cin >> v[i].first >> v[i].second;
    }
    sort(v.begin(), v.end());

    for(int i = 0; i < n; i++){
        if(v[i].second <= idx) continue;
        if(idx < v[i].first){
            b = (v[i].second - v[i].first)/l + ((v[i].second - v[i].first)%l ? 1 : 0 );
            idx = v[i].first + b * l;
        }
        else{
            b = (v[i].second - idx) / l + ((v[i].second - idx) % l ? 1 : 0);
            idx = idx + b * l;
        }
        ret += b;
    }

    cout << ret;

    return 0;
}