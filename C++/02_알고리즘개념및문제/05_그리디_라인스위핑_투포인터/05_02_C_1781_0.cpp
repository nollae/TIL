#include <bits/stdc++.h>
using namespace std;

int n, ret;
priority_queue<int, vector<int>, greater<int>> pq;

int main(){
    cin >> n;
    vector<pair<int,int>> v(n);
    for(int i = 0; i < n; i++){
        cin >> v[i].first >> v[i].second;
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
}