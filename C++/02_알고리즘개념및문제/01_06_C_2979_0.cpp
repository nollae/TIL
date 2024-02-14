#include <bits/stdc++.h>
using namespace std;

/**
 * 추가적으로 생각해야할 부분.
 * 1) 점으로 cnt가 되는가, 간격으로 cnt가 되는가.
 * 2) 간단하게 생각하자.
*/

int A, B, C;
int st, ed; 
vector<int> a, b, c;
int a_cnt = 0, b_cnt = 0, c_cnt = 0;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> A >> B >> C;

    cin >> st >> ed;
    for(int i = st; i < ed; i++){
        a.push_back(i);
    }
    cin >> st >> ed;
    for(int i = st; i < ed; i++){
        b.push_back(i);
    }
    cin >> st >> ed;
    for(int i = st; i < ed; i++){
        c.push_back(i);
    }

    for(int i = 1; i < 101; i++){
        int cnt = 0;
        if(count(a.begin(), a.end(),i)) cnt++;
        if(count(b.begin(), b.end(),i)) cnt++;
        if(count(c.begin(), c.end(),i)) cnt++;
        
        if(cnt == 3) c_cnt++;
        else if(cnt == 2) b_cnt++;
        else if(cnt == 1) a_cnt++;
    }

    cout << a_cnt * A + b_cnt * 2 * B + c_cnt * 3 * C;

    return 0;
}   