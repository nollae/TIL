#include <bits/stdc++.h>
using namespace std;

/**
 * 1) 조건이 많을 때는 안되는 경우를 하나씩 쪼개서 적용하기
 * 된다는 가정하에 for문 돌려서 안되는 경우 추출하기!
 * 2) 변수 초기화 진짜 조심하기...
*/

string s;

bool isVowel(char idx){
    return (idx == 'a' || idx == 'e' || idx == 'i' || idx =='o' || idx == 'u');
}

int main(){
    while(true){
        cin >> s;
        if(s == "end") break;
        int vcnt = 0, lcnt = 0, v_include = 0;
        bool flag = 1;
        int prev = -1;
        for(int i = 0; i < s.size(); i++){
            int idx = s[i];
            if(isVowel(idx)) vcnt++, lcnt = 0, v_include = 1;
            else vcnt = 0, lcnt++;
            if(vcnt == 3 || lcnt == 3) flag = 0;
            if(i >= 1 && (prev == idx) && (idx != 'e' && idx != 'o')) flag = 0;
            prev = idx;
        }
        if(!v_include) flag = 0;
        if(!flag) cout << "<" << s << ">" << " is not acceptable.\n";
		else cout << "<" << s << ">" << " is acceptable.\n";
    }
}