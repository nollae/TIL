#include <bits/stdc++.h>
using namespace std;
#define prev aaaa

/**
 * 1) prev 활용하기
 * 2) 시간계산이 나오면, 하나의 단위로 통일해준다.
 *    낮은 단계로 통일하는 걸 추천한다.
 * 
*/

int n, t, A, B, asum, bsum;
string s, prev;

string print(int sum){
    string m = "00" + to_string(sum/60);
    string s = "00" + to_string(sum%60);
    return m.substr(m.size()-2, 2) + ":" + s.substr(s.size()-2,2);
}

int changeToInt(string s){
    return atoi(s.substr(0, 2).c_str()) * 60 + atoi(s.substr(3,2).c_str());
}

void go(int &sum, string s){
    sum += changeToInt(s) - changeToInt(prev);
}

int main(){
    cin >> n;
    
    for(int i = 0; i < n; i++){
        cin >> t >> s;
        if(A > B) go(asum, s);
        else if(B > A) go(bsum, s);
        t == 1 ? A++ : B++;
        prev = s;
    }
    if(A > B) go(asum, "48:00");
    else if(B > A) go(bsum, "48:00");

    cout << print(asum) <<"\n";
    cout << print(bsum) <<"\n";
    
}