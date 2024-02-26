#include <bits/stdc++.h>
using namespace std;

/**
 * 1) 판 가장 자리에 치즈가 없다는 말이 없다면,
 *    치즈가 없는 부분을 찾는 로직을 추가해야한다.
 * 2) 녹인다, 삭제시킨다 는 "색칠"을 하는 것이다.
*/

int n, m, cnt, cnt2;
int a[104][104], visited[104][104];
vector<pair<int,int>> v;
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};

void go(int y, int x){
    visited[y][x] = 1;
    if(a[y][x] == 1){
        v.push_back({y, x});
        return;
    }
    for(int i = 0; i < 4; i++){
        int ny = y + dy[i];
        int nx = x + dx[i];
        if(ny < 0 || nx < 0 || ny >= n || nx >= m || visited[ny][nx]) continue;
        go(ny, nx);
    }
}

int main(){

    cin >> n >> m;

    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            cin >> a[i][j];
        }
    }

    while(true){
        fill(&visited[0][0], &visited[0][0] + 104*104, 0);
        v.clear();
        go(0,0);
        cnt2 = v.size();
        for(pair<int, int> it : v){
            a[it.first][it.second] = 0;
        }
        bool flag = 0;
        for(int i = 0; i < n; i++){
            for(int j =  0; j < m; j++){
                if(a[i][j] != 0) flag = 1;
            }
        }
        cnt++;
        if(!flag) break;
    }

    cout << cnt << '\n' << cnt2 << '\n'; 

}