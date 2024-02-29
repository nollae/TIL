#include <bits/stdc++.h>
using namespace std;

int l, m, mx;
char a[54][54];
int visited[54][54];
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};

void bfs(int y, int x){
    memset(visited, 0, sizeof(visited));
    queue<pair<int,int>> q;
    visited[y][x] = 1;
    q.push({y, x});

    while(q.size()){
        tie(y, x) = q.front(); q.pop();
        for(int i = 0; i < 4; i++){
            int ny = y + dy[i];
            int nx = x + dx[i];
            if(ny < 0 || nx < 0 || ny >= l || nx >= m) continue;
            if(visited[ny][nx]) continue;
            if(a[ny][nx] == 'W') continue;
            visited[ny][nx] = visited[y][x] + 1;
            q.push({ny, nx});
            mx = max(mx, visited[ny][nx]);
        }
    }

    return;
}


int main(){
    cin >> l >> m;

    for(int i = 0; i < l; i++){
        for(int j = 0; j < m; j++){
            cin >> a[i][j];
        }
    }

    for(int i = 0; i < l; i++){
        for(int j = 0; j < m; j++){
            if(a[i][j] == 'L') bfs(i, j);
        }
    }

    cout << mx - 1;

}