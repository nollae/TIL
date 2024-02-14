#include <bits/stdc++.h>
using namespace std;

/**
 * 개수를 count를 한다면, "map" 또는 "array"이다.
 * string을 cnt한다면 map,
 * int를 cnt한다면 array 사용하기.
 * (예외) int를 cnt하는데 10만, 100만, 1000만 띄엄띄엄 들어온다면 map을 사용해야한다.
 * 
 * 아스키코드는 A : 65, a : 97 두가지는 암기하고 있기.
*/


string str;
int cnt[26];

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> str;

    for(char a : str){
        cnt[a - 'a']++;
    }
    for(int i = 0; i < 26; i++) cout << cnt[i] << " ";

    return 0;
}   