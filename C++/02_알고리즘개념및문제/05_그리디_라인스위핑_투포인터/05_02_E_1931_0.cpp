#include <bits/stdc++.h>
using namespace std;

int n, ret = 1;

int main(){

    cin >> n;
    vector<pair<int, int>> v(n);
    for(int i = 0; i < n; i++){
        cin >> v[i].second >> v[i].first;
    }
    sort(v.begin(), v.end());
    int from = v[0].second, to = v[0].first;
    for(int i = 1; i < n; i++){
        if(v[i].second < to ) continue;
        from = v[i].second; 
        to = v[i].first;
        ret++;
    }

    cout << ret;
    
}