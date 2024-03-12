#include <bits/stdc++.h>
using namespace std;

const int mx = 500000;
int a, b, ok, turn = 1;
int visited[2][mx + 4];

int main(){
    cin >> a >> b;

    if(a == b){
        cout << "0";
        return 0;
    }

    queue<int> q;
    q.push(a);
    visited[0][a] = 1;

    while(q.size()){
        b += turn;
        if(b > mx) break;
        if(visited[turn % 2][b]){
            ok = 1;
            break;
        }
        int qSize = q.size();
        for(int i = 0; i < qSize; i++){
            int x = q.front(); q.pop();
            for(int nx : {x-1, x+1, x*2}){
                if(nx < 0 || nx > mx || visited[turn % 2][nx]) continue;
                visited[turn % 2][nx] = visited[(turn+1)%2][x] + 1;
                if(nx == b){
                    ok = 1; break;
                }
                q.push(nx);
            }
            if(ok) break;
        }
        if(ok) break;
        turn++;
    }
    if(ok) cout << turn << "\n";
    else cout << -1 << "\n";
    return 0;
}