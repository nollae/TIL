#include <bits/stdc++.h>
using namespace std;

/**
 * 맞왜틀 1) 반례는 최소, 최대, 없거나, 있거나
 * (반례 생각못해서 틀렸다.)
 * 맞왜틀 2 ) 변수명 통일하기
*/

int n, ret = 1;
int a[104][104], visited[104][104];
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};

void dfs(int y, int x, int d){
    visited[y][x] = 1;
    
    for(int i = 0; i < 4; i++){
        int ny = y + dy[i];
        int nx = x + dx[i];
        if(ny < 0 || nx < 0 || ny >= n || nx >= n) continue;
        if(a[ny][nx] > d && visited[ny][nx] == 0) dfs(ny, nx, d);
    }
}

int main(){

    cin >> n;

    for(int i = 0; i < n; i++){

        for(int j = 0; j < n; j++){
            cin >> a[i][j];
        }
    }

    for(int d = 1; d < 101; d++){
        fill(&visited[0][0], &visited[0][0] + 104*104, 0);
        int cnt = 0;
        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                if(a[i][j] > d && visited[i][j] == 0){
                    cnt++;
                    dfs(i,j,d);
                }
            }
        }

        ret = max(ret, cnt);
    }

    cout << ret;

}