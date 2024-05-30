#include <bits/stdc++.h>
using namespace std;

int n;

int main(){
    cin >> n;
    vector<pair<int, int>> v(n);

    for(int i = 0; i < n; i++){
        cin >> v[i].first >> v[i].second;
    }
    sort(v.begin(), v.end());
    int rt = v[0].first + v[0].second;
    for(int i = 1; i < n; i++){
        rt = max(rt, v[i].first);
        rt += v[i].second;
    }

    cout << rt;
    
}