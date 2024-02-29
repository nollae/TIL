#include <bits/stdc++.h>
using namespace std;

int r, c, sy, sx, y, x, ret, INF = 987654321;
char a[1004][1004];
int fire[1004][1004], person[1004][1004];
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};

int main(){

    cin >> r >> c;

    fill(&fire[0][0], &fire[0][0] + 1004 * 1004, INF);

    queue<pair<int, int>> q;

    for(int i = 0; i < r; i++){
        for(int j = 0; j < c; j++){
            cin >> a[i][j];
            if(a[i][j] == 'F') fire[i][j] = 1, q.push({i, j});
            else if(a[i][j] == 'J') person[i][j] = 1, sy = i, sx = j;
        }   
    }

    while(q.size()){
        tie(y, x) = q.front(); q.pop();
        for(int i = 0; i < 4; i++){
            int ny = y + dy[i];
            int nx = x + dx[i];
            if(ny < 0 || nx < 0 || ny >= r || nx >=c) continue;
            if(fire[ny][nx] != INF || a[ny][nx] == '#') continue;
            fire[ny][nx] = fire[y][x] + 1;
            q.push({ny, nx});
        }
    }

    q.push({sy, sx});
    while(q.size()){
        int y = q.front().first;
        int x = q.front().second;
        q.pop();

        if(y == r - 1 || y == 0 || x == c -1 || x == 0){
            ret = person[y][x];
            break;
        }

        for(int i = 0; i < 4; i++){
            int ny = y + dy[i];
			int nx = x + dx[i];
            if(ny < 0 || nx < 0 || ny >= r || nx >=c) continue;
            if(person[ny][nx] || a[ny][nx]=='#') continue; 
            if(fire[ny][nx] <= person[y][x] + 1) continue;
            person[ny][nx] = person[y][x] + 1;
            q.push({ny, nx});
        }
    }

    if(ret != 0) cout << ret << "\n";
	else cout << "IMPOSSIBLE \n";
}