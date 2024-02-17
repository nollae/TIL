#include <bits/stdc++.h>
using namespace std;

/**
 * (못풀었음..)
 * 
 * 풀 수 있는 방법이 안떠오를땐,
 * 뒤집어보거나, 뒤에 붙여보거나, 90도로 회전하거나 해본다.
 * 
 * stack 또는 queue 사용하기 전 항상 size를 체크해줘야한다.
 * 
 * 짝짓기, 폭발 이라는 단어가 있으면 "stack"을 고려해라.
*/

int n, ret;
string s;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> n;
    
    for(int i = 0; i < n; i++){
        cin >> s;
        stack<char> stk;
        for(char a : s){
            if(stk.size() && stk.top() == a) stk.pop();
            else stk.push(a);
        }

        if(stk.size() == 0) ret++;

    }

    cout << ret << "\n";
}