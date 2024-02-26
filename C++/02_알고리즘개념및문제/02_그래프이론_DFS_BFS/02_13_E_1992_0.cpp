#include <bits/stdc++.h>
using namespace std;

/**
 * 매개변수가 바뀌면서 반복적이라면 재귀함수를 활용하자.
 * 지금 이 문제는 Divide & conquer 이라는 문제로
 * 문제를 하위 문제로 쪼개고 하위 문제에서 해결한 방법으로 상위 문제를 해결하는 구조이다.
*/

int n;
char a[70][70];
string s;

string quard(int y, int x, int size){
    if(size == 1) return string(1, a[y][x]);
    char b = a[y][x];
    string ret = "";

    for(int i = y; i < y + size; i++){
        for(int j = x; j < x + size; j++){
            if(b != a[i][j]){
                ret += "(";
                ret += quard(y, x, size/2);
                ret += quard(y, x + size/2, size/2);
                ret += quard(y + size/2, x, size/2);
                ret += quard(y + size/2, x + size/2, size/2);
                ret += ")";
                return ret;
            }
        }
    }

    return string(1, a[y][x]);
}

int main(){
    cin >> n;

    for(int i = 0; i < n; i++){
        cin >> s;
        for(int j = 0; j < n; j++){
            a[i][j] = s[j];
        }
    }

    cout << quard(0, 0, n);

}