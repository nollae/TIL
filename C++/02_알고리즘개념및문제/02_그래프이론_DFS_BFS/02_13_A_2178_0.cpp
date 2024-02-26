#include <bits/stdc++.h>
using namespace std;

int n, m;
int a[104][104], visited[104][104];
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};

void dfs(int y, int x){
    queue<pair<int,int>> q;
    y = y -1, x = x-1;
    visited[y][x] = 1;
    q.push({y, x});
    
    while(q.size()){
        tie(y,x) = q.front(); q.pop();
        for(int i = 0; i < 4; i++){
            int ny = y + dy[i];
            int nx = x + dx[i];
            if(ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
            if(visited[ny][nx]) continue;
            if(!a[ny][nx])continue;
            visited[ny][nx] = visited[y][x] + 1;
            q.push({ny, nx});
        }
    }
}

int main(){
    cin >> n >> m;
    string s;
    for(int i = 0; i < n; i++){
        cin >> s;
        for(int j = 0; j < m; j++){
            a[i][j] = s[j] - '0';
        }
    }

    dfs(1, 1);

    cout << visited[n-1][m-1];
}   

