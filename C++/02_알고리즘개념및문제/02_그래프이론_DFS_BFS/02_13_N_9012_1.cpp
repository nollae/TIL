#include <bits/stdc++.h>
using namespace std;

/**
 * 짝짓기, 폭발, 아름다운 괄호 라는 문제를 보게된다면 
 * stack 이지 않을까? 고려하기!!
*/


int n;  
string s; 
bool check(string s){
	stack<char> stk; 
	for(char c : s){
		if(c == '(')stk.push(c); 
		else{
			if(!stk.empty()) stk.pop(); 
			else return false; 
		}
	}
    cout << stk.empty();
	return stk.empty();
}
int main() {
	cin >> n; 
	for(int i = 0; i < n; i++){
		cin >> s; 
		if(check(s)) cout << "YES\n"; 
		else cout << "NO\n";
	}  
	return 0;
} 