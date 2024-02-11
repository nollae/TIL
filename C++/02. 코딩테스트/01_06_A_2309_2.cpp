#include <bits/stdc++.h>
using namespace std;

/**
 * 9C2 이용하기
 * 100 + (A + B) = ALL
 * 100 = ALL = (A + B)
*/

int a[9], sum;
pair<int,int> cb;
vector<int> ret;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    for(int i = 0; i < 9; i++){
        cin >> a[i];
        sum += a[i];
    }

    for(int i = 0; i < 9; i++){
        for(int j = 0; j < i; j++){
            if(sum - a[i] - a[j] == 100){
                cb = {a[i], a[j]};
                break;
            }
        }
    }

    for(int i = 0; i < 9; i++){
        if(cb.first == a[i] || cb.second == a[i]) continue;
        ret.push_back(a[i]);
    }

    sort(ret.begin(), ret.end());
    for(int i : ret) cout << i << " ";

}
