#include <bits/stdc++.h>
using namespace std;

/**
 * 어려워.... 규칙 찾도록... 노력해보자...
*/

int n, m, j;
int temp;
int ret;
int l, r;

int main(){
    cin >> n >> m >> j;

    l = 1;
    for(int i = 0; i < j; i++){
        r = l + m - 1;
        cin >> temp;
        if(temp >= l && temp <= r) continue;
        else{
            if(l > temp){
                ret += (l - temp);
                l = temp; 
            }else{
                ret += (temp - r);
                l += (temp - r);
            }
        }
    }

    cout << ret;
}