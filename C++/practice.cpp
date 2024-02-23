#include <bits/stdc++.h>
using namespace std;

int n, m, ret;
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};
int a[104][104], visited[104][104];

void dfs(int y, int x){
    visited[y][x] = 1;
    cout << y << " : " << x << "\n";
    for(int i = 0; i < 4; i++){
        int ny = y + dy[i];
        int nx = x + dx[i];
        if(ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
        if(visited[ny][nx]) continue;
        if(!a[ny][nx]) continue;
        dfs(ny, nx);
    }
}

int main(){
    cin >> n >> m;

    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            cin >> a[i][j];
        }
    }

    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            if(a[i][j] && visited[i][j] == 0){
                ret++;
                dfs(i, j);
            } 
        }
    }

    cout << ret;
}