#include <bits/stdc++.h>
using namespace std;

int n, k, ret;
priority_queue<int> pq;

int main(){
    cin >> n >> k;
    vector<pair<int,int>> v(n);
    for(int i = 0; i < n; i++){
        cin >> v[i].first >> v[i].second;
    }
    vector<int> vv(k);
    for(int i = 0; i < k; i++){
        cin >> vv[i];
    }

    sort(v.begin(), v.end());
    sort(vv.begin(), vv.end());

    int j = 0;
    for(int i = 0; i < k; i++){
        while(j < n && v[j].first <= vv[i]){
            pq.push(v[j++].second);
        }
        if(pq.size()){
            ret += pq.top();
            pq.pop();
        }
    }

    cout << ret;

    return 0;
}