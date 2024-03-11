#include <bits/stdc++.h>
using namespace std;

#define prev aaa
#define next bbb

const int mx = 200004;
int n, k;
int visited[mx], prev[mx];
vector<int> v;

int main(){
    cin >> n >> k;

    visited[n] = 1;
    queue<int> q;
    q.push(n);

    while(q.size()){
        int here = q.front();
        q.pop();

        for(int next : {here-1, here+1, here*2}){
            if(next >= mx || next < 0 || visited[next]) continue;
            q.push(next);
            visited[next] = visited[here] + 1;
            prev[next] = here;
        }
    }

    for(int i = k; i != n; i = prev[i]){
        v.push_back(i);
    }
    v.push_back(n);
    reverse(v.begin(), v.end());

    cout << visited[k] - 1 << "\n";

    for(int i : v){
        cout << i << " ";
    }
}