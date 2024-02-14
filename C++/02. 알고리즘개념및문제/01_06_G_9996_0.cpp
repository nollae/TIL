#include <bits/stdc++.h>
using namespace std;

/**
 * 추가적으로 생각해야할 부분.
 * !!! "반례"를 생각하도록하자!!!!!!
*/

int n;
string ptn, s;
string st, ed;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> n;
    cin >> ptn;

    string ret[n];
    int idx = ptn.find("*");
    st = ptn.substr(0, idx);
    ed = ptn.substr(idx + 1);

    for(int i = 0; i < n; i++){
        cin >> s;
        if(st.size() + ed.size() > s.size()){
            ret[i] = "NE";
        }else{
            if(st == s.substr(0, st.size()) && ed == s.substr(s.size() - ed.size())){
                ret[i] = "DA";
            }else{
                ret[i] ="NE";
            }
        }
    }

    for(auto i : ret){
        cout << i << "\n";
    }

}
