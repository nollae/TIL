
#include <bits/stdc++.h>
using namespace std;

/**
 * 1) 시간복잡도를 먼저 고려한 후 무식하게 풀어도 되는지 체크하자.
 * 2) 경우의 수마다 "초기화"해주는 것이 일반적이다.
*/

int n, m, ret;
int a[10][10], visited[10][10];
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};
vector<pair<int, int>> wallList, virusList;

void dfs(int y, int x){
    for(int i = 0; i < 4; i++){
        int ny = y + dy[i];
        int nx = x + dx[i];
        if(ny < 0 || ny >= n || nx < 0 || nx >= m || visited[ny][nx] || a[ny][nx] == 1) continue;
        visited[ny][nx] = 1;
        dfs(ny, nx);
    }
    return;
}

int solve(){
    fill(&visited[0][0], &visited[0][0] + 10 * 10, 0);
    for(pair<int,int> it : virusList){
        visited[it.first][it.second] = 1;
        dfs(it.first, it.second);
    }

    int cnt = 0;
    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            if(a[i][j] == 0 && !visited[i][j]) cnt++;
        }
    }

    return cnt;
}

int main(){

    cin >> n >> m;

    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            cin >> a[i][j];
            if(a[i][j] == 0) wallList.push_back({i, j});
            if(a[i][j] == 2) virusList.push_back({i, j});
        }
    }

    for(int i = 0; i < wallList.size(); i++){
        for(int j = 0; j < i; j++){
            for(int k = 0; k < j; k++){
                a[wallList[i].first][wallList[i].second] = 1;
                a[wallList[j].first][wallList[j].second] = 1;
                a[wallList[k].first][wallList[k].second] = 1;
                ret = max(ret, solve());
                a[wallList[i].first][wallList[i].second] = 0;
                a[wallList[j].first][wallList[j].second] = 0;
                a[wallList[k].first][wallList[k].second] = 0;
            }
        }
    }

    cout << ret;

}