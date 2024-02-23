#include <bits/stdc++.h>
using namespace std;

vector<int> a[100];
int visited[100];
int nodeList[] = {10, 12, 14, 16, 18, 20, 22, 24};

void bfs(int here){
    queue<int> q;
    visited[here] = 1;
    q.push(here);

    while(q.size()){
        int here = q.front();
        q.pop();
        for(int there : a[here]){
            if(visited[there]) continue;
            visited[there] = visited[here] + 1;
            q.push(there);
        }
    }
    
}

int main(){
    a[10].push_back(12);
    a[10].push_back(14);
    a[10].push_back(16);

    a[12].push_back(18);
    a[12].push_back(20);

    a[20].push_back(22);
    a[20].push_back(24);

    bfs(10);

    for(int i : nodeList){
        cout << i << " : " << visited[i] << "\n";
    }

    cout << "최단 거리 : " << visited[24] - 1;

}