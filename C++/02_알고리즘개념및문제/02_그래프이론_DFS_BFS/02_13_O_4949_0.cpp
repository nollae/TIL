#include <bits/stdc++.h>
using namespace std;

/**
 * 괄호끼리 짝짓기!! == 스택
 * 짝짓기 문제 일때 무조건 스택을 사용하는 건 아니지만, 고려하도록~
 * 
 * 이런 문제는 "초기화"가 중요하다
*/

string t;

bool check(string s){
    stack<char> stk;
    for(char c : s){
        if(c == '(' || (c == '[')){
            stk.push(c);
        }
        else if(c == ')') {
            if(!stk.empty() && (stk.top() == '(')) stk.pop();
            else return false;
        }
        else if(c == ']') {
            if(!stk.empty() && (stk.top() == '[')) stk.pop();
            else return false;
        }else continue;
    }

    return stk.empty();
}

int main(){
    while(true){
        getline(cin, t);
        if(t == ".") break;
        
        if(check(t)) cout << "yes" << "\n";
        else cout << "no" << "\n";

    }
}