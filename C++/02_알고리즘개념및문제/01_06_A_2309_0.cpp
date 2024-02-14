#include <bits/stdc++.h>
using namespace std;

/** 
 * 9C2 추출해서 나머지 7개 가져와서 합을 구한다.
 * 100 이면 출력한다.
*/

int a[9], input, ret[9];
vector<pair<int,int>> cb;

int main(){

    for(int i = 0; i < 9; i++){
        cin >> input;
        if(input <= 0 ||input >= 100) {
            i--; continue;
        }
        a[i] = input;
    }

    for(int i = 0; i < 9; i++){
        for(int j = 0; j < i; j++){
            cb.push_back({a[i], a[j]});
        }
    }

    for(int i = 0; i < cb.size(); i++){
        int sum = 0;
        for(int j = 0; j < 9; j++){
            if(cb[i].first == a[j] || cb[i].second == a[j]) {
                ret[j] = 0;
                continue;
            }
            sum += a[j];
            ret[j] = a[j];
        }
        if(sum == 100) break;
    }
    sort(ret, ret + 9);

    for(int t : ret){
        if(t != 0)cout << t << " ";
    }

/**
 * intput:
20
7
23
19
10
15
25
8
13
*  output:
7
8
10
13
19
20
23
*/

}

