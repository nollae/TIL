#include <bits/stdc++.h>
using namespace std;

int n, ret;

priority_queue<int, vector<int>, greater<int>> pq;

int main(){
    // 최대는 최소를 작게 만들거나, 최대를 크게 만들거나
    cin >> n;
    vector<pair<int, int>> v(n);
    for(int i =0; i < n; i++){
        cin >> v[i].second >> v[i].first;
    }
    sort(v.begin(), v.end());

    for(int i = 0; i < n; i++){
        pq.push(v[i].second);
        if(pq.size() > v[i].first) pq.pop();
    }

    while(pq.size()){
        ret += pq.top();
        pq.pop();
    }

    cout << ret;
    return 0;
    


}