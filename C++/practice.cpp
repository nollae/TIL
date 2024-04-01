#include <bits/stdc++.h>
using namespace std;

int n, cnt, ret;
string s;
stack<int> stk;

int main(){
    cin >> n >> s;
    stk.push(-1);
    for(int i = 0; i < n; i++){
        if(s[i] == '(') stk.push(i);
        if(s[i] == ')'){
            stk.pop();
            if(!stk.empty()){
                ret = max(ret, i - stk.top());
            }else{
                stk.push(i);
            }
        }
    }
    cout << ret;
}