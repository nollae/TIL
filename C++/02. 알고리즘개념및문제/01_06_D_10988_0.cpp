#include<bits/stdc++.h>
using namespace std;

/**
 * 추가적으로 생각해야할 부분.
 * 1) 진짜 simple is best..... 왤케 어렵게 생각하니..
 * c++에서 제공하는 문법 최대한 기억해내서 사용하자.
 * 2) 팰린드롬은 단어가 1글자일때 true.
 * 아래 방법으로도 풀 수 있지만, 1개 입력되었을 때 발생하는 부분이 문제일거라는 건 생각지도 못했다.
 * 기억하자 악
*/

string s;
int cnt, ret;

int main(){

    cin >> s;

    if(s.length() > 1){
        if(s.length()%2 != 0){
            cnt = (s.length() -  1) / 2;
        }else{
            cnt = s.length() / 2;
        }

        for(int i = 0; i < cnt; i++){
            if(s[i] == s[s.length() - 1 - i]){
                ret = 1;
                
            }
            else{ 
                ret = 0;
                break;
            }
        }
    }else{
        ret = 1;
    }
    
    

    cout << ret << '\n';   

    return 0;
}