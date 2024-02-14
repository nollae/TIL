#include <bits/stdc++.h>
using namespace std;

/**
 * 추가적으로 생각해야할 부분.
 * 1) ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL); 넣기
 * 2) 간단하게 생각하기
*/

string input;
vector<pair<char,int>> v;

int main(){

    for(int i = 97; i < 123; i++){
        v.push_back({(char)i, 0});
    }
    
    cin >> input;

    for(auto a : v){
        for(char c : input){
            if(a.first == c) a.second++;
        }
        cout <<  a.second << " ";
    }


}