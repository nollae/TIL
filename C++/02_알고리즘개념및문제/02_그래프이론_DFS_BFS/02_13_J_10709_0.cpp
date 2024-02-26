#include <bits/stdc++.h>
using namespace std;

int h, w;
char a[104][104];
int ret[104][104];

int main(){
    cin >> h >> w;
    string s = "";

    for(int i = 0; i < h; i++){
        cin >> s;
        for(int j = 0; j < w; j++){
            a[i][j] = s[j];
        }
    }

    for(int i = 0; i < h; i++){
        int cnt = -1;
        for(int j = 0; j < w; j++){
            if(a[i][j] == 'c'){
                ret[i][j] = 0;
                cnt = 0;
            }else{
                if(cnt == -1) ret[i][j] = -1;
                else {
                    cnt++;
                    ret[i][j] = cnt;
                }
            }
        }
    }

    for(int i = 0; i < h; i++){
        for(int j = 0; j < w; j++){
            cout << ret[i][j] << " ";
        }
        cout << "\n";
    }
}