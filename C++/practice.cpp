#include <bits/stdc++.h>
using namespace std;

int n, m, sy, sx, fy, fx;
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};
int a[104][104], visited[104][104];

void bfs(int y, int x){
    queue<pair<int,int>> q;
    visited[y][x] = 1;
    q.push({y, x});
    cout << y << " : " << x << "\n";
    while(q.size()){
        tie(y, x) = q.front(); q.pop();
        for(int i = 0; i < 4; i++){
            int ny = y + dy[i];
            int nx = x + dx[i];
            if(ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
            if(a[ny][nx] && !visited[ny][nx]){
                visited[ny][nx] = visited[y][x] + 1;
                q.push({ny, nx});
            }
        }
    }

}

int main(){

    cin >> n >> m;
    cin >> sy >> sx;
    cin >> fy >> fx;

    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            cin >> a[i][j];
        }
    }

    bfs(sy, sx);

    cout << visited[fy][fx];

}