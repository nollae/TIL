#include <bits/stdc++.h>
using namespace std;

/**
 * 트리같은 경우, "루트노드"부터 탐색하는 것이 더 편하다.
 * 
 * !! return 0; 조심하자.
 * 
*/

int n, r;
vector<int> adj[54];

int dfs(int here){
    int ret = 0, child = 0;
    for(int there : adj[here]){
        if(there == r) continue;
        ret += dfs(there);
        child++;
    }
    if(child == 0) return 1;

    return ret;
}

int main(){
    cin >> n;

    int temp, root;
    for(int i = 0; i < n; i++){
        cin >> temp;
        if(temp == -1) root = i;
        else adj[temp].push_back(i);
    }

    cin >> r;

    if(root == r) {
        cout << 0 << "\n";
        return 0;
    }

    cout << dfs(root) << "\n";

    return 0;
}