#include <bits/stdc++.h>
using namespace std;

const int n = 3;
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};
int a[n][n], visited[n][n];

void go(int y, int x){
    visited[y][x] = 1;
    cout << y << " : " << x << "\n";
    for(int i = 0; i < 4; i++){
        int ny = y + dy[i];
        int xy = x + dx[i];
        if(ny < 0 || ny >= n || xy < 0 || xy>= n) continue;
        if(visited[ny][xy]) continue;
        if(!a[ny][xy]) continue;
        go(ny, xy);
    }
}

int main(){
    for(int i = 0; i < n; i++){
        for(int j = 0; j < n; j++){
            cin >> a[i][j];
        }
    }

    go(0, 0);
}