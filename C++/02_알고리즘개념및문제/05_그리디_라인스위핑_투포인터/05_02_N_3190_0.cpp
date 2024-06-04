#include <bits/stdc++.h>
using namespace std;

#define time ff

int n, k, y, x, l, t, a[104][104], visited[104][104], time, idx;
int dir = 1;
char c;
vector<pair<int, int>> _time;
deque<pair<int, int>> dq;

int dy[] = {-1, 0, 1, 0};
int dx[] = {0, 1, 0, -1};

int main(){
    cin >> n >> k;
    for(int i = 0; i < k; i++){
        cin >> y >> x;
        a[--y][--x] = 1;
    }
    cin >> l;
    for(int i = 0; i < l; i++){
        cin >> t >> c;
        if(c == 'D') _time.push_back({t, 1});
        else _time.push_back({t, 3});
    }
    dq.push_back({0,0});
    while(dq.size()){
        time++;
        tie(y, x) = dq.front();
        int ny = y + dy[dir];
        int nx = x + dx[dir];
        if(ny >= n || ny < 0 || nx >= n || nx < 0 || visited[ny][nx]) break;

        if(!a[ny][nx]){
            visited[dq.back().first][dq.back().second] = 0;
            dq.pop_back();
        }else{
            a[ny][nx] = 0;
        }

        visited[ny][nx] = 1;
        dq.push_front({ny, nx});

        if(time == _time[idx].first){
            dir = (dir + _time[idx].second) % 4;
            idx++;
        }
    }
    
    cout << time;
    return 0;
}