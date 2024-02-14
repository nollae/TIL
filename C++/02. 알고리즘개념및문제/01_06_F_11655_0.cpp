#include <bits/stdc++.h>
using namespace std;

/**
 * 추가적으로 생각해야할 부분.
 * 1) 아스키 코드 'A': 65, 'a': 97, 숫자: 48 ~ 57
 * 2) 아스키 코드의 최대값은 122이다. over이면 최소값인 -128로 된다는 것을 명심하자.
*/

string s;

int main(){
    getline(cin, s);

    for(int i = 0; i < s.size(); i++){

        if(s[i] >= 65 && s[i] <=90){
            s[i] = s[i] - 'A' + 13;
            if(s[i] >= 26) s[i] = s[i] - 26 + 'A';
            else s[i] = s[i] + 'A';
        }
        else if(s[i] >= 97 && s[i] <= 122){
            s[i] = s[i] - 'a' + 13;
            if(s[i] >= 26) s[i] = s[i] - 26 + 'a';
            else s[i] = s[i] + 'a';
        }else continue;
    }

    cout << s;

}