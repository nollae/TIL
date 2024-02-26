#include <bits/stdc++.h>
using namespace std;

int n;
string s;
char A = '(', B = ')';

int main(){
    cin >> n;
    for(int i = 0; i < n; i++){
        cin >> s;
        queue<char> q;
        bool flag = 1;
        for(int j = 0; j < s.size(); j++){
            if(A == s[j]){ q.push(s[j]); }
            else if(B == s[j]) { 
                if(q.size()) q.pop();
                else {
                    flag = 0;
                    cout << "NO" << "\n";
                    break;
                }
            }
        }
        if(flag){
            if(q.size() == 0){
                cout << "YES" << "\n";
            }else{
                cout << "NO" << "\n";
            }
        }

    }

}